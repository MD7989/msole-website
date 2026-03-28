import React from 'react';

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/";

const allTechs = [
  { name: "Python",       url: CDN + "python/python-original.svg" },
  { name: "TensorFlow",   url: CDN + "tensorflow/tensorflow-original.svg" },
  { name: "PyTorch",      url: CDN + "pytorch/pytorch-original.svg" },
  { name: "Docker",       url: CDN + "docker/docker-original.svg" },
  { name: "GitHub",       url: CDN + "github/github-original.svg" },
  { name: "Linux",        url: CDN + "linux/linux-original.svg" },
  { name: "PostgreSQL",   url: CDN + "postgresql/postgresql-original.svg" },
  { name: "MongoDB",      url: CDN + "mongodb/mongodb-original.svg" },
  { name: "Redis",        url: CDN + "redis/redis-original.svg" },
  { name: "Git",          url: CDN + "git/git-original.svg" },
  { name: "JavaScript",   url: CDN + "javascript/javascript-original.svg" },
  { name: "TypeScript",   url: CDN + "typescript/typescript-original.svg" },
  { name: "React",        url: CDN + "react/react-original.svg" },
  { name: "Node.js",      url: CDN + "nodejs/nodejs-original.svg" },
  { name: "Kubernetes",   url: CDN + "kubernetes/kubernetes-plain.svg" },
  { name: "Jupyter",      url: CDN + "jupyter/jupyter-original.svg" },
  { name: "Arduino",      url: CDN + "arduino/arduino-original.svg" },
  { name: "Raspberry Pi", url: CDN + "raspberrypi/raspberrypi-original.svg" },
  { name: "Firebase",     url: CDN + "firebase/firebase-plain.svg" },
  { name: "MySQL",        url: CDN + "mysql/mysql-original.svg" },
  { name: "Django",       url: CDN + "django/django-plain.svg" },
  { name: "FastAPI",      url: CDN + "fastapi/fastapi-original.svg" },
  { name: "VS Code",      url: CDN + "vscode/vscode-original.svg" },
  { name: "Figma",        url: CDN + "figma/figma-original.svg" },
  { name: "Grafana",      url: CDN + "grafana/grafana-original.svg" },
  { name: "Anaconda",     url: CDN + "anaconda/anaconda-original.svg" },
  { name: "Slack",        url: CDN + "slack/slack-original.svg" },
];

const items = [...allTechs, ...allTechs, ...allTechs];

export default function TechStack() {
  return (
    <section className="py-14 border-y border-border bg-card/30 relative">
      {/* Label */}
      <p className="text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground mb-8">
        Technologies &amp; Platforms We Master
      </p>

      {/*
        FIX: The wrapper must NOT use overflow:hidden on both axes simultaneously.
        overflowX:hidden clips the horizontal scroll track (needed for seamless loop).
        overflowY:visible gives cards vertical room to lift upward on hover.
        The paddingTop/paddingBottom creates the physical pixel space for translateY(-8px).
      */}
      <div
        style={{
          overflowX: 'hidden',
          overflowY: 'visible',
          paddingTop: '10px',
          paddingBottom: '10px',
          position: 'relative',
        }}
      >
        {/* Left fade edge */}
        <div
          className="absolute top-0 bottom-0 left-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--fade-bg, #0a0f1e), transparent)' }}
        />
        {/* Right fade edge */}
        <div
          className="absolute top-0 bottom-0 right-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--fade-bg, #0a0f1e), transparent)' }}
        />

        {/* Scrolling track — pause on hover */}
        <div
          className="flex w-max"
          style={{ gap: '20px', animation: 'marquee-left 60s linear infinite' }}
          onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
        >
          {items.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              title={item.name}
              className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/5 bg-gradient-to-br from-[#060e1e] to-[#080f1e] shrink-0 cursor-default relative"
              style={{
                width: '88px',
                height: '72px',
                transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                /* NO overflow:hidden here — that was clipping the box-shadow on lift */
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.45)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(201,168,76,0.18)';
                const img = e.currentTarget.querySelector('img');
                if (img) { img.style.transform = 'scale(1.15)'; img.style.opacity = '1'; }
                const glow = e.currentTarget.querySelector('.card-glow');
                if (glow) glow.style.opacity = '1';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.boxShadow = 'none';
                const img = e.currentTarget.querySelector('img');
                if (img) { img.style.transform = 'scale(1)'; img.style.opacity = '0.65'; }
                const glow = e.currentTarget.querySelector('.card-glow');
                if (glow) glow.style.opacity = '0';
              }}
            >
              {/* Hover glow — opacity toggled via JS above since no overflow:hidden for group-hover */}
              <div
                className="card-glow absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  background: 'radial-gradient(circle 55px at 50% 40%, rgba(201,168,76,0.12), transparent 80%)',
                }}
              />

              {/* Icon — original color filter from your code */}
              <img
                src={item.url}
                alt={item.name}
                loading="lazy"
                className="w-7 h-7 object-contain relative z-10"
                style={{
                  filter: 'sepia(1) saturate(2.5) hue-rotate(5deg) brightness(0.85)',
                  opacity: 0.65,
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                }}
                onError={e => { e.target.style.display = 'none'; }}
              />

              <span
                className="text-[9px] font-mono tracking-wide relative z-10 truncate max-w-[76px] text-center px-1"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}