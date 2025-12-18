// src/pages/Dashboard.jsx
import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Dashboard.module.css';
import { useFacebookSDK } from '../../hooks/useFacebookSDK';
import { launchEmbeddedSignup } from '../../services/launchEmbeddedSignup';
import { buildSignupExtras } from '../../utils/buildSignupExtras';

export default function Dashboard() {
    const [waStatus, setWaStatus] = useState('pendente');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();

    const cliente = useMemo(() => ({
        nome: 'Usuário',
        email: 'email@usuario.com',
        segmento: 'Segmento',
        qtdClientes: '10',
        site: 'https://www.seusite.com',
        telefone: '+55 11 99999-9999'
    }), []);

    useFacebookSDK(process.env.REACT_APP_META_APP_ID);

    // Detectar retorno do callback
    useEffect(() => {
        const metaStatus = searchParams.get('meta_status');
        const metaUserId = searchParams.get('meta_user_id');

        console.log('📍 Meta status:', metaStatus, 'User ID:', metaUserId);

        if (metaStatus === 'success') {
            console.log('✅ Retorno bem-sucedido do Meta');
            setupWhatsApp();
        } else if (metaStatus === 'error') {
            setError('Erro ao conectar com o Facebook. Tente novamente.');
            setWaStatus('erro');
        }

        // Limpar parâmetros da URL
        if (metaStatus) {
            window.history.replaceState({}, document.title, '/dashboard');
        }
    }, [searchParams]);

    async function setupWhatsApp() {
        try {
            setLoading(true);
            const r = await fetch('/api/meta/setup-whatsapp', { method: 'POST' });
            const data = await r.json();

            console.log('📍 Setup response:', data);

            if (r.ok && data.status === 'connected') {
                setWaStatus('conectado');
                setError(null);
            } else {
                setWaStatus('parcial');
                setError('Integração parcial. Verifique suas permissões.');
            }
        } catch (e) {
            console.error('❌ Erro ao configurar WhatsApp:', e);
            setWaStatus('erro');
            setError('Erro ao configurar WhatsApp Business.');
        } finally {
            setLoading(false);
        }
    }

    async function onConnect() {
        try {
            setLoading(true);
            setError(null);

            const extras = buildSignupExtras({
                name: cliente.nome,
                website: cliente.site,
                email: cliente.email,
                phone: cliente.telefone
            });

            console.log('🚀 Iniciando Embedded Signup com extras:', extras);

            launchEmbeddedSignup({
                configId: process.env.REACT_APP_META_LOGIN_CONFIG_ID,
                redirectUri: process.env.REACT_APP_META_REDIRECT_URI,
                extras
            });
        } catch (e) {
            console.error('❌ Erro ao iniciar integração:', e);
            setError('Erro ao iniciar integração.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Dashboard</h1>
                <div className={styles.headerRight}>
                    <span className={styles.user}>Olá, {cliente.nome}</span>
                    <button className={styles.ghostBtn}>Sair</button>
                </div>
            </header>

            <main className={styles.main}>
                <section className={styles.card}>
                    <h2 className={styles.cardTitle}>Cadastro do Cliente</h2>
                    <div className={styles.grid}>
                        <InfoRow label="Nome" value={cliente.nome} />
                        <InfoRow label="E-mail" value={cliente.email} />
                        <InfoRow label="Segmento" value={cliente.segmento} />
                        <InfoRow label="Qtd. de Clientes" value={cliente.qtdClientes} />
                        <InfoRow label="Site" value={cliente.site} />
                        <InfoRow label="Telefone" value={cliente.telefone} />
                    </div>
                </section>

                <section className={styles.card}>
                    <h2 className={styles.cardTitle}>WhatsApp Business</h2>
                    <div className={styles.grid}>
                        <InfoRow label="Integração" value={waStatus} />
                        {error && <div className={styles.error}>{error}</div>}
                        <button
                            className={styles.primaryBtn}
                            onClick={onConnect}
                            disabled={loading || waStatus === 'conectado'}
                        >
                            {loading ? 'Conectando...' : 'Conectar via Facebook'}
                        </button>
                    </div>
                </section>

                <section className={styles.card}>
                    <h2 className={styles.cardTitle}>Utilização da Ferramenta</h2>
                    <ul className={styles.list}>
                        <li>Integração Facebook: {waStatus}</li>
                        <li>Automações ativas: 0</li>
                        <li>Próximos passos: conectar conta, criar fluxo</li>
                    </ul>
                </section>
            </main>
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className={styles.infoRow}>
            <span className={styles.infoLabel}>{label}</span>
            <span className={styles.infoValue}>{value}</span>
        </div>
    );
}