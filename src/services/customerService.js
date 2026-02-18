// src/services/customerService.js
import api from './api';

export const customerService = {
    /**
     * Buscar customer do usuário autenticado
     */
    async getCustomer() {
        try {
            const response = await api.get('/auth/customers');

            if (response.data?.success) {
                return response.data.data;
            } else {
                throw new Error(response.data?.message || 'Erro ao buscar customer');
            }

        } catch (error) {
            console.error('❌ Erro ao buscar customer:', error.message);
            // Retornar null se não encontrar (não é erro)
            if (error.response?.status === 404) {
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
            const response = await api.post('/auth/customers', {
                nome: customerData.nome,
                email: customerData.email,
                segmento: customerData.segmento,
                qtdClientes: customerData.qtdClientes,
                site: customerData.site,
                telefone: customerData.telefone
            });

            if (response.data?.success) {
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
            const response = await api.put(`/auth/customers/${id}`, customerData);

            if (response.data?.success) {
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
            const response = await api.delete(`/auth/customers/${id}`);

            if (response.data?.success) {
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