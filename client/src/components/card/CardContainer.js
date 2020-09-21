import React, {useEffect} from "react";
import Card from "./Card";
import {getAll} from "../../redux/dispatches/cardDispatch";
import {connect} from 'react-redux'

const CardContainer = (props) => {
    useEffect(() => {
        props.getAll()
    }, [])

    return <Card cards={props.cards}/>
}

const mapStateToProps = (state) => {
    return {
        cards: state.cardReducer.cards
    }
}

export default connect(mapStateToProps, {getAll})(CardContainer)