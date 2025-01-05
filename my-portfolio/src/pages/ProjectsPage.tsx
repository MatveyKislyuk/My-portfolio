import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { projects } from '../data/projects';
import { Project } from '../types/Project';
import '../styles/ProjectsPage.css';

export const ProjectsPage: React.FC = () => {
    const [selectedTech, setSelectedTech] = useState<string>('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filteredProjects = projects.filter((project) =>
        selectedTech === 'All' ? true : project.technologies.includes(selectedTech)
    );

    const closeModal = () => {
        setSelectedProject(null);
    };

    return (
        <main>
            <Helmet>
                <title>Проекты</title>
            </Helmet>

            <h1>ПРОЕКТЫ</h1>

            {}
            <div className="filter-container">
                <label htmlFor="technology-filter">Фильтр по технологии:</label>
                <select
                    id="technology-filter"
                    value={selectedTech}
                    onChange={(e) => setSelectedTech(e.target.value)}
                >
                    <option value="All">Все</option>
                    <option value="React">React</option>
                    <option value="TypeScript">TypeScript</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Node.js">Node.js</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="Python">Python</option>
                </select>
            </div>

            {}
            <div className="projects-container">
                {filteredProjects.map((project) => (
                    <div
                        key={project.id}
                        className="project-card"
                        onClick={() => setSelectedProject(project)}
                    >
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                        <p>
                            <strong>Технологии:</strong> {project.technologies.join(', ')}
                        </p>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                            Открыть проект
                        </a>
                    </div>
                ))}
            </div>

            {}
            {selectedProject && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            &times;
                        </button>
                        <h2>{selectedProject.title}</h2>
                        <p>{selectedProject.description}</p>
                        <p>
                            <strong>Технологии:</strong> {selectedProject.technologies.join(', ')}
                        </p>
                        <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                            Перейти к проекту
                        </a>
                    </div>
                </div>
            )}
        </main>
    );
};
