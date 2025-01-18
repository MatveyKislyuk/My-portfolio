import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addProject } from '../store/projectsSlice';
import { Project } from '../types/Project';
import { v4 as uuidv4 } from 'uuid';
import { useForm, Controller } from 'react-hook-form';
import '../styles/ProjectsPage.css';

export const ProjectsPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const projects = useSelector((state: RootState) => state.projects.items);

    const [selectedTech, setSelectedTech] = useState<string>('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);

    const { handleSubmit, control, formState: { errors }, setValue, getValues, reset } = useForm<Project>({
        defaultValues: {
            title: '',
            description: '',
            link: '',
            technologies: [],
        },
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

    const handleTechnologySelect = (value: string) => {
        setValue("technologies", [...getValues("technologies"), value]);
    };

    const removeTechnology = (tech: string) => {
        const updatedTechnologies = getValues("technologies").filter((t: string) => t !== tech);
        setValue("technologies", updatedTechnologies);
    };

    const onSubmit = (data: Project) => {
        dispatch(addProject({ ...data, id: uuidv4() }));
        reset();
        setIsFormModalOpen(false);
    };

    const filteredProjects = useMemo(() => {
        return projects.filter((project) =>
            selectedTech === 'All' ? true : project.technologies.includes(selectedTech)
        );
    }, [projects, selectedTech]);

    const closeModal = () => {
        setSelectedProject(null);
    };

    return (
        <main>
            <h1>ПРОЕКТЫ</h1>

            <button onClick={() => setIsFormModalOpen(true)} className="add-project-button">
                Добавить проект
            </button>

            {isFormModalOpen && (
                <div className="modal-overlay" onClick={() => setIsFormModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setIsFormModalOpen(false)}>
                            &times;
                        </button>
                        <h2>Добавить проект</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name="title"
                                control={control}
                                rules={{ required: 'Название проекта обязательно' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Название проекта"
                                    />
                                )}
                            />
                            {errors.title && <span>{errors.title.message}</span>}

                            <Controller
                                name="description"
                                control={control}
                                rules={{ required: 'Описание проекта обязательно' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Описание проекта"
                                    />
                                )}
                            />
                            {errors.description && <span>{errors.description.message}</span>}

                            <Controller
                                name="link"
                                control={control}
                                rules={{ required: 'Ссылка на проект обязательна' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Ссылка на проект"
                                    />
                                )}
                            />
                            {errors.link && <span>{errors.link.message}</span>}

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
                                {getValues("technologies").map((tech) => (
                                    <span key={tech} className="technology-tag">
                                        {tech}
                                        <button onClick={() => removeTechnology(tech)}>&times;</button>
                                    </span>
                                ))}
                            </div>

                            <button type="submit">Добавить проект</button>
                        </form>
                    </div>
                </div>
            )}

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
