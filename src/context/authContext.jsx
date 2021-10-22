/* eslint-disable eqeqeq */
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import '../firebase';

const AuthContext = React.createContext();

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
            setErrors(false);
        });

        return unsubscribe;
    }, []);

    const signIn = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        try {
            setErrors(false);
            setLoading(true);

            const result = await signInWithPopup(auth, provider);

            const { user } = result;

            setErrors(false);

            if (user.metadata.creationTime == user.metadata.lastSignInTime) {
                const db = getDatabase();
                const userRef = ref(db, `users/${user.uid}`);

                try {
                    await set(userRef, {
                        name: user.displayName,
                        email: user.email,
                        projects: {
                            wellcome: {
                                title: ' rePro - small project management tool',
                                description:
                                    'welcome to repro which is created by tonmoy deb. you can create multiple projects and tasks here',
                                id: 'wellcome',

                                tasks: {
                                    wellcometask: {
                                        title: 'this is demo task you can create another',
                                        id: 'wellcometask',
                                        description:
                                            'you can note your task detail in the description section. you can add tags to specify your task stage. also you can specify that your task is completed or not',
                                        tags: { research: true, dev: true, debug: true },
                                        isCompleted: true,
                                    },
                                },
                            },
                        },
                    });
                } catch (error) {
                    console.log(error);
                    setErrors(true);
                }
            }

            setCurrentUser({ ...user });

            setLoading(false);
        } catch (error) {
            setErrors(true);
            setLoading(false);
            console.log(error);
        }
    };

    const logOut = async () => {
        const auth = getAuth();

        try {
            setErrors(false);
            setLoading(true);

            await signOut(auth);

            setErrors(false);
            setLoading(false);
        } catch (error) {
            setErrors(true);
            setLoading(false);
            console.log(error);
        }
    };

    const value = {
        loading,
        errors,
        currentUser,
        signIn,
        logOut,
    };

    return (
        <AuthContext.Provider value={value}>{!loading && !errors && children}</AuthContext.Provider>
    );
};
