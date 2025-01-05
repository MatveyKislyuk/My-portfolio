import React from 'react';
import {FaBlenderPhone, FaGithub, FaTelegramPlane, FaTiktok} from 'react-icons/fa';

export const Footer: React.FC = () => {
    return (
        <footer>
            <div className="content">
                <a href="https://github.com/MatveyKislyuk" target="_blank">
                    <FaGithub size={35}/>
                </a>
                <a href="https://t.me/kurtz005" target="_blank">
                    <FaTelegramPlane size={35}/>
                </a>
                <a href="https://www.tiktok.com/@stoppedqrsz?is_from_webapp=1&sender_device=pc" target="_blank">
                    <FaTiktok size={35}/>
                </a>
                <a href="tel:+79244054807" target="_blank">
                    <FaBlenderPhone size={35}/>
                </a>
            </div>
        </footer>
    );
};
