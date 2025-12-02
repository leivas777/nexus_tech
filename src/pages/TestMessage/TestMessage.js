import styles from "./TestMessage.module.css";
import logo from "../../assets/logo_nexus.png";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import JsonView from "@uiw/react-json-view";
import Footer from "../../components/Footer/Footer";

const TestMessage = () => {
  const [template] = useState("hello_world");
  const [senderPhoneNumberId] = useState("948312251693315");
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState("");
  const [payload, setPayload] = useState();
  const [testType, setTestType] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [templateMessage, setTemplateMessage] = useState("");
  const [templateCategory, setTemplateCategory] = useState("");

  const N8N_WEBHOOK_URL =
    "https://curso-n8n-n8n.ebwe7d.easypanel.host/webhook-test/sendMessage";

  const sendMessageToN8N = async (type) => {
    if (type === "send") {
      try {
        const response = await fetch(N8N_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: type,
            template: template,
            sender: senderPhoneNumberId,
            receiver: receiverPhoneNumber,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return (
          data || "Desculpe, ocorreu um erro ao enviar a mensagem de teste"
        );
      } catch (error) {
        console.error("Erro ao enviar a mensagem de teste:", error);
        throw new Error(
          "Erro de conexão. Tente novamente em alguns instantes."
        );
      }
    } else if (type === "create") {
      try {
        const response = await fetch(N8N_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: type,
            name: templateName,
            sender: senderPhoneNumberId,
            category: templateCategory,
            message: templateMessage,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        return data || "Desculpe, ocorreu um erro ao enviat a mensagem teste";
      } catch (error) {
        console.error("Erro ao enviar o modelo para teste:", error);
        throw new Error(
          "Erro de conexão. Tente novamente em alguns instantes."
        );
      }
    }
  };

  const handleCreateModel = async (e) => {
    e.preventDefault();

    try {
      const response = await sendMessageToN8N("create");
      setPayload(response)
    } catch (error) {
      console.error("Erro ao enviar a modelo de teste:", error);
      throw new Error("Erro de envio, tente novamente mais tarde");
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      const response = await sendMessageToN8N("send");

      setPayload(response);
    } catch (error) {
      console.error("Erro ao enviar a mensagem de teste:", error);
      throw new Error("Erro de envio, tente novamente mais tarde");
    }
  };

  const handleChangeInput = async (e) => {
    try {
      setTestType(e);
    } catch (error) {
      console.log("Erro ao seleciona tipo de teste.");
    }
  };

  return (
    <>
      <div className={styles.body}>
        <div className={styles.btnContainer}>
          <Link to="/" className={styles.btnBack}>
            Voltar
          </Link>
        </div>
        <div className={styles.title}>
          <img src={logo} alt="logo"></img>
          <p>Testar Aplicativo</p>
        </div>
        <div className={styles.testType}>
          <label>
            <span>Selecione o tipo de teste:</span>
            <select
              value={testType}
              onChange={(e) => handleChangeInput(e.target.value)}
            >
              <option value={""}> - </option>
              <option value={"create"}>Criar Modelo</option>
              <option value={"send"}>Enviar Modelo</option>
            </select>
          </label>
        </div>
        {testType === "create" && (
          <div className={styles.message}>
            <div className={styles.messageTitle}>
              <h6>Detalhes do Modelo</h6>
              <p>
                Preencha os campos abaixo para criar um modelo de mensagem de
                teste via WhatsApp Cloud API
              </p>
            </div>
            <div className={styles.formulario}>
              <form onSubmit={handleCreateModel}>
                <label>
                  <span>Nome do Template</span>
                  <input
                    type="text"
                    placeholder="'Bom Dia', 'Boa tarde'..."
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                  />
                </label>
                <label>
                  <span>Tipo do Template</span>
                  <select
                    value={templateCategory}
                    onChange={(e) => setTemplateCategory(e.target.value)}
                  >
                    <option value=""> - </option>
                    <option value="marketing">Marketing</option>
                    <option value="utility">Utilidades</option>
                  </select>
                </label>
                <label>
                  <span>Mensagem</span>
                  <input
                    type="text"
                    placeholder="Olá, seja bem vindo..."
                    value={templateMessage}
                    onChange={(e) => setTemplateMessage(e.target.value)}
                  />
                </label>
                <button type="submit" className={styles.btn}>
                  Enviar Modelo
                </button>
              </form>
            </div>
          </div>
        )}{" "}
        {testType === "send" && (
          <div className={styles.message}>
            <div className={styles.messageTitle}>
              <h6>Detalhes da mensagem</h6>
              <p>
                Preencha os campos abaixo para enviar uma mensagem de teste via
                WhatsApp Cloud API
              </p>
            </div>
            <div className={styles.formulario}>
              <form onSubmit={handleSendMessage}>
                <label>
                  <span>Template</span>
                  <select defaultValue={template}>
                    <option value="hello_world">hello_world</option>
                  </select>
                  <span className={styles.info}></span>
                </label>
                <label>
                  <span>Phone Number ID</span>
                  <select defaultValue={senderPhoneNumberId}>
                    <option value="948312251693315">948312251693315</option>
                  </select>
                  <span className={styles.info}>
                    ID do número remetente (Cloud API)
                  </span>
                </label>
                <label>
                  <span>Telefone do destinatário (Brasil)</span>
                  <input
                    type="text"
                    placeholder="(00) 00000-0000"
                    value={receiverPhoneNumber}
                    onChange={(e) => setReceiverPhoneNumber(e.target.value)}
                  />
                  <span className={styles.info}>
                    Digite o whatApp do destinatário. O DDI +55 será adicionado
                    automaticamente
                  </span>
                </label>
                <button type="submit" className={styles.btn}>
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      {payload ? (
        <div className={styles.responseBody}>
          <div className={styles.responseTitle}>
            <h6>Detalhes do envio</h6>
            <p>Informações sobre a requisição e resposta do servidor.</p>
          </div>
          <div className={styles.responseSubtitle}>
            <h4>Payload enviado</h4>
          </div>
          <div className={styles.payload}>
            <JsonView value={payload} displayDataTypes={false} />
          </div>
        </div>
      ) : (
        ""
      )}
      <Footer />
    </>
  );
};

export default TestMessage;
