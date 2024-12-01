import React from 'react';
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">ГЛАВНАЯ</Link></li>
                </ul>
            </nav>
            <nav>
                <ul>
                    <li><Link to="/about">ОБО МНЕ</Link></li>
                    <li><Link to="/skills">СКИЛЛЫ</Link></li>
                    <li><Link to="/projects">ПРОЕКТЫ</Link></li>
                </ul>
            </nav>
            <nav>
                <ul>
                    <li><Link to="/contact">КОНТАКТЫ</Link></li>
                </ul>
            </nav>
        </header>
    );
};
