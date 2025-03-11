<template>
  <div class="section" id="section6">
    <div class="header">
      <h1>3D点云查看器</h1>
    </div>
    <div class="viewer-container">
      <p class="description">
        通过我们的三维重建技术，生成的精确点云模型可以实现在线预览和交互
      </p>
      <PointCloudViewer
        :model-path="modelPath"
        :auto-rotate="autoRotate"
        :background-color="backgroundColor"
      />
      <div class="controls">
        <div class="control-group">
          <label>背景颜色：</label>
          <div class="color-options">
            <button
              class="color-btn"
              :class="{ active: backgroundColor === '#f0f0f0' }"
              @click="backgroundColor = '#f0f0f0'"
              style="background-color: #f0f0f0"
            ></button>
            <button
              class="color-btn"
              :class="{ active: backgroundColor === '#000000' }"
              @click="backgroundColor = '#000000'"
              style="background-color: #000000"
            ></button>
            <button
              class="color-btn"
              :class="{ active: backgroundColor === '#e0f7fa' }"
              @click="backgroundColor = '#e0f7fa'"
              style="background-color: #e0f7fa"
            ></button>
          </div>
        </div>
        <div class="control-group">
          <label>自动旋转：</label>
          <label class="switch">
            <input type="checkbox" v-model="autoRotate" />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PointCloudViewer from "@/components/ply/PointCloudViewer.vue";
import { ref } from "vue";

const modelPath = ref("model.ply");
const autoRotate = ref(true);
const backgroundColor = ref("#f0f0f0");
</script>

<style scoped lang="scss">
#section6 {
  background: linear-gradient(to right, #e0f7fa, #80deea);
  flex-direction: column;
  padding: 40px 20px;

  .header h1 {
    font-size: 36px;
    color: $theme-color;
    margin-bottom: 20px;

    @include respond-to("medium") {
      font-size: 30px;
    }
  }

  .viewer-container {
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .description {
    font-size: 18px;
    text-align: center;
    margin-bottom: 25px;

    @include respond-to("medium") {
      font-size: 16px;
      padding: 0 20px;
    }
  }

  .controls {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    justify-content: center;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.6);
    padding: 15px;
    border-radius: 8px;

    @include respond-to("small") {
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }
  }

  .control-group {
    display: flex;
    align-items: center;
    gap: 12px;

    label {
      font-weight: 600;
      color: $theme-color;
    }
  }

  .color-options {
    display: flex;
    gap: 8px;
  }

  .color-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid #ddd;
    cursor: pointer;
    transition: transform 0.2s ease, border-color 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }

    &.active {
      border-color: $theme-color;
      border-width: 3px;
    }
  }

  /* 开关样式 */
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: $theme-color;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px $theme-color;
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }

  .slider.round {
    border-radius: 24px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
}
</style>
