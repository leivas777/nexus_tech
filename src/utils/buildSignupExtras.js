// src/utils/buildSignupExtras.js
export function buildSignupExtras({ name, website, email, phone }) {
    const extras = {
        sessionInfoVersion: '3',
        version: 'v3',
        prefill: {
            business_name: name || '',
            business_website: website || '',
            business_email: email || '',
            business_phone_number: phone || ''
        }
    };
    return extras;
}