import { useState, useEffect } from "react";

export const Formulario = ({ addNew, editData, registroEditar }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        edad: '',
        peso: '',
        rut: '',
        sintomas: '',
        fechaIngreso: '',
        fechaSalida: '',
        diagnostico: '',
        medicamentos: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (registroEditar) {
            setFormData(registroEditar);
        } else {
            setFormData({
                nombre: '',
                edad: '',
                peso: '',
                rut: '',
                sintomas: '',
                fechaIngreso: '',
                fechaSalida: '',
                diagnostico: '',
                medicamentos: ''
            });
        }
    }, [registroEditar]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear the error for the specific field if it's not empty
        if (value.trim() !== '') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.nombre) newErrors.nombre = "El nombre del paciente es requerido.";
        if (!formData.edad) newErrors.edad = "La edad del paciente es requerida.";
        if (!formData.peso) newErrors.peso = "El peso del paciente es requerido.";
        if (!formData.rut) newErrors.rut = "El RUT del paciente es requerido.";
        if (!formData.sintomas) newErrors.sintomas = "Los síntomas del paciente son requeridos.";
        if (!formData.fechaIngreso) newErrors.fechaIngreso = "La fecha y hora de ingreso son requeridos.";
        if (!formData.fechaSalida) newErrors.fechaSalida = "La fecha y hora de salida son requeridos.";
        if (!formData.diagnostico) newErrors.diagnostico = "El diagnóstico del paciente es requerido.";
        if (!formData.medicamentos) newErrors.medicamentos = "Los medicamentos recetados son requeridos.";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const storedData = JSON.parse(localStorage.getItem('registros')) || [];
        const isDuplicate = storedData.some(item => item.rut === formData.rut && item.id !== formData.id);

        if (isDuplicate) {
            setErrors({ rut: "El RUT ya está registrado." });
            return;
        }

        if (registroEditar) {
            editData(formData);
        } else {
            addNew(formData);
        }
        clearForm();
    };

    const clearForm = () => {
        setFormData({
            nombre: '',
            edad: '',
            peso: '',
            rut: '',
            sintomas: '',
            fechaIngreso: '',
            fechaSalida: '',
            diagnostico: '',
            medicamentos: ''
        });
        setErrors({});
    };

    const getInputClass = (field) => {
        if (errors[field]) return "form-control is-invalid";
        if (formData[field]) return "form-control is-valid";
        return "form-control";
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3 position-relative">
                <label className="form-label">Nombre del paciente</label>
                <input
                    type="text"
                    className={getInputClass('nombre')}
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                />
                {formData.nombre && !errors.nombre && <i className="fas fa-check-circle position-absolute end-0 top-50 translate-middle-y text-success"></i>}
                {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
            </div>
            <div className="mb-3 position-relative">
                <label className="form-label">Edad del paciente (Años)</label>
                <input
                    type="number"
                    className={getInputClass('edad')}
                    name="edad"
                    value={formData.edad}
                    onChange={handleChange}
                />
                {formData.edad && !errors.edad && <i className="fas fa-check-circle position-absolute end-0 top-50 translate-middle-y text-success"></i>}
                {errors.edad && <div className="invalid-feedback">{errors.edad}</div>}
            </div>
            <div className="mb-3 position-relative">
                <label className="form-label">Peso del paciente (kg)</label>
                <input
                    type="number"
                    className={getInputClass('peso')}
                    name="peso"
                    value={formData.peso}
                    onChange={handleChange}
                />
                {formData.peso && !errors.peso && <i className="fas fa-check-circle position-absolute end-0 top-50 translate-middle-y text-success"></i>}
                {errors.peso && <div className="invalid-feedback">{errors.peso}</div>}
            </div>
            <div className="mb-3 position-relative">
                <label className="form-label">Rut del paciente</label>
                <input
                    type="text"
                    className={getInputClass('rut')}
                    name="rut"
                    value={formData.rut}
                    onChange={handleChange}
                />
                {formData.rut && !errors.rut && <i className="fas fa-check-circle position-absolute end-0 top-50 translate-middle-y text-success"></i>}
                {errors.rut && <div className="invalid-feedback">{errors.rut}</div>}
            </div>
            <div className="mb-3 position-relative">
                <label className="form-label">Síntomas del paciente</label>
                <textarea
                    className={getInputClass('sintomas')}
                    name="sintomas"
                    value={formData.sintomas}
                    onChange={handleChange}
                ></textarea>
                {formData.sintomas && !errors.sintomas && <i className="fas fa-check-circle position-absolute end-0 top-50 translate-middle-y text-success"></i>}
                {errors.sintomas && <div className="invalid-feedback">{errors.sintomas}</div>}
            </div>
            <div className="mb-3 position-relative">
                <label className="form-label">Fecha y Hora de Ingreso</label>
                <input
                    type="datetime-local"
                    className={getInputClass('fechaIngreso')}
                    name="fechaIngreso"
                    value={formData.fechaIngreso}
                    onChange={handleChange}
                />
                {formData.fechaIngreso && !errors.fechaIngreso && <i className="fas fa-check-circle position-absolute end-0 top-50 translate-middle-y text-success"></i>}
                {errors.fechaIngreso && <div className="invalid-feedback">{errors.fechaIngreso}</div>}
            </div>
            <div className="mb-3 position-relative">
                <label className="form-label">Fecha y Hora de Salida</label>
                <input
                    type="datetime-local"
                    className={getInputClass('fechaSalida')}
                    name="fechaSalida"
                    value={formData.fechaSalida}
                    onChange={handleChange}
                />
                {formData.fechaSalida && !errors.fechaSalida && <i className="fas fa-check-circle position-absolute end-0 top-50 translate-middle-y text-success"></i>}
                {errors.fechaSalida && <div className="invalid-feedback">{errors.fechaSalida}</div>}
            </div>
            <div className="mb-3 position-relative">
                <label className="form-label">Diagnóstico del paciente</label>
                <textarea
                    className={getInputClass('diagnostico')}
                    name="diagnostico"
                    value={formData.diagnostico}
                    onChange={handleChange}
                ></textarea>
                {formData.diagnostico && !errors.diagnostico && <i className="fas fa-check-circle position-absolute end-0 top-50 translate-middle-y text-success"></i>}
                {errors.diagnostico && <div className="invalid-feedback">{errors.diagnostico}</div>}
            </div>
            <div className="mb-3 position-relative">
                <label className="form-label">Medicamentos Recetados</label>
                <textarea
                    className={getInputClass('medicamentos')}
                    name="medicamentos"
                    value={formData.medicamentos}
                    onChange={handleChange}
                ></textarea>
                {formData.medicamentos && !errors.medicamentos && <i className="fas fa-check-circle position-absolute end-0 top-50 translate-middle-y text-success"></i>}
                {errors.medicamentos && <div className="invalid-feedback">{errors.medicamentos}</div>}
            </div>
            <button type="submit" className="btn btn-primary">
                {registroEditar ? 'Actualizar' : 'Guardar'}
            </button>
            <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={clearForm}
            >
                Limpiar
            </button>
        </form>
    );
};
