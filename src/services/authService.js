import api from './api';

export const authService = {
    async register(name, email, password) {
        const response = await api.post('/auth/register', { name, email, password });
        if(response.data.success){
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }

        return response.data;
    },

    async login(email, password){
        const response = await api.post('/auth/login', {email, password});
        if(response.data.success){
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }

        return response.data;
    },

    async getProfile(){
        const response = await api.get('/auth/profile');
        return response.data;
    },

    logout(){
        localStorage.removeItem('toke');
        localStorage.removeItem('user')
        window.location.href = '/login';
    },

    getCurrentUser(){
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user):null;
    },

    isAuthenticated(){
        return !!localStorage.getItem('token');
    }
};