import React, { useState, useEffect } from 'react';
import './css/App.scss';
import Template1 from './components/Template1'
import Template2 from './components/Template2'
import Template3 from './components/Template3'
import Template4 from './components/Template4'

function App() {
  const [templateType, setTemplateType] = useState();

  useEffect(() => {
    setTemplateType(Math.floor(Math.random() * 4) + 1)
  }, []);

  return (
    <div className="app">
      {templateType === 1 && <Template1 />}
      {templateType === 2 && <Template2 />}
      {templateType === 3 && <Template3 />}
      {templateType === 4 && <Template4 />}
      <div className="company-info">
        <table>
          <tbody>
            <tr>
              <th>社名</th><td>株式会社nodel（ノデル）<br />nodel inc.</td>
            </tr>
            <tr>
              <th>所在地</th><td>東京都西東京市南町5丁目3-5 サウスタウン201</td>
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
              <th>事業<br />内容</th>
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
      <div className='copyright'>2025, nodel inc.</div>
      <div className='reload'>
        <button onClick={(e) => {
          e.preventDefault();
          window.location.reload();
        }}>次はどんな雰囲気？</button>
      </div>
    </div>
  );
}

export default App;
