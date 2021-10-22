/* eslint-disable no-nested-ternary */
import { getDatabase, ref, remove } from 'firebase/database';
import React, { useEffect, useReducer, useState } from 'react';
import useProjects from '../../hooks/useProjects';
import Card from '../Card';

const initialState = [];
const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT_STATE': {
            const newState = Object.keys(action.value).map((key) => {
                const tasks = action.value[key].tasks ? action.value[key].tasks : {};
                const tasksKeys = Object.keys(tasks);
                const completedItem = tasksKeys.length
                    ? tasksKeys.reduce(
                          (prevValue, currentValue) =>
                              tasks[currentValue].isCompleted ? prevValue + 1 : prevValue,
                          0
                      )
                    : 0;

                const research = tasksKeys.length
                    ? tasksKeys.reduce(
                          (prevValue, currentValue) =>
                              tasks[currentValue].tags.research ? prevValue + 1 : prevValue,
                          0
                      )
                    : 0;

                const dev = tasksKeys.length
                    ? tasksKeys.reduce(
                          (prevValue, currentValue) =>
                              tasks[currentValue].tags.dev ? prevValue + 1 : prevValue,
                          0
                      )
                    : 0;

                const debug = tasksKeys.length
                    ? tasksKeys.reduce(
                          (prevValue, currentValue) =>
                              tasks[currentValue].tags.debug ? prevValue + 1 : prevValue,
                          0
                      )
                    : 0;

                const { title, description, id } = action.value[key];

                const completeRate = completedItem ? (completedItem * 100) / tasksKeys.length : 0;

                return {
                    title,
                    description,
                    id,
                    completeRate,
                    info: tasksKeys.length ? { research, dev, debug } : null,
                    status: completeRate < 100 ? 'pending' : 'completed',
                };
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

const ProjectList = ({ uid, status, query, updateForm, openModal }) => {
    const { loading, errors, projects } = useProjects(uid);
    const [modifiedState, setModifiedState] = useState([]);

    const [state, dispatch] = useReducer(reducer, initialState);

    // INIT STATE
    useEffect(() => {
        if (projects) {
            dispatch({
                type: 'INIT_STATE',
                value: projects,
            });
        }

        // CLEAN UP
        return () => {
            dispatch({ type: 'CLEAR_STATE' });
        };
    }, [projects]);

    // INIT MODIFIED STATE
    useEffect(() => {
        if (state.length) {
            const newModifiedState = state.filter((project) => {
                const conditon = { status: false, query: false };

                if (status === 'all') {
                    conditon.status = true;
                } else if (status === 'completed' && project.completeRate === 100) {
                    conditon.status = true;
                } else if (status === 'pending' && project.completeRate < 100) {
                    conditon.status = true;
                } else {
                    conditon.status = false;
                }

                if (query.length === 0) {
                    conditon.query = true;
                } else if (project.title.includes(query)) {
                    conditon.query = true;
                } else {
                    conditon.query = false;
                }

                return conditon.status && conditon.query;
            });

            setModifiedState(newModifiedState);
        }

        // CLEANUP
        return () => {
            setModifiedState([]);
        };
    }, [query, state, status]);

    const deleteItem = async (id) => {
        const db = getDatabase();
        const deleteRef = ref(db, `/users/${uid}/projects/${id}`);

        await remove(deleteRef);
    };

    const editItem = (id, title, description) => {
        updateForm({
            formData: { title, description, tasks: projects[id].tasks || null },
            formAction: 'edit',
            formType: 'project',
            projectId: id,
        });
        openModal();
    };

    if (!loading && errors && !modifiedState.length) {
        return <>someting went to wrong</>;
    }

    if (!loading && !errors && !modifiedState.length && state.length) {
        return <>no more pojects. create new one</>;
    }

    if (!loading && !errors && modifiedState.length) {
        return modifiedState.map((project) => (
            <Card
                editItem={() => editItem(project.id, project.title, project.description)}
                deleteItem={() => deleteItem(project.id)}
                title={project.title}
                description={project.description}
                info={project.info}
                progress={`${project.completeRate}`}
                key={project.id}
                to={`project/${project.id}`}
            />
        ));
    }

    if (!loading && !errors && !projects) {
        return <>there are no projects. create new please</>;
    }

    return <>loading....</>;
};

export default ProjectList;
