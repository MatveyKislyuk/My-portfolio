import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRepos } from '../services/githubService';
import { Project } from '../types/Project';

export enum ProjectStatus {
    Idle = 'idle',
    Loading = 'loading',
    Succeeded = 'succeeded',
    Failed = 'failed',
}

interface ProjectsState {
    items: Project[];
    status: ProjectStatus;
    error: string | null;
}

const initialState: ProjectsState = {
    items: [],
    status: ProjectStatus.Idle,
    error: null,
};



export const fetchProjectsFromGitHub = createAsyncThunk<Project[], string, { rejectValue: string }>(
    'projects/fetchFromGitHub',
    async (username: string, { rejectWithValue }) => {
        try {
            const projects: Project[] = await fetchRepos(username);
            return projects;
        } catch (error: any) {
            return rejectWithValue('Не удалось загрузить репозитории с GitHub');
        }
    }
);

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects(state, action: PayloadAction<Project[]>) {
            state.items = action.payload;
        },
        addProject(state, action: PayloadAction<Project>) {
            state.items.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectsFromGitHub.pending, (state) => {
                state.status = ProjectStatus.Loading;
                state.error = null;
            })
            .addCase(fetchProjectsFromGitHub.fulfilled, (state, action) => {
                state.status = ProjectStatus.Succeeded;
                state.items = action.payload;
            })
            .addCase(fetchProjectsFromGitHub.rejected, (state, action) => {
                state.status = ProjectStatus.Failed;
                state.error = action.payload as string;
            });
    },
});

export const { setProjects, addProject } = projectsSlice.actions;
export default projectsSlice.reducer;
