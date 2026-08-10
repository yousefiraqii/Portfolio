"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform float uAspect;   // image w / h
uniform vec2  uMouse;    // 0..1 screen space
uniform float uTime;
uniform float uCols;
uniform float uHasMouse;

vec2 coverUV(vec2 uv) {
  float rA = uRes.x / uRes.y;
  float rI = uAspect;
  vec2 s = (rA > rI) ? vec2(1.0, rI / rA) : vec2(rA / rI, 1.0);
  return (uv - 0.5) / s + 0.5;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vUv;

  // square tiles
  float rows = uCols * (uRes.y / uRes.x);
  vec2 grid = vec2(uCols, rows);
  vec2 cell = floor(uv * grid);
  vec2 cellCenter = (cell + 0.5) / grid;

  float d = distance(cellCenter, uMouse);

  // shimmering 3D wave radiating from cursor
  float pulse = smoothstep(0.55, 0.0, d);
  float wave  = sin(d * 34.0 - uTime * 3.2);
  float lift  = wave * pulse;

  // fake 3D tilt: each tile samples a shifted slice of the image
  vec2 tilt = vec2(
    sin(cellCenter.x * 6.2831 + uTime * 1.3),
    cos(cellCenter.y * 6.2831 + uTime * 1.1)
  );
  vec2 disp = tilt * lift * 0.018;

  // occasional per-tile glitch flicker
  float t = floor(uTime * 9.0);
  float flick = step(0.94, hash(cell + t));
  float amt  = clamp(pulse * 0.6 + flick * 0.4, 0.0, 1.0);

  // RGB channel split (chromatic aberration) per tile
  vec2 off = vec2(amt * 0.022, 0.0);
  vec2 base = coverUV(uv + disp);

  float r = texture2D(uTex, base + off).r;
  float g = texture2D(uTex, base - off).g;
  float b = texture2D(uTex, base).b;
  vec3 col = vec3(r, g, b);

  // 3D pop: brighten the crest, darken the trough
  col += lift * 0.18;

  // tile grout lines to read the grid
  vec2 f = fract(uv * grid);
  vec2 edge = smoothstep(vec2(0.0), vec2(0.05), f) *
              smoothstep(vec2(0.0), vec2(0.05), 1.0 - f);
  col *= mix(0.82, 1.0, edge.x * edge.y);

  // faint scanline
  col *= 0.96 + 0.04 * sin(uv.y * uRes.y * 1.2);

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function GlitchGrid({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const prog = gl.createProgram()!;
    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTex = gl.getUniformLocation(prog, "uTex");
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uAspect = gl.getUniformLocation(prog, "uAspect");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uCols = gl.getUniformLocation(prog, "uCols");
    const uHasMouse = gl.getUniformLocation(prog, "uHasMouse");

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([20, 20, 24, 255])
    );

    const img = new Image();
    img.crossOrigin = "anonymous";
    let aspect = 1;
    img.onload = () => {
      aspect = img.naturalWidth / img.naturalHeight;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    };
    img.src = src;

    const mouse = { x: 0.5, y: 0.5 };
    const smooth = { x: 0.5, y: 0.5 };
    let hasMouse = 0;

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = 1 - (e.clientY - r.top) / r.height;
      hasMouse = 1;
    };
    const onLeave = () => {
      hasMouse = 0;
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const start = performance.now();
    const loop = () => {
      const t = (performance.now() - start) / 1000;
      // spring the cursor for a fluid feel
      smooth.x += (mouse.x - smooth.x) * 0.08;
      smooth.y += (mouse.y - smooth.y) * 0.08;

      gl.uniform1i(uTex, 0);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uAspect, aspect);
      gl.uniform2f(uMouse, smooth.x, smooth.y);
      gl.uniform1f(uTime, t);
      gl.uniform1f(uHasMouse, hasMouse);
      const cols = Math.max(18, Math.round(canvas.width / 26));
      gl.uniform1f(uCols, cols);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
      gl.deleteTexture(tex);
    };
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
