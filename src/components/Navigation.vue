<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const navLinks = [
  { name: '文档', path: '/' },
  { name: '关于', path: '/about' },
]

const isActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Logo -->
      <RouterLink to="/" class="logo">
        <span class="logo-text">LWeb</span>
      </RouterLink>

      <!-- Desktop Navigation -->
      <ul class="nav-menu">
        <li v-for="link in navLinks" :key="link.path" class="nav-item">
          <RouterLink
            :to="link.path"
            class="nav-link"
            :class="{ active: isActive(link.path) }"
            @click="closeMenu"
          >
            {{ link.name }}
          </RouterLink>
        </li>
      </ul>

      <!-- Mobile Menu Button -->
      <button class="hamburger" :class="{ active: isMenuOpen }" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Mobile Navigation -->
      <ul v-show="isMenuOpen" class="nav-menu-mobile">
        <li v-for="link in navLinks" :key="link.path" class="nav-item-mobile">
          <RouterLink
            :to="link.path"
            class="nav-link-mobile"
            :class="{ active: isActive(link.path) }"
            @click="closeMenu"
          >
            {{ link.name }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: rgba(10, 25, 47, 0.7);
  border: 1px solid rgba(0, 242, 255, 0.2);
  /* backdrop-filter: blur(10px); */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0.75rem 0;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  align-items: center;
}

.nav-item {
  position: relative;
}

.nav-link {
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
  padding-bottom: 0.25rem;
}

.nav-link:hover,
.nav-link.active {
  color: #3b82f6;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -0.75rem;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* Mobile Menu Button */
.hamburger {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  gap: 0.4rem;
  padding: 0.5rem;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background: #dbeafe;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(8px, 8px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(8px, -8px);
}

/* Mobile Navigation */
.nav-menu-mobile {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(10, 25, 47, 0.95);
  border-top: 1px solid rgba(99, 102, 241, 0.3);
  list-style: none;
  flex-direction: column;
  padding: 0.5rem 0;
  gap: 0;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.nav-item-mobile {
  border-bottom: 1px solid rgba(99, 102, 241, 0.2);
}

.nav-link-mobile {
  display: block;
  color: #dbeafe;
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s ease;
}

.nav-link-mobile:hover,
.nav-link-mobile.active {
  background: rgba(99, 102, 241, 0.15);
  color: #fff;
  padding-left: 2rem;
  border-left: 3px solid rgba(99, 102, 241, 0.9);
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }

  .nav-menu {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .nav-menu-mobile {
    display: flex;
  }

  .logo-text {
    font-size: 1.25rem;
  }
  
  .logo {
    margin-left: 3rem;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 0.75rem;
  }

  .logo-text {
    font-size: 1.1rem;
  }

  .nav-link-mobile {
    padding: 0.75rem 1.5rem;
  }
}
</style>