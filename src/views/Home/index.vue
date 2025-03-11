<template>
  <div class="container">
    <div class="contactUs">
      <span>联系我们</span>
      <a href=""><img src="@/assets/icons/github.svg" alt="" /></a>
      <a href=""><img src="@/assets/icons/email.svg" alt="" /></a>
    </div>
    <div class="section" id="section1">
      <h1>一站式解决水下三维重建领域计算需求的开源平台</h1>
      <a href="#" class="button" @click="scrollToSection(1)">了解更多</a>
      <div class="images">
        <img class="image" src="@/assets/imgs/img1.png" alt="Image 1" />
        <div class="arrow-container">
          <img class="arrow" src="@/assets/icons/arrow.svg" alt="" />
        </div>
        <img class="image" src="@/assets/imgs/img2.png" alt="Image 2" />
      </div>
    </div>
    <div class="section" id="section2">
      <div class="header">
        <h1>核心优势</h1>
      </div>
      <div class="advantages">
        <div class="advantage">
          <h2>底层统一</h2>
          <p>基于统一的数据结构，同时支持C++和Python调用</p>
        </div>
        <div class="advantage">
          <h2>全面算法覆盖</h2>
          <p>包含4大工具，图像匹配、SfM、点线联合稀疏重建、栅密三维重建</p>
        </div>
        <div class="advantage">
          <h2>模块化设计</h2>
          <p>易于单独使用和联合使用， 可实现网页版和桌面版的三维重建</p>
        </div>
      </div>
      <div class="image">
        <img src="@/assets/imgs/img3.png" alt="Product Image" />
      </div>
    </div>
    <div class="section" id="section3">
      <div class="header">
        <h1>平台架构</h1>
      </div>
      <div class="triangle-layout">
        <!-- 顶部结构 -->
        <div class="structure top">
          <div class="box">
            <img src="@/assets/imgs/img4.png" alt="图片4" />
            <p>空间三维计算平台</p>
          </div>
        </div>

        <!-- 左侧结构 -->
        <div class="structure left">
          <div class="box">
            <img src="@/assets/imgs/img5.png" alt="图片5" />
            <p>硬件设备平台</p>
          </div>
        </div>

        <!-- 右侧结构 -->
        <div class="structure right">
          <div class="box">
            <img src="@/assets/imgs/img6.png" alt="图片6" />
            <p>稠密重建平台</p>
          </div>
        </div>

        <!-- 底部结构 -->
        <div class="structure bottom">
          <div class="box">
            <p>基础平台（统一接口、高效衔接、便于部署的工具链）</p>
          </div>
        </div>
      </div>
    </div>
    <div class="section" id="section4">
      <div class="header">
        <h1>相关论文</h1>
      </div>
      <div class="scrollable-container">
        <div class="paper-container">
          <!-- 第一篇论文 -->
          <div class="paper-item">
            <div class="paper-title">
              <p>
                1. Geometry-enhanced attentive multi-view stereo for challenging
                matching scenarios, TCSVT, Y Liu, Q Cai, C Wang, J Yang, H Fan,
                J Dong
              </p>
              <a href="https://github.com/yimei910110/GA-MVS" target="_blank"
                ><img class="icon" src="@/assets/icons/github.svg" alt="github"
              /></a>
            </div>
            <div class="paper-image">
              <img src="@/assets/imgs/paper1.png" alt="论文1截图" />
            </div>
          </div>

          <!-- 第二篇论文 -->
          <div class="paper-item">
            <div class="paper-title">
              <p>
                2. Deep color compensation for generalized underwater image
                enhancement, TCSVT, Y Rao, W Liu, K Li, H Fan, S Wang, J Dong
              </p>
              <a href="https://github.com/Ray2OUC/P2CNet" target="_blank"
                ><img class="icon" src="@/assets/icons/github.svg" alt="github"
              /></a>
            </div>
            <div class="paper-image">
              <img src="@/assets/imgs/paper2.png" alt="论文2截图" />
            </div>
          </div>

          <!-- 第三篇论文 -->
          <div class="paper-item">
            <div class="paper-title">
              <p>
                3. Learning general descriptors for image matching with
                regression feedback, TCSVT, Y Rao, Y Ju, C Li, E Rigall, J Yang,
                H Fan, J Dong
              </p>
              <a href="https://github.com/Ray2OUC/AANet" target="_blank"
                ><img class="icon" src="@/assets/icons/github.svg" alt="github"
              /></a>
            </div>
            <div class="paper-image">
              <img src="@/assets/imgs/paper3.png" alt="论文3截图" />
            </div>
          </div>

          <!-- 第四篇论文 -->
          <div class="paper-item">
            <div class="paper-title">
              <p>
                4. LaFea: Learning latent representation beyond feature for
                universal domain adaptation, TCSVT, Q Lv, Y Li, J Dong, Z Guo
              </p>
              <!-- <a href="#" target="_blank"><img class="icon" src="@/assets/icons/github.svg" alt="github"></a> -->
            </div>
            <div class="paper-image last">
              <img src="@/assets/imgs/paper4.png" alt="论文4截图" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增接口调用部分 -->
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
            已选择 {{ selectedFiles.length }} 张图片
            <button class="upload-button" @click="uploadImages">
              开始上传
            </button>
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
          <div class="result-display">
            <pre>{{ JSON.stringify(resultData, null, 2) }}</pre>
          </div>
          <button class="restart-button" @click="resetProcess">重新开始</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 侧边导航栏 -->
  <div class="nav">
    <div
      class="nav-button"
      v-for="(section, index) in sections"
      :key="index"
      :class="{ active: currentSection === index }"
      @click="scrollToSection(index)"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const currentSection = ref(0);
const sections = ref([
  { title: "第一页" },
  { title: "第二页" },
  { title: "第三页" },
  { title: "第四页" },
  { title: "在线重建" }, // 新增的页面
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
    const sectionId = hash.substring(1); // 去掉 # 号
    const index = sections.value.findIndex(
      (section) => `section${section.id}` === sectionId
    );
    if (index !== -1) {
      currentSection.value = index;
      scrollToSection(index);
    }
  }

  // 监听 hashchange 事件
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.substring(1); // 去掉 # 号
      const index = sections.value.findIndex(
        (section) => `section${section.id}` === sectionId
      );
      if (index !== -1) {
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

// 新增的处理逻辑
const API_BASE_URL = "http://117.50.81.60:8000";
const currentStep = ref(1);
const selectedFiles = ref([]);
const taskId = ref("");
const resultData = ref(null);
const pollingInterval = ref(null);

const handleFileUpload = (event) => {
  selectedFiles.value = Array.from(event.target.files);
};

const uploadImages = async () => {
  if (selectedFiles.value.length === 0) return;

  try {
    const formData = new FormData();
    selectedFiles.value.forEach((file, index) => {
      formData.append(`image_${index}`, file);
    });

    const response = await fetch(`${API_BASE_URL}/upload_images/`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("上传图片失败");

    currentStep.value = 2;
    organizeImages();
  } catch (error) {
    console.error("上传图片时出错:", error);
    alert("上传图片失败，请重试");
  }
};

const organizeImages = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/organize_images/`, {
      method: "POST",
    });

    if (!response.ok) throw new Error("组织图片失败");

    const data = await response.json();
    const projpath = data.projpath || "default_path"; // 假设接口返回项目路径

    currentStep.value = 3;
    submitTask(projpath);
  } catch (error) {
    console.error("组织图片时出错:", error);
    alert("组织图片失败，请重试");
    currentStep.value = 1;
  }
};

const submitTask = async (projpath) => {
  try {
    const response = await fetch(`${API_BASE_URL}/run_colmap/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projpath }),
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

    // 假设API返回的状态字段是status，完成状态为"completed"
    if (data.status === "completed" || data.result) {
      clearInterval(pollingInterval.value);
      resultData.value = data;
      currentStep.value = 4;
    }
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
/* 在样式顶部添加color模块导入 */
@use "sass:color";

/* 通用响应式设置 */
@mixin respond-to($breakpoint) {
  @if $breakpoint == "small" {
    @media (max-width: 576px) {
      @content;
    }
  } @else if $breakpoint == "medium" {
    @media (max-width: 768px) {
      @content;
    }
  } @else if $breakpoint == "large" {
    @media (max-width: 992px) {
      @content;
    }
  } @else if $breakpoint == "xlarge" {
    @media (max-width: 1200px) {
      @content;
    }
  }
}

$theme-color: #00796b;
.contactUs {
  display: flex;
  align-items: center;
  position: fixed;
  right: 30px;
  top: 20px;
  height: 40px;
  width: 200px;
  justify-content: flex-end;
  color: $theme-color;
  z-index: 100; // 确保在其他元素上方

  @include respond-to("medium") {
    right: 15px;
    top: 15px;
    width: auto;
  }

  @include respond-to("small") {
    span {
      display: none; // 在小屏幕上隐藏文字，只显示图标
    }
  }

  img {
    width: 25px;
  }
  a {
    margin: 0 5px;
  }
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

// 内容区域需要可滚动时的样式
.scrollable-content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
  -webkit-overflow-scrolling: touch; // 增强iOS的滚动体验
}

#section1 {
  background: linear-gradient(to right, #e0f7fa, #80deea);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  flex-direction: column;
  padding: 20px;

  h1 {
    font-size: 36px;
    color: $theme-color;
    margin-bottom: 40px;

    @include respond-to("large") {
      font-size: 32px;
    }

    @include respond-to("medium") {
      font-size: 28px;
    }

    @include respond-to("small") {
      font-size: 24px;
      padding: 0 10px;
    }
  }

  .button {
    background-color: $theme-color;
    color: #fff;
    padding: 15px 30px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    text-decoration: none;
    margin-bottom: 50px;
  }

  .button:hover {
    background-color: #004d40;
  }

  .images {
    display: flex;
    justify-content: space-around;
    margin-top: 40px;
    padding: 0 80px;

    @include respond-to("large") {
      padding: 0 40px;
    }

    @include respond-to("medium") {
      flex-direction: column;
      align-items: center;

      .arrow-container {
        transform: rotate(90deg);
        margin: 20px 0;
      }

      .image {
        width: 80% !important;
        margin: 10px 0;
      }
    }

    .arrow-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .arrow {
      width: 100px;
      color: $theme-color;
    }

    .image {
      width: 35%;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
  }
}

#section2 {
  flex-direction: column;
  // background: linear-gradient(to right, #b2dfdb, #72e9e0);
  background: linear-gradient(to right, #e0f7fa, #80deea);

  header {
    text-align: center;
    margin-bottom: 40px;
  }

  .header h1 {
    font-size: 36px;
    color: $theme-color;
    margin-bottom: 50px;
  }

  .advantages {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    margin-bottom: 80px;
    padding: 0 60px;

    @include respond-to("large") {
      padding: 0 20px;
    }

    @include respond-to("medium") {
      flex-direction: column;
      align-items: center;
    }

    .advantage {
      width: 28%;
      padding: 20px;

      @include respond-to("large") {
        width: 30%;
      }

      @include respond-to("medium") {
        width: 80%;
        margin: 10px 0;
      }
    }
  }

  .advantage {
    width: 28%;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 0 5px;
  }

  .advantage h2 {
    font-size: 24px;
    color: $theme-color;
    margin-bottom: 10px;
  }

  .advantage p {
    font-size: 16px;
    color: #555;
  }

  .image img {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 8px;

    @include respond-to("medium") {
      max-width: 100%;
    }
  }
}

#section3 {
  // background: linear-gradient(to right, #80cbc4, #4db6ac); /* 第三页渐变，类似第一个页面 */
  background: linear-gradient(to right, #e0f7fa, #80deea);
  flex-direction: column;

  .header h1 {
    font-size: 36px;
    color: $theme-color;
    margin-bottom: 50px;
  }

  .triangle-layout {
    position: relative;
    width: 1100px;
    height: 500px;

    @include respond-to("xlarge") {
      width: 90%;
    }

    @include respond-to("medium") {
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .structure {
    @include respond-to("medium") {
      position: relative !important;
      left: auto !important;
      right: auto !important;
      top: auto !important;
      bottom: auto !important;
      transform: none !important;
      margin: 20px 0;

      &::before,
      &::after {
        display: none; // 在移动端隐藏箭头
      }
    }
  }

  .structure {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .box {
    width: 230px;
    padding: 20px;
    background-color: white;
    border: 3px solid $theme-color;
    border-radius: 25px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .box img {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 10px;
  }

  .box p {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: $theme-color;
  }

  /* 顶部结构 */
  .top {
    position: relative;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    &::before {
      position: absolute;
      content: url("@/assets/icons/darrow.svg");
      transform: translateX(-160%) translateY(0px) rotate(145deg) scale(0.7);
    }

    &::after {
      position: absolute;
      content: url("@/assets/icons/darrow.svg");
      transform: translateX(160%) translateY(0px) rotate(35deg) scale(0.7);
    }
  }

  /* 左侧结构 */
  .left {
    top: 50%;
    left: 0;
    transform: translateY(-50%);

    &::after {
      position: absolute;
      content: url("@/assets/icons/bend-arrow.svg");
      transform: translateX(160%) translateY(110px) rotateX(180deg)
        rotateY(180deg) rotate(45deg) scale(0.6);
    }
  }

  /* 右侧结构 */
  .right {
    top: 50%;
    right: 0;
    transform: translateY(-50%);

    &::after {
      position: absolute;
      content: url("@/assets/icons/bend-arrow.svg");
      transform: translateX(-160%) translateY(110px) rotateX(180deg)
        rotate(45deg) scale(0.6);
    }
  }

  /* 底部结构 */
  .bottom {
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);

    &::after {
      position: absolute;
      content: url("@/assets/icons/arrow2.svg");
      transform: translateY(-90px) scale(0.6);
    }
  }
}

#section4 {
  background: linear-gradient(to right, #e0f7fa, #80deea);
  flex-direction: column;

  padding: 40px 20px;

  .header {
    padding: 20px;
    flex-shrink: 0;
  }

  .scrollable-container {
    overflow-y: auto;
    padding: 0 20px 20px 20px;
    -webkit-overflow-scrolling: touch;
  }

  .header h1 {
    font-size: 36px;
    color: $theme-color;
    margin-bottom: 40px;

    @include respond-to("medium") {
      font-size: 30px;
    }
  }

  .paper-container {
    max-width: 800px;
    width: 100%;

    @include respond-to("large") {
      max-width: 90%;
    }
  }

  .paper-item {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

    @include respond-to("medium") {
      flex-direction: column;
      text-align: center;
      padding: 20px 10px;
    }

    .paper-title {
      flex: 3;
      margin-right: 20px;

      @include respond-to("medium") {
        margin-right: 0;
        margin-bottom: 15px;
      }

      p {
        margin: 0;
        font-size: 16px;
        line-height: 1.5;
        color: #333;
      }

      a {
        display: inline-block;
        margin-top: 10px;
        color: $theme-color;
        text-decoration: none;

        .icon {
          width: 24px;
          vertical-align: middle;
          transition: transform 0.3s ease;

          &:hover {
            transform: scale(1.2);
          }
        }
      }
    }

    .paper-image {
      flex: 1;
      display: flex;
      justify-content: center;

      img {
        width: 150px;
        height: auto;
        border-radius: 6px;
        border: 1px solid #ddd;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.05);
        }
      }

      &.last img {
        width: 120px;

        @include respond-to("small") {
          width: 100px;
        }
      }
    }
  }
}

/* 新增样式 */
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
}

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

// .nav-button::after {
//     content: attr(data-title);
//     position: absolute;
//     left: -120px;
//     top: 50%;
//     transform: translateY(-50%);
//     background-color: rgba(0, 0, 0, 0.7);
//     color: white;
//     padding: 5px 10px;
//     border-radius: 5px;
//     font-size: 14px;
//     opacity: 0;
//     transition: opacity 0.3s ease;
//     pointer-events: none;
//     white-space: nowrap;
// }

// .nav-button.active::after {
//     opacity: 1;
// }

:global(html),
:global(body) {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
}
</style>
