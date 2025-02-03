import React from 'react';
import {Helmet} from "react-helmet-async";
import '../styles/SkillsPage.css';
import { useTheme } from '../context/ThemeContext';

export const SkillsPage: React.FC = () => {
    const { theme } = useTheme();
    return (
        <main>
            <Helmet>
                <title>Скиллы</title>
            </Helmet>

            <h1 className={`h1 ${theme}`}>СКИЛЛЫ</h1>

            <div className={`skills ${theme}`}>
                <div className="skill">
                    <span className="label" >OpenAI:</span>
                    <div className={`progress-bar ${theme}`}>
                        <div className={`progress ${theme}`} style={{width: "100%"}}></div>
                    </div>
                    <span className="percentage">100%</span>
                </div>

                <div className="skill">
                    <span className="label">Python:</span>
                    <div className={`progress-bar ${theme}`}>
                        <div className={`progress ${theme}`} style={{width: "40%"}}></div>
                    </div>
                    <span className="percentage">40%</span>
                </div>

                <div className="skill">
                    <span className="label">React:</span>
                    <div className={`progress-bar ${theme}`}>
                        <div className={`progress ${theme}`} style={{width: "30%"}}></div>
                    </div>
                    <span className="percentage">30%</span>
                </div>

                <div className="skill">
                    <span className="label">Ps:</span>
                    <div className={`progress-bar ${theme}`}>
                        <div className={`progress ${theme}`} style={{width: "70%"}}></div>
                    </div>
                    <span className="percentage">70%</span>
                </div>

                <div className="skill">
                    <span className="label">C++:</span>
                    <div className={`progress-bar ${theme}`}>
                        <div className={`progress ${theme}`} style={{width: "55%"}}></div>
                    </div>
                    <span className="percentage">55%</span>
                </div>

                <div className="skill">
                    <span className="label">Ai:</span>
                    <div className={`progress-bar ${theme}`}>
                        <div className={`progress ${theme}`} style={{width: "58%"}}></div>
                    </div>
                    <span className="percentage">58%</span>
                </div>
            </div>

        </main>
    );
};
