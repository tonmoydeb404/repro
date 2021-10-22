/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Button from '../components/Button';
import Filters from '../components/Filters';
import Form from '../components/Form';
import ProjectList from '../components/List/ProjectList';
import Modal from '../components/Modal';
import Nav from '../components/Nav';
import SearchBox from '../components/SearchBox';
import { useAuth } from '../context/authContext';

const Home = () => {
    const { currentUser } = useAuth();
    const [modal, setModal] = useState(false);
    const [status, setStatus] = useState('all');
    const [search, setSearch] = useState('');
    const [formData, setFormData] = useState({});

    return (
        <>
            <Nav title={` hey ${currentUser.displayName.split(' ')[0].toLowerCase() || 'user'},`}>
                <Button
                    icon="create_new_folder"
                    onClick={() => {
                        setModal(true);
                        setFormData({
                            formType: 'project',
                            formAction: 'create',
                        });
                    }}
                    className="btn_green"
                />
            </Nav>

            <SearchBox className="mt-5" callBack={setSearch} />
            <Filters className="mt-2" onChangeStatus={setStatus} status={status} />

            <div className="grid mt-2">
                <ProjectList
                    uid={currentUser.uid}
                    status={status}
                    query={search}
                    updateForm={setFormData}
                    openModal={() => setModal(true)}
                />
            </div>

            {modal && (
                <Modal>
                    <Form
                        uid={currentUser.uid}
                        cancelForm={() => {
                            setModal(false);
                            setFormData({});
                        }}
                        {...formData}
                    />
                </Modal>
            )}
        </>
    );
};

export default Home;
