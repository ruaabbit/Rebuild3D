<template>
  <div class="container">
    <ContactUs />
    <Section1 />
    <Section2 />
    <Section3 />
    <Section4 />
    <Section5 />
    <Section6 />
  </div>
  <Nav
    :sections="sections"
    :currentSection="currentSection"
    @navigate="scrollToSection"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import ContactUs from "@/components/ContactUs.vue";
import Section1 from "@/components/sections/Section1.vue";
import Section2 from "@/components/sections/Section2.vue";
import Section3 from "@/components/sections/Section3.vue";
import Section4 from "@/components/sections/Section4.vue";
import Section5 from "@/components/sections/Section5.vue";
import Section6 from "@/components/sections/Section6.vue";
import Nav from "@/components/Nav.vue";

const currentSection = ref(0);
const sections = ref([
  { title: "第一页" },
  { title: "第二页" },
  { title: "第三页" },
  { title: "第四页" },
  { title: "第五页" },
  { title: "第六页" },
]);

// 添加一个标志位表示是否正在滚动动画中
const isScrolling = ref(false);

// 修改后的节流函数，增加对正在滚动状态的判断
const throttle = (func, wait) => {
  let timeout = null;
  return (...args) => {
    // 如果正在滚动或已有定时器，则不触发
    if (!timeout && !isScrolling.value) {
      func.apply(this, args);
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
    }
  };
};

// 修改滚动处理函数，添加滚动量阈值
const handleScroll = (event) => {
  // 增加滚动阈值，忽略轻微滚动
  const scrollThreshold = 20;
  if (Math.abs(event.deltaY) < scrollThreshold) return;

  if (event.deltaY > 0) {
    // 向下滚动
    if (currentSection.value < sections.value.length - 1) {
      currentSection.value++;
      scrollToSection(currentSection.value);
    }
  } else {
    // 向上滚动
    if (currentSection.value > 0) {
      currentSection.value--;
      scrollToSection(currentSection.value);
    }
  }
};

// 修改滚动到指定页面的函数
const scrollToSection = (index) => {
  isScrolling.value = true; // 设置正在滚动标志
  currentSection.value = index;
  const sectionId = `section${index + 1}`;
  document
    .getElementById(`section${index + 1}`)
    .scrollIntoView({ behavior: "smooth" });

  // 更新地址栏的锚点
  history.replaceState(null, "", `#${sectionId}`);

  // 等待滚动动画完成后重置标志
  setTimeout(() => {
    isScrolling.value = false;
  }, 500); // 动画时间略长于节流时间
};

// 使用修改后的节流函数
const throttledScroll = throttle(handleScroll, 300);

const handleTouchStart = (event) => {
  touchStartY.value = event.touches[0].clientY;
};

const handleTouchEnd = (event) => {
  const touchEndY = event.changedTouches[0].clientY;
  const diff = touchStartY.value - touchEndY;

  if (Math.abs(diff) < 50) return; // 忽略小的滑动

  if (diff > 0) {
    // 向上滑动，前往下一页
    if (currentSection.value < sections.value.length - 1) {
      currentSection.value++;
      scrollToSection(currentSection.value);
    }
  } else {
    // 向下滑动，前往上一页
    if (currentSection.value > 0) {
      currentSection.value--;
      scrollToSection(currentSection.value);
    }
  }
};

const touchStartY = ref(0);

onMounted(() => {
  // 初始化时检查地址栏的锚点
  const hash = window.location.hash;
  if (hash) {
    const sectionId = hash.substring(1);
    // 修复: 直接比较 sectionId 和 'sectionX'
    const index = parseInt(sectionId.replace("section", "")) - 1;
    if (index >= 0 && index < sections.value.length) {
      currentSection.value = index;
      scrollToSection(index);
    }
  }

  // 监听 hashchange 事件
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.substring(1);
      // 修复: 直接比较 sectionId 和 'sectionX'
      const index = parseInt(sectionId.replace("section", "")) - 1;
      if (index >= 0 && index < sections.value.length) {
        currentSection.value = index;
        scrollToSection(index);
      }
    }
  });

  // 为滚轮事件使用 passive 选项提高性能
  window.addEventListener("wheel", throttledScroll, { passive: true });
  // 添加触摸事件支持
  window.addEventListener("touchstart", handleTouchStart);
  window.addEventListener("touchend", handleTouchEnd);

  // 设置初始viewport宽度
  const setViewportMeta = () => {
    const vpMeta = document.querySelector('meta[name="viewport"]');
    if (vpMeta) {
      vpMeta.content =
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    }
  };
  setViewportMeta();
});
</script>

<style scoped lang="scss">
@use "sass:color";

:global(html),
:global(body) {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
}

.container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.section {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  color: white;
  transition: background-color 0.5s ease;
  overflow: hidden; // 防止任何方向的滚动条
  padding: 20px;
  box-sizing: border-box;
  position: relative;

  @include respond-to("medium") {
    font-size: 1.5em;
    height: 100vh; // 始终保持全屏高度，移除auto和min-height设置
  }
}
</style>
