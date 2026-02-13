<template>
  <div class="tech-bg-container">
    <canvas ref="canvasRef" class="bg-canvas"></canvas>
    <div class="content-slot">
      <!--<slot>
        <h1>SYSTEM ACTIVE</h1>
        <p>Neural Link Established</p>
      </slot>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 定义粒子类型
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

// 定义鼠标状态类型
interface MouseState {
  x: number | null;
  y: number | null;
  maxDist: number;
}

const canvasRef = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
const particleCount = 120;
const connectionDist = 120;
let animationFrame: number;

const mouse: MouseState = {
  x: null,
  y: null,
  maxDist: 150 // 鼠标感应范围
};

// 初始化粒子
const initParticles = (width: number, height: number) => {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2 + 1,
    });
  }
};

const draw = () => {
  if (!ctx || !canvasRef.value) return;
  const { width, height } = canvasRef.value;

  ctx.clearRect(0, 0, width, height);
  
  // 粒子运动与绘制
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;

    // 边界反弹
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    ctx!.fillStyle = 'rgba(0, 212, 255, 0.8)';
    ctx!.beginPath();
    ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx!.fill();

    // 连线逻辑 (粒子间 + 粒子与鼠标)
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j] as Particle;
      const dx = p.x - p2.x;
      const dy = p.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < connectionDist) {
        ctx!.strokeStyle = `rgba(0, 212, 255, ${1 - dist / connectionDist})`;
        ctx!.lineWidth = 0.5;
        ctx!.beginPath();
        ctx!.moveTo(p.x, p.y);
        ctx!.lineTo(p2.x, p2.y);
        ctx!.stroke();
      }
    }

    // 鼠标连线
    if (mouse.x !== null && mouse.y !== null) {
      const mdx = p.x - mouse.x;
      const mdy = p.y - mouse.y;
      const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mDist < mouse.maxDist) {
        ctx!.strokeStyle = `rgba(0, 212, 255, ${1 - mDist / mouse.maxDist})`;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(p.x, p.y);
        ctx!.lineTo(mouse.x, mouse.y);
        ctx!.stroke();
      }
    }
  });

  animationFrame = requestAnimationFrame(draw);
};

const handleResize = () => {
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth;
    canvasRef.value.height = window.innerHeight;
    initParticles(canvasRef.value.width, canvasRef.value.height);
  }
};

const handleMouseMove = (e: MouseEvent) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};

const handleMouseLeave = () => {
  mouse.x = null;
  mouse.y = null;
};

onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d');
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    draw();
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mouseleave', handleMouseLeave);
  cancelAnimationFrame(animationFrame);
});
</script>

<style scoped>
.tech-bg-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #02060a;
  overflow: hidden;
  z-index: -1;
}

.bg-canvas {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
}

.content-slot {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #00d4ff;
  font-family: 'Courier New', Courier, monospace;
  pointer-events: none; /* 防止文字阻挡鼠标对粒子的吸引 */
}

h1 {
  font-size: 3rem;
  letter-spacing: 10px;
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.6);
}
</style>