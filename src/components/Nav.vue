<template>
  <div class="nav">
    <div
      class="nav-button"
      v-for="(section, index) in sections"
      :key="index"
      :class="{ active: currentSection === index }"
      @click="handleClick(index)"
    ></div>
  </div>
</template>

<script setup>
// 定义props
const props = defineProps({
  sections: {
    type: Array,
    required: true,
  },
  currentSection: {
    type: Number,
    default: 0,
  },
});

// 定义emit
const emit = defineEmits(["navigate"]);

// 点击导航按钮时触发事件
const handleClick = (index) => {
  emit("navigate", index);
};
</script>

<style scoped lang="scss">
/* 侧边导航栏 */
.nav {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  z-index: 100; // 确保导航栏在最上层

  @include respond-to("small") {
    right: 10px;
    gap: 15px;
  }

  .nav-button {
    @include respond-to("small") {
      width: 8px;
      height: 8px;

      &.active {
        width: 12px;
        height: 12px;
      }
    }
  }
}

.nav-button {
  width: 10px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.nav-button.active {
  width: 15px;
  height: 15px;
  background-color: white;
}

.nav-button:hover {
  background-color: white;
}
</style>
