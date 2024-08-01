import React from 'react';
import { useLocation } from 'react-router-dom';

const PriestList = () => {
    const location = useLocation();
    const { pooja } = location.state || { pooja: { name: '', desc: '' } };
    console.log(pooja.name)
    return (
        <div>

        </div>
    )
}

export default PriestList
