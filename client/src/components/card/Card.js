import React from "react";
import css from './card.module.css'

const Card = (props) => {
    return (
        <div>
            <div className={`row no-gutters justify-content-around`}>
                {props.cards.map(card =>
                    <div key={card._id} className={`row no-gutters col-3 ${css.card}`}>
                        <div className={'col-6'}><img className={css.cardImg} src={card.image} alt={""}/></div>
                        <div className={`col ${css.info}`}>
                            <h4>{card.name}</h4>
                            <div className={'row no-gutters align-items-center'}>
                                {card.status === 'Alive' && <div className={'alive'}/>}
                                {card.status === 'Dead' && <div className={'dead'}/>}
                                {card.status === 'unknown' && <div className={'unknown'}/>}
                                <div>{card.status}</div>
                            </div>
                            <div className={'mt-2 text-secondary'}>Location:</div>
                            {card.locations.map(l =><div key={l._id}>{l.name}</div>)}
                            <div>
                                <div className={'text-secondary mt-2'}>Gender:</div>
                                <div>{card.gender}</div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default Card
