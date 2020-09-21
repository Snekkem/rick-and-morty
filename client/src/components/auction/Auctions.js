import React from "react";
import Auction from "./Auction";


const Auctions = ({auctions}) => {
    return (
        <div className={'row no-gutters'}>
            <div className={'col-2'}/>
            {auctions.length > 0 ? auctions && auctions.map(auction => <Auction key={auction._id} allInfo={auction}/>) :
                <h2 className={'text-center'}>Auction list is empty...</h2>}
        </div>
    )
}

export default Auctions