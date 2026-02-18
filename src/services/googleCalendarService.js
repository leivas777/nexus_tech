/**
 * Service de Google Calendar
 * Gerencia operações relacionadas ao Google Calendar
 */

import api from './api';

export const googleCalendarService = {
    /**
     * Obter URL de autenticação do Google
     */
    async getAuthUrl() {
        try {
            const response = await api.get('/api/auth/google/url');
            return response.data.authUrl;
        } catch (error) {
            console.error('❌ Erro ao obter URL de autenticação:', error.message);
            throw error;
        }
    },

    /**
     * Verificar status da conexão com Google Calendar
     */
    async getConnectionStatus() {
        try {
            const response = await api.get(`/auth/google/status?t=${new Date().getTime()}`);
            return {
                isConnected: response.data.isConnected,
                calendarId: response.data.calendarId,
                email: response.data.email
            };
        } catch (error) {
            console.error('❌ Erro ao verificar status:', error.message);
            throw error;
        }
    },

    /**
     * Desconectar Google Calendar
     */
    async disconnect() {
        try {
            const response = await api.post('/api/auth/google/disconnect');
            return response.data;
        } catch (error) {
            console.error('❌ Erro ao desconectar:', error.message);
            throw error;
        }
    },

    /**
     * Iniciar fluxo de autenticação com Google
     */
    async initiateAuth() {
        try {
            const token = localStorage.getItem('token')

            if(!token){
                throw new Error ('Usuário não autenticado no sistema local.');
            }

            window.location.href = `${process.env.BACKEND_URL}api/auth/google?token=${token}`;
        } catch (error) {
            console.error('❌ Erro ao iniciar autenticação:', error.message);
            alert("Erro ao conectar com Google: " + error.message);
        }
    },

    /**
     * Listar eventos do Google Calendar
     */
    async listEvents(startDate, endDate) {
        try {
            const response = await api.get('/api/auth/google/events', {
                params: {
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString()
                }
            });

            return response.data.events || [];
        } catch (error) {
            console.error('❌ Erro ao listar eventos:', error.message);
            throw error;
        }
    }
};