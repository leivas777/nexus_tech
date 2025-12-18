// src/hooks/useFacebookSDK.js
import { useEffect } from 'react';

export function useFacebookSDK(appId, version = 'v20.0') {
    useEffect(() => {
        if (window.FB) {
            return;
        }
        window.fbAsyncInit = function () {
            window.FB.init({
                appId,
                xfbml: false,
                version
            });
        };
        const s = document.createElement('script');
        s.async = true;
        s.defer = true;
        s.crossOrigin = 'anonymous';
        s.src = 'https://connect.facebook.net/pt_BR/sdk.js';
        document.body.appendChild(s);
    }, [appId, version]);
}