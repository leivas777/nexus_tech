// src/utils/stateManager.js
export function generateState() {
    const state = `csrf-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    // Armazena no localStorage para validação posterior
    localStorage.setItem(`meta_state_${state}`, JSON.stringify({
        createdAt: Date.now(),
        state
    }));
    return state;
}

export function validateStateLocal(state) {
    const entry = JSON.parse(localStorage.getItem(`meta_state_${state}`));
    if (!entry) return false;
    const age = Date.now() - entry.createdAt;
    if (age > 10 * 60 * 1000) {
        localStorage.removeItem(`meta_state_${state}`);
        return false;
    }
    localStorage.removeItem(`meta_state_${state}`);
    return true;
}