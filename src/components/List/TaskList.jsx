/* eslint-disable no-nested-ternary */
import { getDatabase, ref, remove, set } from 'firebase/database';
import React, { useEffect, useReducer, useState } from 'react';
import Card from '../Card';

const initialState = [];
const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT_STATE': {
            const newState = Object.keys(action.value).map((key) => {
                const task = action.value[key];
                const { title, id, tags, isCompleted, description } = task;

                return { title, description, id, tags, isCompleted };
            });

            return newState;
        }

        case 'CLEAR_STATE': {
            return [];
        }

        default:
            return state;
    }
};

const TaskList = ({ uid, projectId, updateForm, openModal, filter, status, query, taskdata }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [modifiedState, setModifiedState] = useState([]);

    // INIT STATE
    useEffect(() => {
        if (taskdata) {
            dispatch({
                type: 'INIT_STATE',
                value: taskdata,
            });
        }

        // CLEAN UP
        return () => {
            dispatch({ type: 'CLEAR_STATE' });
        };
    }, [taskdata]);

    // MODIFY STATE
    useEffect(() => {
        if (state.length) {
            const newModifiedState = state.filter((task) => {
                const conditon = { filter: false, status: false, query: false };

                if (status === 'all') {
                    conditon.status = true;
                } else if (status === 'completed' && task.isCompleted) {
                    conditon.status = true;
                } else if (status === 'pending' && !task.isCompleted) {
                    conditon.status = true;
                } else {
                    conditon.status = false;
                }

                if (filter === 'all') {
                    conditon.filter = true;
                } else if (filter === 'research' && task.tags.research) {
                    conditon.filter = true;
                } else if (filter === 'dev' && task.tags.dev) {
                    conditon.filter = true;
                } else if (filter === 'debug' && task.tags.debug) {
                    conditon.filter = true;
                } else {
                    conditon.filter = false;
                }

                if (query.length === 0) {
                    conditon.query = true;
                } else if (task.title.includes(query)) {
                    conditon.query = true;
                } else {
                    conditon.query = false;
                }

                return conditon.filter && conditon.status && conditon.query;
            });

            setModifiedState(newModifiedState);
        }
    }, [filter, query, state, status]);

    // DELETE TODO
    const deleteItem = async (id) => {
        const db = getDatabase();
        const deleteRef = ref(db, `/users/${uid}/projects/${projectId}/tasks/${id}`);

        await remove(deleteRef);
    };

    // UPDATE TODO
    const editItem = (id, title, description, tags) => {
        updateForm({
            formData: { title, description, tags },
            formAction: 'edit',
            formType: 'task',
            projectId,
            taskId: id,
        });
        openModal();
    };

    const toggleCompleted = async (task) => {
        const selectedTask = { ...task };
        selectedTask.isCompleted = !task.isCompleted;
        const db = getDatabase();
        const taskRef = ref(db, `/users/${uid}/projects/${projectId}/tasks/${task.id}`);

        try {
            await set(taskRef, selectedTask);
            console.log('changed');
        } catch (error) {
            console.log(error);
        }
    };

    if (!modifiedState.length && taskdata) {
        return <>no more pojects. create new one</>;
    }

    if (!taskdata) {
        return <>there are no tasks. create new please</>;
    }

    if (modifiedState.length) {
        return modifiedState.map((task) => (
            <Card
                editItem={() => editItem(task.id, task.title, task.description, task.tags)}
                deleteItem={() => deleteItem(task.id)}
                title={task.title}
                description={task.description}
                key={task.id}
                tags={task.tags}
                id={task.id}
                checked={task.isCompleted}
                handleCheck={() => toggleCompleted(task)}
            />
        ));
    }

    return <>loading</>;
};

export default TaskList;
