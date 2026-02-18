// src/services/launchEmbeddedSignup.js
import { generateState } from '../utils/stateManager';

export function launchEmbeddedSignup({
    configId,
    redirectUri,
    extras
}) {
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
    // Redireciona para a página do Meta
    window.location.href = hostedUrl.toString();
}