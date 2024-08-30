import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { PrivateRoute } from 'components/PrivateRoute';
import { RestrictedRoute } from 'components/RestrictedRoute';

import { getCurrentUser } from '../../redux/users/usersOperations';

import './App.scss';

function App() {
    const dispatch = useDispatch();
    const isFetchingCurrent = useSelector(
        state => state.auth.isFetchingCurrent
    );

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);

    return (
        !isFetchingCurrent && (
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
                        element={
                            <PrivateRoute
                                redirectTo="/login"
                                component={
                                    <CreateEquipmentPage type="create" />
                                }
                            />
                        }
                    />
                    <Route
                        path="/edit"
                        element={
                            <PrivateRoute
                                redirectTo="/login"
                                component={<CreateEquipmentPage type="edit" />}
                            />
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <RestrictedRoute
                                redirectTo="/equipments"
                                component={<SignUpPage />}
                            />
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <RestrictedRoute
                                redirectTo="/equipments"
                                component={<LogInPage />}
                            />
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        )
    );
}

export default App;
