<template>
  <div class="section" id="section5">
    <div class="header">
      <h1>在线三维重建</h1>
    </div>

    <div class="rebuild-container">
      <div class="step-container">
        <div
          class="step"
          :class="{ active: currentStep >= 1, completed: currentStep > 1 }"
        >
          <div class="step-number">1</div>
          <div class="step-label">上传图片</div>
        </div>
        <div class="step-connector"></div>
        <div
          class="step"
          :class="{ active: currentStep >= 2, completed: currentStep > 2 }"
        >
          <div class="step-number">2</div>
          <div class="step-label">组织图片</div>
        </div>
        <div class="step-connector"></div>
        <div
          class="step"
          :class="{ active: currentStep >= 3, completed: currentStep > 3 }"
        >
          <div class="step-number">3</div>
          <div class="step-label">处理中</div>
        </div>
        <div class="step-connector"></div>
        <div
          class="step"
          :class="{ active: currentStep >= 4, completed: currentStep > 4 }"
        >
          <div class="step-number">4</div>
          <div class="step-label">结果展示</div>
        </div>
      </div>

      <div class="upload-area" v-if="currentStep === 1">
        <input
          type="file"
          id="image-upload"
          multiple
          accept="image/*"
          @change="handleFileUpload"
          ref="fileInput"
          class="hidden-input"
        />
        <label for="image-upload" class="upload-label">
          <div class="upload-icon">+</div>
          <div class="upload-text">点击或拖拽图片到此处</div>
          <div class="upload-hint">支持多张图片上传</div>
        </label>
        <div class="selected-files" v-if="selectedFiles.length > 0">
          <div class="selected-text">
            已选择 {{ selectedFiles.length }} 张图片
          </div>
          <button class="upload-button" @click="uploadImages">开始上传</button>
        </div>
      </div>

      <div class="processing-area" v-else-if="currentStep === 2">
        <div class="status-message">图片上传成功，正在组织图片...</div>
        <div class="progress-indicator"></div>
      </div>

      <div class="processing-area" v-else-if="currentStep === 3">
        <div class="status-message">已提交任务，处理中...</div>
        <div class="progress-indicator"></div>
        <div class="task-id">任务ID: {{ taskId }}</div>
      </div>

      <div class="result-area" v-else-if="currentStep === 4">
        <div class="result-header">处理完成</div>
        <div v-if="resultData?.model_exists" class="model-viewer">
          <PointCloudViewer
            :modelPath="API_BASE_URL + '/static/' + resultData.model_path"
            :height="400"
            :backgroundColor="'#f0f0f0'"
          />
        </div>
        <div class="result-display">
          <pre>{{ JSON.stringify(resultData, null, 2) }}</pre>
        </div>
        <button class="restart-button" @click="resetProcess">重新开始</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PointCloudViewer from "@/components/pointcloud/PointCloudViewer.vue";

const API_BASE_URL = "http://117.50.81.60:8000";
const currentStep = ref(1);
const selectedFiles = ref([]);
const taskId = ref("");
const resultData = ref(null);
const pollingInterval = ref(null);
const uploadId = ref("");

const handleFileUpload = (event) => {
  selectedFiles.value = Array.from(event.target.files);
};

const uploadImages = async () => {
  if (selectedFiles.value.length === 0) return;

  try {
    const formData = new FormData();
    selectedFiles.value.forEach((file, index) => {
      formData.append(`files`, file); // 使用 'files' 作为键名
    });

    const response = await fetch(`${API_BASE_URL}/upload_images/`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("上传图片失败");

    const data = await response.json();
    uploadId.value = data.upload_id || "";

    if (!uploadId.value) throw new Error("获取上传ID失败");

    currentStep.value = 2;
    organizeImages();
  } catch (error) {
    console.error("上传图片时出错:", error);
    alert("上传图片失败，请重试");
  }
};

const organizeImages = async () => {
  try {
    const formData = new FormData();
    formData.append("upload_id", uploadId.value);

    // 可选：添加自定义文件夹名称
    // formData.append('custom_folder_name', '自定义名称');

    const response = await fetch(`${API_BASE_URL}/organize_images/`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("组织图片失败");

    const data = await response.json();
    console.log(data);
    const projpath = data.projpath || "";
    const images_path = data.images_path || "";

    if (!projpath || !images_path) throw new Error("获取路径失败");

    currentStep.value = 3;
    submitTask(projpath, images_path);
  } catch (error) {
    console.error("组织图片时出错:", error);
    alert("组织图片失败，请重试");
    currentStep.value = 1;
  }
};

const submitTask = async (projpath, images_path) => {
  try {
    const requestBody = {
      projpath,
      cameraModel: "SIMPLE_PINHOLE",
      images_path: images_path,
      single_camera: true,
      model_name: "checkpoint_1044000",
    };

    const response = await fetch(`${API_BASE_URL}/run_colmap/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) throw new Error("提交任务失败");

    const data = await response.json();
    taskId.value = data.task_id || "未知任务ID";

    // 开始轮询获取结果
    startPolling();
  } catch (error) {
    console.error("提交任务时出错:", error);
    alert("提交任务失败，请重试");
    currentStep.value = 1;
  }
};

const startPolling = () => {
  // 每3秒查询一次结果
  pollingInterval.value = setInterval(checkResult, 3000);
};

const checkResult = async () => {
  if (!taskId.value) return;

  try {
    const response = await fetch(`${API_BASE_URL}/get_colmap/${taskId.value}`);

    if (!response.ok) throw new Error("获取结果失败");

    const data = await response.json();

    // 根据API定义的状态字段检查任务状态
    if (data.status === "completed") {
      clearInterval(pollingInterval.value);
      resultData.value = data;
      currentStep.value = 4;
    } else if (data.status === "failed") {
      clearInterval(pollingInterval.value);
      console.error("任务处理失败:", data.error);
      alert(`处理失败: ${data.error || "未知错误"}`);
      currentStep.value = 1;
    }
    // "processing" 状态继续轮询
  } catch (error) {
    console.error("获取结果时出错:", error);
    // 出错时不要停止轮询，继续尝试
  }
};

const resetProcess = () => {
  currentStep.value = 1;
  selectedFiles.value = [];
  taskId.value = "";
  resultData.value = null;
  if (pollingInterval.value) {
    clearInterval(pollingInterval.value);
    pollingInterval.value = null;
  }
};
</script>

<style scoped lang="scss">
@use "sass:color";

#section5 {
  background: linear-gradient(to right, #e0f7fa, #80deea);
  flex-direction: column;
  padding: 40px 20px;

  .header h1 {
    font-size: 36px;
    color: $theme-color;
    margin-bottom: 40px;

    @include respond-to("medium") {
      font-size: 30px;
    }
  }
}

.rebuild-container {
  width: 100%;
  max-width: 800px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.step-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  @include respond-to("medium") {
    flex-direction: column;
    gap: 20px;
  }
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .step-number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #e0e0e0;
    color: #757575;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    transition: all 0.3s ease;
  }

  .step-label {
    margin-top: 8px;
    font-size: 14px;
    color: #757575;
    transition: all 0.3s ease;
  }

  &.active {
    .step-number {
      background-color: $theme-color;
      color: white;
    }

    .step-label {
      color: $theme-color;
      font-weight: bold;
    }
  }

  &.completed {
    .step-number {
      background-color: #4caf50;
      color: white;
    }
  }
}
.step-connector {
  flex: 1;
  height: 2px;
  background-color: #e0e0e0;
  margin: 0 10px;

  @include respond-to("medium") {
    width: 2px;
    height: 20px;
    margin: 0;
  }
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .hidden-input {
    display: none;
  }

  .upload-label {
    width: 100%;
    height: 200px;
    border: 2px dashed $theme-color;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(0, 121, 107, 0.05);
    }

    .upload-icon {
      font-size: 40px;
      color: $theme-color;
      margin-bottom: 10px;
    }

    .upload-text {
      font-size: 18px;
      color: $theme-color;
    }

    .upload-hint {
      font-size: 14px;
      color: #757575;
      margin-top: 5px;
    }
  }

  .selected-files {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    .upload-button {
      background-color: $theme-color;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: color.adjust($theme-color, $lightness: -10%);
      }
    }

    .selected-text {
      color: $theme-color;
    }
  }
}

.processing-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .status-message {
    font-size: 18px;
    color: $theme-color;
  }

  .progress-indicator {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 121, 107, 0.2);
    border-top: 4px solid $theme-color;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .task-id {
    font-size: 14px;
    color: #757575;
    margin-top: 10px;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.result-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .result-header {
    font-size: 20px;
    color: #4caf50;
    font-weight: bold;
  }

  .result-display {
    width: 100%;
    max-height: 300px;
    overflow-y: auto;
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 15px;

    pre {
      margin: 0;
      white-space: pre-wrap;
      font-size: 14px;
      font-family: monospace;
      color: #333;
    }
  }

  .restart-button {
    background-color: $theme-color;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: color.adjust($theme-color, $lightness: -10%);
    }
  }

  .model-viewer {
    width: 100%;
    margin: 20px 0;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
}
</style>
