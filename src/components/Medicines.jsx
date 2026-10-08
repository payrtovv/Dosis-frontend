import { useEffect, useState } from "react";
import AxiosInstance from "./Axios";
import "./medicines.css";

const PRESENTATIONS = [
  { value: "TAB", label: "Tableta / Comprimido" },
  { value: "CAP", label: "Cápsula" },
  { value: "SYR", label: "Jarabe / Solución" },
  { value: "INJ", label: "Inyectable" },
  { value: "CRM", label: "Crema / Pomada" },
  { value: "DRP", label: "Gotas" },
  { value: "INH", label: "Inhalador" },
  { value: "OTH", label: "Otro" },
];

const emptyForm = {
  name: "",
  generic_name: "",
  brand_or_laboratory: "",
  concentration: "",
  presentation: "TAB",
  description: "",
  contraindications: "",
};

export default function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchMedicines = async () => {
    try {
      const { data } = await AxiosInstance.get("medicines/");
      setMedicines(Array.isArray(data) ? data : (data.results ?? []));
    } catch (error) {
      console.error(
        "Error:",
        error.response?.status,
        error.response?.data ?? error.message,
      );
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await AxiosInstance.put(`medicines/${editingId}/`, form);
      } else {
        await AxiosInstance.post("medicines/", form);
      }
      resetForm();
      fetchMedicines();
    } catch (error) {
      if (error.response?.status === 400) {
        setErrors(error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (medicine) => {
    setEditingId(medicine.id);
    setForm({
      name: medicine.name,
      generic_name: medicine.generic_name,
      brand_or_laboratory: medicine.brand_or_laboratory,
      concentration: medicine.concentration,
      presentation: medicine.presentation,
      description: medicine.description,
      contraindications: medicine.contraindications,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este medicamento?")) return;
    await AxiosInstance.delete(`medicines/${id}/`);
    fetchMedicines();
  };

  const handleRead = async (id) => {
    try {
      const response = await AxiosInstance.get(`medicines/${id}/`);
      setSelectedMedicine(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al obtener el medicamento:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
  };

  const field = (name, label, props = {}) => (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        value={form[name]}
        onChange={handleChange}
        className={errors[name] ? "input-error" : ""}
        {...props}
      />
      {errors[name] && <span className="error-text">{errors[name]}</span>}
    </div>
  );

  return (
    <section className="medicines">
      <form className="medicine-form" onSubmit={handleSubmit}>
        <h3>{editingId ? "Editar medicamento" : "Nuevo medicamento"}</h3>

        {field("name", "Nombre comercial", { required: true })}
        {field("generic_name", "Nombre genérico")}
        {field("brand_or_laboratory", "Laboratorio / Marca")}
        {field("concentration", "Concentración", {
          placeholder: "500 mg",
          required: true,
        })}

        <div className="field">
          <label htmlFor="presentation">Presentación</label>
          <select
            id="presentation"
            name="presentation"
            value={form.presentation}
            onChange={handleChange}
          >
            {PRESENTATIONS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="description">Descripción / Indicaciones</label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="contraindications">Contraindicaciones</label>
          <textarea
            id="contraindications"
            name="contraindications"
            rows="3"
            value={form.contraindications}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={loading}>
            {editingId ? "Guardar cambios" : "Agregar"}
          </button>
          {editingId && (
            <button type="button" className="btn-cancel" onClick={resetForm}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="medicine-list">
        {medicines.length === 0 && (
          <p>Aún no tienes medicamentos registrados.</p>
        )}

        {medicines.map((m) => (
          <article key={m.id} className="medicine-item">
            <div>
              <h4>{m.name}</h4>
              <p>
                {m.generic_name && `${m.generic_name} · `}
                {m.concentration} · {m.presentation_display}
              </p>
            </div>
            <div className="item-actions">
              <button className="btn-edit" onClick={() => handleRead(m.id)}>
                Ver
              </button>
              <button className="btn-edit" onClick={() => handleEdit(m)}>
                Editar
              </button>
              <button className="btn-delete" onClick={() => handleDelete(m.id)}>
                Eliminar
              </button>
            </div>
          </article>
        ))}
        {isModalOpen && selectedMedicine && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Detalles del Medicamento</h3>

              <p>
                <strong>ID:</strong> {selectedMedicine.id}
              </p>
              <p>
                <strong>Nombre comercial:</strong> {selectedMedicine.name}
              </p>
              <p>
                <strong>Nombre genérico:</strong>{" "}
                {selectedMedicine.generic_name}
              </p>
              <p>
                <strong>Laboratorio / Marca:</strong>{" "}
                {selectedMedicine.brand_or_laboratory}
              </p>
              <p>
                <strong>Concentracion:</strong> {selectedMedicine.concentration}
              </p>
              <p>
                <strong>Presentación:</strong> {selectedMedicine.presentation}
              </p>
              <p>
                <strong>Descripción:</strong> {selectedMedicine.description}
              </p>
              <p>
                <strong>Contraindicaciones:</strong>{" "}
                {selectedMedicine.contraindications}
              </p>
              <p>
                <strong>Creado el:</strong>{" "}
                {selectedMedicine?.created_at
                  ? new Date(selectedMedicine.created_at).toLocaleString(
                      "es-EC",
                    )
                  : ""}
              </p>

              <button
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
