import React, { useRef, useState, useEffect } from 'react';
import ParticleBg from './ParticleBg'
import LogoBg from './LogoBg'

function Template1() {
  const startDetailAnim = 1500
  const startSkillAnim = 2000

  useEffect(() => {
    const root = document.querySelector('html');
    root.classList.add('template1')
  }, [])

  return (
    <div>
      <div className="mv">
        <div className="detail">
          <p className="detail__text">
            <LazyLoad duration={startDetailAnim + 400}><EnterText>Front-end Development</EnterText><br/></LazyLoad>
            <LazyLoad duration={startDetailAnim + 800}><EnterText>Web Design</EnterText><br/></LazyLoad>
            <LazyLoad duration={startDetailAnim + 1200}><a href="mailto:info&#64;nodel.jp" target="_blank" rel="noopener noreferrer"><EnterText>contact</EnterText></a></LazyLoad>
          </p>
        </div>
        <div className="skill">
          <ul className="skill__list">
            <LazyLoad duration={startSkillAnim}><li className="skill__item"><EnterText>HTML / CSS</EnterText></li></LazyLoad>
            <LazyLoad duration={startSkillAnim + 400}><li className="skill__item"><EnterText>TypeScript</EnterText></li></LazyLoad>
            <LazyLoad duration={startSkillAnim + 800}><li className="skill__item"><EnterText>JavaScript</EnterText></li></LazyLoad>
            <LazyLoad duration={startSkillAnim + 1000}><li className="skill__item"><EnterText>Next.js</EnterText></li></LazyLoad>
            <LazyLoad duration={startSkillAnim + 1200}><li className="skill__item"><EnterText>React / Vue</EnterText></li></LazyLoad>
            <LazyLoad duration={startSkillAnim + 1400}><li className="skill__item"><EnterText>jQuery</EnterText></li></LazyLoad>
            <LazyLoad duration={startSkillAnim + 1600}><li className="skill__item"><EnterText>etc...</EnterText></li></LazyLoad>
          </ul>
        </div>
        <div className='scroll'>
          <LazyLoad duration={startSkillAnim + 2400}><EnterText>scroll down ↓</EnterText></LazyLoad>
        </div>
      </div>
      <div className="logo-container">
        <LogoBg />
      </div>
      <div className="canvas-container">
        <ParticleBg />
      </div>
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

export default Template1;
