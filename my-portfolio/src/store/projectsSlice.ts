import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../types/Project'; // Убедитесь, что файл Project.ts существует

// Определяем тип состояния
interface ProjectsState {
    items: Project[];
}

// Начальное состояние
const initialState: ProjectsState = {
    items: [],
};

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
});


export const { setProjects, addProject } = projectsSlice.actions;
export default projectsSlice.reducer;
