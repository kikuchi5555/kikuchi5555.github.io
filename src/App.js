import React, { useRef, useState, useEffect } from 'react';
import GitHubIcon from './github_icon.svg';
import './App.scss';
import Animation from './Animation'

function App() {
  return (
    <div className="app">
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
      <Animation></Animation>
    </div>
  );
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
    }, 50);
  // eslint-disable-next-line
  }, []);

  return (
    <span>{text}</span>
  )
}

export default App;