import React, { useRef, useState, useEffect } from 'react';
import GitHubIcon from './github_icon.svg';
import './App.scss';
import { Canvas, useFrame } from 'react-three-fiber'

function App() {
  return (
    <div className="App">
      <div className="detail">
        <h1 className="detail__heading"><EnterText>Kikuchi Tetsuro</EnterText></h1>
        <p className="detail__text"><EnterText>Front-end Development</EnterText><br/><EnterText>Web Design</EnterText></p>
        <a className="logo" href="https://github.com/kikuchi5555" target="_blank" rel="noopener noreferrer">
          <img src={GitHubIcon} alt="logo" />
        </a>
      </div>
      <div className="skill">
        <ul className="skill__list">
          <li className="skill__item"><EnterText>HTML （pug / slim / ejs）</EnterText></li>
          <li className="skill__item"><EnterText>CSS (Sass / SCSS / Stylus)</EnterText></li>
          <li className="skill__item"><EnterText>JavaScript (ES6 or later)</EnterText></li>
          <li className="skill__item"><EnterText>jQuery</EnterText></li>
          <li className="skill__item"><EnterText>TypeScript</EnterText></li>
          <li className="skill__item"><EnterText>Vue.js</EnterText></li>
          <li className="skill__item"><EnterText>React</EnterText></li>
          <li className="skill__item"><EnterText>Angular.js</EnterText></li>
          <li className="skill__item"><EnterText>Ruby on Rails</EnterText></li>
        </ul>
      </div>
      <div>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
      </div>
    </div>
  );
}

function EnterText(props: any) {
  const characterList = props.children.split('')

  const [text, setText] = useState('');
  const refText = useRef(text);

  useEffect(() => {
    refText.current = text;
  }, [text]);

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setText(refText.current + characterList[i])
      i++
      if (i > characterList.length - 1) {
        clearInterval(interval);
      }
    }, 20);
  }, []);

  return (
    <span>{text}</span>
  )
}

function Box(props: any) {
  // This reference will give us direct access to the mesh
  const mesh = useRef(null)

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    const current = mesh.current as any
    return (current.rotation.x = current.rotation.y += 0.01)
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default App;