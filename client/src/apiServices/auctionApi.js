import * as axios from "axios";

export const auctionApi = {
    getAuctions() {
        return axios.get('/api/admin/auctions').then(response => response.data)
    },
    createAuction(auctionData) {
        return axios.post('/api/admin/auction', auctionData).then(response => response.data)
    },
    placeABet(auction, user, bet) {
        return axios.post('/api/admin/place-a-bet', {auction, user, bet}).then(response => response.data)
    },

}