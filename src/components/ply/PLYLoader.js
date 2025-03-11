import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';

/**
 * 加载PLY文件并创建点云
 * @param {string} url PLY文件路径
 * @returns {Promise<THREE.Points>} 点云对象
 */
export function loadPLY(url) {
    console.log(`开始加载PLY文件: ${url}`);

    return new Promise((resolve, reject) => {
        if (!url) {
            console.error('PLY文件路径为空');
            return reject(new Error('PLY文件路径为空'));
        }

        const loader = new PLYLoader();

        // 设置跨域处理
        loader.setCrossOrigin('anonymous');

        console.log(`PLY加载器已创建，正在加载: ${url}`);

        loader.load(
            // 资源URL
            url,

            // onLoad回调
            (geometry) => {
                console.log('PLY几何体加载成功:', geometry);
                console.log(`几何体顶点数量: ${geometry.attributes.position.count}`);

                if (geometry.attributes.position.count === 0) {
                    console.error('PLY文件没有包含任何顶点数据');
                    return reject(new Error('PLY文件为空或格式错误'));
                }

                // 检查几何体属性
                console.log('几何体属性列表:', Object.keys(geometry.attributes));

                // 如果PLY文件包含颜色信息
                let material;

                if (geometry.hasAttribute('color')) {
                    console.log('检测到颜色属性，使用模型自带颜色');
                    material = new THREE.PointsMaterial({
                        size: 1.0,
                        vertexColors: true
                    });
                } else {
                    console.log('未检测到颜色属性，生成默认颜色');
                    // 如果没有颜色信息，使用随机颜色或默认颜色
                    material = new THREE.PointsMaterial({
                        size: 1.0,
                        color: 0x00796b // 默认使用主题色
                    });

                    // 或者根据位置生成彩虹色
                    const positions = geometry.attributes.position.array;
                    const colors = new Float32Array(positions.length);

                    console.log(`为${positions.length / 3}个顶点生成颜色`);

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
                console.log('点云对象创建成功:', pointCloud);
                resolve(pointCloud);
            },

            // onProgress回调
            (xhr) => {
                if (xhr.lengthComputable) {
                    const percentComplete = xhr.loaded / xhr.total * 100;
                    console.log(`加载进度: ${percentComplete.toFixed(2)}%`);
                    console.log(`已加载: ${Math.round(xhr.loaded / 1024)} KB, 总大小: ${Math.round(xhr.total / 1024)} KB`);
                } else {
                    console.log(`已加载: ${Math.round(xhr.loaded / 1024)} KB`);
                }
            },

            // onError回调
            (error) => {
                console.error('加载PLY文件出错:', error);
                console.error('错误详情:', {
                    message: error.message,
                    url: url,
                    stack: error.stack
                });

                // 尝试检查文件是否存在
                fetch(url, { method: 'HEAD' })
                    .then(response => {
                        if (!response.ok) {
                            console.error(`文件请求失败: ${response.status} ${response.statusText}`);
                        } else {
                            console.log('文件请求成功，但解析失败');
                        }
                    })
                    .catch(fetchError => {
                        console.error('文件请求错误:', fetchError);
                    })
                    .finally(() => {
                        reject(error);
                    });
            }
        );
    });
}