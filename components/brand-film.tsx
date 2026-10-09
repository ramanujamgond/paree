"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

export function BrandFilm({ title, src, poster, children }: { title: string; src: string | null; poster: string; children: React.ReactNode }) {
  const ref = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = ref.current ?? sectionRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const playing = inView && !reduced && !paused;

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (playing) video.play().catch(() => setPaused(true));
    else video.pause();
  }, [playing]);

  return (
    <section ref={sectionRef} className="brand-film" aria-label={title}>
      {src ? (
        <video
          ref={ref}
          className="brand-film-media"
          poster={poster}
          muted
          loop
          playsInline
          preload={inView ? "auto" : "none"}
          aria-hidden="true"
        >
          {inView && <source src={src} type="video/mp4" />}
        </video>
      ) : (
        <div
          className={`brand-film-media brand-film-still${paused ? " is-paused" : ""}`}
          style={{ backgroundImage: `url(${poster})` }}
          aria-hidden="true"
        />
      )}
      <div className="brand-film-shade" />
      <div className="container brand-film-copy">{children}</div>
      {!reduced && (
        <button className="brand-film-toggle" onClick={() => setPaused((p) => !p)} aria-label={paused ? "Play film" : "Pause film"}>
          {paused ? "Play" : "Pause"}
        </button>
      )}
    </section>
  );
}
