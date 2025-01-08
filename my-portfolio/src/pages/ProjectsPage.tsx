import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addProject } from '../store/projectsSlice';
import { Project } from '../types/Project';
import '../styles/ProjectsPage.css';

export const ProjectsPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const projects = useSelector((state: RootState) => state.projects.items);

    const [selectedTech, setSelectedTech] = useState<string>('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);

    const [newProject, setNewProject] = useState<Project>({
        id: Date.now(),
        title: '',
        description: '',
        technologies: [],
        link: '',
    });

    const availableTechnologies = [
        'React',
        'TypeScript',
        'JavaScript',
        'Node.js',
        'HTML',
        'CSS',
        'Python',
    ];

    const handleInputChange = (field: keyof Project, value: string) => {
        setNewProject((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleTechnologySelect = (value: string) => {
        if (!newProject.technologies.includes(value)) {
            setNewProject((prev) => ({
                ...prev,
                technologies: [...prev.technologies, value],
            }));
        }
    };

    const removeTechnology = (tech: string) => {
        setNewProject((prev) => ({
            ...prev,
            technologies: prev.technologies.filter((t) => t !== tech),
        }));
    };

    const handleAddProject = () => {
        if (newProject.title && newProject.description && newProject.technologies.length && newProject.link) {
            dispatch(addProject({ ...newProject, id: Date.now() }));
            setNewProject({ id: Date.now(), title: '', description: '', technologies: [], link: '' });
            setIsFormModalOpen(false);
        }
    };

    const filteredProjects = projects.filter((project) =>
        selectedTech === 'All' ? true : project.technologies.includes(selectedTech)
    );

    const closeModal = () => {
        setSelectedProject(null);
    };

    return (
        <main>
            <h1>ПРОЕКТЫ</h1>

            {/* Кнопка для открытия формы */}
            <button onClick={() => setIsFormModalOpen(true)} className="add-project-button">
                Добавить проект
            </button>

            {/* Модальное окно для формы */}
            {isFormModalOpen && (
                <div className="modal-overlay" onClick={() => setIsFormModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setIsFormModalOpen(false)}>
                            &times;
                        </button>
                        <h2>Добавить проект</h2>
                        <input
                            type="text"
                            placeholder="Название проекта"
                            value={newProject.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Описание проекта"
                            value={newProject.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Ссылка на проект"
                            value={newProject.link}
                            onChange={(e) => handleInputChange('link', e.target.value)}
                        />

                        <label htmlFor="technology-select">Выберите технологии:</label>
                        <select
                            id="technology-select"
                            onChange={(e) => handleTechnologySelect(e.target.value)}
                            value=""
                        >
                            <option value="" disabled>
                                Добавить технологию
                            </option>
                            {availableTechnologies.map((tech) => (
                                <option key={tech} value={tech}>
                                    {tech}
                                </option>
                            ))}
                        </select>

                        <div className="selected-technologies">
                            {newProject.technologies.map((tech) => (
                                <span key={tech} className="technology-tag">
                                    {tech}
                                    <button onClick={() => removeTechnology(tech)}>&times;</button>
                                </span>
                            ))}
                        </div>

                        <button onClick={handleAddProject}>Добавить проект</button>
                    </div>
                </div>
            )}

            {/* Фильтр по технологиям */}
            <div className="filter-container">
                <label htmlFor="technology-filter">Фильтр по технологии:</label>
                <select
                    id="technology-filter"
                    value={selectedTech}
                    onChange={(e) => setSelectedTech(e.target.value)}
                >
                    <option value="All">Все</option>
                    {availableTechnologies.map((tech) => (
                        <option key={tech} value={tech}>
                            {tech}
                        </option>
                    ))}
                </select>
            </div>

            {/* Список проектов */}
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

            {/* Модальное окно для проекта */}
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
