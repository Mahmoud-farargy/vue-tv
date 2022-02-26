export const state = {
    keys: {
        isDay: false,
        openSidebar: true,
        isLoading: false,
        hasError: false
    },
    modals: {
        share: false
    }
}
export const mutations = {
    mutateKeys: (state, payload) => {
        const { key, val } = payload;
        const trimmedKey = key.trim();
        if (trimmedKey && (Object.keys(state.keys).map(el => el).indexOf(trimmedKey) !== -1)) {
            state.keys[trimmedKey] = (val !== undefined) ? val : !state.keys[trimmedKey];
        }
        return;
    },
    toggleModal: (state, payload) => {
        const { type, val } = payload;
        if (type === "closeAll" || type && (Object.keys(state.modals).map(key => key).indexOf(type) !== -1)) {
            if (type === "closeAll") {
                Object.keys(state.modals).map(key => {
                    state.modals[key] = false;
                });
            } else {
                state.modals[type] = (val !== undefined) ? val : !state.modals[type];
            }
        } else {
            throw "type should be a valid key";
        }
    },
    resetSomeKeys: (state, payload) => {
        const { keys } = payload;
        if (keys && Array.isArray(keys)) {
            keys.forEach(el => {
                if (state.keys[el]) {
                    state.keys = {
                        ...state.keys,
                        [el?.trim()]: false
                    }
                }
            })
        } else {
            throw "'keys' should be an array";
        }
        return;
    }
}
export const actions = {
    mutateKeys: (state, payload) => {
        return state.commit("mutateKeys", payload);
    },
    resetSomeKeys: (state, payload) => {
        return state.commit("resetSomeKeys", payload);
    },
    toggleModal: (state, payload) => state.commit("toggleModal", payload)
}
export const getters = {
    getKeys: state => state.keys,
    getModals: state => state.modals
}