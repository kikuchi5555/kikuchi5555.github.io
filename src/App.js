import React, { useRef, useState, useEffect } from 'react';
import './App.scss';
import Animation from './Animation'

function App() {
  const startDetailAnim = 2500
  const startSkillAnim = 3000

  return (
    <div className="app">
      <div className="mv">
        <div className="detail">
          <h1 className="detail__heading"><LazyLoad duration={startDetailAnim}><EnterText>nodel Inc.</EnterText></LazyLoad></h1>
          <p className="detail__text">
            <LazyLoad duration={startDetailAnim + 400}><EnterText>Front-end Development</EnterText><br/></LazyLoad>
            <LazyLoad duration={startDetailAnim + 800}><EnterText>Web Design</EnterText><br/></LazyLoad>
            <LazyLoad duration={startDetailAnim + 1200}><a href="https://github.com/kikuchi5555" target="_blank" rel="noopener noreferrer"><EnterText>GitHub →</EnterText></a></LazyLoad>
          </p>
        </div>
        <div className="skill">
          <ul className="skill__list">
            <LazyLoad duration={startSkillAnim}><li className="skill__item"><EnterText>CSS/SCSS/Sass/Stylus</EnterText></li></LazyLoad>
            <LazyLoad duration={startSkillAnim + 400}><li className="skill__item"><EnterText>JavaScript</EnterText></li></LazyLoad>
            <LazyLoad duration={startSkillAnim + 800}><li className="skill__item"><EnterText>jQuery</EnterText></li></LazyLoad>
            <LazyLoad duration={startSkillAnim + 1000}><li className="skill__item"><EnterText>TypeScript</EnterText></li></LazyLoad>
            <LazyLoad duration={startSkillAnim + 1200}><li className="skill__item"><EnterText>Vue.js</EnterText></li></LazyLoad>
            <LazyLoad duration={startSkillAnim + 1400}><li className="skill__item"><EnterText>React</EnterText></li></LazyLoad>
            <LazyLoad duration={startSkillAnim + 1600}><li className="skill__item"><EnterText>Angular.js</EnterText></li></LazyLoad>
            <LazyLoad duration={startSkillAnim + 1800}><li className="skill__item"><EnterText>Ruby on Rails</EnterText></li></LazyLoad>
          </ul>
        </div>
        <div className='scroll'>
          <LazyLoad duration={startSkillAnim + 2400}><EnterText>scroll down ↓</EnterText></LazyLoad>
        </div>
        <div className="canvas-container">
          <Animation></Animation>
        </div>
      </div>
      <div className="company-info">
        <table>
          <tbody>
            <tr>
              <th>社名</th><td>株式会社nodel（ノデル）<br />nodel Inc.</td>
            </tr>
            <tr>
              <th>所在地</th><td>東京都武蔵野市吉祥寺南町2丁目2-5 ワイムビジネスプラザ吉祥寺 632号室</td>
            </tr>
            <tr>
              <th>役員</th><td>代表取締役  菊地 哲郎</td>
            </tr>
            <tr>
              <th>設立</th><td>2022年3月3日</td>
            </tr>
            <tr>
              <th>資本</th><td>100万円</td>
            </tr>
            <tr>
              <th>事業内容</th>
              <td>
                <ul>
                  <li>ホームページの企画、デザイン、制作、運営及び保守</li>
                  <li>Web システムの企画、開発、保守、運用、販売及びその受託</li>
                  <li>アプリケーションソフトウェアの企画、開発、保守、運用、販売及びその受託</li>
                  <li>インターネットを利用した各種情報提供サービス業</li>
                  <li>各種印刷物の企画、デザイン、制作</li>
                  <li>前各号に附帯関連する一切の事業</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='copyright'>2022, nodel Inc.</div>
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
