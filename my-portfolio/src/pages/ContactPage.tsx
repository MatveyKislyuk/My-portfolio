import React from 'react';
import { Helmet } from 'react-helmet-async';
import '../styles/ContactPage.css';
import {FaGithub, FaInstagram, FaTelegramPlane, FaTiktok, FaWhatsapp, FaYoutube} from "react-icons/fa";

export const ContactPage: React.FC = () => {
    return (
        <main>
            <Helmet>
                <title>Контакты</title>
            </Helmet>

            <h1>КОНТАКТЫ</h1>

            <div className="integrations-container">
                <div className="integration-box" id="github">
                    <a href="https://github.com/MatveyKislyuk" target="_blank">
                        <FaGithub size={80}/>
                    </a>
                </div>

                <div className="integration-box" id="tiktok">
                    <a href="https://www.tiktok.com/@stoppedqrsz?is_from_webapp=1&sender_device=pc" target="_blank">
                        <FaTiktok size={80}/>
                    </a>
                </div>

                <div className="integration-box" id="phone">
                    <a href="https://t.me/kurtz005" target="_blank">
                        <FaTelegramPlane size={80}/>
                    </a>
                </div>

                <div className="integration-box" id="instagram">
                    <a href="/" target="_blank">
                        <FaInstagram size={80}/>
                    </a>
                </div>

                <div className="integration-box" id="whatsapp">
                    <a href="/" target="_blank">
                        <FaWhatsapp size={80}/>
                    </a>
                </div>

                <div className="integration-box" id="youtube">
                    <a href="/" target="_blank">
                        <FaYoutube size={80}/>
                    </a>
                </div>
            </div>
        </main>
    );
};
