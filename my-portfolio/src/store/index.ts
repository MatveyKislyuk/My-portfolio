import { configureStore } from '@reduxjs/toolkit';
import projectsReducer, {ProjectStatus} from './projectsSlice';


const preloadedState = {
    projects: {
        items: JSON.parse(localStorage.getItem('projects') || '[]'),
        status: ProjectStatus.Idle,
        error: null,
    },
};


export const store = configureStore({
    reducer: {
        projects: projectsReducer,
    },
    preloadedState,
});


store.subscribe(() => {
    localStorage.setItem('projects', JSON.stringify(store.getState().projects.items));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
