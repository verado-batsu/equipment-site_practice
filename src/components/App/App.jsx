import { Routes, Route, Link } from 'react-router-dom';
import { Home } from '../../pages/Home';
import { RollingEquipment } from '../../pages/Rolling-equipment';
import { DrawingEquipment } from '../../pages/Drawing-equipment';
import { PressingEquipment } from '../../pages/Pressing-equipment';
import { ForgingEquipment } from '../../pages/Forging-equipment ';
import { StampingEquipment } from '../../pages/Stamping-equipment';

import './App.scss';

function App() {
    return (
        <>
            <header>
                <div>
                    <p>KMIT</p>
                </div>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/rolling">Rolling Equipment</Link>
                    <Link to="/drawing">Drawing Equipment</Link>
                    <Link to="/pressing">Pressing Equipment</Link>
                    <Link to="/forging">Forging Equipment</Link>
                    <Link to="/stamping">Stamping Equipment</Link>
                </nav>
            </header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rolling" element={<RollingEquipment />} />
                <Route path="/drawing" element={<DrawingEquipment />} />
                <Route path="/pressing" element={<PressingEquipment />} />
                <Route path="/forging" element={<ForgingEquipment />} />
                <Route path="/stamping" element={<StampingEquipment />} />
            </Routes>
        </>
    );
}

export default App;
