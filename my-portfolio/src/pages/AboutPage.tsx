import React from 'react';
import {Helmet} from "react-helmet-async";
import '../styles/AboutPage.css';

export const AboutPage: React.FC = () => {
    return (
        <main>
            <Helmet>

                <title>Обо мне</title>

            </Helmet>

            <h1>ОБО МНЕ</h1>

            <p>Просто чилловый парень из г. Владивосток</p>
            <p>Обучаюсьсь в Дальневочточном Федеральном Университете (FEFU)</p>
            <p>По направлению Прикладная математика и информатика</p>
            <p>Работаю в Департаменте Довузовского Образования</p>
            <p>В свободное время люблю ходить в зальчик и кушать вкусную еду!</p>

            <img className="img-chill" src="/assets/images/Chill.jpg" alt="Profile"/>

            <img className="decoration-image bottom-left" src="/assets/images/sph.png" alt="Decoration 1"/>
            <img className="decoration-image top-right" src="/assets/images/sph.png" alt="Decoration 2"/>

        </main>
    );
};
