import create from 'zustand';

import {generateId} from '../helpers';

interface Task {
    id: string;
    title:string;
    createdAt: number;
}

interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
}

export const userToDoStore = create<ToDoStore>((set, get)=>  ({
    tasks: [
        {
            id: 'egerge',
            title: 'My default task',
            createdAt: 23421
        },
        {
            id: 'sfege',
            title: 'My default task 2',
            createdAt: 235421
        },
    ],
    createTask: (title) => {
        const {tasks} = get();
        const newTask = {
            id: generateId(),
            title,
            createdAt: Date.now(),
        }

        set({
            tasks: [newTask].concat(tasks),
        })
    },
    updateTask: (id:string, title:string) => {
        const { tasks } = get();
        set({
            tasks: tasks.map((task)=> ({
                ...task,
                title: task.id === id ? title : task.title,
            }))
        });
    },
    removeTask: (id: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.filter((task)=> task.id !== id)
        });
    },
        
}));