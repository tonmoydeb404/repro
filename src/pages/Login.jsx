import React from 'react';
import Button from '../components/Button';
import { useAuth } from '../context/authContext';

const Login = () => {
    const { signIn } = useAuth();

    return (
        <div
            className="flex"
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                position: 'absolute',
                top: '0',
                left: 0,
                width: '100%',
                zIndex: 100000,
            }}
        >
            <Button icon="donut_large" className="btn_black" onClick={signIn}>
                Login With Google
            </Button>
        </div>
    );
};

export default Login;
