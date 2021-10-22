import { getDatabase, onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

const useProjects = (userId) => {
    const [projects, setProjects] = useState({});
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            const db = getDatabase();
            const projectsRef = ref(db, `/users/${userId}/projects`);

            try {
                setLoading(true);
                setErrors(false);
                await onValue(projectsRef, (snapshot) => {
                    const data = snapshot.val();
                    setProjects(data);
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
    }, [userId]);

    return { projects, loading, errors };
};

export default useProjects;
