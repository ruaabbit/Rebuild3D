<template>
    <div class="container">
        <div class="contactUs">
            <span>联系我们</span>
            <a href=""><img src="@/assets/icons/github.svg" alt=""></a>
            <a href=""><img src="@/assets/icons/email.svg" alt=""></a>
        </div>
        <div class='section' id="section1">
            <h1>一站式解决水下三维重建领域计算需求的开源平台</h1>
            <a href="#" class="button" @click="scrollToSection(1)">了解更多</a>
            <div class="images">
                <img class="image" src="@/assets/imgs/img1.png" alt="Image 1">
                <div class="arrow-container">
                    <img class="arrow" src="@/assets/icons/arrow.svg" alt=""> <!-- 这是一个HTML字符箭头 -->
                </div>
                <img class="image" src="@/assets/imgs/img2.png" alt="Image 2">
            </div>
        </div>
        <div class='section' id="section2">
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
                <img src="@/assets/imgs/img3.png" alt="Product Image">
            </div>
        </div>
        <div class='section' id="section3">
            <div class="header">
                <h1>平台架构</h1>
            </div>
            <div class="triangle-layout">
                <!-- 顶部结构 -->
                <div class="structure top">
                    <div class="box">
                        <img src="@/assets/imgs/img4.png" alt="图片4">
                        <p>空间三维计算平台</p>
                    </div>
                </div>

                <!-- 左侧结构 -->
                <div class="structure left">
                    <div class="box">
                        <img src="@/assets/imgs/img5.png" alt="图片5">
                        <p>硬件设备平台</p>
                    </div>
                </div>

                <!-- 右侧结构 -->
                <div class="structure right">
                    <div class="box">
                        <img src="@/assets/imgs/img6.png" alt="图片6">
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
        <div class='section' id="section4">
            <div class="header">
                <h1>相关论文</h1>
            </div>

            <div class="paper-container">
                <!-- 第一篇论文 -->
                <div class="paper-item">
                    <div class="paper-title">
                        <p>1. Geometry-enhanced attentive multi-view stereo for challenging matching scenarios, TCSVT, Y
                            Liu, Q Cai, C Wang, J Yang, H Fan, J Dong</p>
                        <a href="https://github.com/yimei910110/GA-MVS" target="_blank"><img class="icon" src="@/assets/icons/github.svg" alt="github"></a>
                    </div>
                    <div class="paper-image">
                        <img src="@/assets/imgs/paper1.png" alt="论文1截图">
                    </div>
                </div>

                <!-- 第二篇论文 -->
                <div class="paper-item">
                    <div class="paper-title">
                        <p>2. Deep color compensation for generalized underwater image enhancement, TCSVT, Y Rao, W Liu,
                            K Li, H Fan, S Wang, J Dong</p>
                        <a href="https://github.com/Ray2OUC/P2CNet" target="_blank"><img class="icon" src="@/assets/icons/github.svg" alt="github"></a>
                    </div>
                    <div class="paper-image">
                        <img src="@/assets/imgs/paper2.png" alt="论文2截图">
                    </div>
                </div>

                <!-- 第三篇论文 -->
                <div class="paper-item">
                    <div class="paper-title">
                        <p>3. Learning general descriptors for image matching with regression feedback, TCSVT, Y Rao, Y
                            Ju, C Li, E Rigall, J Yang, H Fan, J Dong</p>
                        <a href="https://github.com/Ray2OUC/AANet" target="_blank"><img class="icon" src="@/assets/icons/github.svg" alt="github"></a>
                    </div>
                    <div class="paper-image">
                        <img src="@/assets/imgs/paper3.png" alt="论文3截图">
                    </div>
                </div>

                <!-- 第四篇论文 -->
                <div class="paper-item">
                    <div class="paper-title">
                        <p>4. LaFea: Learning latent representation beyond feature for universal domain adaptation,
                            TCSVT, Q Lv, Y Li, J Dong, Z Guo</p>
                        <!-- <a href="#" target="_blank"><img class="icon" src="@/assets/icons/github.svg" alt="github"></a> -->
                    </div>
                    <div class="paper-image last">
                        <img src="@/assets/imgs/paper4.png" alt="论文4截图">
                    </div>
                </div>
            </div>

        </div>
    </div>

    <!-- 侧边导航栏 -->
    <div class="nav">
        <div class="nav-button" v-for="(section, index) in sections" :key="index"
            :class="{ active: currentSection === index }" @click="scrollToSection(index)">
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const currentSection = ref(0);
const sections = ref([
    { title: '第一页' },
    { title: '第二页' },
    { title: '第三页' },
    { title: '第四页' }
]);

// 节流函数
const throttle = (func, wait) => {
    let timeout = null;
    return (...args) => {
        if (!timeout) {
            func.apply(this, args);
            timeout = setTimeout(() => {
                timeout = null;
            }, wait);
        }
    };
};

// 滚动处理函数
const handleScroll = (event) => {
    if (event.deltaY > 0) {
        // 向下滚动
        if (currentSection.value < sections.value.length - 1) {
            currentSection.value++;
        }
    } else {
        // 向上滚动
        if (currentSection.value > 0) {
            currentSection.value--;
        }
    }
    scrollToSection(currentSection.value);
};

// 滚动到指定页面
const scrollToSection = (index) => {
    currentSection.value = index;
    const sectionId = `section${index + 1}`
    document.getElementById(`section${index + 1}`).scrollIntoView({ behavior: 'smooth' });
    // 更新地址栏的锚点
    history.replaceState(null, '', `#${sectionId}`);
};

// 使用节流限制滚动事件
const throttledScroll = throttle(handleScroll, 500);
onMounted(() => {
    // 初始化时检查地址栏的锚点
    const hash = window.location.hash;
    if (hash) {
        const sectionId = hash.substring(1); // 去掉 # 号
        const index = sections.value.findIndex((section) => `section${section.id}` === sectionId);
        if (index !== -1) {
            currentSection.value = index;
            scrollToSection(index);
        }
    }

    // 监听 hashchange 事件
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash;
        if (hash) {
            const sectionId = hash.substring(1); // 去掉 # 号
            const index = sections.value.findIndex((section) => `section${section.id}` === sectionId);
            if (index !== -1) {
                currentSection.value = index;
                scrollToSection(index);
            }
        }
    });

    window.addEventListener('wheel', throttledScroll);
});

</script>


<style scoped lang="scss">
$theme-color: #00796b;
.contactUs{
    display: flex;
    align-items: center;
    position: fixed;
    right: 30px;
    top: 20px;
    height: 40px;
    width: 200px;
    justify-content: flex-end;
    color: $theme-color;
    img{
        width: 25px;
    }
    a{
        margin: 0 5px;
    }
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
            content: url('@/assets/icons/darrow.svg');
            transform: translateX(-160%) translateY(0px) rotate(145deg) scale(0.7)
        }

        &::after {
            position: absolute;
            content: url('@/assets/icons/darrow.svg');
            transform: translateX(160%) translateY(0px) rotate(35deg) scale(0.7)
        }

    }

    /* 左侧结构 */
    .left {
        top: 50%;
        left: 0;
        transform: translateY(-50%);

        &::after {
            position: absolute;
            content: url('@/assets/icons/bend-arrow.svg');
            transform: translateX(160%) translateY(110px) rotateX(180deg) rotateY(180deg) rotate(45deg) scale(0.6)
        }
    }

    /* 右侧结构 */
    .right {
        top: 50%;
        right: 0;
        transform: translateY(-50%);

        &::after {
            position: absolute;
            content: url('@/assets/icons/bend-arrow.svg');
            transform: translateX(-160%) translateY(110px) rotateX(180deg) rotate(45deg) scale(0.6)
        }
    }

    /* 底部结构 */
    .bottom {
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);

        &::after {
            position: absolute;
            content: url('@/assets/icons/arrow2.svg');
            transform: translateY(-90px) scale(0.6)
        }


    }

}

#section4 {
    // background: linear-gradient(to right, #4db6ac, #00796b); /* 第四页渐变，类似第一个页面 */
    background: linear-gradient(to right, #e0f7fa, #80deea);
    flex-direction: column;
    .header h1 {
        font-size: 36px;
        color: $theme-color;
        margin-bottom: 20px;
    }

    .paper-container {
        max-width: 800px;
        margin: 0 auto;
    }

    .paper-item {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        padding: 15px;
        background-color: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .paper-title {
        flex: 1;
        margin-right: 20px;
    }

    .paper-title p {
        margin: 0;
        font-size: 16px;
        line-height: 1.3;
        color: #333;

    }

    .paper-title a {
        display: inline-block;
        margin-top: -20px;
        color: #00796b;
        text-decoration: none;
        font-weight: bold;
        font-size: 16px;
        .icon{
            width: 20px;
        }
    }

    .paper-title a:hover {
        text-decoration: underline;
    }

    .paper-image img {
        width: 150px;
        height: auto;
        border-radius: 4px;
        border: 1px solid #ddd;
    }
    .last img {
        width: 100px;

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
// }</style>