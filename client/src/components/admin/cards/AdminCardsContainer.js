import React, {useEffect} from "react";
import {
    createCard,
    createSet,
    deleteCard,
    getAllCards,
    getAllEpisodes,
    getAllLocations, updateCard
} from "../../../redux/dispatches/adminDispatch";
import {connect} from 'react-redux'
import AdminCards from "./AdminCards";
import {createAuction} from "../../../redux/auction-reducer";

const AdminUsersContainer = (props) => {
    useEffect(() => {
        props.getAllCards()
        props.getAllEpisodes()
        props.getAllLocations()
    }, [])

    return <AdminCards createCard={props.createCard} createSet={props.createSet} cards={props.cards}
                       deleteCard={props.deleteCard} updateCard={props.updateCard}
                       episodes={props.episodes} createAuction={props.createAuction}
                       locations={props.locations}/>
}

const mapStateToProps = (state) => {
    return {
        cards: state.adminReducer.cards,
        episodes: state.adminReducer.episodes,
        locations: state.adminReducer.locations
    }
}

export default connect(mapStateToProps, {
    getAllCards,
    getAllEpisodes,
    getAllLocations,
    createCard,
    createSet,
    deleteCard,
    updateCard,
    createAuction
})(AdminUsersContainer)