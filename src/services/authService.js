import api from './api';

export const authService = {
    /**
     * Fazer login
     */
    async login(email, password) {
        try {
            console.log('🔐 Iniciando login SaaS:', email);

            const response = await api.post('/auth/login', { email, password });

            // No novo backend, se não der erro, os dados vem direto no response.data
            if (response.data && response.data.token) {
                console.log('✅ Login bem-sucedido');

                localStorage.setItem('token', response.data.token);
                
                // Ajustado para o que o seu novo backend retorna
                localStorage.setItem('user', JSON.stringify({
                    id: response.data.userId, // O backend retorna userId
                    email: email
                }));

                return { success: true, ...response.data };
            } else {
                throw new Error('Falha na autenticação');
            }

        } catch (error) {
            // Captura a mensagem de erro vinda do backend (ex: "Credenciais inválidas")
            const errorMsg = error.response?.data?.error || error.message;
            console.error('❌ Erro ao fazer login:', errorMsg);
            throw new Error(errorMsg);
        }
    },

    /**
     * Fazer registro
     */
    async register(name, email, password) {
        try {
            console.log('📝 Iniciando registro SaaS:', email);

            // O novo backend signup espera apenas email e password por enquanto
            const response = await api.post('/auth/signup', { email, password });

            // Se o status for 201 (Criado), consideramos sucesso
            if (response.status === 201 || response.data?.userId) {
                console.log('✅ Registro bem-sucedido');

                // Opcional: Você pode logar o usuário automaticamente aqui 
                // ou pedir para ele fazer login. Se o backend não retorna token no signup:
                return { success: true, userId: response.data.userId };
            } else {
                throw new Error('Erro ao criar conta');
            }

        } catch (error) {
            const errorMsg = error.response?.data?.error || error.message;
            console.error('❌ Erro ao fazer registro:', errorMsg);
            throw new Error(errorMsg);
        }
    },

    async  getProfile() {
        try{
            const token = this.getToken();
            if(!token) return null;

            const response = await api.get('auth/me', {
            headers: { Authorization: `Bearer ${token}`}
            });

            if(response.data){
            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data
            }
        }catch(error){
            console.error("Erro ao sincronizar perfil:", error);
            return null
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