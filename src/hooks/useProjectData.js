import { getDatabase, onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

const useProjectData = (userId, projectId) => {
    const [projectData, setProjectData] = useState({});
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            const db = getDatabase();
            const projectRef = ref(db, `/users/${userId}/projects/${projectId}`);

            try {
                setLoading(true);
                setErrors(false);
                await onValue(projectRef, (snapshot) => {
                    const data = snapshot.val();
                    setProjectData(data);
                });
                setLoading(false);
                setErrors(false);
            } catch (error) {
                console.log(error);
                setErrors(true);
                setLoading(false);
            }
        };

        fetchProjects();
    }, [projectId, userId]);

    return { projectData, loading, errors };
};

export default useProjectData;
