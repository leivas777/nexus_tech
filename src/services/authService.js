import api from './api';

export const authService = {
    /**
     * Fazer login
     */
    async login(email, password) {
        try {
            console.log('🔐 Iniciando login:', email);

            const response = await api.post('/auth/login', { email, password });

            if (response.data?.success) {
                console.log('✅ Login bem-sucedido');

                // ✅ Armazenar token
                localStorage.setItem('token', response.data.token);

                // ✅ Armazenar dados do usuário
                localStorage.setItem('user', JSON.stringify({
                    id: response.data.user.id,
                    name: response.data.user.name,
                    email: response.data.user.email
                }));

                // ✅ Armazenar dados do customer (se existir)
                if (response.data.customer) {
                    console.log('✅ Customer encontrado:', response.data.customer.id);
                    localStorage.setItem('customer', JSON.stringify(response.data.customer));
                } else {
                    console.log('ℹ️ Nenhum customer encontrado para este usuário');
                    localStorage.removeItem('customer');
                }

                return response.data;
            } else {
                throw new Error(response.data?.message || 'Erro ao fazer login');
            }

        } catch (error) {
            console.error('❌ Erro ao fazer login:', error.message);
            throw error;
        }
    },

    /**
     * Fazer registro
     */
    async register(name, email, password) {
        try {
            console.log('📝 Iniciando registro:', email);

            const response = await api.post('/auth/register', { name, email, password });

            if (response.data?.success) {
                console.log('✅ Registro bem-sucedido');

                // ✅ Armazenar token
                localStorage.setItem('token', response.data.token);

                // ✅ Armazenar dados do usuário
                localStorage.setItem('user', JSON.stringify({
                    id: response.data.user.id,
                    name: response.data.user.name,
                    email: response.data.user.email
                }));

                // ✅ IMPORTANTE: Limpar customer (novo usuário ainda não tem)
                localStorage.removeItem('customer');
                console.log('ℹ️ Customer removido (novo usuário)');

                return response.data;
            } else {
                throw new Error(response.data?.message || 'Erro ao fazer registro');
            }

        } catch (error) {
            console.error('❌ Erro ao fazer registro:', error.message);
            throw error;
        }
    },

    /**
     * Verificar se está autenticado
     */
    isAuthenticated() {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        console.log('🔐 Verificando autenticação...');
        console.log('   Token:', token ? '✅ Existe' : '❌ Não existe');
        console.log('   Usuário:', user ? '✅ Existe' : '❌ Não existe');

        return !!(token && user);
    },

    /**
     * Obter usuário atual
     */
    getCurrentUser() {
        const user = localStorage.getItem('user');

        if (user) {
            try {
                const parsedUser = JSON.parse(user);
                console.log('👤 Usuário atual:', parsedUser.id);
                return parsedUser;
            } catch (error) {
                console.error('❌ Erro ao fazer parse do usuário:', error);
                return null;
            }
        }

        console.warn('⚠️ Nenhum usuário autenticado');
        return null;
    },

    /**
     * Obter customer atual
     */
    getCurrentCustomer() {
        const customer = localStorage.getItem('customer');

        if (customer) {
            try {
                const parsedCustomer = JSON.parse(customer);
                console.log('📋 Customer atual:', parsedCustomer.id);
                return parsedCustomer;
            } catch (error) {
                console.error('❌ Erro ao fazer parse do customer:', error);
                return null;
            }
        }

        console.log('ℹ️ Nenhum customer encontrado');
        return null;
    },

    /**
     * Atualizar customer no localStorage
     */
    updateCurrentCustomer(customerData) {
        console.log('💾 Atualizando customer no localStorage:', customerData);
        localStorage.setItem('customer', JSON.stringify(customerData));
    },

    /**
     * Fazer logout
     */
    logout() {
        console.log('🚪 Realizando logout...');

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('customer');

        console.log('✅ Logout realizado com sucesso');
    },

    /**
     * Obter token
     */
    getToken() {
        return localStorage.getItem('token');
    }
};