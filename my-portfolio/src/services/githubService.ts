import axios from 'axios';
import { Project } from '../types/Project';

const DEFAULT_DESCRIPTION = 'Описание не указано';
const ERROR_FETCH_LANGUAGES = 'Ошибка при загрузке языков для репозитория';
const ERROR_FETCH_REPOS = 'Не удалось загрузить репозитории с GitHub. Проверьте имя пользователя и токен.';
const ERROR_GENERAL_FETCH = 'Ошибка при загрузке репозиторов с GitHub';


const axiosInstance = axios.create({
    baseURL: 'https://api.github.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

interface GitHubRepo {
    id: string;
    name: string;
    description: string | null;
    html_url: string;
}

export const fetchRepos = async (username: string, token?: string): Promise<Project[]> => {
    if (!username || username.trim() === '') {
        throw new Error('Имя пользователя не может быть пустым.');
    }

    try {
        if (token) {
            axiosInstance.defaults.headers.common['Authorization'] = `token ${token}`;
        } else {
            delete axiosInstance.defaults.headers.common['Authorization'];
        }

        const response = await axiosInstance.get<GitHubRepo[]>(`/users/${username}/repos`);

        const repos = response.data;

        const projects: Project[] = await Promise.all(
            repos.map(async (repo) => {
                try {
                    const languages = await fetchRepoLanguages(username, repo.name);

                    return {
                        id: repo.id,
                        title: repo.name,
                        description: repo.description || DEFAULT_DESCRIPTION,
                        technologies: languages,
                        link: repo.html_url,
                    };
                } catch (error) {
                    console.error(`${ERROR_FETCH_LANGUAGES} "${repo.name}":`, error);
                    return {
                        id: repo.id,
                        title: repo.name,
                        description: repo.description || DEFAULT_DESCRIPTION,
                        technologies: [],
                        link: repo.html_url,
                    };
                }
            })
        );

        return projects;
    } catch (error) {
        console.error(ERROR_GENERAL_FETCH, error);
        throw new Error(ERROR_FETCH_REPOS);
    }
};

const fetchRepoLanguages = async (username: string, repoName: string): Promise<string[]> => {
    try {
        const response = await axiosInstance.get<Record<string, number>>(
            `/repos/${username}/${repoName}/languages`
        );
        return Object.keys(response.data);
    } catch (error) {
        console.error(`Ошибка при загрузке языков для репозитория "${repoName}":`, error);
        return [];
    }
};
