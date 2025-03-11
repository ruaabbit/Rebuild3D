<template>
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
</template>

<style scoped lang="scss">
#section2 {
  flex-direction: column;
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
</style>
