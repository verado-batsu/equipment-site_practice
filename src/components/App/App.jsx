import { Routes, Route } from 'react-router-dom';

import { SharedLayout } from 'components/SharedLayout/SharedLayout';
import { Home } from '../../pages/Home';
import { RollingEquipmentList } from '../../pages/RollingEquipmentList';
import { DraggingEquipmentList } from '../../pages/DraggingEquipmentList';
import { PressingEquipmentList } from '../../pages/PressingEquipmentList';
import { ForgingEquipmentList } from '../../pages/ForgingEquipmentList ';
import { StampingEquipmentList } from '../../pages/StampingEquipmentList';
import { EquipmentDetails } from '../../pages/EquipmentDetails';
import { NotFound } from '../../pages/NotFound.jsx';

import './App.scss';

function App() {
    return (
        <Routes>
            <Route path="/" element={<SharedLayout />}>
                <Route index element={<Home />} />
                <Route path="/rolling" element={<RollingEquipmentList />} />
                <Route
                    path="/rolling/:equipmentId"
                    element={<EquipmentDetails />}
                />
                <Route path="/dragging" element={<DraggingEquipmentList />} />
                <Route
                    path="/drawing/:equipmentId"
                    element={<EquipmentDetails />}
                />
                <Route path="/pressing" element={<PressingEquipmentList />} />
                <Route
                    path="/pressing/:equipmentId"
                    element={<EquipmentDetails />}
                />
                <Route path="/forging" element={<ForgingEquipmentList />} />
                <Route
                    path="/forging/:equipmentId"
                    element={<EquipmentDetails />}
                />
                <Route path="/stamping" element={<StampingEquipmentList />} />
                <Route
                    path="/stamping/:equipmentId"
                    element={<EquipmentDetails />}
                />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
