import axios from 'axios';
import { Project } from '../types/Project';

const GITHUB_API_URL = 'https://api.github.com';
const DEFAULT_DESCRIPTION = 'Описание не указано';
const ERROR_FETCH_LANGUAGES = 'Ошибка при загрузке языков для репозитория';
const ERROR_FETCH_REPOS = 'Не удалось загрузить репозитории с GitHub. Проверьте имя пользователя и токен.';
const ERROR_GENERAL_FETCH = 'Ошибка при загрузке репозиториев с GitHub';

interface GitHubRepo {
    id: string;
    name: string;
    description: string | null;
    html_url: string;
}

export const fetchRepos = async (username: string, token?: string): Promise<Project[]> => {
    try {
        const response = await axios.get<GitHubRepo[]>(`${GITHUB_API_URL}/users/${username}/repos`, {
            headers: token ? { Authorization: `token ${token}` } : {},
        });

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
    const response = await axios.get<Record<string, number>>(
        `${GITHUB_API_URL}/repos/${username}/${repoName}/languages`
    );

    return Object.keys(response.data);
};