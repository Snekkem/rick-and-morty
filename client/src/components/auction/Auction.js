import React from "react";
import css from './Auction.module.css'
import Timer from "./Timer";

const Auction = ({allInfo}) => {
    console.log(allInfo)
    return (
        <>
            {allInfo.auction &&
            <div className={`${css.auction} ${allInfo.auction.owner.role === 'Admin' && css.adminBorder}`}>
                <div className={`d-flex no-gutters justify-content-between`}>
                    <small>{allInfo.auction.owner.name}</small>
                    <small>{new Date(allInfo.auction.created_at).toLocaleString()}</small>
                </div>
                <div className={'row justify-content-center my-2'}>
                    <img src={allInfo.auction.card.image} alt={""}/>
                </div>
                <h5 className={'text-center'}>{allInfo.auction.card.name}</h5>
                <div className={'d-flex no-gutters justify-content-between'}>
                    <small>Current rate</small>
                    <small>{allInfo.lastBet ? allInfo.lastBet.bet : 'No rates'}</small>
                </div>
                <div className={'d-flex no-gutters justify-content-between'}>
                    <small>Min rate</small>
                    <small>{allInfo.auction.min_step_bet}</small>
                </div>
                <div className={'d-flex no-gutters justify-content-between'}>
                    <small>Max rate</small>
                    {allInfo.auction.max_bet}
                </div>
                <div className={'d-flex no-gutters justify-content-between'}>
                    <small>Time to end</small>
                    <small><Timer time={allInfo.auction.end_auction}/></small>
                </div>
            </div>
            }
        </>
    )
}

export default Auction