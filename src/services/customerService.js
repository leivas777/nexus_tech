// src/services/customerService.js
import api from './api';

export const customerService = {
    /**
     * Buscar customer do usuário autenticado
     */
    async getCustomer() {
        try {
            console.log('📋 Buscando customer do usuário...');

            const response = await api.get('/auth/customers');

            if (response.data?.success) {
                console.log('✅ Customer encontrado:', response.data.data);
                return response.data.data;
            } else {
                throw new Error(response.data?.message || 'Erro ao buscar customer');
            }

        } catch (error) {
            console.error('❌ Erro ao buscar customer:', error.message);
            // Retornar null se não encontrar (não é erro)
            if (error.response?.status === 404) {
                console.log('ℹ️ Customer não existe ainda');
                return null;
            }
            throw error;
        }
    },

    /**
     * Criar customer
     */
    async createCustomer(customerData) {
        try {
            console.log('📝 Criando novo customer:', customerData);

            const response = await api.post('/auth/customers', {
                nome: customerData.nome,
                email: customerData.email,
                segmento: customerData.segmento,
                qtdClientes: customerData.qtdClientes,
                site: customerData.site,
                telefone: customerData.telefone
            });

            if (response.data?.success) {
                console.log('✅ Customer criado com sucesso!');
                return response.data.data;
            } else {
                throw new Error(response.data?.message || 'Erro ao criar customer');
            }

        } catch (error) {
            console.error('❌ Erro ao criar customer:', error.message);
            throw error;
        }
    },

    /**
     * Atualizar customer
     */
    async updateCustomer(id, customerData) {
        try {
            console.log('✏️ Atualizando customer:', id, customerData);

            const response = await api.put(`/auth/customers/${id}`, customerData);

            if (response.data?.success) {
                console.log('✅ Customer atualizado com sucesso!');
                return response.data.data;
            } else {
                throw new Error(response.data?.message || 'Erro ao atualizar customer');
            }

        } catch (error) {
            console.error('❌ Erro ao atualizar customer:', error.message);
            throw error;
        }
    },

    /**
     * Deletar customer
     */
    async deleteCustomer(id) {
        try {
            console.log('🗑️ Deletando customer:', id);

            const response = await api.delete(`/auth/customers/${id}`);

            if (response.data?.success) {
                console.log('✅ Customer deletado com sucesso!');
                return response.data;
            } else {
                throw new Error(response.data?.message || 'Erro ao deletar customer');
            }

        } catch (error) {
            console.error('❌ Erro ao deletar customer:', error.message);
            throw error;
        }
    }
};