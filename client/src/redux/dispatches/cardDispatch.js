import {SET_ALL_CARDS} from "../types/adminTypes";
import {cardsApi} from "../../apiServices/cardApi";

export const setAllCards = (cards) => ({type: SET_ALL_CARDS, payload: cards})
export const getAll = () => (dispatch) => {
    cardsApi.getAll().then(res => {
        dispatch(setAllCards(res))
    })
}