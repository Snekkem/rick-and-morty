import * as axios from "axios";

export const episodesApi = {
    getAll() {
        return axios.get('/api/user/episodes').then(response => response.data)
    },
    deleteById(id) {
        return axios.delete(`/api/admin/delete/episode/${id}`).then(response => response.data)
    },
    update(id, dataToUpdate) {
        return axios.put(`/api/admin/update/episode/${id}`, {dataToUpdate}).then(response => response.data)
    },
    create(name, episode) {
        return axios.post('/api/admin/create/episode', {name, episode}).then(response => response.data)
    }
}
