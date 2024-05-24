import { Routes, Route } from 'react-router-dom';

import { SharedLayout } from 'components/SharedLayout/SharedLayout';
import { Home } from '../../pages/Home/Home';
import { RollingEquipment } from '../../pages/RollingEquipment/RollingEquipment';
import { DraggingEquipment } from '../../pages/DraggingEquipment/DraggingEquipment';
import { PressingEquipment } from '../../pages/PressingEquipment/PressingEquipment';
import { ForgingEquipment } from '../../pages/ForgingEquipment/ForgingEquipment ';
import { StampingEquipment } from '../../pages/StampingEquipment/StampingEquipment';
import { EquipmentDetails } from '../../pages/EquipmentDetails/EquipmentDetails';
import { NotFound } from '../../pages/NotFound.jsx';

import './App.scss';

function App() {
    return (
        <Routes>
            <Route path="/" element={<SharedLayout />}>
                <Route index element={<Home />} />
                <Route path="/rolling" element={<RollingEquipment />} />
                <Route
                    path="/rolling/:equipmentId"
                    element={<EquipmentDetails />}
                />
                <Route path="/dragging" element={<DraggingEquipment />} />
                <Route
                    path="/drawing/:equipmentId"
                    element={<EquipmentDetails />}
                />
                <Route path="/pressing" element={<PressingEquipment />} />
                <Route
                    path="/pressing/:equipmentId"
                    element={<EquipmentDetails />}
                />
                <Route path="/forging" element={<ForgingEquipment />} />
                <Route
                    path="/forging/:equipmentId"
                    element={<EquipmentDetails />}
                />
                <Route path="/stamping" element={<StampingEquipment />} />
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
