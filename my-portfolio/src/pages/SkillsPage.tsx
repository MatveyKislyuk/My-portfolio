import React from 'react';
import {Helmet} from "react-helmet-async";
import '../styles/SkillsPage.css';

export const SkillsPage: React.FC = () => {
    return (
        <main>
            <Helmet>
                <title>Скиллы</title>
            </Helmet>

            <h1>СКИЛЛЫ</h1>

            <div className="skills">
                <div className="skill">
                    <span className="label">OpenAI:</span>
                    <div className="progress-bar">
                        <div className="progress" style={{width: "100%"}}></div>
                    </div>
                    <span className="percentage">100%</span>
                </div>

                <div className="skill">
                    <span className="label">Python:</span>
                    <div className="progress-bar">
                        <div className="progress" style={{width: "40%"}}></div>
                    </div>
                    <span className="percentage">40%</span>
                </div>

                <div className="skill">
                    <span className="label">React:</span>
                    <div className="progress-bar">
                        <div className="progress" style={{width: "30%"}}></div>
                    </div>
                    <span className="percentage">30%</span>
                </div>

                <div className="skill">
                    <span className="label">Ps:</span>
                    <div className="progress-bar">
                        <div className="progress" style={{width: "70%"}}></div>
                    </div>
                    <span className="percentage">70%</span>
                </div>

                <div className="skill">
                    <span className="label">C++:</span>
                    <div className="progress-bar">
                        <div className="progress" style={{width: "55%"}}></div>
                    </div>
                    <span className="percentage">55%</span>
                </div>

                <div className="skill">
                    <span className="label">Ai:</span>
                    <div className="progress-bar">
                        <div className="progress" style={{width: "58%"}}></div>
                    </div>
                    <span className="percentage">58%</span>
                </div>
            </div>

        </main>
    );
};
