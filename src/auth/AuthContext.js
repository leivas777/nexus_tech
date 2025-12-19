import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react'

const AuthContext = createContext(null);

export function AuthProvider({children}){
    const[user, setUser] = useState(null);
    const isAuthenticated = !!user;

    useEffect(() => {
        const saved = window.localStorage.getItem('app_user');
        if(saved){
            try{
                const parsed = JSON.parse(saved);
                if(parsed && parsed.email){
                    setUser(parsed)
                }
            }catch{}
        }
    }, []);

    const login = useCallback(async({email, password}) => {
        if(!email || !password){
            throw new Error('Informe e-mail e senha.');
        }

        setUser({email, name: email.split('@')[0]});
        return true;
    }, []);

    const logout = useCallback(() => {
        setUser(null)
    }, []);

    const register = useCallback(async(data) => {
        const profile = {
            name: data?.nome || 'Usuário',
            email: data?.email,
            empresaSegmento: data?.segmento,
            desafios: data?.desafios || [],
            expectativa: data?.expectativa || [],
            qtdClientes: data?.qtdClientes || 0
        };
        if(!profile.email){
            throw new Error('E-mail é obrigatório no cadastrp');
        }

        setUser(profile);
        return true
    }, []);

    const value = useMemo(() => ({
        isAuthenticated,
        user,
        login,
        logout,
        register
    }), [isAuthenticated, user, login, logout, register]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
    return ctx
}