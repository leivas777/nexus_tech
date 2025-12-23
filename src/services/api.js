// src/services/api.js
import axios from 'axios';

// ✅ Função para detectar ambiente com mais precisão
const getApiUrl = () => {
    const isDev = process.env.NODE_ENV === 'development';
    const isProd = process.env.NODE_ENV === 'production';

    // Se estiver em desenvolvimento
    if(isDev){
        return process.env.REACT_APP_API_DEV || 'http://localhost:3001/api';
    }

    // Se estiver em produção
    if (isProd) {
        return process.env.REACT_APP_API_PROD || 'https://nexutech.api.br/api';
    }

    // Fallback
    console.warn('⚠️ Ambiente desconhecido, usando URL padrão');
    return 'http://localhost:3001/api';
};

const API_BASE_URL = getApiUrl();

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // ✅ Timeout de 10 segundos
    withCredentials: true, // ✅ Incluir cookies/sessão
    headers: {
        'Content-Type': 'application/json'
    }
});

// ✅ Interceptor para adicionar token automaticamente
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('🔑 Token adicionado ao header');
        }
        return config;
    },
    (error) => {
        console.error('❌ Erro na requisição:', error.message);
        return Promise.reject(error);
    }
);

// ✅ Interceptor para tratar erros de resposta
api.interceptors.response.use(
    (response) => {
        console.log('✅ Resposta bem-sucedida:', response.status);
        return response;
    },
    (error) => {
        console.error('❌ Erro na resposta:', error.response?.status, error.message);

        // Tratamento específico por status
        if (error.response?.status === 401) {
            console.warn('⚠️ Não autorizado (401) - Redirecionando para login');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/registration';
        } else if (error.response?.status === 500) {
            console.error('🔥 Erro interno do servidor (500)');
        } else if (!error.response) {
            console.error('🌐 Erro de rede - Servidor não respondeu');
        }

        return Promise.reject(error);
    }
);

export default api;