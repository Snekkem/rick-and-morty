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
} from './types/adminTypes'

const initialState = {
    users: [],
    cards: [],
    locations: [],
    episodes: [],
    sets: [],
    statistics: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_USERS: {
            return {
                ...state,
                users: action.payload
            }
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                users: state.users.map(user => user._id === action.payload.id ? {
                    ...user,
                    is_active: action.payload.is_active
                } : user)
            }
        }
        case SET_ALL_LOCATIONS: {
            return {
                ...state,
                locations: action.payload
            }
        }
        case SET_ALL_LOCATIONS_AFTER_DELETED: {
            return {
                ...state,
                locations: state.locations.filter(l => l._id.toString() !== action.payload)
            }
        }
        case SET_ALL_LOCATIONS_AFTER_UPDATE: {
            return {
                ...state,
                locations: state.locations.map(location => location._id === action.payload._id ? action.payload : location)
            }
        }
        case SET_LOCATION: {
            return {
                ...state,
                locations: [...state.locations, action.payload]
            }
        }
        case SET_ALL_EPISODES: {
            return {
                ...state,
                episodes: action.payload
            }
        }
        case SET_ALL_EPISODES_AFTER_DELETED: {
            return {
                ...state,
                episodes: state.episodes.filter(e => e._id.toString() !== action.payload)
            }
        }
        case SET_ALL_EPISODES_AFTER_UPDATE: {
            return {
                ...state,
                episodes: state.episodes.map(episode => episode._id === action.payload._id ? action.payload : episode)
            }
        }
        case SET_EPISODE: {
            return {
                ...state,
                episodes: [...state.episodes, action.payload]
            }
        }
        case SET_ALL_CARDS: {
            return {
                ...state,
                cards: action.payload
            }
        }
        case SET_CARD: {
            return {
                ...state,
                cards: [...state.cards, action.payload]
            }
        }
        case SET_ALL_SETS: {
            return {
                ...state,
                sets: action.payload
            }
        }
        case SET_STATISTICS: {
            return {
                ...state,
                statistics: action.payload
            }
        }
        case SET_CARDS_AFTER_DELETE: {
            return {
                ...state,
                cards: state.cards.filter(card => card._id.toString() !== action.payload)
            }
        }
        case SET_CARDS_AFTER_UPDATE: {
            return {
                ...state,
                cards: state.cards.map(card => card._id === action.payload._id ? action.payload : card)
            }
        }
        default:
            return state;
    }
}


export default adminReducer