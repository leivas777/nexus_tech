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
            console.log('🔐 Obtendo URL de autenticação do Google...');

            const response = await api.get('/api/auth/google/url');
            console.log('✅ URL de autenticação obtida');
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
            console.log('🔍 Verificando status do Google Calendar...');

            const response = await api.get(`/auth/google/status?t=${new Date().getTime()}`);
            console.log(
                `✅ Status: ${response.data.isConnected ? 'Conectado' : 'Desconectado'}`
            );
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
            console.log('🔌 Desconectando Google Calendar...');

            const response = await api.post('/api/auth/google/disconnect');
            console.log('✅ Google Calendar desconectado');
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
            console.log('🔐 Iniciando autenticação com Google...');

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
            console.log(`📅 Listando eventos de ${startDate} a ${endDate}...`);

            const response = await api.get('/api/auth/google/events', {
                params: {
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString()
                }
            });

            console.log(`✅ ${response.data.events?.length || 0} eventos encontrados`);
            return response.data.events || [];
        } catch (error) {
            console.error('❌ Erro ao listar eventos:', error.message);
            throw error;
        }
    }
};