import * as axios from "axios";

export const usersApi = {
    getAll() {
        return axios.get('/api/admin/users').then(response => response.data)
    },
    appointment(userId, role) {
        axios.post('/api/admin/appoint-admin', {userId, role}).then(response => response.data)
    },
    userLock(userId) {
        return axios.post('/api/admin/userlock', {userId}).then(response => response.data).catch(e => e.message)
    }
}