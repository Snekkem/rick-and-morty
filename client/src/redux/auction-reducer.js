import {auctionApi} from "../apiServices/auctionApi";
import {SET_AUCTION, SET_AUCTIONS, SET_BET} from './types/auctionTypes'

const initialState = {
    auctions: [],
    bets: []
}

const auctionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUCTIONS: {
            return {
                ...state,
                auctions: action.payload
            }
        }
        case SET_AUCTION: {
            return {
                ...state,
                auctions: [state.auctions, action.payload]
            }
        }
        case SET_BET: {
            return {
                ...state,
                auctions: state.auctions.map(item => item.auction._id === action.payload.auctionId ? {
                    ...item,
                    lastBet: action.payload.bet
                } : item)
            }
        }
        default:
            return state;
    }
}

export const setAllAuction = (auctions) => ({type: SET_AUCTIONS, payload: auctions})
export const getAuctions = () => (dispatch) => {
    auctionApi.getAuctions().then(res => {
        dispatch(setAllAuction(res))
    })
}

export const setAuction = (auction) => ({type: SET_AUCTION, payload: auction})
export const createAuction = (auctionData) => (dispatch) => {
    console.log(auctionData)
    auctionApi.createAuction(auctionData).then(res => {
        dispatch(setAuction(res))
    })
}

export const setBet = (auctionId, bet) => ({type: SET_BET, payload: {auctionId, bet}})
export const placeABet = (auction, user, bet) => (dispatch) => {
    auctionApi.placeABet(auction, user, bet).then(res => {
        dispatch(setBet(res))
    })
}

export default auctionReducer