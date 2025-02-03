import React from 'react';
import { Helmet } from 'react-helmet-async';
import '../styles/HomePage.css';
import { useTheme } from '../context/ThemeContext';

export const HomePage: React.FC = () => {
    const { theme } = useTheme();

    return (
        <main>
            <Helmet>
                <title>Главная</title>
            </Helmet>

            <h1 className={`h1 ${theme}`}>Привет, меня зовут Матвей!</h1>

            <img className="img-profile" src="/assets/images/photo.jpg" alt="Profile"/>

            <img className="decoration-image top-left" src="/assets/images/sph.png" alt="Decoration 1"/>
            <img className="decoration-image bottom-right" src="/assets/images/sph.png" alt="Decoration 2"/>
        </main>
    );
};
