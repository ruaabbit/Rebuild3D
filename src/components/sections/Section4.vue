<template>
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
              matching scenarios, TCSVT, Y Liu, Q Cai, C Wang, J Yang, H Fan, J
              Dong
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
              3. Learning general descriptors for image matching with regression
              feedback, TCSVT, Y Rao, Y Ju, C Li, E Rigall, J Yang, H Fan, J
              Dong
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
</template>

<style scoped lang="scss">
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
  .scrollable-content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px;
    -webkit-overflow-scrolling: touch; // 增强iOS的滚动体验
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
</style>
