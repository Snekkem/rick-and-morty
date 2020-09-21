import * as axios from "axios";

export const locationsApi = {
    getAll() {
        return axios.get('/api/user/locations').then(response => response.data)
    },
    deleteById(id) {
        return axios.delete(`/api/admin/delete/location/${id}`).then(response => response.data)
    },
    update(id, dataToUpdate) {
        return axios.put(`/api/admin/update/location/${id}`, {dataToUpdate}).then(response => response.data)
    },
    create(name, type, dimension) {
        return axios.post('/api/admin/create/location', {name, type, dimension}).then(response => response.data)
    }
}