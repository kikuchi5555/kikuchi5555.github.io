import React from 'react';
import GitHubIcon from './github_icon.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="detail">
        <h1 className="detail__heading">Kikuchi Tetsuro</h1>
        <p className="detail__text">Front-end Development<br/>Web Design</p>
        <a className="logo" href="https://github.com/kikuchi5555" target="_blank">
          <img src={GitHubIcon} alt="logo" />
        </a>
      </div>
      <div className="skill">
        <ul className="skill__list">
          <li className="skill__item">HTML （pug / slim / ejs）</li>
          <li className="skill__item">CSS (Sass / SCSS / Stylus)</li>
          <li className="skill__item">JavaScript (ES6 or later)</li>
          <li className="skill__item">jQuery</li>
          <li className="skill__item">TypeScript</li>
          <li className="skill__item">Vue.js</li>
          <li className="skill__item">React</li>
          <li className="skill__item">Angular.js</li>
          <li className="skill__item">Ruby on Rails</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
