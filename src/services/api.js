// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api', // ✅ Porta correta: 3001
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