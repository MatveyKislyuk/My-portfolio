import { createSlice, PayloadAction,createAsyncThunk  } from '@reduxjs/toolkit';
import { fetchRepos } from '../services/githubService';
import { Project } from '../types/Project';

// Определяем тип состояния
interface ProjectsState {
    items: Project[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Начальное состояние
const initialState: ProjectsState = {
    items: [],
    status: 'idle',
    error: null,
};

export const fetchProjectsFromGitHub = createAsyncThunk(
    'projects/fetchFromGitHub',
    async (username: string, { rejectWithValue }) => {
        try {
            const projects: Project[] = await fetchRepos(username);
            return projects;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Создаем slice
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
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProjectsFromGitHub.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProjectsFromGitHub.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },

});


export const { setProjects, addProject } = projectsSlice.actions;
export default projectsSlice.reducer;
