import React, { useEffect } from 'react'

import * as THREE from 'three/src/Three'
// import Logo from './img/logo_texture.png'
import LogoSVG from './img/logo.svg'
import particleImage from './img/particle.png'
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";

class CreateParticles {
      
  constructor( scene, font, path, particleImg, camera, renderer ) {
    this.scene = scene;
    this.font = font;
    this.path = path;
    this.particleImg = particleImg;
    this.camera = camera;
    this.renderer = renderer;
    
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(0, 0);
    this.clientPosition = new THREE.Vector2(0, 0);
    
    this.colorChange = new THREE.Color();

    this.buttom = false;
    this.timeoutId = null;
    this.scroll = 0;

    this.data = {
      text: 'nodel inc.',
      amount: 1500,
      particleSize: .4,
      particleColor: 0xffffff,
      textSize: 16,
      area: 80,
      ease: .2,
      alpha: 1.0
    }

    this.setup();
    setTimeout(() => {
      this.bindEvents();
    }, 4000);
  }


  setup(){
    const geometry = new THREE.PlaneGeometry( this.visibleWidthAtZDepth( 100, this.camera ), this.visibleHeightAtZDepth( 100, this.camera ));
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, transparent: true } );
    this.planeArea = new THREE.Mesh( geometry, material );
    this.planeArea.visible = false;
    this.createText();

    this.mouse.x = 0;
    this.mouse.y = .05;

    const vector = new THREE.Vector3( this.mouse.x, this.mouse.y, 0.5);
    vector.unproject( this.camera );
    const dir = vector.sub( this.camera.position ).normalize();
    const distance = - this.camera.position.z / dir.z;
    this.currenPosition = this.camera.position.clone().add( dir.multiplyScalar( distance ) );
    // eslint-disable-next-line no-unused-vars
    const pos = this.particles.geometry.attributes.position;
    this.buttom = true;
    this.data.ease = .05;

    setTimeout(() => {
      this.mouse.x = -1.;
      this.mouse.y = -1.;
    }, 1000);

    // setTimeout(() => {
    //   document.addEventListener( 'mousemove', this.onMouseMove.bind( this ));
    // }, 1100);
  }

  bindEvents() {
    document.addEventListener( 'mousemove', this.onMouseMove.bind( this ));
    document.addEventListener( 'scroll', this.onScroll.bind( this ));
    // document.addEventListener( 'mousedown', this.onMouseDown.bind( this ));
    // document.addEventListener( 'mouseup', this.onMouseUp.bind( this ));
  }

  onMouseDown(event){
    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    const vector = new THREE.Vector3( this.mouse.x, this.mouse.y, 0.5);
    vector.unproject( this.camera );
    const dir = vector.sub( this.camera.position ).normalize();
    const distance = - this.camera.position.z / dir.z;
    this.currenPosition = this.camera.position.clone().add( dir.multiplyScalar( distance ) );
    // eslint-disable-next-line no-unused-vars
    const pos = this.particles.geometry.attributes.position;
    this.buttom = true;
    this.data.ease = .01;
    
  }

  onMouseUp(){
    this.buttom = false;
    this.data.ease = .05;
  }

  onScroll(event) {
    if (window.innerWidth < 769) {
      const pageY = window.pageYOffset;
      this.mouse.y = Math.random() > 0.5 ? Math.random() * 0.2 : Math.random() * -0.2;
      this.mouse.x = Math.random() > 0.5 ? Math.random() * 0.8 : Math.random() * -0.8;
      this.data.area = 20;
      this.scroll = pageY;

      clearTimeout( this.timeoutId ) ;

      this.timeoutId = setTimeout(() => {
        this.mouse.x = -1.;
        this.mouse.y = -1.;
        this.data.area = 80;
      }, 200 ) ;

      return;
    }
      this.data.area = 80;
      this.mouse.x = ( this.clientPosition.x / window.innerWidth ) * 2 - 1;
      this.mouse.y = - ( (this.clientPosition.y + window.pageYOffset) / window.innerHeight ) * 2 + 1;
  }

  onMouseMove(event) { 
    this.clientPosition.x = event.clientX;
    this.clientPosition.y = event.clientY;

    if (window.innerWidth < 769) {
      this.mouse.x = -1.;
      this.mouse.y = -1.;
      return;
    }
      this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      this.mouse.y = - ( (event.clientY + window.pageYOffset) / window.innerHeight ) * 2 + 1;
  }

  render( level ){ 
    const time = ((.01 * performance.now())%12)/12;
    const zigzagTime = (1 + (Math.sin( time * 2 * Math.PI )))/6;

    this.raycaster.setFromCamera( this.mouse, this.camera );

    const intersects = this.raycaster.intersectObject( this.planeArea );

    if ( intersects.length > 0 ) {

      const pos = this.particles.geometry.attributes.position
      const copy = this.geometryCopy.attributes.position;
      const coulors = this.particles.geometry.attributes.customColor;
      const size = this.particles.geometry.attributes.size;

        const mx = intersects[ 0 ].point.x;
        const my = intersects[ 0 ].point.y;
        // eslint-disable-next-line no-unused-vars
        const mz = intersects[ 0 ].point.z;

        for ( var i = 0, l = pos.count; i < l; i++) {

          const initX = copy.getX(i);
          const initY = copy.getY(i);
          const initZ = copy.getZ(i);

          let px = pos.getX(i);
          let py = pos.getY(i);
          let pz = pos.getZ(i);

          this.colorChange.setHSL( 0.05, 0.05, 0.05 )
          coulors.setXYZ( i, this.colorChange.r, this.colorChange.g, this.colorChange.b )
          coulors.needsUpdate = true;

          size.array[ i ]  = this.data.particleSize;
          size.needsUpdate = true;

          let dx = mx - px;
          let dy = my - py;
          // eslint-disable-next-line no-unused-vars
          const dz = mz - pz;

          const mouseDistance = this.distance( mx, my, px, py )
          let d = ( dx = mx - px ) * dx + ( dy = my - py ) * dy;
          const f = - this.data.area/d;

          if( this.buttom ){ 

            const t = Math.atan2( dy, dx );
            px -= f * Math.cos( t );
            py -= f * Math.sin( t );

            coulors.setXYZ( i, this.colorChange.r, this.colorChange.g, this.colorChange.b )
            coulors.needsUpdate = true;

            if ((px > (initX + 70)) || ( px < (initX - 70)) || (py > (initY + 70) || ( py < (initY - 70)))){

              coulors.setXYZ( i, this.colorChange.r, this.colorChange.g, this.colorChange.b )
              coulors.needsUpdate = true;
            }

          }else{
          
            if( mouseDistance < this.data.area ){

              if(i%5 === 0){

                const t = Math.atan2( dy, dx );
                px -= .03 * Math.cos( t );
                py -= .03 * Math.sin( t );

                coulors.setXYZ( i, this.colorChange.r, this.colorChange.g, this.colorChange.b )
                coulors.needsUpdate = true;

                size.array[ i ]  =  this.data.particleSize /1.2;
                size.needsUpdate = true;

              }else{

                const t = Math.atan2( dy, dx );
                px += f * Math.cos( t );
                py += f * Math.sin( t );

                pos.setXYZ( i, px, py, pz );
                pos.needsUpdate = true;

                size.array[ i ]  = this.data.particleSize * 1.3 ;
                size.needsUpdate = true;
              }

              if ((px > (initX + 10)) || ( px < (initX - 10)) || (py > (initY + 10) || ( py < (initY - 10)))){
                coulors.setXYZ( i, this.colorChange.r, this.colorChange.g, this.colorChange.b )
                coulors.needsUpdate = true;

                size.array[ i ]  = this.data.particleSize /1.8;
                size.needsUpdate = true;

              }
            }

          }

          px += ( initX  - px ) * this.data.ease;
          py += ( initY  - py ) * this.data.ease;
          pz += ( initZ  - pz ) * this.data.ease;

          pos.setXYZ( i, px, py, pz );
          pos.needsUpdate = true;

        }
    }
  }

  createText(){ 
    let thePoints = [];
    const svgGroup = new THREE.Group();

    // let shapes = this.font.generateShapes( this.data.text , this.data.textSize  );
    // const shapes = SVGLoader.createShapes( this.path );
    const shapes = [];
    this.path.forEach(path => {
      shapes.push(...path.toShapes());
    });
    let geometry = new THREE.ShapeGeometry( shapes );
    geometry.computeBoundingBox();
  
    const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    const yMid = - 0.5 * (geometry.boundingBox.max.y - geometry.boundingBox.min.y);

    geometry.center();

    let holeShapes = [];

    for ( let q = 0; q < shapes.length; q ++ ) {

      let shape = shapes[ q ];

      if ( shape.holes && shape.holes.length > 0 ) {

        for ( let  j = 0; j < shape.holes.length; j ++ ) {

          let  hole = shape.holes[ j ];
          holeShapes.push( hole );
        }
      }
    }
    shapes.push.apply( shapes, holeShapes );

    let colors = [];
    let sizes = [];
          
    for ( let  x = 0; x < shapes.length; x ++ ) {

      let shape = shapes[ x ];

      const amountPoints = ( shape.type === 'Path') ? this.data.amount/2 : this.data.amount;

      let points = shape.getSpacedPoints( amountPoints ) ;

      points.forEach( ( element, z ) => {
        const a = new THREE.Vector3( element.x, element.y, 0 );
        thePoints.push( a );
        colors.push( this.colorChange.r, this.colorChange.g, this.colorChange.b);
        sizes.push( 1 )
      });
    }
          
    for ( let  x = 0; x < shapes.length; x ++ ) {
      let shape = shapes[ x ];
      const geometry = new THREE.BufferGeometry(shape);
      const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0x6699FF}));
      svgGroup.add(mesh);
    }
    this.svgGroup = svgGroup;
    this.scene.add( this.svgGroup );

    let geoParticles = new THREE.BufferGeometry().setFromPoints( thePoints );
    geoParticles.translate( xMid, yMid, 0 );
    geoParticles.scale( .15, -.15, 0 );
    geoParticles.translate( .8, 2., 0 );
        
    geoParticles.setAttribute( 'customColor', new THREE.Float32BufferAttribute( colors, 3 ) );
    geoParticles.setAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1) );

    const material = new THREE.ShaderMaterial( {

      uniforms: {
        color: { value: new THREE.Color( 0x000000 ) },
        pointTexture: { value: this.particleImg },
        uAlpha: { value: this.data.alpha }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 customColor;
        varying vec3 vColor;
      
        void main() {
          vColor = customColor;
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          gl_PointSize = size * ( 300.0 / -mvPosition.z );
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform sampler2D pointTexture;
        uniform float uAlpha;
        varying vec3 vColor;
      
        void main() {
          gl_FragColor = vec4( color * vColor, uAlpha );
          gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
        }
      `,

      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
    } );

    this.particles = new THREE.Points( geoParticles, material );
    this.scene.add( this.particles );

    this.geometryCopy = new THREE.BufferGeometry();
    this.geometryCopy.copy( this.particles.geometry );
  }

  visibleHeightAtZDepth ( depth, camera ) {
    const cameraOffset = camera.position.z;
    if ( depth < cameraOffset ) depth -= cameraOffset;
    else depth += cameraOffset;

    const vFOV = camera.fov * Math.PI / 180; 

    return 2 * Math.tan( vFOV / 2 ) * Math.abs( depth );
  }

  visibleWidthAtZDepth( depth, camera ) {
    const height = this.visibleHeightAtZDepth( depth, camera );
    return height * camera.aspect;
  }

  distance (x1, y1, x2, y2){
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  }
}

class Environment {
    
  constructor( font, path, particle ){ 
    this.font = font;
    this.path = path;
    this.particle = particle;
    this.container = document.querySelector( '#magic' );
    this.scene = new THREE.Scene();
    this.createCamera();
    this.createRenderer();
    this.setup()
    this.bindEvents();
  }

  bindEvents(){
    window.addEventListener( 'resize', this.onWindowResize.bind( this ));
  }

  setup(){ 
    this.createParticles = new CreateParticles( this.scene, this.font, this.path, this.particle, this.camera, this.renderer );
    this.container.classList.add("active");
  }

  render() {
     this.createParticles.render()
     this.renderer.render( this.scene, this.camera )
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera( 65, this.container.clientWidth /  this.container.clientHeight, 1, 10000 );
    this.camera.position.set( 0,0, 100 );
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );

    this.renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2));

    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.container.appendChild( this.renderer.domElement );

    this.renderer.setAnimationLoop(() => { this.render() })

  }

  onWindowResize(){
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
  }
}

export default function LogoBg() {
  useEffect(() => {
    const preload = () => {

      let manager = new THREE.LoadingManager();
      manager.onLoad = function() { 
        // eslint-disable-next-line no-unused-vars
        const environment = new Environment( typo, path, particle );
      }
    
      var typo = null;
      var path = null
      const loader = new THREE.FontLoader( manager );
      // eslint-disable-next-line no-unused-vars
      const font = loader.load('https://res.cloudinary.com/dydre7amr/raw/upload/v1612950355/font_zsd4dr.json', function ( font ) { typo = font; });
      const svgloader = new SVGLoader(manager);
      svgloader.load(LogoSVG, (data) => {
        path = data.paths
      });
      // eslint-disable-next-line no-unused-vars
      const particle = new THREE.TextureLoader( manager ).load(particleImage);
    }
    
    preload ();

    // const scene = new THREE.Scene();

    // const renderer = new THREE.WebGLRenderer({
    //   canvas: document.querySelector('#logo-bg'),
    //   alpha: true,
    //   antialias: true
    // });

    // // カメラ
    // var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
    // camera.position.set(0, 0, 10);

    // onResize();

    // // ここから表示処理
    // // =============================

    // // ライト
    // var light = new THREE.AmbientLight( 0xffffff );
    // scene.add( light );

    // // 画像を読み込む
    // var texture = new THREE.TextureLoader().load(Logo,
    // (tex) => { // 読み込み完了時
    //     // 縦横比を保って適当にリサイズ
    //     const w = 1.8;
    //     const h = tex.image.height/(tex.image.width/w);

    //     // 平面
    //     const geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32)
    //     // const material = new THREE.MeshPhongMaterial( { map:texture } );

    //     const uniforms = {
    //       uTexture: {
    //         //texture data
    //         value: texture
    //       },
    //       uOffset: {
    //         //distortion strength
    //         value: new THREE.Vector2(0.0, 0.0)
    //       },
    //       uAlpha: {
    //         //opacity
    //         value: 0
    //       }
      
    //     }

    //     const material = new THREE.ShaderMaterial({
    //       uniforms: uniforms,
    //       vertexShader: `
    //         varying vec2 vUv;
      
    //         void main() {
    //           vUv = uv;
    //           vec3 newPosition = position;
    //           gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
    //         }
    //       `,
    //       fragmentShader: `
    //         uniform sampler2D uTexture;
    //         uniform vec2 uOffset;
    //         varying vec2 vUv;
           
    //         void main() {
    //           float r = texture2D(uTexture,vUv + uOffset).r;
    //           vec2 gb = texture2D(uTexture,vUv).gb;
    //           float a = texture2D(uTexture,vUv).a;
    //           gl_FragColor = vec4(r,gb,a);
    //         }
    //       `,
    //       transparent: true
    //     });

    //     const plane = new THREE.Mesh( geometry, material );
    //     plane.scale.set(w, h, 1);
    //     scene.add( plane );
    // });

    // // レンダリング
    // function render() {
    //     requestAnimationFrame(render);
    //     renderer.render(scene, camera);
    // }
    // render();

    // // ===========================

    // // リサイズイベント発生時に実行
    // window.addEventListener('resize', onResize);

    // function onResize() {
    //   // サイズを取得
    //   const width = window.innerWidth;
    //   const height = window.innerHeight;

    //   // レンダラーのサイズを調整する
    //   renderer.setPixelRatio(window.devicePixelRatio);
    //   renderer.setSize(width, height);

    //   camera.aspect = width / height;
    //   camera.updateProjectionMatrix()
    // }

    // return () => {
    //   window.removeEventListener('resize', onResize);
    // }
  }, []);

  return (
    // <canvas id="logo-bg" />
    <div id="magic"></div>
  )
}
