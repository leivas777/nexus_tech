import axios from 'axios';

// ✅ Função para detectar ambiente com mais precisão
const getApiUrl = () => {
    const isDev = process.env.NODE_ENV === 'development';
    const isProd = process.env.NODE_ENV === 'production';

    console.log('🌍 Ambiente detectado:', process.env.NODE_ENV);

    if(isDev){
        console.log('✅ Usando URL de DESENVOLVIMENTO');
        const url = process.env.REACT_APP_API_URL_DEV || 'http://localhost:3001/api';
        console.log('   URL:', url);
        return url;
    }

    if (isProd) {
        console.log('✅ Usando URL de PRODUÇÃO');
        const url = process.env.REACT_APP_API_PROD || 'https://nexutech.api.br/api';
        console.log('   URL:', url);
        return url;
    }

    console.warn('⚠️ Ambiente desconhecido, usando URL padrão');
    return 'http://localhost:3001/api';
};

const API_BASE_URL = getApiUrl();

console.log(`🌐 Backend conectado em: ${API_BASE_URL}`);

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// ✅ Interceptor para adicionar token automaticamente
api.interceptors.request.use(
    (config) => {
        console.log(`📤 ${config.method?.toUpperCase()} ${API_BASE_URL}${config.url}`);
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
        console.log(`✅ Resposta bem-sucedida: ${response.status}`);
        return response;
    },
    (error) => {
        console.error('❌ Erro na resposta:', error.response?.status, error.message);

        // Tratamento específico por status
        if (error.response?.status === 401) {
            console.warn('⚠️ Não autorizado (401) - Redirecionando para login');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('customer');
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