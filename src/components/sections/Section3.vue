<template>
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
</template>

<style scoped lang="scss">
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
</style>
