<template>
  <div class="contactUs">
    <span>联系我们</span>
    <a href=""><img src="@/assets/icons/github.svg" alt="" /></a>
    <a href=""><img src="@/assets/icons/email.svg" alt="" /></a>
  </div>
</template>

<style scoped lang="scss">
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
</style>
