import React from 'react';
import './HomePage.css';
import bowlingImage from '../images/bowling.jpg';


function HomePage() {

    const handleSimulationClick = () => {
        window.location.href = '/simulation';
    }

    return (
        <div className="home-page">
            <div className="home-page-intro">
                <h1>Bowling simulator</h1>
            </div>
            <section className="simulation-section">
                <p>
                    <img src={bowlingImage} alt="Bowling" className="bowling-image" />
                    <br />
                    <button type="button" onClick={handleSimulationClick}>Simulate</button>
                </p>
            </section>
        </div>
    );
}

export default HomePage;