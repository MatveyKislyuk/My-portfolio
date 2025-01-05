import { Project } from '../types/Project';

export const projects: Project[] = [
    {
        id: 1,
        title: 'ImageChanger_Client-Server',
        description: 'ImageChangerServer is a lightweight server application designed to ' +
            'facilitate real-time image changes. Developed by Matvey Kislyuk, this server allows ' +
            'multiple clients to connect and interactively update the displayed image.',
        technologies: ['Python'],
        link: 'https://github.com/MatveyKislyuk/ImageChanger_Client-Server',
    },
    {
        id: 2,
        title: 'kislyuk.ru',
        description: 'Добро пожаловать на мою визитку! Этот проект представляет собой статический сайт, созданный для того, ' +
            'чтобы поделиться информацией о моем опыте, навыках и проектах.',
        technologies: ['HTML', 'CSS'],
        link: 'https://github.com/MatveyKislyuk/kislyuk.ru',
    },
    {
        id: 3,
        title: 'My-portfolio',
        description: 'Мое портфолио',
        technologies: ['HTML', 'CSS', 'TypeScript', 'React'],
        link: 'https://github.com/MatveyKislyuk/My-portfolio',
    },
];
