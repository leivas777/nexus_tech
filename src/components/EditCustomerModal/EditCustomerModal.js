// src/components/EditCustomerModal/EditCustomerModal.jsx
import React, { useState, useEffect } from "react";
import styles from "./EditCustomerModal.module.css";
import { customerService } from "../../services/customerService";
import { authService } from "../../services/authService";
import api from "../../services/api";

export default function EditCustomerModal({
  isOpen,
  onClose,
  customer,
  onSave,
}) {
  const [formData, setFormData] = useState({
    segmento: "",
    qtdClientes: 0,
    site: "",
    telefone: "",
  });

  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSegments, setLoadingSegments] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // ✅ Carregar segmentos
  useEffect(() => {
    const loadSegments = async () => {
      try {
        setLoadingSegments(true);
        setError(null);

        const response = await api.get("/auth/business-segments");

        if (response.data?.success) {
          setSegments(response.data.data);
        }
      } catch (err) {
        console.error("❌ Erro ao carregar segmentos:", err.message);
        setError(`Erro ao carregar segmentos: ${err.message}`);
        setSegments([]);
      } finally {
        setLoadingSegments(false);
      }
    };

    if (isOpen) {
      loadSegments();
    }
  }, [isOpen]);

  // ✅ Preencher formulário
  useEffect(() => {
    if (customer) {
      setFormData({
        segmento: customer.segmento || "",
        qtdClientes: customer.qtdClientes || 0,
        site: customer.site || "",
        telefone: customer.telefone || "",
      });
      setError(null);
      setSuccess(false);
    }
  }, [customer, isOpen]);

  // ✅ Atualizar formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "qtdClientes" ? parseInt(value) || 0 : value,
    }));
  };

  // ✅ Validar formulário
  const validateForm = () => {
    // Validação de URL APENAS se preenchido
    if (formData.site.trim()) {
      const urlRegex =
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      if (!urlRegex.test(formData.site)) {
        setError("URL do site inválida. Use: https://exemplo.com");
        return false;
      }
    }

    return true;
  };

  // ✅ Salvar dados
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // ✅ Se customer não existe, criar
      if (!customer.id) {
        const newCustomer = await customerService.createCustomer({
          nome: authService.getCurrentUser().name,
          email: authService.getCurrentUser().email,
          ...formData,
        });

        setSuccess(true);

        if (onSave) {
          onSave({
            id: newCustomer.id,
            nome: newCustomer.nome,
            email: newCustomer.email,
            ...formData,
          });
        }
      } else {
        // ✅ Se customer existe, atualizar
        await customerService.updateCustomer(customer.id, {
          nome: authService.getCurrentUser().name,
          email: authService.getCurrentUser().email,
          ...formData,
        });

        setSuccess(true);

        if (onSave) {
          onSave({
            id: customer.id,
            nome: authService.getCurrentUser().name,
            email: authService.getCurrentUser().email,
            ...formData,
          });
        }
      }

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error("❌ Erro ao salvar customer:", err.message);
      setError(err.response?.data?.message || "Erro ao salvar dados");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            ✏️ {customer.id ? "Editar" : "Preencher"} Dados do Negócio
          </h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className={styles.errorBanner} role="alert">
            ❌ {error}
          </div>
        )}

        {success && (
          <div className={styles.successBanner} role="status">
            ✅ Dados salvos com sucesso!
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Segmento */}
          <div className={styles.formGroup}>
            <label htmlFor="segmento" className={styles.label}>
              Segmento
            </label>
            {loadingSegments ? (
              <div className={styles.loadingSegments}>
                ⏳ Carregando segmentos...
              </div>
            ) : segments.length > 0 ? (
              <select
                id="segmento"
                name="segmento"
                value={formData.segmento}
                onChange={handleChange}
                className={styles.select}
                disabled={loading}
              >
                <option value="">Selecione um segmento</option>
                {segments.map((seg) => (
                  <option key={seg.id} value={seg.segment}>
                    {seg.segment}
                  </option>
                ))}
              </select>
            ) : (
              <div className={styles.errorSegments}>
                ❌ Nenhum segmento disponível
              </div>
            )}
          </div>

          {/* Quantidade de Clientes */}
          <div className={styles.formGroup}>
            <label htmlFor="qtdClientes" className={styles.label}>
              Quantidade de Clientes
            </label>
            <input
              id="qtdClientes"
              type="number"
              name="qtdClientes"
              value={formData.qtdClientes}
              onChange={handleChange}
              placeholder="0"
              className={styles.input}
              disabled={loading}
              min="0"
            />
          </div>

          {/* Site */}
          <div className={styles.formGroup}>
            <label htmlFor="site" className={styles.label}>
              Site <span className={styles.optional}>(opcional)</span>
            </label>
            <input
              id="site"
              type="text"
              name="site"
              value={formData.site}
              onChange={handleChange}
              placeholder="https://seu-site.com"
              className={styles.input}
              disabled={loading}
            />
            <small className={styles.hint}>
              Se preenchido, deve ser uma URL válida
            </small>
          </div>

          {/* Telefone */}
          <div className={styles.formGroup}>
            <label htmlFor="telefone" className={styles.label}>
              Telefone
            </label>
            <input
              id="telefone"
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
              className={styles.input}
              disabled={loading}
            />
          </div>

          {/* Botões */}
          <div className={styles.formActions}>
            <button
              type="submit"
              className={styles.primaryBtn}
              disabled={loading || loadingSegments}
            >
              {loading ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  Salvando...
                </>
              ) : (
                "💾 Salvar Alterações"
              )}
            </button>

            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
