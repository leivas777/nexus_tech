// src/services/authServices.js
import api from './api';

export const authService = {
    /**
     * Registra um novo usuário
     * @param {string} name - Nome do usuário
     * @param {string} email - E-mail do usuário
     * @param {string} password - Senha do usuário
     * @returns {Promise} Resposta do servidor
     */
    async register(name, email, password) {
        try {
            console.log('📝 Tentando registrar usuário:', email);

            // ✅ Validação básica
            if (!name || !email || !password) {
                throw new Error('Nome, e-mail e senha são obrigatórios.');
            }

            const response = await api.post('/auth/register', { 
                name, 
                email, 
                password 
            });

            // ✅ Validar resposta
            if (response.data?.success && response.data?.data?.token) {
                console.log('✅ Registro bem-sucedido!');
                
                // Armazenar token e usuário
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
                
                return response.data;
            } else {
                throw new Error(response.data?.message || 'Erro ao registrar usuário');
            }
        } catch (error) {
            console.error('❌ Erro no registro:', error.message);
            throw error;
        }
    },

    /**
     * Faz login do usuário
     * @param {string} email - E-mail do usuário
     * @param {string} password - Senha do usuário
     * @returns {Promise} Resposta do servidor
     */
    async login(email, password) {
        try {
            console.log('🔐 Tentando fazer login:', email);

            // ✅ Validação básica
            if (!email || !password) {
                throw new Error('E-mail e senha são obrigatórios.');
            }

            const response = await api.post('/auth/login', { 
                email, 
                password 
            });

            // ✅ Validar resposta
            if (response.data?.success && response.data?.data?.token) {
                console.log('✅ Login bem-sucedido!');
                
                // Armazenar token e usuário
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
                
                return response.data;
            } else {
                throw new Error(response.data?.message || 'Credenciais inválidas');
            }
        } catch (error) {
            console.error('❌ Erro no login:', error.message);
            throw error;
        }
    },

    /**
     * Obtém o perfil do usuário autenticado
     * @returns {Promise} Dados do perfil
     */
    async getProfile() {
        try {
            console.log('👤 Buscando perfil do usuário');
            const response = await api.get('/auth/profile');
            return response.data;
        } catch (error) {
            console.error('❌ Erro ao buscar perfil:', error.message);
            throw error;
        }
    },

    /**
     * Faz logout do usuário
     */
    logout() {
        try {
            console.log('🚪 Fazendo logout...');
            
            // ✅ Corrigido: era 'toke', agora é 'token'
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            console.log('✅ Logout realizado com sucesso');
            
            // Redirecionar para home ou login
            window.location.href = '/';
        } catch (error) {
            console.error('❌ Erro no logout:', error.message);
        }
    },

    /**
     * Obtém o usuário atual do localStorage
     * @returns {Object|null} Dados do usuário ou null
     */
    getCurrentUser() {
        try {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('❌ Erro ao obter usuário atual:', error.message);
            return null;
        }
    },

    /**
     * Verifica se o usuário está autenticado
     * @returns {boolean} True se autenticado
     */
    isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    },

    /**
     * Obtém o token do localStorage
     * @returns {string|null} Token ou null
     */
    getToken() {
        return localStorage.getItem('token');
    }
};