<template>
  <nav class="smart-toc">
    <div class="toc-header">
      <div class="system-bracket">[</div>
      <span class="toc-title">目录</span>
      <div class="system-bracket">]</div>
    </div>

    <ul class="toc-list" v-if="headings.length > 0">
      <li v-for="(heading, index) in headings" :key="index"
        :class="['toc-item', `level-${heading.level}`, { active: activeId === heading.id }]"
        @click="scrollTo(heading.id)">
        <div class="indicator"></div>
        <span class="text">{{ heading.text }}</span>
      </li>
    </ul>
    <div v-else class="no-data">NO_DATA_FOUND...</div>

    <div class="scan-line-container">
      <div class="moving-dot"></div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';
import type { HeadingItem } from '@/utils/markdown';

const props = defineProps<{
  headings: HeadingItem[]; // 接收标题数组
}>();

const activeId = ref<string>('');

// 滚动处理
const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    window.scrollTo({
      top: el.offsetTop - 80,
      behavior: 'smooth'
    });
  }
};

// 监听滚动高亮当前标题
const observer = ref<IntersectionObserver | null>(null);

const initObserver = () => {
  // 清理旧的观察器
  observer.value?.disconnect();
  observer.value = null;

  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeId.value = entry.target.id;
      }
    });
  }, { rootMargin: '0px 0px -80% 0px' });

  props.headings.forEach((h) => {
    const el = document.getElementById(h.id);
    if (el) observer.value?.observe(el);
  });
};

// 当标题列表改变时，重新初始化观察器
watch(() => props.headings, () => {
  if (props.headings.length > 0) {
    initObserver();
  }
}, { immediate: true });

onUnmounted(() => {
  observer.value?.disconnect();
});
</script>

<style scoped>
.smart-toc {
  /* position: sticky; */
  /* top: 56px; */
  width: 260px;
  /* background: rgba(10, 25, 47, 0.7); */
  /* backdrop-filter: blur(10px); */
  /* border: 1px solid rgba(0, 242, 255, 0.06); */
  padding: 18px;
  font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  color: rgba(219, 234, 254, 0.85);
  /* border-radius: 10px; */
  
}

.toc-header {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 18px;
  font-size: 13px;
  color: rgba(219, 234, 254, 0.85);
  align-items: center;
}

.system-bracket {
  color: rgba(124, 143, 166, 0.5);
  font-weight: 600;
}

.toc-title {
  font-weight: 700;
  color: #dbeafe;
  letter-spacing: 0.6px;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 70vh;
  overflow-y: auto;
}

/* 自定义滚动条 */
.toc-list::-webkit-scrollbar {
  width: 8px;
}

.toc-list::-webkit-scrollbar-track {
  background: transparent;
}

.toc-list::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.12);
  border-radius: 6px;
}

.toc-item {
  position: relative;
  padding: 8px 0;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  transition: all 0.18s ease;
  font-size: 14px;
  color: rgba(168, 212, 255, 0.9);
}

.level-1 {
  padding-left: 0;
  font-weight: 700;
}

.level-2 {
  padding-left: 12px;
}

.level-3 {
  padding-left: 26px;
  font-size: 13px;
}

.level-4 {
  padding-left: 40px;
  font-size: 12px;
}

.indicator {
  width: 6px;
  height: 6px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  margin-right: 12px;
  margin-top: 7px;
  flex-shrink: 0;
  border-radius: 2px;
  box-shadow: 0 0 6px rgba(102, 126, 234, 0.18);
}

.toc-item:hover {
  color: #ffffff;
}

.toc-item.active {
  color: #ffffff;
}

.toc-item.active .indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 0 14px rgba(59, 130, 246, 0.25);
}

.text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.no-data {
  font-size: 12px;
  text-align: center;
  color: rgba(124, 143, 166, 0.7);
}

/* 底部扫描线与小球动画，配合页面主题 */
.scan-line-container {
  margin-top: 18px;
  height: 2px;
  background: rgba(102, 126, 234, 0.07);
  position: relative;
  border-radius: 2px;
}

.moving-dot {
  position: absolute;
  top: -4px;
  width: 8px;
  height: 8px;
  background: linear-gradient(90deg, #34d399 0%, #06b6d4 100%);
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.18);
  border-radius: 50%;
  animation: move 4s infinite linear;
}

@keyframes move {
  0% {
    left: 0;
    opacity: 0.6;
    width: 0;
    height: 0;
  }

  5% {
    width: 8px;
    height: 8px;
  }

  50% {
    opacity: 1;
  }

  95% {
    width: 8px;
    height: 8px;
  }

  100% {
    left: calc(100% - 8px);
    opacity: 0.6;
    width: 0;
    height: 0;
  }
}

@media (max-width: 1024px) {
  .smart-toc {
    width: 220px;
  }
}

@media (max-width: 768px) {
  .smart-toc {
    display: none;
  }
}
</style>