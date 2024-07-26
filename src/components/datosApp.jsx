import React from 'react';

export const Lista = ({ datos, delData, editData }) => {
    const eliminar = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este registro?")) {
            delData(id);
        }
    };

    return (
        <div className="row">
            {datos.map((item) => (
                <div key={item.id} className="col-4 mb-3">
                    <div className="toast show">
                        <div className="toast-header">
                            <strong className="mx-auto">{item.nombre}</strong>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => eliminar(item.id)}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="toast-body">
                            <p><strong>Nombre del paciente:</strong> {item.nombre}</p>
                            <p><strong>Edad:</strong> {item.edad} años</p>
                            <p><strong>Peso:</strong> {item.peso} kg</p>
                            <p><strong>Rut:</strong> {item.rut}</p>
                            <p><strong>Síntomas:</strong> {item.sintomas}</p>
                            <p><strong>Fecha y Hora de Ingreso:</strong> {item.fechaIngreso}</p>
                            <p><strong>Fecha y Hora de Salida:</strong> {item.fechaSalida}</p>
                            <p><strong>Diagnóstico:</strong> {item.diagnostico}</p>
                            <p><strong>Medicamentos Recetados:</strong> {item.medicamentos}</p>
                            <button
                                className="btn btn-warning mt-2"
                                onClick={() => editData(item)}
                            >
                                Editar
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
