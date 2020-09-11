import React, { useRef, useState, useEffect } from 'react';
import './App.scss';
// import Animation from './Animation'

function App() {
  return (
    <div className="app">
      <div className="detail">
        <LazyLoad duration={1000}>
          <h1 className="detail__heading"><EnterText>Kikuchi Tetsuro</EnterText></h1>
        </LazyLoad>
        <p className="detail__text">
          <LazyLoad duration={1600}><EnterText>Front-end Development</EnterText><br/></LazyLoad>
          <LazyLoad duration={2400}><EnterText>Web Design</EnterText><br/></LazyLoad>
          <LazyLoad duration={2800}><a href="https://github.com/kikuchi5555" target="_blank" rel="noopener noreferrer"><EnterText>github</EnterText></a></LazyLoad>
        </p>
      </div>
      <div className="skill">
        <ul className="skill__list">
          <LazyLoad duration={3000}><li className="skill__item"><EnterText>HTML(pug/slim/ejs)</EnterText></li></LazyLoad>
          <LazyLoad duration={4000}><li className="skill__item"><EnterText>CSS(Sass/SCSS/Stylus)</EnterText></li></LazyLoad>
          <LazyLoad duration={5000}><li className="skill__item"><EnterText>JavaScript(ES6 or later)</EnterText></li></LazyLoad>
          <LazyLoad duration={6000}><li className="skill__item"><EnterText>jQuery</EnterText></li></LazyLoad>
          <LazyLoad duration={6600}><li className="skill__item"><EnterText>TypeScript</EnterText></li></LazyLoad>
          <LazyLoad duration={7200}><li className="skill__item"><EnterText>Vue.js</EnterText></li></LazyLoad>
          <LazyLoad duration={7600}><li className="skill__item"><EnterText>React</EnterText></li></LazyLoad>
          <LazyLoad duration={8000}><li className="skill__item"><EnterText>Angular.js</EnterText></li></LazyLoad>
          <LazyLoad duration={8500}><li className="skill__item"><EnterText>Ruby on Rails</EnterText></li></LazyLoad>
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