/**
 * Service de Agendamentos
 * Gerencia operações de agendamentos (CRUD)
 */

import api from './api';

export const appointmentService = {
    /**
     * Listar todos os agendamentos do usuário
     */
    async getAppointments(filters = {}) {
        try {

            const response = await api.get('/appointments', {
                params: filters
            });
            return response.data.appointments || [];
        } catch (error) {
            console.error('❌ Erro ao buscar agendamentos:', error.message);
            throw error;
        }
    },

    /**
     * Obter agendamento por ID
     */
    async getAppointmentById(id) {
        try {
            const response = await api.get(`/appointments/${id}`);
            return response.data.appointment;
        } catch (error) {
            console.error(`❌ Erro ao buscar agendamento ${id}:`, error.message);
            throw error;
        }
    },

    /**
     * Criar novo agendamento
     */
    async createAppointment(appointmentData) {
        try {

            if (!appointmentData.title) {
                throw new Error('Título é obrigatório');
            }
            if (!appointmentData.startTime) {
                throw new Error('Data/hora de início é obrigatória');
            }
            if (!appointmentData.endTime) {
                throw new Error('Data/hora de fim é obrigatória');
            }

            const response = await api.post('/appointments', appointmentData);
            return response.data.appointment;
        } catch (error) {
            console.error('❌ Erro ao criar agendamento:', error.message);
            throw error;
        }
    },

    /**
     * Atualizar agendamento
     */
    async updateAppointment(id, appointmentData) {
        try {

            const response = await api.put(
                `/appointments/${id}`,
                appointmentData
            );
            return response.data.appointment;
        } catch (error) {
            console.error(`❌ Erro ao atualizar agendamento ${id}:`, error.message);
            throw error;
        }
    },

    /**
     * Deletar agendamento
     */
    async deleteAppointment(id) {
        try {
            const response = await api.delete(`/appointments/${id}`);
            return response.data;
        } catch (error) {
            console.error(`❌ Erro ao deletar agendamento ${id}:`, error.message);
            throw error;
        }
    },

    /**
     * Obter agendamentos de um período específico
     */
    async getAppointmentsByDateRange(startDate, endDate) {
        try {
            const response = await api.get('/appointments', {
                params: {
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString()
                }
            });

            return response.data.appointments || [];
        } catch (error) {
            console.error(
                '❌ Erro ao buscar agendamentos por período:',
                error.message
            );
            throw error;
        }
    }
};