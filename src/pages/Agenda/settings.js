import React, { useEffect, useMemo, useState, useRef } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import BusinessHoursEditor from "../../components/BusinessHoursEditor/BusinessHoursEditor";
import styles from "./settings.module.css";

const initialState = {
    name: "",
    segment: "",
    aiPersona: "",
    aiTone: "",
    businessHours: {},
};

function safeStringify(value) {
    //Para comparar objetos (ex.: businessHours) de forma simples
    return JSON.stringify(value ?? {})
};

export default function SettingsPage() {
    const [status, setStatus] = useState("loading"); //loading | ready | error
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState(initialState);
    const initialDataRef = useRef(initialState)

    async function loadData() {
        setStatus("loading");
        try{
            const res = await api.get("/tenants/me");
            const data = { ...initialState, ...res.data };
            
            setFormData(data);

            initialDataRef.current = data;

            setStatus("ready");
        } catch (e) {
            setStatus("error");
            toast.error("Erro ao carregar configurações.");
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const isDirty = useMemo(() => {
        //Comparação simples
        return safeStringify(formData) !== safeStringify(initialDataRef.current);
    }, [formData]);

    const canSave = status === 'ready' && isDirty && !saving;

    useEffect(() => {
        function onBeforeUnload(e) {
            if (!isDirty)return;
            e.preventDefault();
            e.returnValue= "";
        }
        window.addEventListener("beforeunload", onBeforeUnload);
        return () => window.removeEventListener("beforeunload", onBeforeUnload);
    }, [isDirty]);

    const handleSave = async (e) => {
        e.preventDefault();
        if (!canSave) return;

        if(!formData.name?.trim()) {
            toast.info("Informe o nome da empresa.");
            return;
        }

        setSaving(true);
        try{
            await api.patch("/tenants/update", formData);
            toast.success("Configurações salvas!");

            //Atualiza referência do "estado inicial" para desabilitar o botão novamente
            initialDataRef.current = formData;
        } catch (error) {
            toast.error("Erro ao salvar.");
        } finally {
            setSaving(false);
        }
    };

    if (status === "loading") {
        return (
            <div className={styles.page}>
                <div className={styles.card}>
                    <div className={styles.skeletonTitle}/>
                    <div className={styles.skeletonTextarea}/>
                    <div className={styles.skeletonTextarea}/>
                    <div className={styles.skeletonButton}/>
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
                    <button type="button" className={styles.primaryButton} onClick={loadData}>
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
                    <h1 className={styles.title}>Configurações do Negócio</h1>

                    {isDirty ? (
                        <span className={styles.dirtyBadge}>Alterações não salvas</span>
                    ) : (
                        <span className={styles.savedBadge}>Tudo salvo</span>
                    )}
                </div>

                <form onSubmit={handleSave} className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="name">
                            Nome da Empresa <span className={styles.required}>*</span>
                        </label>

                        <input
                            id='name'
                            type='text'
                            className={styles.input}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name:e.target.value })}
                            placeholder='Ex.: Barbearia do João'
                            autoComplete='organization'
                        />

                        <p className={styles.helpText}>
                            Este nome pode aparecer para sua equipe e em telas internas
                        </p>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor='aiPersona'>
                            Personalidade da IA (Persona)
                        </label>

                        <textarea
                            id='aiPersona'
                            className={styles.textarea}
                            rows={4}
                            placeholder='Ex.: Você é um assistente simpático de uma barbearia...'
                            value={formData.aiPersona}
                            maxLength={personaMax}
                            onChange={(e) => 
                                setFormData({ ...formData, aiPersona: e.target.value })
                            }
                        />

                        <div className={styles.metaRow}>
                            <p className={styles.helpText}>
                                Dica: descreva tom, regras e exemplos de resposta.
                            </p>
                            <span className={styles.counter}>
                                {personaLength}/{personaMax}
                            </span>
                        </div>
                    </div>

                    <div className={styles.field}>
                        <BusinessHoursEditor
                            hours={formData.businessHours || {}}
                            onChange={(newHours) => 
                                setFormData({ ...formData, businessHours: newHours})
                            }
                        />
                    </div>

                    <button
                        type='submit'
                        className={styles.primaryButton}
                        disabled={!canSave}
                        aria-busy={saving}
                    >
                        {saving ? "Salvando..." : "Salvar Alterações"}
                    </button>

                    {!isDirty && (
                        <p className={styles.subtleNote}>
                            Faça uma alteraçõe para habilitar o botão de salvar.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}