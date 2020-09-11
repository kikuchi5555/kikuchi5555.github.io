import React, { useRef, useState, useEffect } from 'react';
import './App.scss';
// import Animation from './Animation'

function App() {
  const startDetailAnim = 2500
  const startSkillAnim = 3000

  return (
    <div className="app">
      <div className="detail">
        <h1 className="detail__heading"><LazyLoad duration={startDetailAnim}><EnterText>Kikuchi Tetsuro</EnterText></LazyLoad></h1>
        <p className="detail__text">
          <LazyLoad duration={startDetailAnim + 400}><EnterText>Front-end Development</EnterText><br/></LazyLoad>
          <LazyLoad duration={startDetailAnim + 800}><EnterText>Web Design</EnterText><br/></LazyLoad>
          <LazyLoad duration={startDetailAnim + 1200}><a href="https://github.com/kikuchi5555" target="_blank" rel="noopener noreferrer"><EnterText>GitHub →</EnterText></a></LazyLoad>
        </p>
      </div>
      <div className="skill">
        <ul className="skill__list">
          <LazyLoad duration={startSkillAnim}><li className="skill__item"><EnterText>CSS(Sass/SCSS/Stylus)</EnterText></li></LazyLoad>
          <LazyLoad duration={startSkillAnim + 400}><li className="skill__item"><EnterText>JavaScript(ES6 or later)</EnterText></li></LazyLoad>
          <LazyLoad duration={startSkillAnim + 800}><li className="skill__item"><EnterText>jQuery</EnterText></li></LazyLoad>
          <LazyLoad duration={startSkillAnim + 1000}><li className="skill__item"><EnterText>TypeScript</EnterText></li></LazyLoad>
          <LazyLoad duration={startSkillAnim + 1200}><li className="skill__item"><EnterText>Vue.js</EnterText></li></LazyLoad>
          <LazyLoad duration={startSkillAnim + 1400}><li className="skill__item"><EnterText>React</EnterText></li></LazyLoad>
          <LazyLoad duration={startSkillAnim + 1600}><li className="skill__item"><EnterText>Angular.js</EnterText></li></LazyLoad>
          <LazyLoad duration={startSkillAnim + 1800}><li className="skill__item"><EnterText>Ruby on Rails</EnterText></li></LazyLoad>
        </ul>
      </div>
      {/* <Animation></Animation> */}
    </div>
  );
}

function LazyLoad(props) {
  const [isLoad, setLoad] = useState(true)

  setTimeout(() => {
    setLoad(false)
  }, props.duration)

  return isLoad ? '' : props.children
}

function EnterText(props) {
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
    }, 40);
  // eslint-disable-next-line
  }, []);

  return (
    <span>{text}</span>
  )
}

export default App;