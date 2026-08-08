"use client";

import { ReactNode, useCallback, useLayoutEffect, useRef } from "react";
import "./ScrollStack.css";

export function ScrollStackItem({
  children,
  itemClassName = "",
}: {
  children: ReactNode;
  itemClassName?: string;
}) {
  return <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>;
}

interface CardTransform {
  translateY: number;
  scale: number;
  rotation: number;
  blur: number;
}

/** Ported from React Bits' ScrollStack (JS-CSS variant) — pinned/scaling
 * card stack driven by scroll position, algorithm unchanged from the
 * canonical source. Two real performance fixes over a naive port:
 *
 * 1. Card/end-element offsets are measured ONCE (on mount, on resize, and
 *    once more after images finish loading) instead of via
 *    getBoundingClientRect() on every single card on every animation
 *    frame forever. That forced-layout-read-times-N-cards-times-60fps,
 *    running even while scrolling was idle and even while the section was
 *    off-screen, was the actual cause of reported flashing/stuttering —
 *    it was real, continuous main-thread work competing with everything
 *    else on the page (including the WebGL SplashCursor), not a smoothing
 *    problem.
 * 2. The per-frame loop is a no-op unless scroll position actually
 *    changed since the last frame, and is fully paused via
 *    IntersectionObserver whenever the section is far from the viewport.
 */
export function ScrollStack({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}: {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const inViewRef = useRef(true);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const cardOffsetsRef = useRef<number[]>([]);
  const endOffsetRef = useRef(0);
  const lastScrollTopRef = useRef<number | null>(null);
  const lastTransformsRef = useRef<Map<number, CardTransform>>(new Map());

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return { scrollTop: window.scrollY, containerHeight: window.innerHeight };
    }
    const scroller = scrollerRef.current;
    return { scrollTop: scroller?.scrollTop ?? 0, containerHeight: scroller?.clientHeight ?? 0 };
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element: HTMLElement) => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      }
      return element.offsetTop;
    },
    [useWindowScroll]
  );

  // Re-measures every card's top offset + the end-marker's offset ONCE.
  // Called on mount, on resize, and after images load — never inside the
  // per-frame loop.
  //
  // Real bug fix: getBoundingClientRect() (what getElementOffset uses in
  // window-scroll mode) returns the element's position AFTER its current
  // CSS transform is applied. If a card already had a translateY from a
  // previous frame when this re-measured (e.g. the image-load callback
  // firing a few frames after mount, once the pin/scale loop had already
  // started transforming cards), that transformed position got baked in
  // as the new "natural" offset — permanently wrong, and compounding on
  // every subsequent re-measure. That's what produced cards stacking on
  // top of each other with huge gaps between others. Resetting each
  // card's transform to neutral immediately before reading its position
  // (then letting the update loop that follows reapply the correct one
  // for the current scroll position) measures the true, untransformed
  // document-flow position every time.
  const measure = useCallback(() => {
    cardsRef.current.forEach((card) => {
      if (card) card.style.transform = "translateZ(0)";
    });
    cardOffsetsRef.current = cardsRef.current.map((card) => (card ? getElementOffset(card) : 0));
    const endElement = useWindowScroll
      ? document.querySelector<HTMLElement>(".scroll-stack-end")
      : scrollerRef.current?.querySelector<HTMLElement>(".scroll-stack-end");
    endOffsetRef.current = endElement ? getElementOffset(endElement) : 0;
    lastTransformsRef.current.clear();
  }, [getElementOffset, useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length) return;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx =
      typeof stackPosition === "string" && stackPosition.includes("%")
        ? (parseFloat(stackPosition) / 100) * containerHeight
        : parseFloat(String(stackPosition));
    const scaleEndPositionPx =
      typeof scaleEndPosition === "string" && scaleEndPosition.includes("%")
        ? (parseFloat(scaleEndPosition) / 100) * containerHeight
        : parseFloat(String(scaleEndPosition));

    const endElementTop = endOffsetRef.current;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardTop = cardOffsetsRef.current[i] ?? 0;

      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress =
        scrollTop < triggerStart ? 0 : scrollTop > triggerEnd ? 1 : (scrollTop - triggerStart) / (triggerEnd - triggerStart);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = cardOffsetsRef.current[j] ?? 0;
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) topCardIndex = j;
        }
        if (i < topCardIndex) blur = Math.max(0, (topCardIndex - i) * blurAmount);
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform: CardTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const last = lastTransformsRef.current.get(i);
      const changed =
        !last ||
        Math.abs(last.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(last.scale - newTransform.scale) > 0.001 ||
        Math.abs(last.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(last.blur - newTransform.blur) > 0.1;

      if (changed) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        card.style.filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : "";
        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    getScrollData,
  ]);

  const startScrollLoop = useCallback(() => {
    runningRef.current = true;
    const tick = () => {
      if (!runningRef.current) return;
      if (inViewRef.current) {
        const { scrollTop } = getScrollData();
        if (scrollTop !== lastScrollTopRef.current) {
          lastScrollTopRef.current = scrollTop;
          updateCardTransforms();
        }
      }
      animationFrameRef.current = requestAnimationFrame(tick);
    };
    animationFrameRef.current = requestAnimationFrame(tick);
  }, [getScrollData, updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll<HTMLDivElement>(".scroll-stack-card")
        : scroller.querySelectorAll<HTMLDivElement>(".scroll-stack-card")
    );
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.transform = "translateZ(0)";
      card.style.perspective = "1000px";
    });

    measure();
    updateCardTransforms();
    startScrollLoop();

    const onResize = () => {
      measure();
      updateCardTransforms();
    };
    window.addEventListener("resize", onResize);

    // Cards' images may finish loading after this first measure and shift
    // layout height — re-measure once they have.
    const images = scroller.querySelectorAll("img");
    const onImgLoad = () => {
      measure();
      updateCardTransforms();
    };
    images.forEach((img) => {
      if (img.complete) return;
      img.addEventListener("load", onImgLoad, { once: true });
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { rootMargin: "50% 0px" }
    );
    observer.observe(scroller);

    // Real bug fix: cached offsets only accounted for THIS section's own
    // resize/image-load — but on a page with many scroll-reveal sections
    // ABOVE this one (whileInView height animations, staggered reveals,
    // late-loading content), the page's total height keeps changing well
    // after mount, which silently shifts this section's true position
    // without ever triggering a re-measure. That's what let the cards
    // drift further and further below where they belonged the longer the
    // page had been scrolled. A ResizeObserver on <body> catches ANY
    // layout shift, anywhere on the page, and re-measures in response —
    // not just ones local to this component.
    let resizeRaf = 0;
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        measure();
        updateCardTransforms();
      });
    });
    resizeObserver.observe(document.body);

    return () => {
      runningRef.current = false;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", onResize);
      images.forEach((img) => img.removeEventListener("load", onImgLoad));
      observer.disconnect();
      cancelAnimationFrame(resizeRaf);
      resizeObserver.disconnect();
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      lastScrollTopRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemDistance, useWindowScroll, measure, updateCardTransforms, startScrollLoop]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
}

export default ScrollStack;
