<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <span>© {{ year }} LWeb。保留所有权利。</span>
      <span class="sep">·</span>
      <a href="/about">关于</a>
      <span class="sep">·</span>
      <a href="#" target="_blank" rel="noopener">隐私政策</a>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 14px 12px;
  text-align: center;
  color: rgba(219,234,254,0.85);
  /* background: transparent; */
  background: rgba(10, 25, 47, 0.7);
  font-size: 13px;
  /* border-top: 1px solid rgba(255,255,255,0.03); */
  border-top: 1px solid rgba(0, 242, 255, 0.2);
}
.footer-inner a {
  color: #9fbff6;
  text-decoration: none;
  margin: 0 6px;
}
.sep {
  margin: 0 8px;
  color: rgba(219,234,254,0.5);
}
@media (max-width: 600px) {
  .site-footer { font-size: 12px; }
}
</style>
