/**
 * WebGL fluid-simulation cursor trail — ported from React Bits' canonical
 * SplashCursor (reactbits.dev/animations/splash-cursor, JS-CSS variant,
 * itself derived from PavelDoGreat/WebGL-Fluid-Simulation): the standard
 * splat -> curl -> vorticity -> divergence -> pressure(jacobi) ->
 * gradient-subtract -> advect pipeline, WebGL2-preferred with a WebGL1 +
 * half-float-extension fallback (matches the canonical implementation
 * exactly, rather than the earlier WebGL1-only simplification this file
 * used to have).
 *
 * One deliberate deviation from the canonical component: colors are NOT
 * RAINBOW_MODE and NOT a single flat COLOR. Every splat interpolates
 * between the two Zynost brand colors (violet / sky) so the trail always
 * reads as an on-brand gradient.
 */

const VIOLET_HEX = "#8b5cf6";
const SKY_HEX = "#38bdf8";

const CONFIG = {
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 1440,
  DENSITY_DISSIPATION: 3.5,
  VELOCITY_DISSIPATION: 2,
  PRESSURE: 0.1,
  PRESSURE_ITERATIONS: 20,
  CURL: 3,
  SPLAT_RADIUS: 0.2,
  SPLAT_FORCE: 6000,
  SHADING: true,
  COLOR_UPDATE_SPEED: 10,
};

function hexToRGB01(hex: string) {
  const val = hex.replace("#", "");
  const r = parseInt(val.slice(0, 2), 16) / 255;
  const g = parseInt(val.slice(2, 4), 16) / 255;
  const b = parseInt(val.slice(4, 6), 16) / 255;
  return { r, g, b };
}

const VIOLET = hexToRGB01(VIOLET_HEX);
const SKY = hexToRGB01(SKY_HEX);

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Interpolates between the two brand colors, eased so splats spend more
 * time near the anchor hues than the muddy midpoint, then dims (the same
 * *0.15 the canonical component applies) so accumulated dye doesn't clip
 * to white. */
function themeColor() {
  const t = Math.random();
  const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const jitter = 0.85 + Math.random() * 0.3;
  return {
    r: lerp(VIOLET.r, SKY.r, eased) * 0.15 * jitter,
    g: lerp(VIOLET.g, SKY.g, eased) * 0.15 * jitter,
    b: lerp(VIOLET.b, SKY.b, eased) * 0.15 * jitter,
  };
}

interface Pointer {
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  moved: boolean;
  color: { r: number; g: number; b: number };
}

function makePointer(): Pointer {
  return {
    texcoordX: 0.5,
    texcoordY: 0.5,
    prevTexcoordX: 0.5,
    prevTexcoordY: 0.5,
    deltaX: 0,
    deltaY: 0,
    moved: false,
    color: themeColor(),
  };
}

type GL = WebGL2RenderingContext | WebGLRenderingContext;

interface Ext {
  formatRGBA: { internalFormat: number; format: number } | null;
  formatRG: { internalFormat: number; format: number } | null;
  formatR: { internalFormat: number; format: number } | null;
  halfFloatTexType: number;
  supportLinearFiltering: boolean;
}

function getWebGLContext(canvas: HTMLCanvasElement): { gl: GL; ext: Ext } | null {
  const params: WebGLContextAttributes = {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    preserveDrawingBuffer: false,
  };

  let gl: GL | null = canvas.getContext("webgl2", params) as WebGL2RenderingContext | null;
  const isWebGL2 = !!gl;
  if (!gl) {
    gl = (canvas.getContext("webgl", params) ||
      canvas.getContext("experimental-webgl", params)) as WebGLRenderingContext | null;
  }
  if (!gl) return null;

  let halfFloat: { HALF_FLOAT_OES: number } | null = null;
  let supportLinearFiltering: unknown = null;

  if (isWebGL2) {
    const gl2 = gl as WebGL2RenderingContext;
    gl2.getExtension("EXT_color_buffer_float");
    supportLinearFiltering = gl2.getExtension("OES_texture_float_linear");
  } else {
    halfFloat = gl.getExtension("OES_texture_half_float");
    supportLinearFiltering = gl.getExtension("OES_texture_half_float_linear");
  }
  gl.clearColor(0.0, 0.0, 0.0, 0.0);

  const halfFloatTexType = isWebGL2
    ? (gl as WebGL2RenderingContext).HALF_FLOAT
    : halfFloat?.HALF_FLOAT_OES ?? gl.UNSIGNED_BYTE;

  function supportRenderTextureFormat(internalFormat: number, format: number, type: number) {
    const g = gl as GL;
    const texture = g.createTexture();
    g.bindTexture(g.TEXTURE_2D, texture);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.NEAREST);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.NEAREST);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
    g.texImage2D(g.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
    const fbo = g.createFramebuffer();
    g.bindFramebuffer(g.FRAMEBUFFER, fbo);
    g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, texture, 0);
    const status = g.checkFramebufferStatus(g.FRAMEBUFFER);
    return status === g.FRAMEBUFFER_COMPLETE;
  }

  function getSupportedFormat(
    internalFormat: number,
    format: number,
    type: number
  ): { internalFormat: number; format: number } | null {
    const g = gl as WebGL2RenderingContext;
    if (!supportRenderTextureFormat(internalFormat, format, type)) {
      switch (internalFormat) {
        case g.R16F:
          return getSupportedFormat(g.RG16F, g.RG, type);
        case g.RG16F:
          return getSupportedFormat(g.RGBA16F, g.RGBA, type);
        default:
          return null;
      }
    }
    return { internalFormat, format };
  }

  let formatRGBA, formatRG, formatR;
  if (isWebGL2) {
    const g = gl as WebGL2RenderingContext;
    formatRGBA = getSupportedFormat(g.RGBA16F, g.RGBA, halfFloatTexType);
    formatRG = getSupportedFormat(g.RG16F, g.RG, halfFloatTexType);
    formatR = getSupportedFormat(g.R16F, g.RED, halfFloatTexType);
  } else {
    formatRGBA = { internalFormat: gl.RGBA, format: gl.RGBA };
    formatRG = { internalFormat: gl.RGBA, format: gl.RGBA };
    formatR = { internalFormat: gl.RGBA, format: gl.RGBA };
  }

  return {
    gl,
    ext: {
      formatRGBA,
      formatRG,
      formatR,
      halfFloatTexType,
      supportLinearFiltering: !!supportLinearFiltering,
    },
  };
}

const baseVertexShaderSrc = `
  precision highp float;
  attribute vec2 aPosition;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform vec2 texelSize;
  void main () {
      vUv = aPosition * 0.5 + 0.5;
      vL = vUv - vec2(texelSize.x, 0.0);
      vR = vUv + vec2(texelSize.x, 0.0);
      vT = vUv + vec2(0.0, texelSize.y);
      vB = vUv - vec2(0.0, texelSize.y);
      gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const copyShaderSrc = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  uniform sampler2D uTexture;
  void main () {
      gl_FragColor = texture2D(uTexture, vUv);
  }
`;

const clearShaderSrc = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  uniform sampler2D uTexture;
  uniform float value;
  void main () {
      gl_FragColor = value * texture2D(uTexture, vUv);
  }
`;

const displayShaderSrc = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uTexture;
  uniform vec2 texelSize;

  void main () {
      vec3 c = texture2D(uTexture, vUv).rgb;
      #ifdef SHADING
          vec3 lc = texture2D(uTexture, vL).rgb;
          vec3 rc = texture2D(uTexture, vR).rgb;
          vec3 tc = texture2D(uTexture, vT).rgb;
          vec3 bc = texture2D(uTexture, vB).rgb;

          float dx = length(rc) - length(lc);
          float dy = length(tc) - length(bc);

          vec3 n = normalize(vec3(dx, dy, length(texelSize)));
          vec3 l = vec3(0.0, 0.0, 1.0);

          float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
          c *= diffuse;
      #endif

      float a = max(c.r, max(c.g, c.b));
      gl_FragColor = vec4(c, a);
  }
`;

const splatShaderSrc = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTarget;
  uniform float aspectRatio;
  uniform vec3 color;
  uniform vec2 point;
  uniform float radius;

  void main () {
      vec2 p = vUv - point.xy;
      p.x *= aspectRatio;
      vec3 splat = exp(-dot(p, p) / radius) * color;
      vec3 base = texture2D(uTarget, vUv).xyz;
      gl_FragColor = vec4(base + splat, 1.0);
  }
`;

const advectionShaderSrc = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform vec2 dyeTexelSize;
  uniform float dt;
  uniform float dissipation;

  vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
      vec2 st = uv / tsize - 0.5;
      vec2 iuv = floor(st);
      vec2 fuv = fract(st);

      vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
      vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
      vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
      vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

      return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
  }

  void main () {
      #ifdef MANUAL_FILTERING
          vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
          vec4 result = bilerp(uSource, coord, dyeTexelSize);
      #else
          vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
          vec4 result = texture2D(uSource, coord);
      #endif
      float decay = 1.0 + dissipation * dt;
      gl_FragColor = result / decay;
  }
`;

const divergenceShaderSrc = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uVelocity;

  void main () {
      float L = texture2D(uVelocity, vL).x;
      float R = texture2D(uVelocity, vR).x;
      float T = texture2D(uVelocity, vT).y;
      float B = texture2D(uVelocity, vB).y;

      vec2 C = texture2D(uVelocity, vUv).xy;
      if (vL.x < 0.0) { L = -C.x; }
      if (vR.x > 1.0) { R = -C.x; }
      if (vT.y > 1.0) { T = -C.y; }
      if (vB.y < 0.0) { B = -C.y; }

      float div = 0.5 * (R - L + T - B);
      gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }
`;

const curlShaderSrc = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uVelocity;

  void main () {
      float L = texture2D(uVelocity, vL).y;
      float R = texture2D(uVelocity, vR).y;
      float T = texture2D(uVelocity, vT).x;
      float B = texture2D(uVelocity, vB).x;
      float vorticity = R - L - T + B;
      gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
  }
`;

const vorticityShaderSrc = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform float curl;
  uniform float dt;

  void main () {
      float L = texture2D(uCurl, vL).x;
      float R = texture2D(uCurl, vR).x;
      float T = texture2D(uCurl, vT).x;
      float B = texture2D(uCurl, vB).x;
      float C = texture2D(uCurl, vUv).x;

      vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
      force /= length(force) + 0.0001;
      force *= curl * C;
      force.y *= -1.0;

      vec2 velocity = texture2D(uVelocity, vUv).xy;
      velocity += force * dt;
      velocity = min(max(velocity, -1000.0), 1000.0);
      gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

const pressureShaderSrc = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;

  void main () {
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      float C = texture2D(uPressure, vUv).x;
      float divergence = texture2D(uDivergence, vUv).x;
      float pressure = (L + R + B + T - divergence) * 0.25;
      gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`;

const gradientSubtractShaderSrc = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;

  void main () {
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      vec2 velocity = texture2D(uVelocity, vUv).xy;
      velocity.xy -= vec2(R - L, T - B);
      gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

function addKeywords(source: string, keywords?: string[] | null) {
  if (!keywords || keywords.length === 0) return source;
  let keywordsString = "";
  keywords.forEach((k) => {
    keywordsString += "#define " + k + "\n";
  });
  return keywordsString + source;
}

function compileShader(gl: GL, type: number, source: string, keywords?: string[] | null): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Failed to create shader");
  gl.shaderSource(shader, addKeywords(source, keywords));
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(log || "Shader compile failed");
  }
  return shader;
}

function createProgram(gl: GL, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
  const program = gl.createProgram();
  if (!program) throw new Error("Failed to create program");
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) || "Program link failed");
  }
  return program;
}

function getUniforms(gl: GL, program: WebGLProgram) {
  const uniforms: Record<string, WebGLUniformLocation> = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(program, i);
    if (!info) continue;
    const loc = gl.getUniformLocation(program, info.name);
    if (loc) uniforms[info.name] = loc;
  }
  return uniforms;
}

class Program {
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation>;
  constructor(gl: GL, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    this.program = createProgram(gl, vertexShader, fragmentShader);
    this.uniforms = getUniforms(gl, this.program);
  }
  bind(gl: GL) {
    gl.useProgram(this.program);
  }
}

class Material {
  gl: GL;
  vertexShader: WebGLShader;
  fragmentShaderSource: string;
  programs: Record<number, WebGLProgram> = {};
  activeProgram: WebGLProgram | null = null;
  uniforms: Record<string, WebGLUniformLocation> = {};
  constructor(gl: GL, vertexShader: WebGLShader, fragmentShaderSource: string) {
    this.gl = gl;
    this.vertexShader = vertexShader;
    this.fragmentShaderSource = fragmentShaderSource;
  }
  setKeywords(keywords: string[]) {
    let hash = 0;
    for (const k of keywords) hash += hashCode(k);
    let program = this.programs[hash];
    if (program == null) {
      const fragmentShader = compileShader(this.gl, this.gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
      program = createProgram(this.gl, this.vertexShader, fragmentShader);
      this.programs[hash] = program;
    }
    if (program === this.activeProgram) return;
    this.uniforms = getUniforms(this.gl, program);
    this.activeProgram = program;
  }
  bind() {
    if (this.activeProgram) this.gl.useProgram(this.activeProgram);
  }
}

function hashCode(s: string) {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

interface FBO {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  attach(id: number): number;
}

interface DoubleFBO {
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  read: FBO;
  write: FBO;
  swap(): void;
}

export function startSplashCursor(canvas: HTMLCanvasElement): () => void {
  const ctx = getWebGLContext(canvas);
  if (!ctx) return () => {};
  const { gl, ext } = ctx;

  const config = { ...CONFIG };
  if (!ext.supportLinearFiltering) {
    config.DYE_RESOLUTION = 256;
  }

  const baseVertexShader = compileShader(gl, gl.VERTEX_SHADER, baseVertexShaderSrc);
  const copyShader = compileShader(gl, gl.FRAGMENT_SHADER, copyShaderSrc);
  const clearShader = compileShader(gl, gl.FRAGMENT_SHADER, clearShaderSrc);
  const splatShader = compileShader(gl, gl.FRAGMENT_SHADER, splatShaderSrc);
  const advectionShader = compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    advectionShaderSrc,
    ext.supportLinearFiltering ? null : ["MANUAL_FILTERING"]
  );
  const divergenceShader = compileShader(gl, gl.FRAGMENT_SHADER, divergenceShaderSrc);
  const curlShader = compileShader(gl, gl.FRAGMENT_SHADER, curlShaderSrc);
  const vorticityShader = compileShader(gl, gl.FRAGMENT_SHADER, vorticityShaderSrc);
  const pressureShader = compileShader(gl, gl.FRAGMENT_SHADER, pressureShaderSrc);
  const gradientSubtractShader = compileShader(gl, gl.FRAGMENT_SHADER, gradientSubtractShaderSrc);

  const copyProgram = new Program(gl, baseVertexShader, copyShader);
  const clearProgram = new Program(gl, baseVertexShader, clearShader);
  const splatProgram = new Program(gl, baseVertexShader, splatShader);
  const advectionProgram = new Program(gl, baseVertexShader, advectionShader);
  const divergenceProgram = new Program(gl, baseVertexShader, divergenceShader);
  const curlProgram = new Program(gl, baseVertexShader, curlShader);
  const vorticityProgram = new Program(gl, baseVertexShader, vorticityShader);
  const pressureProgram = new Program(gl, baseVertexShader, pressureShader);
  const gradientSubtractProgram = new Program(gl, baseVertexShader, gradientSubtractShader);
  const displayMaterial = new Material(gl, baseVertexShader, displayShaderSrc);
  if (config.SHADING) displayMaterial.setKeywords(["SHADING"]);
  else displayMaterial.setKeywords([]);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);

  function blit(target: FBO | null) {
    if (target == null) {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    } else {
      gl.viewport(0, 0, target.width, target.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    }
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  }

  function createFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number): FBO {
    gl.activeTexture(gl.TEXTURE0);
    const texture = gl.createTexture();
    if (!texture) throw new Error("Failed to create texture");
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

    const fbo = gl.createFramebuffer();
    if (!fbo) throw new Error("Failed to create framebuffer");
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);

    return {
      texture,
      fbo,
      width: w,
      height: h,
      texelSizeX: 1 / w,
      texelSizeY: 1 / h,
      attach(id: number) {
        gl.activeTexture(gl.TEXTURE0 + id);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        return id;
      },
    };
  }

  function createDoubleFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number): DoubleFBO {
    let fbo1 = createFBO(w, h, internalFormat, format, type, param);
    let fbo2 = createFBO(w, h, internalFormat, format, type, param);
    return {
      width: w,
      height: h,
      texelSizeX: fbo1.texelSizeX,
      texelSizeY: fbo1.texelSizeY,
      get read() {
        return fbo1;
      },
      set read(v: FBO) {
        fbo1 = v;
      },
      get write() {
        return fbo2;
      },
      set write(v: FBO) {
        fbo2 = v;
      },
      swap() {
        const tmp = fbo1;
        fbo1 = fbo2;
        fbo2 = tmp;
      },
    };
  }

  function resizeFBO(target: FBO, w: number, h: number, internalFormat: number, format: number, type: number, param: number): FBO {
    const newFBO = createFBO(w, h, internalFormat, format, type, param);
    copyProgram.bind(gl);
    gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
    blit(newFBO);
    return newFBO;
  }

  function resizeDoubleFBO(target: DoubleFBO, w: number, h: number, internalFormat: number, format: number, type: number, param: number): DoubleFBO {
    if (target.width === w && target.height === h) return target;
    target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);
    target.write = createFBO(w, h, internalFormat, format, type, param);
    target.width = w;
    target.height = h;
    target.texelSizeX = 1 / w;
    target.texelSizeY = 1 / h;
    return target;
  }

  function getResolution(resolution: number) {
    let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
    if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
    const min = Math.round(resolution);
    const max = Math.round(resolution * aspectRatio);
    if (gl.drawingBufferWidth > gl.drawingBufferHeight) return { width: max, height: min };
    return { width: min, height: max };
  }

  let dye: DoubleFBO;
  let velocity: DoubleFBO;
  let divergence: FBO;
  let curl: FBO;
  let pressure: DoubleFBO;

  function initFramebuffers() {
    const simRes = getResolution(config.SIM_RESOLUTION);
    const dyeRes = getResolution(config.DYE_RESOLUTION);
    const texType = ext.halfFloatTexType;
    const rgba = ext.formatRGBA ?? { internalFormat: gl.RGBA, format: gl.RGBA };
    const rg = ext.formatRG ?? { internalFormat: gl.RGBA, format: gl.RGBA };
    const r = ext.formatR ?? { internalFormat: gl.RGBA, format: gl.RGBA };
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
    gl.disable(gl.BLEND);

    if (!dye) dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
    else dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);

    if (!velocity) velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
    else velocity = resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);

    divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
  }

  initFramebuffers();

  function scaleByPixelRatio(input: number) {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    return Math.floor(input * pixelRatio);
  }

  function resizeCanvas(): boolean {
    const width = scaleByPixelRatio(canvas.clientWidth);
    const height = scaleByPixelRatio(canvas.clientHeight);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      return true;
    }
    return false;
  }

  function correctRadius(radius: number) {
    const aspectRatio = canvas.width / canvas.height;
    if (aspectRatio > 1) radius *= aspectRatio;
    return radius;
  }

  function splat(x: number, y: number, dx: number, dy: number, color: { r: number; g: number; b: number }) {
    splatProgram.bind(gl);
    gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
    gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
    gl.uniform2f(splatProgram.uniforms.point, x, y);
    gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
    gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
    blit(velocity.write);
    velocity.swap();

    gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
    gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
    blit(dye.write);
    dye.swap();
  }

  function splatPointer(p: Pointer) {
    const dx = p.deltaX * config.SPLAT_FORCE;
    const dy = p.deltaY * config.SPLAT_FORCE;
    splat(p.texcoordX, p.texcoordY, dx, dy, p.color);
  }

  function clickSplat() {
    const color = themeColor();
    color.r *= 10;
    color.g *= 10;
    color.b *= 10;
    const dx = 10 * (Math.random() - 0.5);
    const dy = 30 * (Math.random() - 0.5);
    splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);
  }

  function step(dt: number) {
    gl.disable(gl.BLEND);

    curlProgram.bind(gl);
    gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
    blit(curl);

    vorticityProgram.bind(gl);
    gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
    gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
    gl.uniform1f(vorticityProgram.uniforms.dt, dt);
    blit(velocity.write);
    velocity.swap();

    divergenceProgram.bind(gl);
    gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
    blit(divergence);

    clearProgram.bind(gl);
    gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
    gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
    blit(pressure.write);
    pressure.swap();

    pressureProgram.bind(gl);
    gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
    for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
      gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
      blit(pressure.write);
      pressure.swap();
    }

    gradientSubtractProgram.bind(gl);
    gl.uniform2f(gradientSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(gradientSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
    gl.uniform1i(gradientSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
    blit(velocity.write);
    velocity.swap();

    advectionProgram.bind(gl);
    gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    if (!ext.supportLinearFiltering) {
      gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
    }
    const velocityId = velocity.read.attach(0);
    gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
    gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
    gl.uniform1f(advectionProgram.uniforms.dt, dt);
    gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
    blit(velocity.write);
    velocity.swap();

    if (!ext.supportLinearFiltering) {
      gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
    }
    gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
    gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
    blit(dye.write);
    dye.swap();
  }

  function render() {
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);
    displayMaterial.bind();
    if (config.SHADING) {
      gl.uniform2f(displayMaterial.uniforms.texelSize, 1.0 / gl.drawingBufferWidth, 1.0 / gl.drawingBufferHeight);
    }
    gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
    blit(null);
  }

  const pointer = makePointer();
  let colorTimer = 0;
  let lastUpdateTime = performance.now();
  let rafId = 0;
  let running = true;

  function calcDeltaTime() {
    const now = performance.now();
    const dt = Math.min((now - lastUpdateTime) / 1000, 0.016666666666666666);
    lastUpdateTime = now;
    return dt;
  }

  function updateFrame() {
    if (!running) return;
    const dt = calcDeltaTime();
    if (resizeCanvas()) initFramebuffers();

    colorTimer += dt * config.COLOR_UPDATE_SPEED;
    if (colorTimer >= 1) {
      colorTimer = 0;
      pointer.color = themeColor();
    }

    if (pointer.moved) {
      pointer.moved = false;
      splatPointer(pointer);
    }

    step(dt);
    render();
    rafId = requestAnimationFrame(updateFrame);
  }

  function correctDeltaX(delta: number) {
    const aspect = canvas.width / canvas.height;
    return aspect < 1 ? delta * aspect : delta;
  }
  function correctDeltaY(delta: number) {
    const aspect = canvas.width / canvas.height;
    return aspect > 1 ? delta / aspect : delta;
  }

  function updatePointerMoveData(posX: number, posY: number) {
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.texcoordX = posX / canvas.width;
    pointer.texcoordY = 1.0 - posY / canvas.height;
    pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
    pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
    pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
  }

  const handleMouseMove = (e: MouseEvent) => {
    updatePointerMoveData(scaleByPixelRatio(e.clientX), scaleByPixelRatio(e.clientY));
  };
  const handleMouseDown = (e: MouseEvent) => {
    updatePointerMoveData(scaleByPixelRatio(e.clientX), scaleByPixelRatio(e.clientY));
    clickSplat();
  };
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mousedown", handleMouseDown);

  const handleVisibility = () => {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(rafId);
    } else if (!running) {
      running = true;
      lastUpdateTime = performance.now();
      rafId = requestAnimationFrame(updateFrame);
    }
  };
  document.addEventListener("visibilitychange", handleVisibility);

  // Seed a couple of gentle splats near center so the effect reads as
  // present immediately, before the first real mouse move.
  splat(0.5, 0.55, 0, 60, themeColor());
  splat(0.42, 0.5, 40, -20, themeColor());

  rafId = requestAnimationFrame(updateFrame);

  return function cleanup() {
    running = false;
    cancelAnimationFrame(rafId);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mousedown", handleMouseDown);
    document.removeEventListener("visibilitychange", handleVisibility);
    const loseCtx = gl.getExtension("WEBGL_lose_context");
    loseCtx?.loseContext();
  };
}
