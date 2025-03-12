<template>
  <div class="point-cloud-container">
    <div ref="container" class="point-cloud-viewer"></div>
    <div class="controls" v-if="showControls">
      <div class="control-group">
        <label>背景颜色：</label>
        <div class="color-options">
          <button
            class="color-btn"
            :class="{ active: backgroundColor === '#000000' }"
            @click="setBackgroundColor('#000000')"
            style="background-color: #000000"
          ></button>
          <button
            class="color-btn"
            :class="{ active: backgroundColor === '#f0f0f0' }"
            @click="setBackgroundColor('#f0f0f0')"
            style="background-color: #f0f0f0"
          ></button>
          <button
            class="color-btn"
            :class="{ active: backgroundColor === '#e0f7fa' }"
            @click="setBackgroundColor('#e0f7fa')"
            style="background-color: #e0f7fa"
          ></button>
        </div>
      </div>
      <div class="control-group">
        <label>点大小：</label>
        <input
          type="range"
          min="0.005"
          max="0.05"
          step="0.005"
          v-model="pointSize"
          @input="updatePointSize"
        />
      </div>
      <div class="control-group">
        <label>模型缩放：</label>
        <input
          type="range"
          min="10"
          max="200"
          step="1"
          v-model="modelScaleValue"
          @input="updateModelScale"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const props = defineProps({
  modelPath: {
    type: String,
    required: true,
  },
  height: {
    type: [Number, String],
    default: 400,
  },
  width: {
    type: [Number, String],
    default: "100%",
  },
  backgroundColor: {
    type: String,
    default: "#f0f0f0",
  },
  showControls: {
    type: Boolean,
    default: true,
  },
  initialPointSize: {
    type: Number,
    default: 0.01,
  },
  initialModelScale: {
    type: Number,
    default: 50,
  },
});

// 响应式状态
const container = ref(null);
const backgroundColor = ref(props.backgroundColor);
const pointSize = ref(props.initialPointSize);
const modelScaleValue = ref(props.initialModelScale);

// Three.js 变量
let scene, camera, renderer, controls, pointcloud;
let animationFrameId = null;
let isInitialized = false;

// 初始化Three.js场景
const initThree = () => {
  // 创建场景
  scene = new THREE.Scene();
  scene.background = new THREE.Color(backgroundColor.value);

  // 创建相机
  const aspect = container.value.clientWidth / container.value.clientHeight;
  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
  camera.position.z = 5;

  // 创建渲染器时使用正确的尺寸
  renderer = new THREE.WebGLRenderer({ antialias: true });
  const width = container.value.clientWidth;
  const height = container.value.clientHeight;
  renderer.setSize(width, height, true);
  container.value.appendChild(renderer.domElement);

  // 添加轨道控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = true;

  // 添加环境光照
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // 添加平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 1, 1);
  scene.add(directionalLight);

  // 加载PLY模型
  loadPLYModel(props.modelPath);

  // 添加窗口大小变化监听
  window.addEventListener("resize", onWindowResize);

  // 开始动画循环
  animate();

  isInitialized = true;
};

// 加载PLY模型
const loadPLYModel = (modelPath) => {
  // 如果已经有点云，先移除
  if (pointcloud) {
    scene.remove(pointcloud);
  }

  const loader = new PLYLoader();

  loader.load(
    modelPath,
    (geometry) => {
      const material = new THREE.PointsMaterial({
        size: pointSize.value,
        vertexColors: true,
        sizeAttenuation: true,
      });

      pointcloud = new THREE.Points(geometry, material);
      scene.add(pointcloud);

      // 使用相同的缩放逻辑
      pointcloud.scale.set(1, 1, 1);
      pointcloud.position.set(0, 0, 0);

      const box = new THREE.Box3().setFromObject(pointcloud);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = modelScaleValue.value / maxDim;

      pointcloud.position.sub(center);
      pointcloud.scale.set(scale, scale, scale);

      // 调整相机位置
      camera.position.set(0, 0, 4);
      controls.update();
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.error("An error happened while loading the PLY model", error);
    }
  );
};

// 动画循环
const animate = () => {
  animationFrameId = requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
};

// 更新窗口大小
const onWindowResize = () => {
  if (!container.value || !renderer || !camera) return;

  const width = container.value.clientWidth;
  const height = container.value.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, true); // 添加第三个参数 true 以保持像素比
};

// 更新背景颜色
const setBackgroundColor = (color) => {
  backgroundColor.value = color;
  if (scene) {
    scene.background = new THREE.Color(color);
  }
};

// 更新点大小
const updatePointSize = () => {
  if (pointcloud && pointcloud.material) {
    pointcloud.material.size = pointSize.value;
  }
};

// 更新模型缩放
const updateModelScale = () => {
  if (pointcloud) {
    // 首先重置模型的缩放和位置
    pointcloud.scale.set(1, 1, 1);
    pointcloud.position.set(0, 0, 0);

    // 计算原始模型的边界框
    const box = new THREE.Box3().setFromObject(pointcloud);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    // 计算新的缩放值
    const scale = modelScaleValue.value / maxDim;

    // 先将模型移动到中心
    pointcloud.position.sub(center);

    // 然后应用缩放
    pointcloud.scale.set(scale, scale, scale);
  }
};

// 监听模型路径变化
watch(
  () => props.modelPath,
  (newPath) => {
    if (isInitialized && newPath) {
      loadPLYModel(newPath);
    }
  }
);

// 监听背景颜色变化
watch(
  () => props.backgroundColor,
  (newColor) => {
    backgroundColor.value = newColor;
    setBackgroundColor(newColor);
  }
);

// 监听初始模型缩放变化
watch(
  () => props.initialModelScale,
  (newScale) => {
    modelScaleValue.value = newScale;
    if (isInitialized && pointcloud) {
      updateModelScale();
    }
  }
);

// 监听尺寸变化
watch([() => props.width, () => props.height], () => {
  if (isInitialized) {
    // 使用 nextTick 确保 DOM 更新后再调整大小
    nextTick(() => {
      onWindowResize();
    });
  }
});

// 组件挂载时初始化
onMounted(() => {
  initThree();
});

// 组件卸载前清理
onBeforeUnmount(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }

  if (controls) {
    controls.dispose();
  }

  if (renderer) {
    renderer.dispose();
  }

  window.removeEventListener("resize", onWindowResize);

  if (container.value && renderer) {
    container.value.removeChild(renderer.domElement);
  }
});
</script>

<style scoped lang="scss">
.point-cloud-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: v-bind(
    'typeof props.width === "number" ? props.width + "px" : props.width'
  );
  height: v-bind(
    'typeof props.height === "number" ? props.height + "px" : props.height'
  );
}

.point-cloud-viewer {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.controls {
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 12px;
  border-radius: 8px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 10px;

  label {
    font-weight: 600;
    color: var(--theme-color, #00796b);
    white-space: nowrap;
  }
}

.color-options {
  display: flex;
  gap: 8px;
}

.color-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #ddd;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  &.active {
    border-color: var(--theme-color, #00796b);
    border-width: 3px;
  }
}

input[type="range"] {
  width: 100px;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
}
</style>
