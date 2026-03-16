import { useEffect, useId, useMemo, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import styles from "./services.module.css";
import { useNavigate } from "react-router-dom";

function formatBRL(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return "";
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function minutesLabel(value) {
  const n = Number(value);
  if (!n || Number.isNaN(n)) return "";
  return `${n} min`;
}

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDuration, setNewDuration] = useState("");

  const navigate = useNavigate();
  const uid = useId();

  const handleBack = () => navigate("/agenda");

  const fetchServices = async () => {
    setStatus("loading");
    try {
      const response = await api.get("/services");
      setServices(response.data || []);
      setStatus("ready");
    } catch (error) {
      setStatus("error");
      toast.error("Erro ao carregar serviços.");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const formErrors = useMemo(() => {
    const errors = {};

    if (!newName.trim() || newName.trim().length < 3) {
      errors.name = "Informe um nome com pelo menos 3 caracteres.";
    }

    const price = Number(newPrice);
    if (Number.isNaN(price) || price <= 0) {
      errors.price = "Informe um preço maior que 0.";
    }

    const duration = Number(newDuration);
    if (!Number.isInteger(duration) || duration <= 0) {
      errors.duration = "Informe uma duração (min) maior que 0.";
    }

    return errors;
  }, [newName, newPrice, newDuration]);

  const canSubmit = status === "ready" && !saving && Object.keys(formErrors).length === 0;

  const handleAddService = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSaving(true);
    try {
      const payload = {
        name: newName.trim(),
        price: Number(newPrice),
        duration: Number(newDuration),
      };

      const response = await api.post("/services", payload);

      setServices((prev) => [...prev, response.data]);
      setNewName("");
      setNewPrice("");
      setNewDuration("");

      toast.success("Serviço adicionado!");
    } catch (error) {
      toast.error("Erro ao adicionar serviço.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (service) => {
    const ok = window.confirm(`Tem certeza que deseja remover "${service.name}"?`);
    if (!ok) return;

    try {
      await api.delete(`/services/${service.id}`);
      setServices((prev) => prev.filter((s) => s.id !== service.id));
      toast.info("Serviço removido.");
    } catch (error) {
      toast.error("Erro ao deletar.");
    }
  };

  const handleEditClick = (service) => {
    setEditingId(service.id);
    setNewName(service.name);
    setNewPrice(service.price.toString());
    setNewDuration(service.duration.toString());
    window.scrollTo({ top:0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewName("");
    setNewPrice("");
    setNewDuration("");
  }

  const handleSaveService = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSaving(true);
    try{
      const payload = {
        name: newName.trim(),
        price: Number(newPrice),
        duration: Number(newDuration),
      };

      if (editingId) {
        //MODO EDIÇÃO (PUT)
        const response = await api.put(`/services/${editingId}`, payload);
        setServices((prev) => prev.map(s => s.id === editingId ? response.data : s));
        toast.success("Serviço atualizado!")
      } else {
        //MODO ADIÇÃO (POST)
        const response = await api.post("/services", payload);
        setServices((prev) => [...prev, response.data]);
        toast.success("Serviço adicionado!");
      }

      handleCancelEdit();
    } catch (error) {
      toast.error(editingId ? "Erro ao atualizar." : "Erro ao adicionar.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className={styles.page} aria-busy={status === "loading" ? "true" : "false"}>
      <div className={styles.container}>
        <button
          className={styles.backButton}
          type="button"
          onClick={handleBack}
          aria-label="Voltar para a tela de agendamento"
        >
          <span className={styles.arrow} aria-hidden="true">
            &#8592;
          </span>
          Voltar
        </button>

        <header className={styles.header}>
          <h1 className={styles.title}>Gestão de Serviços</h1>
          <p className={styles.subtitle} id={`${uid}-subtitle`}>
            Cadastre, revise e remova serviços disponíveis para agendamento.
          </p>
        </header>

        {status === "loading" && (
          <section className={styles.card} aria-label="Carregando">
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonRow} />
            <div className={styles.skeletonRow} />
            <div className={styles.skeletonRow} />
            <p className={styles.muted}>Carregando serviços…</p>
          </section>
        )}

        {status === "error" && (
          <section className={styles.card} aria-label="Erro ao carregar serviços">
            <p className={styles.errorText}>
              Não foi possível carregar seus serviços agora.
            </p>
            <button type="button" className={styles.primaryButton} onClick={fetchServices}>
              Tentar novamente
            </button>
          </section>
        )}

        {status === "ready" && (
          <>
            <section className={styles.card} aria-describedby={`${uid}-subtitle`}>
              <form onSubmit={handleSaveService} className={styles.form}>
                <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>
                    {editingId ? "Editar serviço" : "Cadastrar novo serviço"}
                  </legend>

                  <div className={styles.grid}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor={`${uid}-name`}>
                        Nome do serviço
                      </label>
                      <input
                        id={`${uid}-name`}
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className={`${styles.input} ${formErrors.name ? styles.invalid : ""}`}
                        placeholder="Ex.: Corte masculino"
                        autoComplete="off"
                        aria-invalid={formErrors.name ? "true" : "false"}
                        aria-describedby={formErrors.name ? `${uid}-name-error` : undefined}
                      />
                      {formErrors.name && (
                        <p className={styles.fieldError} id={`${uid}-name-error`} role="alert">
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor={`${uid}-price`}>
                        Preço (R$)
                      </label>
                      <input
                        id={`${uid}-price`}
                        type="number"
                        inputMode="decimal"
                        step="0.01"
                        min="0"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className={`${styles.input} ${formErrors.price ? styles.invalid : ""}`}
                        placeholder="Ex.: 50"
                        aria-invalid={formErrors.price ? "true" : "false"}
                        aria-describedby={formErrors.price ? `${uid}-price-error` : `${uid}-price-hint`}
                      />
                      {formErrors.price && (
                        <p className={styles.fieldError} id={`${uid}-price-error`} role="alert">
                          {formErrors.price}
                        </p>
                      )}
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor={`${uid}-duration`}>
                        Duração (minutos)
                      </label>
                      <input
                        id={`${uid}-duration`}
                        type="number"
                        inputMode="numeric"
                        step="1"
                        min="1"
                        value={newDuration}
                        onChange={(e) => setNewDuration(e.target.value)}
                        className={`${styles.input} ${formErrors.duration ? styles.invalid : ""}`}
                        placeholder="Ex.: 30"
                        aria-invalid={formErrors.duration ? "true" : "false"}
                        aria-describedby={formErrors.duration ? `${uid}-duration-error` : `${uid}-duration-hint`}
                      />
                      {formErrors.duration && (
                        <p className={styles.fieldError} id={`${uid}-duration-error`} role="alert">
                          {formErrors.duration}
                        </p>
                      )}
                    </div>

                    <div className={styles.actions}>
                      <button
                        type="submit"
                        className={styles.primaryButton}
                        disabled={!canSubmit}
                        aria-busy={saving ? "true" : "false"}
                      >
                        {saving ? "Salvando…" : (editingId ? "Salvar Alterações" : "Adicionar")}
                      </button>

                      {editingId && (
                        <button
                          type="button"
                          className={styles.secondaryButton}
                          onClick={handleCancelEdit}
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  </div>
                </fieldset>
              </form>
            </section>

            <section className={styles.listSection} aria-label="Lista de serviços">
              <div className={styles.listHeader}>
                <h2 className={styles.sectionTitle}>Serviços cadastrados</h2>
                <span className={styles.badge} aria-label={`Total de serviços: ${services.length}`}>
                  {services.length}
                </span>
              </div>

              {services.length === 0 ? (
                <div className={styles.emptyState} role="status" aria-live="polite">
                  <p className={styles.emptyTitle}>Nenhum serviço cadastrado</p>
                  <p className={styles.muted}>
                    Cadastre seu primeiro serviço no formulário acima.
                  </p>
                </div>
              ) : (
                <ul className={styles.list}>
                  {services.map((service) => (
                    <li key={service.id} className={styles.serviceCard}>
                      <div className={styles.serviceInfo}>
                        <p className={styles.serviceName}>{service.name}</p>
                        <p className={styles.serviceMeta}>
                          <span>{minutesLabel(service.duration)}</span>
                          <span className={styles.dot} aria-hidden="true">•</span>
                          <span>{formatBRL(service.price)}</span>
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleEditClick(service)}
                        className={styles.editButton}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(service)}
                        className={styles.dangerButton}
                        aria-label={`Remover serviço ${service.name}`}
                      >
                        Remover
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}