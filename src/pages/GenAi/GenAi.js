import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import styles from "./GenAi.module.css";
import { jsPDF } from "jspdf";

// ⚠️ Nota: Em produção, use um backend para esconder sua chave.
const API_KEY = "AIzaSyBRn1GbxRuotqr13kEB7L6UNN9oE024vEg";
const genAI = new GoogleGenerativeAI(API_KEY);

const DOCUMENT_CONFIGS = {
  Petição: ["Vara", "Número do Processo", "Fatos Relevantes"],
  Procuração: [
    "Outorgante (Quem dá os poderes)",
    "CPF Outorgante",
    "RG Outorgante",
    "Endereço Completo Outorgante",
    "CEP Outorgante",
    "Outorgado (Quem recebe)",
    "CPF Outorgado",
    "RG Outorgado",
    "Endereço Completo Outorgado",
    "CEP Outorgado",
    "Poderes Específicos",
  ],
  "Contrato de Trabalho": [
    "Empregador",
    "Empregado",
    "Cargo",
    "Salário",
    "Início do Contrato",
  ],
  NDA: ["Parte Reveladora", "Parte Receptora", "Objeto do Sigilo"],
};

function GenAi() {
  const [tipoIA, setTipoIA] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState("");

  // Estado Gerador de Conteúdo
  const [contentForm, setContentForm] = useState({
    topic: "",
    platform: "Instagram",
    tone: "Normal",
    length: "Médio",
    audience: "Geral",
    cta: false,
    hashtags: false,
    keywords: "",
  });

  // Estado Jurídico Unificado
  const [legalForm, setLegalForm] = useState({
    tipoAcao: "",
    tipoDoc: "",
    camposDinamicos: {},
    comarca: "",
    detalhes: "",
  });

  const handleDynamicField = (field, value) => {
    setLegalForm((prev) => ({
      ...prev,
      camposDinamicos: { ...prev.camposDinamicos, [field]: value },
    }));
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const bottomMargin = 20;
    const maxLineWidth = pageWidth - margin * 2;

    const title =
      tipoIA === "Jurídico" ? legalForm.tipoDoc : "Conteúdo Gerado por IA";

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(title.toUpperCase(), margin, 20);

    doc.setLineWidth(0.5);
    doc.line(margin, 25, pageWidth - margin, 25);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const splitText = doc.splitTextToSize(resultado, maxLineWidth);
    let cursorY = 35
    const lineHeight = 7;

    splitText.forEach((line) => {
        if(cursorY > pageHeight - bottomMargin){
            doc.addPage();
            cursorY = 20;
        }

        doc.text(line, margin, cursorY);
        cursorY += lineHeight;
    })

    const fileName = `${title.replace(/\s+/g, "_").toLowerCase()}.pdf`;

    doc.save(fileName)
  };

  const generateAIContent = async () => {
    // Validação básica
    if (tipoIA === "Gerador de Conteúdo" && !contentForm.topic) {
      alert("Por favor, digite um tema!");
      return;
    }

    // Bloqueio de funcionalidades em desenvolvimento
    if (tipoIA === "Jurídico" && legalForm.tipoAcao !== "Criar Documento") {
      setResultado(
        `⚠️ A funcionalidade "${legalForm.tipoAcao}" está em desenvolvimento.`,
      );
      return;
    }

    setLoading(true);
    setResultado("");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Use 2.0 ou 1.5 flash

      let prompt = "";
      if (tipoIA === "Gerador de Conteúdo") {
        prompt = `Escreva um texto para ${contentForm.platform} sobre o tema: ${contentForm.topic}. 
        Tom: ${contentForm.tone}, Tamanho: ${contentForm.length}, Público: ${contentForm.audience}.
        Keywords SEO: ${contentForm.keywords}. CTA: ${contentForm.cta ? "Sim" : "Não"}. Hashtags: ${contentForm.hashtags ? "Sim" : "Não"}.`;
      } else if (tipoIA === "Jurídico") {
        const dadosDinamicos = Object.entries(legalForm.camposDinamicos)
          .map(([key, val]) => `${key}: ${val}`)
          .join("\n");

        prompt = `Você é um advogado especialista. Redija um documento do tipo: ${legalForm.tipoDoc}.
        DADOS ESPECÍFICOS:
        ${dadosDinamicos}
        COMARCA/TRIBUNAL: ${legalForm.comarca}
        DETALHES ADICIONAIS: ${legalForm.detalhes}
        
        Use linguagem formal jurídica e estrutura normativa da ABNT.`;
      }

      const result = await model.generateContent(prompt);
      setResultado(result.response.text());
    } catch (error) {
      console.error("Erro:", error);
      setResultado("❌ Erro ao conectar com a API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <h1>Configuração de IA 🤖</h1>

      <div className={styles.boxTop}>
        <h3>Selecione a Inteligência:</h3>
        <select onChange={(e) => setTipoIA(e.target.value)} value={tipoIA}>
          <option value="">Selecione...</option>
          <option value="Gerador de Conteúdo">Gerador de Conteúdo</option>
          <option value="Jurídico">Jurídico</option>
        </select>
      </div>

      {/* RENDERIZAÇÃO GERADOR DE CONTEÚDO */}
      {tipoIA === "Gerador de Conteúdo" && (
        <div className={styles.box}>
          <h3>✍️ Gerador de Conteúdo</h3>
          <label>
            <span>Tema:</span>
            <input
              type="text"
              onChange={(e) =>
                setContentForm({ ...contentForm, topic: e.target.value })
              }
            />
          </label>
          <label>
            <span>Plataforma:</span>
            <select
              onChange={(e) =>
                setContentForm({ ...contentForm, platform: e.target.value })
              }
            >
              {["Instagram", "LinkedIn", "Facebook", "Blog"].map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
          <div className={styles.choices}>
            <label>
              <input
                type="checkbox"
                onChange={(e) =>
                  setContentForm({ ...contentForm, cta: e.target.checked })
                }
              />{" "}
              Incluir CTA
            </label>
            <label>
              <input
                type="checkbox"
                onChange={(e) =>
                  setContentForm({ ...contentForm, hashtags: e.target.checked })
                }
              />{" "}
              Hashtags
            </label>
          </div>
          <label>
            <span>Palavras-Chave:</span>
            <textarea
              onChange={(e) =>
                setContentForm({ ...contentForm, keywords: e.target.value })
              }
            />
          </label>
        </div>
      )}

      {/* RENDERIZAÇÃO JURÍDICO */}
      {tipoIA === "Jurídico" && (
        <div className={styles.box}>
          <h3>⚖️ Fluxo Jurídico</h3>
          <label>
            <span>Ação Principal:</span>
            <select
              onChange={(e) =>
                setLegalForm({ ...legalForm, tipoAcao: e.target.value })
              }
            >
              <option value="">Selecione...</option>
              {[
                "Modelos de Documentos",
                "Busca de Bens",
                "Criar Documento",
                "Política de Privacidade",
              ].map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>

          {legalForm.tipoAcao === "Criar Documento" && (
            <div className={styles.fadeContent}>
              <label>
                <span>Tipo de Documento:</span>
                <select
                  onChange={(e) =>
                    setLegalForm({
                      ...legalForm,
                      tipoDoc: e.target.value,
                      camposDinamicos: {},
                    })
                  }
                >
                  <option value="">Selecione o documento...</option>
                  {Object.keys(DOCUMENT_CONFIGS).map((doc) => (
                    <option key={doc} value={doc}>
                      {doc}
                    </option>
                  ))}
                </select>
              </label>

              {legalForm.tipoDoc &&
                DOCUMENT_CONFIGS[legalForm.tipoDoc].map((campo) => (
                  <div key={campo} className={styles.inputGroup}>
                    <label>
                      <span>{campo}:</span>
                      <input
                        type="text"
                        onChange={(e) =>
                          handleDynamicField(campo, e.target.value)
                        }
                      />
                    </label>
                  </div>
                ))}

              <label>
                <span>Comarca:</span>
                <input
                  type="text"
                  onChange={(e) =>
                    setLegalForm({ ...legalForm, comarca: e.target.value })
                  }
                />
              </label>
              <label>
                <span>Detalhes do caso:</span>
                <textarea
                  onChange={(e) =>
                    setLegalForm({ ...legalForm, detalhes: e.target.value })
                  }
                />
              </label>
            </div>
          )}
        </div>
      )}

      {tipoIA && (
        <button
          className={styles.generateButton}
          onClick={generateAIContent}
          disabled={loading}
        >
          {loading ? "⌛ Gerando..." : "🚀 Gerar Conteúdo"}
        </button>
      )}

      {resultado && (
        <div className={styles.result}>
          <div className={styles.resultHeader}>
            <h3>✨ Resultado:</h3>
            <button
              onClick={() => navigator.clipboard.writeText(resultado)}
              className={styles.copyBtn}
            >
              Copiar
            </button>
            <button
              onClick={downloadPDF}
              className={styles.downloadBtn}
              style={{
                marginLeft: "10px",
                backgroundColor: "#2563eb",
                color: "white",
              }}
            >
              Download PDF
            </button>
          </div>
          <div className={styles.resultContent}>{resultado}</div>
        </div>
      )}
    </div>
  );
}

export default GenAi;
