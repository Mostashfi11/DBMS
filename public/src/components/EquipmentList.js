import React from 'react';
import '../styles/equipmentlist.css';

const equipments = [
    'Equipment 1',
    'Equipment 2',
    'Equipment 3',
    'Equipment 4',
    'Equipment 5',
];

const EquipmentList = () => {
    return (
        <div className="equipment-list">
            <h1>Your Equipments</h1>
            <ul>
                {equipments.map((equipment, index) => (
                    <li key={index}>{equipment}</li>
                ))}
            </ul>
        </div>
    );
};

export default EquipmentList;
