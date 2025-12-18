import React, { useMemo, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import styles from './Wizard.module.css';

const STEPS = [
    'Dados Pessoais Básicos',
    'Segmento de Atuação da Empresa',
    'Maiores Desafios',
    'O que espera da Nexus Tech',
    'Quantidade de Clientes'
];

export default function RegistrationWizard({ onCancel, onDone }) {
    const { register } = useAuth();
    const [step, setStep] = useState(0);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        nome: '',
        email: '',
        telefone: '',
        aceitaTermos: false,
        segmento: '',
        desafios: [],
        desafioOutro: '',
        expectativa: '',
        qtdClientes: ''
    });

    const progress = useMemo(() => Math.round(((step + 1) / STEPS.length) * 100), [step]);

    function updateField(name, value) {
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function next() {
        setError('');
        const msg = validateStep(step, form);
        if (msg) {
            setError(msg);
            return;
        }
        setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }

    function prev() {
        setError('');
        setStep((s) => Math.max(s - 1, 0));
    }

    async function finish() {
        setError('');
        const msg = validateStep(step, form);
        if (msg) {
            setError(msg);
            return;
        }
        setSaving(true);
        try {
            const payload = {
                ...form,
                desafios: buildDesafios(form)
            };
            await register(payload);
            if (onDone) onDone();
        } catch (err) {
            setError(err?.message || 'Erro ao concluir cadastro.');
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className={styles.container} role="form" aria-labelledby="wizard-title">
            <div className={styles.header}>
                <h2 id="wizard-title" className={styles.title}>Criar Conta</h2>
                <p className={styles.subtitle}>{STEPS[step]}</p>
                <div className={styles.progressBar} aria-label="Progresso de cadastro" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
                    <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                </div>
            </div>

            <div className={styles.stepArea}>
                {step === 0 && (
                    <StepDadosBasicos form={form} updateField={updateField} />
                )}
                {step === 1 && (
                    <StepSegmento form={form} updateField={updateField} />
                )}
                {step === 2 && (
                    <StepDesafios form={form} updateField={updateField} />
                )}
                {step === 3 && (
                    <StepExpectativa form={form} updateField={updateField} />
                )}
                {step === 4 && (
                    <StepQtdClientes form={form} updateField={updateField} />
                )}
            </div>

            {error && <div className={styles.error} role="alert">{error}</div>}

            <div className={styles.footer}>
                <button className={styles.ghostBtn} onClick={onCancel}>Cancelar</button>
                <div className={styles.spacer} />
                {step > 0 && (
                    <button className={styles.secondaryBtn} onClick={prev}>Voltar</button>
                )}
                {step && STEPS.length - 1 && (
                    <button className={styles.primaryBtn} onClick={next}>Avançar</button>
                )}
                {step === STEPS.length - 1 && (
                    <button className={styles.primaryBtn} onClick={finish} disabled={saving}>
                        {saving ? 'Finalizando...' : 'Concluir Cadastro'}
                    </button>
                )}
            </div>
        </div>
    );
}

function StepDadosBasicos({ form, updateField }) {
    return (
        <div className={styles.grid}>
            <label className={styles.label}>
                Nome completo
                <input
                    className={styles.input}
                    type="text"
                    value={form.nome}
                    onChange={(e) => updateField('nome', e.target.value)}
                    required
                />
            </label>
            <label className={styles.label}>
                E-mail
                <input
                    className={styles.input}
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    required
                />
            </label>
            <label className={styles.label}>
                Telefone (opcional)
                <input
                    className={styles.input}
                    type="tel"
                    value={form.telefone}
                    onChange={(e) => updateField('telefone', e.target.value)}
                />
            </label>
            <label className={styles.checkbox}>
                <input
                    type="checkbox"
                    checked={form.aceitaTermos}
                    onChange={(e) => updateField('aceitaTermos', e.target.checked)}
                    aria-describedby="termos-desc"
                />
                <span>Li e aceito os Termos de Uso</span>
            </label>
            <small id="termos-desc" className={styles.helper}>Você deve aceitar para continuar.</small>
        </div>
    );
}

function StepSegmento({ form, updateField }) {
    return (
        <div className={styles.grid}>
            <label className={styles.label}>
                Segmento de atuação
                <select
                    className={styles.select}
                    value={form.segmento}
                    onChange={(e) => updateField('segmento', e.target.value)}
                    required
                >
                    <option value="">Selecione...</option>
                    <option value="tecnologia">Tecnologia</option>
                    <option value="varejo">Varejo</option>
                    <option value="servicos">Serviços</option>
                    <option value="industria">Indústria</option>
                    <option value="educacao">Educação</option>
                    <option value="saude">Saúde</option>
                    <option value="outro">Outro</option>
                </select>
            </label>
        </div>
    );
}

function StepDesafios({ form, updateField }) {
    const itens = [
        'Aquisição de Leads',
        'Conversão em Vendas',
        'Retenção de Clientes',
        'Integrações com Facebook',
        'Escalabilidade de Automação',
        'Conformidade e Aprovação (Facebook Developers)'
    ];

    function toggleItem(item) {
        const exists = form.desafios.includes(item);
        const next = exists ? form.desafios.filter((d) => d !== item) : [...form.desafios, item];
        updateField('desafios', next);
    }

    return (
        <div className={styles.stack}>
            {itens.map((item) => (
                <label key={item} className={styles.checkbox}>
                    <input
                        type="checkbox"
                        checked={form.desafios.includes(item)}
                        onChange={() => toggleItem(item)}
                    />
                    <span>{item}</span>
                </label>
            ))}
            <label className={styles.label}>
                Outro (opcional)
                <input
                    className={styles.input}
                    type="text"
                    value={form.desafioOutro}
                    onChange={(e) => updateField('desafioOutro', e.target.value)}
                    placeholder="Descreva outro desafio"
                />
            </label>
        </div>
    );
}

function StepExpectativa({ form, updateField }) {
    return (
        <div className={styles.grid}>
            <label className={styles.label}>
                O que espera da Nexus Tech?
                <textarea
                    className={styles.textarea}
                    rows={5}
                    value={form.expectativa}
                    onChange={(e) => updateField('expectativa', e.target.value)}
                    placeholder="Conte como a ferramenta pode ajudar..."
                />
            </label>
        </div>
    );
}

function StepQtdClientes({ form, updateField }) {
    return (
        <div className={styles.grid}>
            <label className={styles.label}>
                Quantidade de clientes
                <select
                    className={styles.select}
                    value={form.qtdClientes}
                    onChange={(e) => updateField('qtdClientes', e.target.value)}
                    required
                >
                    <option value="">Selecione...</option>
                    <option value="0-10">0 - 10</option>
                    <option value="11-50">11 - 50</option>
                    <option value="51-200">51 - 200</option>
                    <option value="200+">200+</option>
                </select>
            </label>
        </div>
    );
}

function validateStep(step, form) {
    if (step === 0) {
        if (!form.nome.trim()) return 'Informe seu nome completo.';
        if (!form.email.trim()) return 'Informe um e-mail válido.';
        if (!form.aceitaTermos) return 'Você precisa aceitar os Termos de Uso.';
    }
    if (step === 1) {
        if (!form.segmento) return 'Selecione o segmento de atuação.';
    }
    if (step === 2) {
        if (form.desafios.length === 0 && !form.desafioOutro.trim()) {
            return 'Selecione ao menos um desafio ou descreva em "Outro".';
        }
    }
    if (step === 4) {
        if (!form.qtdClientes) return 'Selecione a quantidade de clientes.';
    }
    return '';
}

function buildDesafios(form) {
    const base = Array.isArray(form.desafios) ? form.desafios : [];
    if (form.desafioOutro && form.desafioOutro.trim()) {
        return [...base, form.desafioOutro.trim()];
    }
    return base;
}