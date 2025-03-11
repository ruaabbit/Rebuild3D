import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 重新导出Three.js的OrbitControls
export const OrbitControls = ThreeOrbitControls;

// 可以在这里扩展或修改OrbitControls的行为，如果需要的话
export function configureOrbitControls(controls, options = {}) {
  const {
    enableDamping = true,
    dampingFactor = 0.05,
    enableZoom = true,
    zoomSpeed = 1.0,
    minDistance = 1,
    maxDistance = 1000,
    enablePan = true,
    panSpeed = 1.0,
    minPolarAngle = 0, // 弧度，默认允许垂直旋转的上限
    maxPolarAngle = Math.PI, // 弧度，默认允许垂直旋转的下限
    enableRotate = true,
    rotateSpeed = 1.0,
  } = options;

  controls.enableDamping = enableDamping;
  controls.dampingFactor = dampingFactor;
  controls.enableZoom = enableZoom;
  controls.zoomSpeed = zoomSpeed;
  controls.minDistance = minDistance;
  controls.maxDistance = maxDistance;
  controls.enablePan = enablePan;
  controls.panSpeed = panSpeed;
  controls.minPolarAngle = minPolarAngle;
  controls.maxPolarAngle = maxPolarAngle;
  controls.enableRotate = enableRotate;
  controls.rotateSpeed = rotateSpeed;

  return controls;
}