import React from 'react';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page">
      <h1>About Bowling Simulator</h1>
      
      <section className="about-section">
        <h2>Project</h2>
        <p>
          This bowling simulator allows users to simulate bowling games and calculate scores.
          <br />
          <strong>Github: </strong>
        </p>
      </section>

      <section className="about-section">
        <h2>Tech Stack</h2>
        <div className="tech-stack">
          <div className="tech-card">
            <h3>Frontend</h3>
            <ul>
              <li><strong>React</strong></li>
              <li><strong>React Router</strong></li>
              <li><strong>CSS3</strong></li>
            </ul>
          </div>
          
          <div className="tech-card">
            <h3>API Layer</h3>
            <ul>
              <li><strong>RESTful API</strong></li>
              <li><strong>JSON</strong></li>
              <li><strong>CORS</strong></li>
            </ul>
          </div>
          
          <div className="tech-card">
            <h3>Backend</h3>
            <ul>
              <li><strong>Node.js</strong></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>API Endpoints</h2>
        <table className="api-table">
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Method</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>/api/simulateRoll</td>
              <td>POST</td>
              <td>Simulates a single bowling roll</td>
            </tr>
            <tr>
              <td>/api/simulateGame</td>
              <td>POST</td>
              <td>Simulates an entire bowling game</td>
            </tr>
            <tr>
              <td>/api/resetGame</td>
              <td>POST</td>
              <td>Resets the game state</td>
            </tr>
            <tr>
              <td>/api/undoRoll</td>
              <td>POST</td>
              <td>Undoes the last roll</td>
            </tr>
            <tr>
              <td>/api/gameState</td>
              <td>GET</td>
              <td>Retrieves the current game state</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AboutPage;