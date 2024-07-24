import { Routes, Route } from 'react-router-dom';

import { SharedLayout } from 'components/SharedLayout/SharedLayout';
import {
    HomePage,
    EquipmentsPage,
    EquipmentDetailsPage,
    SignUpPage,
    LogInPage,
    NotFound,
} from '../../pages';

import './App.scss';

function App() {
    return (
        <Routes>
            <Route path="/" element={<SharedLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/equipments" element={<EquipmentsPage />} />
                <Route
                    path="/equipments/:equipmentId"
                    element={<EquipmentDetailsPage />}
                />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LogInPage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
