<template>
  <div>
    <div ref="container" class="viewer-container"></div>
    <div class="controls" v-if="loaded">
      <div class="control-group">
        <label>点大小</label>
        <input
          type="range"
          min="0.5"
          max="5"
          step="0.1"
          v-model.number="pointSize"
          @input="updatePointSize"
        />
        <span>{{ pointSize.toFixed(1) }}</span>
      </div>
      <div class="control-group">
        <button @click="resetCamera">重置视角</button>
      </div>
    </div>
    <div class="loading" v-if="!loaded && !error">
      <div class="spinner"></div>
      <p>加载中...</p>
    </div>
    <div class="error" v-if="error">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { initScene, dispose } from "./ThreeUtils";
import { loadPLY } from "./PLYLoader";
import * as THREE from "three";

const props = defineProps({
  modelPath: {
    type: String,
    required: true,
  },
  backgroundColor: {
    type: String,
    default: "#f0f0f0",
  },
  autoRotate: {
    type: Boolean,
    default: false,
  },
});

const container = ref(null);
const pointSize = ref(1.0);
const loaded = ref(false);
const error = ref(null);

let scene, camera, renderer, controls, pointCloud;

const updatePointSize = () => {
  if (pointCloud && pointCloud.material) {
    pointCloud.material.size = pointSize.value;
  }
};

const resetCamera = () => {
  if (controls) {
    controls.reset();
  }
};

onMounted(async () => {
  if (!container.value) return;

  try {
    const {
      scene: newScene,
      camera: newCamera,
      renderer: newRenderer,
      controls: newControls,
    } = initScene({
      container: container.value,
      backgroundColor: props.backgroundColor,
      autoRotate: props.autoRotate,
    });

    scene = newScene;
    camera = newCamera;
    renderer = newRenderer;
    controls = newControls;

    pointCloud = await loadPLY(props.modelPath);
    scene.add(pointCloud);

    // 调整相机位置以适应模型
    const box = new THREE.Box3().setFromObject(pointCloud);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // 计算最佳相机距离
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraDistance = Math.abs(maxDim / Math.sin(fov / 2));

    // 设置相机位置在模型正前方
    const cameraDirection = new THREE.Vector3(1, 0.5, 1).normalize();
    camera.position
      .copy(center)
      .addScaledVector(cameraDirection, cameraDistance);
    camera.lookAt(center);

    // 设置控制器的目标为模型中心
    controls.target.copy(center);

    // 更新相机和控制器
    camera.near = cameraDistance * 0.001;
    camera.far = cameraDistance * 100;
    camera.updateProjectionMatrix();
    controls.update();

    loaded.value = true;
    console.log("模型加载完成");
  } catch (err) {
    error.value = `加载模型失败: ${err.message}`;
    console.error("加载模型错误:", err);
  }
});

onBeforeUnmount(() => {
  if (scene && renderer) {
    dispose(scene, renderer);
  }
});

// 监听属性变化
watch(
  () => props.modelPath,
  async (newPath, oldPath) => {
    if (newPath !== oldPath && scene) {
      // 移除旧的点云
      if (pointCloud) {
        scene.remove(pointCloud);
        if (pointCloud.geometry) pointCloud.geometry.dispose();
        if (pointCloud.material) pointCloud.material.dispose();
      }

      loaded.value = false;
      error.value = null;

      try {
        pointCloud = await loadPLY(newPath);
        scene.add(pointCloud);
        loaded.value = true;
      } catch (err) {
        error.value = `加载模型失败: ${err.message}`;
        console.error("加载模型错误:", err);
      }
    }
  }
);
</script>

<style scoped lang="scss">
.viewer-container {
  height: 500px;
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.controls {
  margin-top: 10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.control-group label {
  font-weight: bold;
  color: #00796b;
}

.control-group input[type="range"] {
  width: 100px;
}

button {
  background-color: #00796b;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #005a4f;
}

.loading,
.error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 121, 107, 0.2);
  border-top: 4px solid #00796b;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.error p {
  color: #d32f2f;
  font-weight: bold;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
