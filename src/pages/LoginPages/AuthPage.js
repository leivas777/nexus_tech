import React, { useEffect, useMemo, useState } from "react";
import styles from "./AuthPage.module.css";
import logo from "../../assets/logo_nexus_sem_fundo.png";

export default function AuthPage() {
  const getInitialTheme = () => {
    if (typeof window === "undefined") {
      return "dark";
    }
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    const prefersLight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    return prefersLight ? "light" : "dark";
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  const errors = useMemo(() => {
    const e = {};
    if (mode === "signup" && (!name || name.trim().length < 2)) {
      e.name = "Informe seu nome (mín. 2 caracteres).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(email)) {
      e.email = "E-mail inválido.";
    }
    if (!password || password.length < 6) {
      e.password = "Senha deve ter pelo menos 6 caracteres.";
    }
    return e;
  }, [mode, name, email, password]);

  const isValid = Object.keys(errors).length === 0;

  return (
    <div className={styles.fullPage}>
      <div className={styles.page}>
        <div className={styles.bgDecor} aria-hidden="true" />
        <div className={styles.container}>
          <div
            className={styles.card}
            role="dialog"
            aria-labelledby="authTitle"
            aria-describedby="authDesc"
          >
            <div className={styles.brandRow}>
              <div className={styles.brandLeft}>
                <div className={styles.logoStub}>
                  <img src={logo} alt="Nexus Tech" className={styles.logoImg} />
                </div>
                <div className={styles.brandText}>
                  <strong className={styles.brandName}>Nexus Tech</strong>
                  <span className={styles.brandTag}>Bem-vindo(a) de volta</span>
                </div>
              </div>
              <button
                type="button"
                className={styles.themeToggle}
                onClick={toggleTheme}
                aria-pressed={theme === "light"}
                aria-label={
                  theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
                }
                title={
                  theme === "dark"
                    ? "Tema: Escuro (clique para Claro)"
                    : "Tema: Claro (clique para Escuro)"
                }
              >
                <span className={styles.themeIcon} aria-hidden="true">
                  {theme === "dark" ? "☾" : "☀"}
                </span>
                <span className={styles.themeText}>
                  {theme === "dark" ? "Escuro" : "Claro"}
                </span>
              </button>
            </div>

            <div
              className={styles.tabs}
              role="tablist"
              aria-label="Alternar entre entrar e criar conta"
            >
              <button
                role="tab"
                aria-selected={mode === "login"}
                className={`${styles.tab} ${
                  mode === "login" ? styles.active : ""
                }`}
                onClick={() => setMode("login")}
              >
                Entrar
              </button>
              <button
                role="tab"
                aria-selected={mode === "signup"}
                className={`${styles.tab} ${
                  mode === "signup" ? styles.active : ""
                }`}
                onClick={() => setMode("signup")}
              >
                Criar conta
              </button>
            </div>

            <h1 id="authTitle" className={styles.title}>
              {mode === "login" ? "Acesse sua conta" : "Crie sua conta"}
            </h1>
            <p id="authDesc" className={styles.subtitle}>
              {mode === "login"
                ? "Entre para continuar e acessar seus projetos."
                : "Leva menos de 1 minuto para começar."}
            </p>

            <form
              className={styles.form}
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  `${mode === "login" ? "Login" : "Cadastro"} (demonstrativo)`
                );
              }}
            >
              {mode === "signup" && (
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>
                    Nome
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={`${styles.input} ${
                      touched.name && errors.name ? styles.inputError : ""
                    }`}
                    placeholder="Ex.: Maria Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    aria-invalid={touched.name && !!errors.name}
                    aria-describedby={
                      touched.name && errors.name ? "name-error" : undefined
                    }
                  />
                  {touched.name && errors.name && (
                    <span id="name-error" className={styles.errorText}>
                      {errors.name}
                    </span>
                  )}
                </div>
              )}

              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`${styles.input} ${
                    touched.email && errors.email ? styles.inputError : ""
                  }`}
                  placeholder="voce@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  aria-invalid={touched.email && !!errors.email}
                  aria-describedby={
                    touched.email && errors.email ? "email-error" : undefined
                  }
                  autoComplete="email"
                />
                {touched.email && errors.email && (
                  <span id="email-error" className={styles.errorText}>
                    {errors.email}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="password" className={styles.label}>
                  Senha
                </label>
                <div className={styles.inputWrap}>
                  <input
                    id="password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    className={`${styles.input} ${
                      touched.password && errors.password
                        ? styles.inputError
                        : ""
                    }`}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                    aria-invalid={touched.password && !!errors.password}
                    aria-describedby={
                      touched.password && errors.password
                        ? "password-error"
                        : undefined
                    }
                    autoComplete={
                      mode === "login" ? "current-password" : "new-password"
                    }
                  />
                  <button
                    type="button"
                    className={styles.showBtn}
                    onClick={() => setShowPass((v) => !v)}
                    aria-label={showPass ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPass ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <span id="password-error" className={styles.errorText}>
                    {errors.password}
                  </span>
                )}
              </div>

              <div className={styles.formRow}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span>Lembrar de mim</span>
                </label>

                {mode === "login" && (
                  <button type="button" className={styles.linkBtn}>
                    Esqueci minha senha
                  </button>
                )}
              </div>

              <button
                type="submit"
                className={styles.primaryBtn}
                disabled={!isValid}
                aria-disabled={!isValid}
              >
                {mode === "login" ? "Entrar" : "Criar conta"}
              </button>

              <div className={styles.divider} role="separator" aria-label="ou">
                ou
              </div>

              <button
                type="button"
                className={styles.googleBtn}
                onClick={() => alert("Login com Google (demonstrativo)")}
                aria-label="Continuar com Google"
              >
                <span className={styles.googleG}>G</span>
                <span>Continuar com Google</span>
              </button>

              <p className={styles.legalText}>
                Ao continuar, você concorda com nossos Termos e Política de
                Privacidade.
              </p>
            </form>
          </div>

          <div className={styles.tip}>
            Dica: o tema é persistido. Para resetar, remova a chave “theme” do
            localStorage.
          </div>
        </div>
      </div>
    </div>
  );
}
