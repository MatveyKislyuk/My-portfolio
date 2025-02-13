import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import '../styles/ContactPage.css';
import { useTheme } from '../context/ThemeContext';


interface Errors {
    name?: string;
    email?: string;
    message?: string;
}

export const ContactPage: React.FC = () => {

    const { theme } = useTheme();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [errors, setErrors] = useState<Errors>({});
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);


    const validateForm = (): Errors => {
        const newErrors: Errors = {};

        if (!name) newErrors.name = 'Введите имя.';
        if (!email) {
            newErrors.email = 'Введите email.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Введите корректный email.';
        }
        if (!message) newErrors.message = 'Введите сообщение.';

        return newErrors;
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setIsSubmitted(true);

        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <main>
            <Helmet>
                <title>Контакты</title>
            </Helmet>

            <h1 className={`h1 ${theme}`}>Свяжитесь с нами</h1>

            <form onSubmit={handleSubmit} className="contact-form">
                <h2>Форма обратной связи</h2>
                {isSubmitted && <p className="success-message">Спасибо! Ваше сообщение отправлено.</p>}
                <div>
                    <label>Имя:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div>
                    <label>Сообщение:</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    {errors.message && <p className="error">{errors.message}</p>}
                </div>
                <button type="submit">Отправить</button>
            </form>
        </main>
    );
};
