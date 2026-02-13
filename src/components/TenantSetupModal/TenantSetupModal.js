import React, { useState } from "react";
import styles from "./TenantSetupModal.module.css";
import api from "../../services/api";

export default function TenantSetupModal({ userId, onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  //Estados do Formulário
  const [formData, setFormData] = useState({
    businessName: "",
    segment: "",
    aiPersona: "Um assistente prestativo e educado",
    aiTone: "Educada",
    services: [{ name: "", duration: "30", price: "" }],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...formData.services];
    newServices[index][field] = value;
    setFormData({ ...formData, services: newServices });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
        const payload = {
            userId,
            ...formData,
            services: formData.services.map(s => ({
                ...s,
                duration: parseInt(s.duration),
                price: parseFloat(s.price)
            }))
        };

      const response = await api.post("/tenants/setup", payload);

      if (response.data && response.data.id) {
        if(onSuccess){
            onSuccess(response.data);
        }
      }
    } catch (error) {
        console.error("❌ Erro ao salvar Tenant:", error.response?.data || error.message);
        alert("Erro ao salvar configurações. O negócio pode já ter sido criado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Configurar meu Agendador</h2>
          <span className={styles.stepIndicator}>Passo {step} de 3</span>
        </div>

        <div className={styles.content}>
          {/* PASSO 1: DADOS DO NEGÖCIO */}
          {step === 1 && (
            <div className={styles.step}>
              <h3>Sobre sua Empresa</h3>
              <label>Nome do Negócio</label>
              <input
                name="businessName"
                placeholder="Ex: Barbearia Nexus"
                value={formData.businessName}
                onChange={handleChange}
              />
              <label>Segment</label>
              <select
                name="segment"
                value={formData.segment}
                onChange={handleChange}
              >
                <option value="">Selecione...</option>
                <option value="Barbearia">Barbearia</option>
                <option value="Clínica">Clínica Médica / Estética</option>
                <option value="Consultório">Consultório</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
          )}
          {/* PASSO 2: PERSONALIDADE DE IA */}
          {step === 2 && (
            <div className={styles.step}>
              <h3>Personalidade da IA</h3>
              <label>Como a IA deve se apresentar?</label>
              <textarea
                name="aiPersona"
                placeholder="Ex: você é o atendente virtual da Nexus, seja amigável e use gírias de barbeiro."
                value={formData.aiPersona}
                onChange={handleChange}
              />
              <label>Tom de Voz</label>
              <select
                name="aiTone"
                value={formData.aiTone}
                onChange={handleChange}
              >
                <option value="Objetiva">Objetiva (Direto ao ponto)</option>
                <option value="Educada">Educada (Cordial e formal)</option>
                <option value="Descontraída">
                  Descontraída (Usa emojis e gírias)
                </option>
              </select>
            </div>
          )}
          {/*PASSO 3: PRIMEIRO SERVIÇO */}
          {step === 3 && (
            <div className={styles.step}>
              <h3>Cadastre seu primeiro serviço</h3>
              {formData.services.map((service, index) => (
                <div key={index} className={styles.serviceRow}>
                  <input
                    placeholder="Nome (Ex: Corte de Cabelo)"
                    value={service.name}
                    onChange={(e) =>
                      handleServiceChange(index, "name", e.target.value)
                    }
                  />
                  <input
                    placeholder="30 Minutos"
                    type="number"
                    value={service.duration}
                    onChange={(e) =>
                      handleServiceChange(index, "duration", e.target.value)
                    }
                  />
                  <input
                    placeholder="R$"
                    value={service.price}
                    onChange={(e) =>
                      handleServiceChange(index, "price", e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.footer}>
            {step >1 && <button onClick={() => setStep(step - 1)}>Voltar</button>}
            {step <3 ? (
                <button className={styles.primary} onClick={() => setStep(step + 1)}>Próximo</button>
            ) : (
                <button className={styles.primary} onClick={handleSubmit} disabled={loading}>
                    {loading ? "Salvando..." : "Finalizar Configuração"}
                </button>
            )}
        </div>
      </div>
    </div>
  );
}
