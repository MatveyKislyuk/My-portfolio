import React from 'react';
import {Helmet} from "react-helmet-async";
import '../styles/AboutPage.css';
import { useTheme } from '../context/ThemeContext';

export const AboutPage: React.FC = () => {

    const { theme } = useTheme();
    return (
        <main>
            <Helmet>

                <title>Обо мне</title>

            </Helmet>

            <h1 className={`h1 ${theme}`}>ОБО МНЕ</h1>

            <p className={`p ${theme}`}>Просто чилловый парень из г. Владивосток</p>
            <p className={`p ${theme}`}>Обучаюсьсь в Дальневочточном Федеральном Университете (FEFU)</p>
            <p className={`p ${theme}`}>По направлению Прикладная математика и информатика</p>
            <p className={`p ${theme}`}>Работаю в Департаменте Довузовского Образования</p>
            <p className={`p ${theme}`}>В свободное время люблю ходить в зальчик и кушать вкусную еду!</p>

            <img className="img-chill" src="/assets/images/Chill.jpg" alt="Profile"/>

            <img className="decoration-image bottom-left" src="/assets/images/sph.png" alt="Decoration 1"/>
            <img className="decoration-image top-right" src="/assets/images/sph.png" alt="Decoration 2"/>

        </main>
    );
};
