import { useRef, useEffect } from 'react';
import './AsciiPortrait.css';

const CHARS = ' .,;+*?#@';
const CHAR_LEN = CHARS.length;
const GRID = 6;
const COLS = 52;
const ROWS = 70;
const MOUSE_RADIUS = 90;
const DRIFT_AMP = 1.8;
const DRIFT_SPEED = 0.0014;

export default function AsciiPortrait({ reducedMotion }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({ particles: [], mouse: { x: -9999, y: -9999 }, animId: null, t: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const state = stateRef.current;

    canvas.width = COLS * GRID;
    canvas.height = ROWS * GRID;

    const img = new Image();
    img.src = '/ali-photo.jpeg';
    img.crossOrigin = 'anonymous';

    img.onload = async () => {
      try {
        await document.fonts.load(`${GRID - 1}px "JetBrains Mono"`);
      } catch (_) { /* continue with fallback font */ }

      const off = document.createElement('canvas');
      off.width = COLS;
      off.height = ROWS;
      const offCtx = off.getContext('2d');

      // Crop: skip top 12% (wooden ceiling), focus on face/head area
      const sx = img.width * 0.04;
      const sy = img.height * 0.12;
      const sw = img.width * 0.92;
      const sh = img.height * 0.72;
      offCtx.drawImage(img, sx, sy, sw, sh, 0, 0, COLS, ROWS);

      const { data } = offCtx.getImageData(0, 0, COLS, ROWS);
      const particles = [];
      const cx = COLS / 2;
      const cy = ROWS / 2;

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const i = (row * COLS + col) * 4;
          const r = data[i], g = data[i + 1], b = data[i + 2];
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          // Radial vignette: emphasize center, fade edges
          const ndx = (col - cx) / (cx * 1.1);
          const ndy = (row - cy) / (cy * 1.2);
          const d = Math.sqrt(ndx * ndx + ndy * ndy);
          const vig = Math.max(0, 1 - d * 0.85);

          const eff = lum * vig;
          if (eff < 0.04) continue;

          const ci = Math.min(CHAR_LEN - 1, Math.floor(eff * CHAR_LEN));
          const bx = col * GRID + GRID * 0.5;
          const by = row * GRID + GRID * 0.5;

          particles.push({
            bx, by,
            x: bx, y: by,
            vx: 0, vy: 0,
            brightness: eff,
            char: CHARS[ci],
            phX: Math.random() * Math.PI * 2,
            phY: Math.random() * Math.PI * 2,
            spd: 0.35 + Math.random() * 0.65,
          });
        }
      }

      state.particles = particles;

      if (reducedMotion) {
        draw(0);
      } else {
        loop();
      }
    };

    img.onerror = () => {
      ctx.font = '14px monospace';
      ctx.fillStyle = 'rgba(100,255,218,0.6)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('[  portrait  ]', canvas.width / 2, canvas.height / 2);
    };

    function draw(t) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${GRID - 1}px "JetBrains Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const { particles, mouse } = state;
      const spring = 0.12;
      const friction = 0.80;

      for (const p of particles) {
        let tx = p.bx;
        let ty = p.by;

        if (!reducedMotion) {
          tx += Math.sin(t * p.spd + p.phX) * DRIFT_AMP;
          ty += Math.cos(t * p.spd * 0.7 + p.phY) * DRIFT_AMP;
        }

        // Mouse repulsion (spring physics)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * 22;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Spring back to target
        p.vx += (tx - p.x) * spring;
        p.vy += (ty - p.y) * spring;
        p.vx *= friction;
        p.vy *= friction;
        p.x += p.vx;
        p.y += p.vy;

        const alpha = Math.min(1, 0.35 + p.brightness * 0.9);
        ctx.fillStyle = `rgba(100,255,218,${alpha.toFixed(2)})`;
        ctx.fillText(p.char, p.x, p.y);
      }
    }

    function loop() {
      state.t += DRIFT_SPEED;
      draw(state.t);
      state.animId = requestAnimationFrame(loop);
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      state.mouse.x = (e.clientX - rect.left) * (canvas.width / rect.width);
      state.mouse.y = (e.clientY - rect.top) * (canvas.height / rect.height);
    };
    const onMouseLeave = () => {
      state.mouse.x = -9999;
      state.mouse.y = -9999;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      if (state.animId) {
        cancelAnimationFrame(state.animId);
        state.animId = null;
      }
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="ascii-portrait"
      role="img"
      aria-label="ASCII art portrait of Muhammad Ali"
    />
  );
}
