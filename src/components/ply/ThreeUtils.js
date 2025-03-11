import * as THREE from 'three';
import { OrbitControls } from './OrbitControls';

/**
 * 初始化Three.js场景、相机和渲染器
 * @param {Object} options 配置选项
 * @returns {Object} 包含场景、相机、渲染器和控制器的对象
 */
export function initScene(options) {
    const {
        container,
        backgroundColor = '#f0f0f0',
        autoRotate = false
    } = options;

    // 创建场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
        60, // 视角
        container.clientWidth / container.clientHeight, // 宽高比
        0.1, // 近平面
        10000 // 远平面
    );
    camera.position.z = 5;

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 创建控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 使控制器有阻尼感
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.0;

    // 添加环境光和平行光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // 添加坐标轴辅助
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // 处理窗口大小变化
    const handleResize = () => {
        if (!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 动画循环
    const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };

    animate();

    return {
        scene,
        camera,
        renderer,
        controls
    };
}

/**
 * 释放Three.js资源
 * @param {THREE.Scene} scene 场景
 * @param {THREE.WebGLRenderer} renderer 渲染器
 */
export function dispose(scene, renderer) {
    // 移除所有事件监听器
    window.removeEventListener('resize', this.handleResize);

    // 释放场景中的所有对象
    scene.traverse((object) => {
        if (object.geometry) {
            object.geometry.dispose();
        }

        if (object.material) {
            if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
            } else {
                object.material.dispose();
            }
        }
    });

    // 释放渲染器
    if (renderer && renderer.domElement) {
        if (renderer.domElement.parentElement) {
            renderer.domElement.parentElement.removeChild(renderer.domElement);
        }
        renderer.dispose();
    }
}