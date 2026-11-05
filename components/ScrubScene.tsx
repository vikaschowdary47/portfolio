"use client";
import { useRef, useEffect } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";
import type { Project } from "@/lib/data";
import Reveal from "./Reveal";

/**
 * Apple-style pinned scene: the media stays put while the copy advances,
 * and the clip is scrubbed frame-by-frame from scroll position.
 * The videos are encoded all-keyframe so seeking is instant.
 */
export default function ScrubScene({ project }: { project: Project }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fillRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const canScrub = useRef(true);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"],
  });

  const want = useRef(0);
  const raf = useRef<number | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (fillRef.current) fillRef.current.style.transform = `scaleX(${p})`;
    const v = videoRef.current;
    if (!v || reduce || !canScrub.current) return;
    const d = v.duration;
    if (!d || Number.isNaN(d)) return;
    want.current = Math.min(Math.max(p, 0), 1) * d;
    if (raf.current == null) {
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        const el = videoRef.current;
        if (!el) return;
        if (Math.abs(el.currentTime - want.current) > 0.03) {
          const seek = (el as HTMLVideoElement & { fastSeek?: (t: number) => void }).fastSeek;
          if (typeof seek === "function") { try { seek.call(el, want.current); } catch { el.currentTime = want.current; } }
          else el.currentTime = want.current;
        }
      });
    }
  });

  // Reduced motion: let it simply loop instead of scrubbing.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const fine = window.matchMedia("(pointer:fine)").matches;
    canScrub.current = fine && !reduce;
    if (canScrub.current) { v.pause(); return; }
    // coarse pointer or reduced motion: plain muted loop, played only while visible
    v.loop = true; v.muted = true;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }),
      { threshold: 0.3 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  if (!project.video) return null;

  return (
    <div className="scene" ref={sceneRef}>
      <div className="sceneGrid">
        <div>
          <div className="beat">
            <span className="lbl">The problem</span>
            <Reveal className="big" text={project.problem} />
          </div>
          <div className="beat">
            <span className="lbl">What I built</span>
            <Reveal className="big" text={project.built} />
          </div>
          <div className="beat">
            <span className="lbl">Stack</span>
            <div className="kv">{project.stack.map((s) => <span key={s}>{s}</span>)}</div>
            {project.url && (
              <a className="visit" href={project.url} target="_blank" rel="noopener noreferrer">
                {project.host}
              </a>
            )}
          </div>
        </div>
        <div>
          <div className="stick">
            <div className="frame">
              <div className="vidbar">
                <span className="tl">
                  <i className="r"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2.5 2.5 7.5 7.5M7.5 2.5 2.5 7.5" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" fill="none" /></svg></i>
                  <i className="y"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2.2 5h5.6" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" fill="none" /></svg></i>
                  {project.url ? (
                    <a className="g" href={project.url} target="_blank" rel="noopener noreferrer"
                       aria-label={`Open ${project.host} in a new tab`}>
                      <svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2.1 6.1V7.9H3.9z" fill="currentColor" /><path d="M7.9 3.9V2.1H6.1z" fill="currentColor" /></svg>
                    </a>
                  ) : (
                    <i className="g"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2.1 6.1V7.9H3.9z" fill="currentColor" /><path d="M7.9 3.9V2.1H6.1z" fill="currentColor" /></svg></i>
                  )}
                </span>
                <u>{project.host}</u>
              </div>
              <div className="shot" style={{ backgroundImage: `url(${project.poster})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <video
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                width={1100}
                height={600}
                poster={project.poster}
                aria-label={`Screen recording of the ${project.name} site`}
              >
                <source src={project.video} type="video/mp4" />
              </video>
              {project.url && (
                <a className="open" href={project.url} target="_blank" rel="noopener noreferrer"
                   aria-label={`Open ${project.host} in a new tab`}>
                  <span className="openIcon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17 17 7" /><path d="M8 7h9v9" />
                    </svg>
                  </span>
                  <span className="openTip">Open {project.host}</span>
                </a>
              )}
              </div>
              <div className="scrubline"><i ref={fillRef as React.RefObject<HTMLElement>} style={{ transform: "scaleX(0)" }} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
