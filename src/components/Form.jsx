import { getDatabase, ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import shortid from 'shortid';
import Button from './Button';
import CheckBox from './CheckBox';
import Input from './Input';
import Loading from './Loading';

const Form = ({
    formData = null,
    formType = 'project',
    formAction = 'create',
    uid,
    projectId,
    taskId,
    cancelForm,
    background = 'background',
}) => {
    const initialError = {
        title: {
            isError: false,
            message: '',
        },
        description: {
            isError: false,
            message: '',
        },
        form: {
            isError: false,
            message: '',
        },
    };
    const initialTags = { research: false, dev: false, debug: false };

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState(null);
    const [tags, setTags] = useState(initialTags);
    const [errors, setErrors] = useState(initialError);
    const [loading, setLoading] = useState(false);

    // UPDATE FROM WHEN ITS EDIT MODE
    useEffect(() => {
        if (formAction === 'edit' && formData) {
            // UPDATE TITLE
            setTitle(formData.title);
            // UPDATE DESCRIPTION
            setDescription(formData.description);

            // UPDATE TASKS
            if (formType === 'project') {
                setTasks(formData.tasks);
            }

            // UPDATE TAGS
            if (formType === 'task') {
                setTags(formData.tags);
            }
        }

        return () => {
            setTitle('');
            setDescription('');
            setTags({});
            setLoading(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // SUBMIT FORM TO CREATE OR UPDATE A NEW DATA
    const submitForm = async () => {
        // URL
        const URL =
            formType === 'project'
                ? `/users/${uid}/projects`
                : `/users/${uid}/projects/${projectId}/tasks`;

        // DATA
        const data =
            formType === 'project'
                ? {
                      // CREATING ID ON FORM TYPE
                      id: formAction === 'edit' ? projectId : shortid.generate(),
                      title,
                      description,
                      tasks,
                  }
                : {
                      // CREATING ID ON FORM TYPE
                      id: formAction === 'edit' ? taskId : shortid.generate(),
                      title,
                      description,
                      tags,
                      isCompleted: false,
                  };

        const db = getDatabase();
        const dataRef = ref(db, `${URL}/${data.id}`);

        try {
            // ENABLE LOADING
            setLoading(true);
            // SETING DATA TO THE DATABASE
            await set(dataRef, data);
            cancelForm();
            // CLEARING ALL FORM ERORRS
            setErrors((prevErrors) => ({
                ...prevErrors,
                form: {
                    isError: false,
                    message: '',
                },
            }));
            // DISABLE LOADING
            setLoading(false);
        } catch (error) {
            console.log(error);
            // SUBMITING AN FORM ERROR
            setErrors((prevErrors) => ({
                ...prevErrors,
                form: {
                    isError: true,
                    message: 'something went wrong',
                },
            }));
            // DISABLE LOADING
            setLoading(false);
        }
    };

    // VALIDATING FROM DATA BEFORE SUBMIT
    const handleSubmit = (e) => {
        // CAMCELING FORM DEFAULT BEHAVIOR
        e.preventDefault();

        // VALIDATE TITLE
        if (title.trim().length <= 10) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                title: {
                    isError: true,
                    message: 'title must contain more then 10 character',
                },
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                title: {
                    isError: false,
                    message: '',
                },
            }));
        }

        // VALIDATE DESCIPTION
        if (description.trim().length > 300) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                description: {
                    isError: true,
                    message: 'description must contain less then 300 character',
                },
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                description: {
                    isError: false,
                    message: '',
                },
            }));
        }

        return title.trim().length > 10 && description.trim().length < 300 && submitForm();
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                title={`${formType === 'project' ? 'Project Title' : 'Task Title'}`}
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                info={errors.title.message}
                background={background}
            />

            <Input
                title={`${formType === 'project' ? 'Project Description' : 'Task Description'}`}
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                info={errors.description.message}
                className="mt-2"
                background={background}
                type="textarea"
            />

            {formType === 'task' && (
                <Input title="Task Tags" id="tags" info={errors.tags} className="mt-2">
                    <CheckBox
                        icon="science"
                        color="blue"
                        id="research"
                        checked={tags.research}
                        onChange={(e) =>
                            setTags((prevTags) => ({ ...prevTags, research: e.target.checked }))
                        }
                    >
                        research
                    </CheckBox>
                    <CheckBox
                        icon="code"
                        color="green"
                        id="dev"
                        checked={tags.dev}
                        onChange={(e) =>
                            setTags((prevTags) => ({ ...prevTags, dev: e.target.checked }))
                        }
                    >
                        dev
                    </CheckBox>
                    <CheckBox
                        icon="bug_report"
                        color="red"
                        id="debug"
                        checked={tags.debug}
                        onChange={(e) =>
                            setTags((prevTags) => ({ ...prevTags, debug: e.target.checked }))
                        }
                    >
                        debug
                    </CheckBox>
                </Input>
            )}

            <div className="mt-4 flex">
                <Button type="submit" className="btn_green_faded">
                    {formAction} {formType}
                </Button>

                <Button className="btn_red_faded" onClick={cancelForm}>
                    cancel
                </Button>
            </div>

            {!errors.form.isError && <div className="mt-2">{errors.form.message}</div>}

            {loading && <Loading />}
        </form>
    );
};

export default Form;
