import React, { useEffect } from 'react'

import * as THREE from 'three/src/Three'
// import Logo from './logo.svg'

export default function LogoBg() {
  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#logo-bg'),
      alpha: true
    });

    onResize();

    // ここから表示処理
    renderer.setClearColor(0x000000, 0)


    // リサイズイベント発生時に実行
    window.addEventListener('resize', onResize);

    function onResize() {
      // サイズを取得
      const width = window.innerWidth;
      const height = window.innerHeight;

      // レンダラーのサイズを調整する
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
    }

    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);

  return (
    <canvas id="logo-bg" />
  )
}
