import React from 'react';
import { Link } from "react-router-dom";
import { useTheme } from '../context/ThemeContext';
import { motion } from "framer-motion";
import { buttonHoverAnimation, themeIconAnimation } from '../animations/Animations';

export const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={`header ${theme}`}>
            <nav className={`nav ${theme}`}>
                <ul>
                    <li><Link to="/">ГЛАВНАЯ</Link></li>
                </ul>

                <ul>
                    <li><Link to="/about">ОБО МНЕ</Link></li>
                    <li><Link to="/skills">СКИЛЛЫ</Link></li>
                    <li><Link to="/projects">ПРОЕКТЫ</Link></li>
                </ul>

                <ul>
                    <li><Link to="/contact">КОНТАКТЫ</Link></li>
                </ul>

                <motion.button onClick={toggleTheme} className="theme-toggle" {...buttonHoverAnimation}>
                    <motion.span key={theme} {...themeIconAnimation}>
                        {theme === 'dark' ? '🌙' : '☀️'}
                    </motion.span>
                </motion.button>
            </nav>
        </header>
    );
};
