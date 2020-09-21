import {cardsApi} from '../../apiServices/cardApi'
import {setsApi} from '../../apiServices/setsApi'
import {locationsApi} from "../../apiServices/locationsApi";
import {episodesApi} from "../../apiServices/episodesApi";
import {usersApi} from "../../apiServices/userApi";
import {adminApi} from "../../apiServices/adminApi";
import {toast} from "react-toastify";

import {
    SET_ALL_USERS,
    SET_USER_STATUS,
    SET_ALL_CARDS,
    SET_ALL_LOCATIONS,
    SET_ALL_LOCATIONS_AFTER_DELETED,
    SET_ALL_LOCATIONS_AFTER_UPDATE,
    SET_LOCATION,
    SET_ALL_EPISODES,
    SET_ALL_EPISODES_AFTER_DELETED,
    SET_ALL_EPISODES_AFTER_UPDATE,
    SET_EPISODE,
    SET_ALL_SETS,
    SET_STATISTICS, SET_CARDS_AFTER_UPDATE, SET_CARDS_AFTER_DELETE, SET_CARD
} from '../types/adminTypes'

export const setAllUsers = (users) => ({type: SET_ALL_USERS, payload: users})
export const getAllUsers = () => (dispatch) => {
    usersApi.getAll().then(res => {
        dispatch(setAllUsers(res))
    })
}

export const setAllCards = (cards) => ({type: SET_ALL_CARDS, payload: cards})
export const getAllCards = () => (dispatch) => {
    cardsApi.getAll().then(res => {
        dispatch(setAllCards(res))
    })
}

export const setCard = (card) => ({type: SET_CARD, payload: card})
export const createCard = (name, status, type, gender, image, locations, episodes) => (dispatch) => {
    return cardsApi.createCard(name, status, type, gender, image, locations, episodes)
        .then(res => {
            dispatch(setCard(res))
            console.log(res)
            toast.success('Successful!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
            })
        })
        .catch(err => {
            throw toast.error(`${err.response.data}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
            })
        })
}

export const setCardsAfterUpdate = (card) => ({type: SET_CARDS_AFTER_UPDATE, payload: card})
export const updateCard = (id, card) => (dispatch) => {
    cardsApi.update(id, card).then(res => {
        dispatch(setCardsAfterUpdate(res))
    })
}

export const setCardsAfterDelete = (cardId) => ({type: SET_CARDS_AFTER_DELETE, payload: cardId})
export const deleteCard = (cardId) => (dispatch) => {
    cardsApi.delete(cardId).then(res => {
        dispatch(setCardsAfterDelete(cardId))
    })
}

export const setAllLocations = (locations) => ({type: SET_ALL_LOCATIONS, payload: locations})
export const getAllLocations = () => (dispatch) => {
    locationsApi.getAll().then(res => {
        dispatch(setAllLocations(res))
    })
}

export const setLocation = (location) => ({type: SET_LOCATION, payload: location})
export const createLocation = (name, type, dimension) => (dispatch) => {
    locationsApi.create(name, type, dimension).then(res => {
        dispatch(setLocation(res))
        if (res) {
            toast.success('Location created successful!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
            });
        }
    })
}

export const setLocationsAfterUpdate = (updatedData) => ({
    type: SET_ALL_LOCATIONS_AFTER_UPDATE, payload: updatedData
})
export const updateLocation = (id, updatedData) => (dispatch) => {
    locationsApi.update(id, updatedData).then(res => {
        dispatch(setLocationsAfterUpdate(res))
    })
}

export const setLocationsAfterDeleted = (locationId) => ({type: SET_ALL_LOCATIONS_AFTER_DELETED, payload: locationId})
export const deleteLocation = (id) => (dispatch) => {
    locationsApi.deleteById(id).then(res => {
        dispatch(setLocationsAfterDeleted(id))
    })
}

export const setAllEpisodes = (episodes) => ({type: SET_ALL_EPISODES, payload: episodes})
export const getAllEpisodes = () => (dispatch) => {
    episodesApi.getAll().then(res => {
        dispatch(setAllEpisodes(res))
    })
}

export const setEpisodesAfterDeleted = (episodeId) => ({type: SET_ALL_EPISODES_AFTER_DELETED, payload: episodeId})
export const deleteEpisode = (id) => (dispatch) => {
    episodesApi.deleteById(id).then(res => {
        dispatch(setEpisodesAfterDeleted(id))
    })
}

export const setEpisodesAfterUpdate = (updatedData) => ({
    type: SET_ALL_EPISODES_AFTER_UPDATE, payload: updatedData
})
export const updateEpisode = (id, updatedData) => (dispatch) => {
    episodesApi.update(id, updatedData).then(res => {
        dispatch(setEpisodesAfterUpdate(res))
    })
}

export const setEpisode = (episode) => ({type: SET_EPISODE, payload: episode})
export const createEpisode = (name, episode) => (dispatch) => {
    episodesApi.create(name, episode).then(res => {
        dispatch(setEpisode(res))
        if (res) {
            toast.success('Episode created successful!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
            });
        }
    })
}

export const appointment = (userId, role) => (dispatch) => {
    usersApi.appointment(userId, role)
}

export const setUserStatus = (is_active, id) => ({type: SET_USER_STATUS, payload: {is_active, id}})
export const userLock = (userId) => (dispatch) => {
    usersApi.userLock(userId).then(res => {
        dispatch(setUserStatus(res.is_active, userId))
        if (res) {
            toast.success(`${res.is_active ? 'User Unlocked!' : 'User Blocked!'}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
            });
        }
    })
}

export const setAllSets = (sets) => ({type: SET_ALL_SETS, payload: sets})
export const getAllSets = () => (dispatch) => {
    setsApi.getAll().then(res => {
        dispatch(setAllSets(res))
    })
}

export const createSet = (set_name, set, bonus) => (dispatch) => {
    setsApi.createSet(set_name, set, bonus).then()
}

export const setStatistics = (statistics) => ({type: SET_STATISTICS, payload: statistics})
export const getStatistics = () => (dispatch) => {
    adminApi.getStatistics().then(res => {
        dispatch(setStatistics(res))
    })
}