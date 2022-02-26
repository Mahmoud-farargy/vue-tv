import { updateData } from "../actionsTypes";
export const state = {
    receivedData: {
        categories: [],
    }
}

export const mutations = {
    [updateData]: (state, payload) => {
        const { type, newVal } = payload;
        if (type && Object.prototype.hasOwnProperty.call(state.receivedData, type) && Array.isArray(newVal)) {
            state.receivedData[type] = newVal;
        } else {
            throw "'type' must be included in state and 'newVal' must be an array";
        }
    }
}

export const actions = {
    [updateData]: (state, payload) => state.commit(updateData, payload)
}

export const getters = {
    getData: state => state.receivedData
} 