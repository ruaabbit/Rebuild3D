import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';

/**
 * 加载PLY文件并创建点云
 * @param {string} url PLY文件路径
 * @returns {Promise<THREE.Points>} 点云对象
 */
export function loadPLY(url) {
  return new Promise((resolve, reject) => {
    const loader = new PLYLoader();
    
    loader.load(
      // 资源URL
      url,
      
      // onLoad回调
      (geometry) => {
        // 如果PLY文件包含颜色信息
        let material;
        
        if (geometry.hasAttribute('color')) {
          material = new THREE.PointsMaterial({
            size: 1.0,
            vertexColors: true
          });
        } else {
          // 如果没有颜色信息，使用随机颜色或默认颜色
          material = new THREE.PointsMaterial({
            size: 1.0,
            color: 0x00796b // 默认使用主题色
          });
          
          // 或者根据位置生成彩虹色
          const positions = geometry.attributes.position.array;
          const colors = new Float32Array(positions.length);
          
          for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            const z = positions[i + 2];
            
            // 将坐标归一化为颜色
            // 这里使用了简单的映射，可以根据需要调整
            colors[i] = (x + 10) / 20; // R 值范围 [0, 1]
            colors[i + 1] = (y + 10) / 20; // G 值范围 [0, 1]
            colors[i + 2] = (z + 10) / 20; // B 值范围 [0, 1]
          }
          
          geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
          material.vertexColors = true;
        }
        
        const pointCloud = new THREE.Points(geometry, material);
        resolve(pointCloud);
      },
      
      // onProgress回调
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      
      // onError回调
      (error) => {
        console.error('加载PLY文件出错:', error);
        reject(error);
      }
    );
  });
}