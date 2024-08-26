import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { SharedLayout } from 'components/SharedLayout/SharedLayout';
import {
    HomePage,
    EquipmentsPage,
    EquipmentDetailsPage,
    CreateEquipmentPage,
    SignUpPage,
    LogInPage,
    NotFound,
} from '../../pages';

import { getCurrentUser } from '../../redux/users/usersOperations';

import './App.scss';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);

    return (
        <Routes>
            <Route path="/" element={<SharedLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/equipments" element={<EquipmentsPage />} />
                <Route
                    path="/equipments/:equipmentId"
                    element={<EquipmentDetailsPage />}
                />
                <Route
                    path="/create"
                    element={<CreateEquipmentPage type="create" />}
                />
                <Route
                    path="/edit"
                    element={<CreateEquipmentPage type="edit" />}
                />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LogInPage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
