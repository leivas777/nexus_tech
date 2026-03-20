import React, { useEffect, useMemo, useState, useRef } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import BusinessHoursEditor from "../../components/BusinessHoursEditor/BusinessHoursEditor";
import styles from "./settings.module.css";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  segment: "",
  aiPersona: "",
  aiTone: "",
  businessHours: {},
};

function safeStringify(value) {
  //Para comparar objetos (ex.: businessHours) de forma simples
  return JSON.stringify(value ?? {});
}

export default function SettingsPage() {
  const [status, setStatus] = useState("loading"); //loading | ready | error
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState(initialState);
  const initialDataRef = useRef(initialState);

  const [planExpanded, setPlanExpanded] = useState(false);

  const navigate = useNavigate();

  async function loadData() {
    setStatus("loading");
    try {
      const res = await api.get("/tenants/me");
      const data = { ...res.data };
      console.log(data);
      setFormData(data);

      initialDataRef.current = data;

      setStatus("ready");
    } catch (e) {
      setStatus("error");
      toast.error("Erro ao carregar configurações.");
    }
  }

  const handleBack = async () => {
    navigate("/agenda");
  };

  useEffect(() => {
    loadData();
  }, []);

  const isDirty = useMemo(() => {
    //Comparação simples
    return safeStringify(formData) !== safeStringify(initialDataRef.current);
  }, [formData]);

  const canSave = status === "ready" && isDirty && !saving;

  useEffect(() => {
    function onBeforeUnload(e) {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = "";
    }
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [isDirty]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!canSave) return;

    setSaving(true);
    try {
      // 1. Enviamos apenas os dados do tenant
      const res = await api.patch("/tenants/update", formData.tenant);

      // 2. IMPORTANTE: o backend pode retornar o objeto atualizado
      // Vamos atualizar o formData com o que veio do banco para garantir sincronia
      const updatedData = {
        ...formData,
        tenant: {
          ...formData.tenant,
          ...res.data,
        },
      };

      setFormData(updatedData);
      initialDataRef.current = JSON.parse(JSON.stringify(updatedData));

      toast.success("Configurações salvas!");
    } catch (error) {
      toast.error("Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  };

  const usageBar = (used, total, label) => {
    const usedNum = Number(used ?? 0);
    const totalNum = Number(total ?? 0);
    const percentage =
      totalNum > 0 ? Math.min((usedNum / totalNum) * 100, 100) : 0;
    const color = percentage > 85 ? "#ff4d4f" : "#25d366";

    return (
      <div style={{ marginBottom: "12px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.85rem",
            fontWeight: "600",
            color: "var(--text-secondary)",
            marginBottom: "6px",
          }}
        >
          <span>{label}</span>
          <span>
            {usedNum} / {totalNum}
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={usedNum}
          aria-valuemin="0"
          aria-valuemax={totalNum}
          aria-label={label}
          style={{
            width: "100%",
            backgroundColor: "#eaecf0",
            height: "8px",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${percentage}%`,
              backgroundColor: color,
              height: "100%",
              transition: "width 0.4s ease-out",
            }}
          />
        </div>
      </div>
    );
  };

  if (status === "loading") {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonTextarea} />
          <div className={styles.skeletonTextarea} />
          <div className={styles.skeletonButton} />
          <p className={styles.loadingText}>Carregando configurações...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <h1 className={styles.title}>Configurações do Negócio</h1>
          <p className={styles.errorText}>
            Não foi possível carregar suas configurações
          </p>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={loadData}
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  const personaLength = formData.aiPersona?.length ?? 0;
  const personaMax = 800;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <button
            className={styles.backButton}
            type="button"
            onClick={handleBack}
            aria-label="voltar"
          >
            <span className={styles.arrow}>&#8592;</span>
            Voltar
          </button>
          <h1 className={styles.title}>Configurações do Negócio</h1>

          {isDirty ? (
            <span
              className={styles.dirtyBadge}
              role="status"
              aria-live="polite"
            >
              Alterações não salvas
            </span>
          ) : (
            <span
              className={styles.savedBadge}
              role="status"
              aria-live="polite"
            >
              Tudo salvo
            </span>
          )}
        </div>

        {/* Criar <div> para gerenciamento do plano */}
        <div className={styles.plan} aria-label="tenant-plan">
          <button
            type="button"
            className={styles.planToggle}
            aria-expanded={planExpanded}
            onClick={() => setPlanExpanded((v) => !v)}
          >
            <span className={styles.label}>Plano Atual </span>
            <span className={styles.toggleIcon}>
              {planExpanded ? "▾" : "▸"}
            </span>
          </button>

          {planExpanded && (
            <div className={styles.planContent}>
              <div className={styles.planData}>
                <p className={styles.text}>Plano Atual </p>
                <span className={styles.planText}>
                  {formData?.plan?.name || ""}
                </span>
              </div>
              <div className={styles.planUsage}>
                <p className={styles.text}>Uso Atual</p>
                <div className={styles.planUsageData}>
                  <div className={styles.planUsageDetails}>
                    {usageBar(
                      formData?.usage?.messagesSent,
                      formData?.plan?.messagesLimit,
                      "Mensagens Enviadas",
                    )}
                    {usageBar(
                      formData?.usage?.appointmentsCount,
                      formData?.plan?.appointmentsCount || 1000,
                      "Agendamentos",
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSave} className={styles.form}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Informações Básicas</h2>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">
                Nome da Empresa <span className={styles.required}>*</span>
              </label>

              <input
                id="name"
                type="text"
                className={styles.input}
                value={formData?.tenant?.name || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tenant: {
                      ...formData.tenant,
                      name: e.target.value,
                    },
                  })
                }
                placeholder="Ex.: Barbearia do João"
                autoComplete="organization"
                aria-describedby="name-help"
              />

              <p id="name-help" className={styles.helpText}>
                Este nome pode aparecer para sua equipe e em telas internas
              </p>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="segment">
                Segmento
              </label>

              <select
                id="segment"
                name="segment"
                value={formData?.tenant?.segment || ""}
                className={styles.select}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tenant: {
                      ...formData.tenant,
                      segment: e.target.value,
                    },
                  })
                }
              >
                <option value="">Selecione...</option>
                <option value="Barbearia">Barbearia</option>
                <option value="Clínica">Clínica Médica / Estética</option>
                <option value="Consultório">Consultório</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Inteligência Artificial</h2>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="aiTone">
                Tom da IA
              </label>

              <select
                id="aiTone"
                name="aiTone"
                value={formData?.tenant?.aiTone || "Objetiva"}
                className={styles.select}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tenant: {
                      ...formData.tenant,
                      aiTone: e.target.value,
                    },
                  })
                }
              >
                <option value="Objetiva">Objetiva (Direto ao ponto)</option>
                <option value="Educada">Educada (Cordial e formal)</option>
                <option value="Descontraída">
                  Descontraída (Usa emojis e gírias)
                </option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="aiPersona">
                Personalidade da IA (Persona)
              </label>

              <textarea
                id="aiPersona"
                className={styles.textarea}
                rows={4}
                placeholder="Ex.: Você é um assistente simpático de uma barbearia..."
                value={formData?.tenant?.aiPersona || ""}
                maxLength={personaMax}
                aria-describedby="aiPersona-help"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tenant: {
                      ...formData.tenant,
                      aiPersona: e.target.value,
                    },
                  })
                }
              />

              <div className={styles.metaRow}>
                <p id="aiPersona-help" className={styles.helpText}>
                  Dica: descreva tom, regras e exemplos de resposta.
                </p>
                <span className={styles.counter}>
                  {personaLength}/{personaMax}
                </span>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Horário de Funcionamento</h2>
            <div className={styles.field}>
              <BusinessHoursEditor
                hours={formData?.tenant?.businessHours || {}}
                onChange={(newHours) =>
                  setFormData({
                    ...formData,
                    tenant: {
                      ...formData.tenant,
                      businessHours: newHours,
                    },
                  })
                }
              />
            </div>
          </section>

          <button
            type="submit"
            className={styles.primaryButton}
            disabled={!canSave}
            aria-busy={saving}
          >
            {saving ? "Salvando..." : "Salvar Alterações"}
          </button>

          {!isDirty && (
            <p className={styles.subtleNote} role="status" aria-live="polite">
              Faça uma alteração para habilitar o botão de salvar.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
