import React, { useEffect } from 'react'

import * as THREE from 'three/src/Three'
import Logo from './img/logo_texture.png'

export default function LogoBg() {
  useEffect(() => {
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#logo-bg'),
      alpha: true,
      antialias: true
    });

    onResize();

    // ここから表示処理
    // =============================

    // カメラ
    var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set(0, 0, 10);

    // ライト
    var light = new THREE.AmbientLight( 0xffffff );
    scene.add( light );

    // 画像を読み込む
    var texture = new THREE.TextureLoader().load(Logo,
    (tex) => { // 読み込み完了時
        // 縦横比を保って適当にリサイズ
        const w = 1.8;
        const h = tex.image.height/(tex.image.width/w);

        // 平面
        const geometry = new THREE.PlaneGeometry(1, 1);
        const material = new THREE.MeshPhongMaterial( { map:texture } );
        const plane = new THREE.Mesh( geometry, material );
        plane.scale.set(w, h, 1);
        scene.add( plane );
    });

    // レンダリング
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    render();

    // ===========================

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
