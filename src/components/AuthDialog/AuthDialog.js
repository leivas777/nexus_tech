import React, { useEffect, useRef, useState } from "react";
import styles from "./AuthDialog.module.css";

const AuthDialog = () => {
  const [mode, setMode] = useState("choice");
  const dialogRef = useRef(null);
  const firstFocusable = useRef(null);
  const lastFocusable = useRef(null);

  useEffect(() => {
    if (open && dialogRef.current) {
      const focusables = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusables.length > 0) {
        firstFocusable.current = focusables[0];
        lastFocusable.current = focusables[focusables.length - 1];
        firstFocusable.current.focus();
      }
    }
  }, [open, mode]);

  useEffect(() => {
    function onKeyDown(e) {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        if (onClose) onClose();
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.backdrop} role="presentation" aria-hidden={!open}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        aria-describedby="auth-desc"
        ref={dialogRef}
      >
        {mode === "choice" && (
          <div className={styles.content}>
            <h2 id="auth-title" className={styles.title}>
              Acesso Necessário
            </h2>
            <p id="auth-desc" className={styles.subtitle}>
              Para acessar o Dashboard, faça login ou crie sua conta.
            </p>
            <div className={styles.actionsRow}>
              <button
                className={styles.primaryBtn}
                onClick={() => setMode("login")}
              >
                Entrar
              </button>
              <button
                className={styles.secondaryBtn}
                onClick={() => setMode("login")}
              >
                Criar Conta
              </button>
            </div>
            <button className={styles.linkBtn} onClick={() => setMode("login")}>
              Continuar navegando
            </button>
          </div>
        )}
        {mode === "login" && (
          <LoginPanel
            onBack={() => setMode("choice")}
            onSuccess={() => onClose && onClose()}
            onLogin={login}
          />
        )}

        {mode === "register" && (
          <RegistrationWizard
            onCancel={() => setMode("choice")}
            onDone={() => onClose && onClose()}
          />
        )}
      </div>
    </div>
  );
};

function LoginPanel({ onBack, onSuccess, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onLogin({ email, password });
      onSuccess();
    } catch (err) {
      setError(err?.message || "Erro ao entrar.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className={styles.content}>
      <button
        className={styles.backBtn}
        onClick={onBack}
        aria-label="Voltar para opções"
      >
        ← Voltar
      </button>
      <h2 className={styles.title}>Entrar</h2>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <label className={styles.label}>
          E-mail
          <input
            className={styles.input}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            aria-invalid={error ? "true" : "false"}
          />
        </label>
        <label className={styles.label}>
          Senha
          <input
            className={styles.input}
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        {error && (
          <div className={styles.error} role="alert">
            {error}
          </div>
        )}
        <button className={styles.primaryBtn} type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

export default AuthDialog;
