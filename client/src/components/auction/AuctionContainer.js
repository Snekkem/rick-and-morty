import React, {useEffect} from "react";
import Auctions from "./Auctions";
import {connect} from "react-redux";
import {getAuctions} from "../../redux/auction-reducer";

const AuctionContainer = (props) => {
    useEffect(() => {
        props.getAuctions()
    }, [])

    return <Auctions auctions={props.auctions}/>
}

const mapStateToProps = (state) => {
    return {
        auctions: state.auctionReducer.auctions
    }
}

export default connect(mapStateToProps, {getAuctions})(AuctionContainer)