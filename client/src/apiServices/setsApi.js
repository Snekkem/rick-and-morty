import * as axios from "axios";

export const setsApi = {
    getAll() {
        return axios.get('/api/admin/sets').then(response => response.data)
    },
    createSet(set_name, set, bonus) {
        return axios.post('/api/admin/create/set', {set_name, set, bonus}).then(response => response.data)
    }
}