<script setup lang="ts">
</script>

<template>
  <div class="about-container">
    <header class="about-header">
      <h1>关于</h1>
      <p class="tagline">关于本文档站的说明与作者信息</p>
    </header>

    <section class="about-content">
      <h2>项目目标</h2>
      <p>这是一个轻量的文档/知识库示例，基于 Vue + Vite 开发。旨在提供简单的文档浏览、目录与文章展示体验。</p>

      <h2>作者</h2>
      <p>作者: Admin</p>

      <h2>联系方式</h2>
      <p>如需交流，请在项目中添加联系方式或使用仓库 Issues。</p>
    </section>
  </div>
</template>

<style scoped>
.about-container {
  padding: 28px;
}

.about-header h1 {
  font-size: 36px;
  margin: 0 0 8px;
  color: #dbeafe;
}

.tagline {
  margin: 0 0 20px;
  color: rgba(219,234,254,0.8);
}

.about-content h2 {
  margin-top: 18px;
  color: #a8d4ff;
}

.about-content p {
  color: rgba(219,234,254,0.85);
  line-height: 1.7;
}
</style>
