// src/services/launchEmbeddedSignup.js
import { generateState } from '../utils/stateManager';

export function launchEmbeddedSignup({
    configId,
    redirectUri,
    extras
}) {
    console.log('📍 Variáveis de ambiente:');
    console.log('APP_ID:', process.env.REACT_APP_META_APP_ID);
    console.log('CONFIG_ID:', process.env.REACT_APP_META_LOGIN_CONFIG_ID);
    console.log('REDIRECT_URI:', process.env.REACT_APP_META_REDIRECT_URI);
    // Gera um state único para CSRF
    const state = generateState();

    // Constrói a URL hospedada pelo Meta
    const hostedUrl = new URL('https://business.facebook.com/messaging/whatsapp/onboard/');
    hostedUrl.searchParams.set('app_id', String(process.env.REACT_APP_META_APP_ID));
    hostedUrl.searchParams.set('config_id', String(configId));
    hostedUrl.searchParams.set('state', state);
    
    if (extras) {
        hostedUrl.searchParams.set('extras', encodeURIComponent(JSON.stringify(extras)));
    }

    console.log('🔗 Redirecionando para:', hostedUrl.toString());

    // Redireciona para a página do Meta
    window.location.href = hostedUrl.toString();
}