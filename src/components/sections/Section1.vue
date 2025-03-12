<template>
  <div class="section" id="section1">
    <h1>一站式解决水下三维重建领域计算需求的开源平台</h1>
    <a href="#" class="button" @click.prevent="() => $emit('navigate', 1)">了解更多</a>
    <div class="images">
      <img class="image" src="@/assets/imgs/img1.png" alt="Image 1" />
      <div class="arrow-container">
        <img class="arrow" src="@/assets/icons/arrow.svg" alt="" />
      </div>
      <img class="image" src="@/assets/imgs/img2.png" alt="Image 2" />
    </div>
  </div>
</template>

<script setup>
defineEmits(['navigate']);
</script>

<style scoped lang="scss">
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
</style>
