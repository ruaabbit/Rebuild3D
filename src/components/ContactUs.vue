<template>
  <div class="contactUs">
    <span>联系我们</span>
    <div class="icons-container">
      <a href="https://github.com/your-repo" target="_blank" class="icon-link">
        <img src="@/assets/icons/github.svg" alt="GitHub" />
        <div class="tooltip">GitHub</div>
      </a>
      <a href="mailto:your-email@example.com" class="icon-link">
        <img src="@/assets/icons/email.svg" alt="Email" />
        <div class="tooltip">发送邮件</div>
      </a>
    </div>
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
  padding: 5px 15px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  justify-content: flex-end;
  z-index: 100;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    background-color: rgba(255, 255, 255, 0.95);
  }

  span {
    color: $theme-color;
    font-weight: 600;
    margin-right: 10px;
    letter-spacing: 0.5px;
    transition: color 0.2s ease;
  }

  .icons-container {
    display: flex;
    gap: 10px;
  }

  .icon-link {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    transition: transform 0.2s ease, background-color 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
      background-color: rgba(0, 121, 107, 0.1);
      
      img {
        filter: brightness(0.8) sepia(1) hue-rotate(120deg) saturate(1.5);
      }
      
      .tooltip {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    img {
      width: 22px;
      height: 22px;
      transition: all 0.2s ease;
    }
    
    .tooltip {
      position: absolute;
      bottom: -30px;
      left: 50%;
      transform: translateX(-50%) translateY(5px);
      background-color: $theme-color;
      color: white;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      visibility: hidden;
      opacity: 0;
      transition: all 0.3s ease;
      
      &:before {
        content: '';
        position: absolute;
        top: -5px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid $theme-color;
      }
    }
  }

  @include respond-to("medium") {
    right: 15px;
    top: 15px;
    padding: 5px 10px;
  }

  @include respond-to("small") {
    padding: 5px;
    border-radius: 50%;
    width: auto;
    height: auto;
    
    span {
      display: none;
    }
    
    .icons-container {
      gap: 5px;
    }
    
    .icon-link {
      width: 28px;
      height: 28px;
      
      img {
        width: 18px;
        height: 18px;
      }
      
      .tooltip {
        display: none;
      }
    }
  }
}
</style>
