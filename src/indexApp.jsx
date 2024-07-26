import { useEffect, useState } from "react";
import { Lista } from "./components/datosApp";
import { Formulario } from "./components/formApp";

const obtenerDatos = () => {
    const datos = localStorage.getItem('registros');
    return datos ? JSON.parse(datos) : [];
};

const generarId = () => '_' + Math.random().toString(36).substr(2, 9);

export const Index = () => {
    const [data, setData] = useState(obtenerDatos);
    const [registroEditar, setRegistroEditar] = useState(null);

    const addDatos = (valores) => {
        const nuevoRegistro = { ...valores, id: generarId() };
        const nuevosDatos = [nuevoRegistro, ...data];
        setData(nuevosDatos);
        localStorage.setItem('registros', JSON.stringify(nuevosDatos));
    };

    const delData = (id) => {
        const nuevosDatos = data.filter(item => item.id !== id);
        setData(nuevosDatos);
        localStorage.setItem('registros', JSON.stringify(nuevosDatos));
    };

    const editData = (updatedRegistro) => {
        const nuevosDatos = data.map(item => item.id === updatedRegistro.id ? updatedRegistro : item);
        setData(nuevosDatos);
        localStorage.setItem('registros', JSON.stringify(nuevosDatos));
        setRegistroEditar(null);
    };

    const handleEdit = (item) => {
        setRegistroEditar(item);
    };

    return (
        <>
            <h1 className="bg-primary p-5 text-white text-center">Registro de Pacientes</h1>
            <div className="container row mt-3">
                <div className="col-4">
                    <Formulario addNew={addDatos} editData={editData} registroEditar={registroEditar} />
                </div>
                <div className="col-8">
                    <Lista datos={data} delData={delData} editData={handleEdit} />
                </div>
            </div>
        </>
    );
};
