import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AuthPage.module.css";
import logo from "../../assets/logo_nexus_sem_fundo.png";
import { authService } from "../../services/authService";

export default function AuthPage() {
  const navigate = useNavigate();

  // ✅ Estados de tema
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

  // ✅ Estados de formulário
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPass, setShowPass] = useState(false);

  // ✅ Estados de validação
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  // ✅ Estados de requisição
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Verificar se já está logado ao montar componente
  useEffect(() => {
    // ⚠️ IMPORTANTE: Verificação mais robusta
    try {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");

      // Validar token e user
      const hasValidToken =
        token && typeof token === "string" && token.length > 0;
      const hasValidUser = userStr && typeof userStr === "string";

      if (hasValidToken && hasValidUser) {
        try {
          JSON.parse(userStr); // Validar se é JSON válido

          navigate("/dashboard", { replace: true });
        } catch (e) {
          console.warn("⚠️ User no localStorage é inválido:", e.message);
          // Limpar dados inválidos
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    } catch (err) {
      console.error("❌ Erro ao verificar autenticação:", err);
    }
  }, [navigate]);

  useEffect(() => {
    // 1. Criar a função que a Meta chamará automaticamente
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "SEU_META_APP_ID", // Certifique-se de que é o ID correto
        cookie: true,
        xfbml: true,
        version: "v18.0",
      });
    };

    // 2. Carregar o script (apenas se ainda não existir)
    const loadSDK = (d, s, id) => {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        // Se o script já existe, forçamos o init manualmente
        if (window.FB) window.fbAsyncInit();
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/pt_BR/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    };

    loadSDK(document, "script", "facebook-jssdk");
  }, []);

  // ✅ Efeito para tema
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ✅ Limpar mensagens de sucesso/erro após 5 segundos
  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError("");
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, successMessage]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  // ✅ Validação com useMemo
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

  // ✅ Função para enviar formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar antes de enviar
    if (!isValid) {
      setError("Por favor, preencha todos os campos corretamente.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      let response;

      if (mode === "login") {
        // ✅ Login
        response = await authService.login(email, password);

        if (response.success) {
          setSuccessMessage("Login realizado com sucesso! Redirecionando...");

          // Aguardar um momento e redirecionar
          setTimeout(() => {
            navigate("/dashboard", { replace: true });
          }, 1500);
        } else {
          throw new Error(response.message || "Erro ao fazer login");
        }
      } else {
        // ✅ Registro
        response = await authService.register(name, email, password);

        if (response.success) {
          setSuccessMessage("Conta criada! Vamos configurar seu negócio...");

          // Salvar o tenantId que o backend agora retorna
          localStorage.setItem("tenantId", response.tenantId);

          // Aguardar um momento e redirecionar
          setTimeout(() => {
            navigate("/dashboard?setup=true", { replace: true });
          }, 1500);
        } else {
          throw new Error(response.message || "Erro ao criar conta");
        }
      }
    } catch (err) {
      console.error("❌ Erro na autenticação:", err.message);
      setError(err.message || "Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Alterar modo (login/registro)
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setError("");
    setSuccessMessage("");
    setName("");
    setEmail("");
    setPassword("");
    setTouched({ name: false, email: false, password: false });
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}api/auth/google`;
  };

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
            {/* ✅ Cabeçalho com logo e tema */}
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
                disabled={loading}
              >
                <span className={styles.themeIcon} aria-hidden="true">
                  {theme === "dark" ? "☾" : "☀"}
                </span>
                <span className={styles.themeText}>
                  {theme === "dark" ? "Escuro" : "Claro"}
                </span>
              </button>
            </div>

            {/* ✅ Abas de login/registro */}
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
                onClick={() => handleModeChange("login")}
                disabled={loading}
              >
                Entrar
              </button>
              <button
                role="tab"
                aria-selected={mode === "signup"}
                className={`${styles.tab} ${
                  mode === "signup" ? styles.active : ""
                }`}
                onClick={() => handleModeChange("signup")}
                disabled={loading}
              >
                Criar conta
              </button>
            </div>

            {/* ✅ Título e subtítulo */}
            <h1 id="authTitle" className={styles.title}>
              {mode === "login" ? "Acesse sua conta" : "Crie sua conta"}
            </h1>
            <p id="authDesc" className={styles.subtitle}>
              {mode === "login"
                ? "Entre para continuar e acessar seus projetos."
                : "Leva menos de 1 minuto para começar."}
            </p>

            {/* ✅ Mensagens de erro e sucesso */}
            {error && (
              <div
                className={`${styles.alert} ${styles.alertError}`}
                role="alert"
                aria-live="polite"
              >
                ❌ {error}
              </div>
            )}
            {successMessage && (
              <div
                className={`${styles.alert} ${styles.alertSuccess}`}
                role="alert"
                aria-live="polite"
              >
                ✅ {successMessage}
              </div>
            )}

            {/* ✅ Formulário */}
            <form className={styles.form} noValidate onSubmit={handleSubmit}>
              {/* ✅ Campo de Nome (apenas para registro) */}
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
                    disabled={loading}
                  />
                  {touched.name && errors.name && (
                    <span id="name-error" className={styles.errorText}>
                      {errors.name}
                    </span>
                  )}
                </div>
              )}

              {/* ✅ Campo de E-mail */}
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
                  disabled={loading}
                />
                {touched.email && errors.email && (
                  <span id="email-error" className={styles.errorText}>
                    {errors.email}
                  </span>
                )}
              </div>

              {/* ✅ Campo de Senha */}
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
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className={styles.showBtn}
                    onClick={() => setShowPass((v) => !v)}
                    aria-label={showPass ? "Ocultar senha" : "Mostrar senha"}
                    disabled={loading}
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

              {/* ✅ Checkbox de "Lembrar de mim" e "Esqueci senha" */}
              <div className={styles.formRow}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    disabled={loading}
                  />
                  <span>Lembrar de mim</span>
                </label>

                {mode === "login" && (
                  <button
                    type="button"
                    className={styles.linkBtn}
                    disabled={loading}
                  >
                    Esqueci minha senha
                  </button>
                )}
              </div>

              {/* ✅ Botão principal */}
              <button
                type="submit"
                className={styles.primaryBtn}
                disabled={!isValid || loading}
                aria-disabled={!isValid || loading}
              >
                {loading ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true">
                      ⏳
                    </span>
                    {mode === "login" ? " Entrando..." : " Criando conta..."}
                  </>
                ) : mode === "login" ? (
                  "Entrar"
                ) : (
                  "Criar conta"
                )}
              </button>

              {/* ✅ Divider */}
              <div className={styles.divider} role="separator" aria-label="ou">
                ou
              </div>

              {/* ✅ Botão Google */}
              <div className={styles.socialButtons}>
                <button
                  type="button"
                  className={styles.googleBtn}
                  onClick={handleGoogleLogin}
                  aria-label="Continuar com Google"
                  disabled={loading}
                >
                  <span className={styles.googleG}>G</span>
                  <span>Continuar com Google</span>
                </button>
              </div>

              {/* ✅ Texto legal */}
              <p className={styles.legalText}>
                Ao continuar, você concorda com nossos Termos e Política de
                Privacidade.
              </p>
            </form>
          </div>

          {/* ✅ Dica sobre tema */}
          <div className={styles.tip}>
            💡 Dica: O tema é persistido no navegador. Para resetar, remova a
            chave "theme" do localStorage.
          </div>
        </div>
      </div>
    </div>
  );
}
