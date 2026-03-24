import re

def fix_wizard():
    path = "src/components/RegistrationWizard/RegistrationWizard.js"
    with open(path) as f: text = f.read()
    if "import { Button }" not in text:
        text = text.replace("import { useAuth } from '../../auth/AuthContext';", "import { useAuth } from '../../auth/AuthContext';\nimport { Button } from '../ui';\nimport { toast } from 'react-toastify';")
    
    text = text.replace("""      await register(payload);
      if (onDone) onDone();
    } catch (err) {
      setError(err?.message || "Erro ao concluir cadastro.");""", """      await register(payload);
      toast.success("Cadastro concluído com sucesso!");
      if (onDone) onDone();
    } catch (err) {
      toast.error(err?.message || "Erro ao concluir cadastro. Tente novamente.");
      setError(err?.message || "Erro ao concluir cadastro.");""")
    
    text = text.replace("""      <div className={styles.footer}>
        <button className={styles.ghostBtn} onClick={onCancel}>
          Cancelar
        </button>
        <div className={styles.spacer} />
        {step > 0 && (
          <button className={styles.secondaryBtn} onClick={prev}>
            Voltar
          </button>
        )}
        {step && STEPS.length - 1 && (
          <button className={styles.primaryBtn} onClick={next}>
            Avançar
          </button>
        )}
        {step === STEPS.length - 1 && (
          <button
            className={styles.primaryBtn}
            onClick={finish}
            disabled={saving}
          >
            {saving ? "Finalizando..." : "Concluir Cadastro"}
          </button>
        )}
      </div>""", """      <div className={styles.footer}>
        <Button variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <div className={styles.spacer} />
        {step > 0 && (
          <Button variant="secondary" onClick={prev}>
            Voltar
          </Button>
        )}
        {step && STEPS.length - 1 && (
          <Button variant="primary" onClick={next}>
            Avançar
          </Button>
        )}
        {step === STEPS.length - 1 && (
          <Button
            variant="primary"
            onClick={finish}
            isLoading={saving}
          >
            {saving ? "Finalizando..." : "Concluir Cadastro"}
          </Button>
        )}
      </div>""")
    with open(path, "w") as f: f.write(text)

def fix_tenant():
    path = "src/components/TenantSetupModal/TenantSetupModal.js"
    with open(path) as f: text = f.read()
    if "import { Button }" not in text:
        text = text.replace("import api from '../../services/api';", "import api from '../../services/api';\nimport { Button } from '../ui';\nimport { toast } from 'react-toastify';")
    
    text = text.replace("""      const response = await api.post("/tenant/setup", payload);

      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error("❌ Erro ao atualizar Tenant:", error);
      alert("Erro ao salvar configurações. O negócio pode já ter sido criado.");""", """      const response = await api.post("/tenant/setup", payload);

      toast.success("Configurações salvas com sucesso!");

      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error("❌ Erro ao atualizar Tenant:", error);
      toast.error(error?.response?.data?.message || "Erro ao salvar configurações. Tente novamente.");""")
      
    text = text.replace("""        <div className={styles.footer}>
          {step > 1 && (
            <button onClick={() => setStep(step - 1)}>Voltar</button>
          )}
          {step < 3 ? (
            <button
              className={styles.primary}
              onClick={() => setStep(step + 1)}
            >
              Próximo
            </button>
          ) : (
            <button
              className={styles.primary}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Salvando..." : "Finalizar Configuração"}
            </button>
          )}
        </div>""", """        <div className={styles.footer}>
          {step > 1 && (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>Voltar</Button>
          )}
          {step < 3 ? (
            <Button
              variant="primary"
              className={styles.primary}
              onClick={() => setStep(step + 1)}
            >
              Próximo
            </Button>
          ) : (
            <Button
              variant="primary"
              className={styles.primary}
              onClick={handleSubmit}
              isLoading={loading}
            >
              {loading ? "Salvando..." : "Finalizar Configuração"}
            </Button>
          )}
        </div>""")
    with open(path, "w") as f: f.write(text)

def fix_customer():
    path = "src/components/EditCustomerModal/EditCustomerModal.js"
    with open(path) as f: text = f.read()
    if "import { Button }" not in text:
        text = text.replace("import api from '../../services/api';", "import api from '../../services/api';\nimport { toast } from 'react-toastify';\nimport { Button } from '../ui';")
    
    text = text.replace("""      }

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error("❌ Erro ao salvar customer:", err.message);
      setError(err.response?.data?.message || "Erro ao salvar dados");""", """      }

      toast.success("Dados salvos com sucesso!");

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error("❌ Erro ao salvar customer:", err.message);
      toast.error(err.response?.data?.message || "Erro ao salvar dados");
      setError(err.response?.data?.message || "Erro ao salvar dados");""")
      
    text = text.replace("""          {/* Botões */}
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
          </div>""", """          {/* Botões */}
          <div className={styles.formActions}>
            <Button
              variant="primary"
              type="submit"
              isLoading={loading || loadingSegments}
            >
              {loading ? "Salvando..." : "💾 Salvar Alterações"}
            </Button>

            <Button
              variant="secondary"
              type="button"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
          </div>""")
    with open(path, "w") as f: f.write(text)

fix_wizard()
fix_tenant()
fix_customer()
print("Modals fixed")