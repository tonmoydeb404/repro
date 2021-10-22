/* eslint-disable no-unused-vars */
import { getDatabase, ref, remove } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../components/Button';
import Filters from '../components/Filters';
import Form from '../components/Form';
import TaskList from '../components/List/TaskList';
import Modal from '../components/Modal';
import Nav from '../components/Nav';
import SearchBox from '../components/SearchBox';
import { useAuth } from '../context/authContext';
import useProjectData from '../hooks/useProjectData';

const Project = () => {
    const { id } = useParams();
    const history = useHistory();
    const [modal, setModal] = useState(false);
    const [query, setQuery] = useState('');
    const [formData, setFormData] = useState({});
    const [status, setStatus] = useState('all');
    const [tag, setTag] = useState('all');
    const { currentUser } = useAuth();
    const { loading, errors, projectData } = useProjectData(currentUser.uid, id);
    const [currentProject, setCurrentProject] = useState({});

    useEffect(() => {
        setCurrentProject(projectData);

        // CLEANUP
        return () => {
            setCurrentProject({});
        };
    }, [projectData]);

    const deleteItem = async (projectId) => {
        const db = getDatabase();
        const deleteRef = ref(db, `/users/${currentUser.uid}/projects/${projectId}`);

        await remove(deleteRef);

        history.push({ pathname: '/' });
    };

    return (
        !loading &&
        !errors &&
        currentProject && (
            <>
                <Nav>
                    <Button
                        icon="add"
                        className="btn_green"
                        onClick={() => {
                            setModal(!modal);
                            setFormData({
                                formType: 'task',
                                formAction: 'create',
                                projectId: id,
                            });
                        }}
                    />
                    <Button
                        icon="edit"
                        className="btn_blue"
                        onClick={() => {
                            setModal(!modal);
                            setFormData({
                                formType: 'project',
                                formAction: 'edit',
                                formData: {
                                    title: projectData.title,
                                    description: projectData.description,
                                    tasks: projectData.tasks,
                                },
                                projectId: id,
                            });
                        }}
                    />
                    <Button icon="delete" className="btn_black" onClick={() => deleteItem(id)} />
                </Nav>

                <div className="project-info mt-5">
                    <h2>{currentProject.title}</h2>
                    <p className="mt-2">{currentProject.description}</p>
                </div>

                <SearchBox className="mt-5" callBack={setQuery}>
                    <Button
                        icon="add"
                        className="btn_green"
                        onClick={() => {
                            setModal(!modal);
                            setFormData({
                                formType: 'task',
                                formAction: 'create',
                                projectId: id,
                            });
                        }}
                    />
                </SearchBox>

                <Filters
                    type="task"
                    className="mt-2"
                    onChangeStatus={setStatus}
                    onChangeTag={setTag}
                    tag={tag}
                    status={status}
                />

                <div className="grid mt-5">
                    <TaskList
                        query={query}
                        status={status}
                        filter={tag}
                        projectId={id}
                        uid={currentUser.uid}
                        updateForm={setFormData}
                        openModal={() => setModal(true)}
                        taskdata={currentProject.tasks}
                    />
                </div>

                {modal && (
                    <Modal>
                        {formData && (
                            <Form
                                {...formData}
                                uid={currentUser.uid}
                                cancelForm={() => {
                                    setModal(false);
                                    setFormData({});
                                }}
                            />
                        )}
                    </Modal>
                )}
            </>
        )
    );
};

export default Project;
