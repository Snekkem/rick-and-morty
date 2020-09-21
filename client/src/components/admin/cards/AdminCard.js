import css from "../../card/card.module.css";
import FA from "react-fontawesome";
import React, {useState} from "react";
import Modal from "react-modal";
import CardReduxForm from "./CreateCardForm";
import AuctionReduxForm from "./AuctionForm";
import 'react-widgets/dist/css/react-widgets.css'
import {STATUS_ALIVE, STATUS_DEAD, STATUS_UNKNOWN} from "../../../common/constants";
import {toast} from "react-toastify";

const AdminCard = ({card, deleteCard, updateCard, isCreateSet, selectedCards, episodes, locations, createAuction}) => {
    const deleteCardById = (id) => {
        deleteCard(id)
    }

    let subtitle;
    const [modalEditIsOpen, setEditOpen] = useState(false);
    const [modalAuctionIsOpen, setAuctionOpen] = useState(false);
    const [modalCardIsOpen, setCardOpen] = useState(false);

    function openEditCardModal() {
        setEditOpen(true);
    }

    function openAuctionModal() {
        setAuctionOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#000';
    }

    function closeEditModal() {
        setEditOpen(false);
    }

    function closeAuctionModal() {
        setAuctionOpen(false);
    }

    function closeCardModal() {
        setCardOpen(false);
    }

    const onEditCardSubmit = values => {
        const image = values.image[0]
        updateCard(card._id, {
            name: values.cardName, status: values.status, type: values.type, gender: values.gender,
            image, locations: values.locations, episodes: values.episodes
        })
    }

    const showCardInfo = () => {
        setCardOpen(true);
    }

    const onAuctionSubmit = values => {
        const days = (values.min_extension_day * 86400) * 1000
        const hours = (values.min_extension_hours * 3600) * 1000
        const minutes = (values.min_extension_minutes * 60000)

        const sum = [days, hours, minutes].reduce((sum, value) => sum + value ? value : 0)
        if (!sum) {

        }

        createAuction({
            start_bet: parseInt(values.start_bet),
            min_step_bet: parseInt(values.min_step_bet),
            max_duration_auctions: new Date(values.max_duration_auctions) - Date.now(),
            min_extension_time: sum,
            max_bet: parseInt(values.max_bet),
            card: card._id
        })
    }

    return (
        <div key={card._id}
             onClick={(event) => selectedCards(event, card._id)}
             className={`row no-gutters col-4 ${css.card} 
                                  ${isCreateSet ? css.cardBrightness : css.cardNormal}`}>
            <button type={'button'} disabled={isCreateSet}
                    onClick={() => deleteCardById(card._id)}
                    className={'btn-delete btn p-0 btn-danger'}>X
            </button>
            <button type={'button'} disabled={isCreateSet} onClick={openEditCardModal}
                    className={'btn-edit btn p-0 btn-warning'}>
                <FA className="fas fa-edit" name="edit"/>
            </button>
            <Modal
                isOpen={modalCardIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeCardModal}
                className={css.cardModal}
                overlayClassName={css.cardOverlay}
                contentLabel="Example Modal"
            >
                <div className={'row no-gutters justify-content-between'}>
                    <h2 ref={_subtitle => (subtitle = _subtitle)}>Card</h2>
                </div>
                <div className={'p-3'}>
                    <div className={'row justify-content-center'}>
                        <img src={card.image} alt={""}/>
                    </div>
                    <h4 className={'text-center'}>{card.name}</h4>
                    <div>Gender: {card.gender}</div>
                    <div>Status: {card.status}</div>
                    <div>Type: {card.type}</div>
                    <div>Locations: {card.locations && card.locations.map(location => location.name)}</div>
                    <div>Episodes: {card.episodes && card.episodes.map(episode => episode.name)}</div>
                    <div>Created at: {card.created_at}</div>
                </div>
            </Modal>
            <Modal
                isOpen={modalEditIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeEditModal}
                className={css.cardEditModal}
                overlayClassName={css.cardOverlay}
                contentLabel="Example Modal"
            >
                <div className={'row no-gutters justify-content-between'}>
                    <h2 ref={_subtitle => (subtitle = _subtitle)}>Edit Card</h2>
                    <button type={"button"} onClick={closeEditModal}
                            className={'btn btn-outline-danger rounded-circle h-25'}>X
                    </button>
                </div>

                <CardReduxForm onSubmit={onEditCardSubmit}
                               episodes={episodes}
                               locations={locations}
                               initialValues={{
                                   cardName: card.name,
                                   gender: card.gender,
                                   status: card.status,
                                   type: card.type,
                                   image: card.image,
                                   locations: card.locations,
                                   episodes: card.episodes
                               }}/>
            </Modal>
            <div className={'col-6'} onMouseEnter={showCardInfo} onMouseLeave={closeCardModal}>
                <img className={css.cardImg} src={card.image}
                     alt={""}/>
            </div>

            <div className={`col-6 ${css.info}`}>
                <h4>{card.name}</h4>
                <div className={'row no-gutters align-items-center'}>
                    {card.status === STATUS_ALIVE && <div className={'alive'}/>}
                    {card.status === STATUS_DEAD && <div className={'dead'}/>}
                    {card.status === STATUS_UNKNOWN && <div className={'unknown'}/>}
                    <div>{card.status}</div>
                </div>
                <div className={'mt-2 text-secondary'}>Location:</div>
                {card.locations && card.locations.map(l => <div key={l._id}>{l.name}</div>)}
                <div>
                    <div className={'text-secondary mt-2'}>Gender:</div>
                    <div>{card.gender}</div>
                </div>
            </div>
            <div>
                <button disabled={isCreateSet}
                        className={`btn-start ${css.glowOnHover}`} onClick={openAuctionModal}>START
                    AUCTION
                </button>
            </div>

            <Modal
                isOpen={modalAuctionIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeAuctionModal}
                className={'auction-form'}
                contentLabel="Example Modal"
            >
                <div className={'row no-gutters justify-content-between'}>
                    <h2 ref={_subtitle => (subtitle = _subtitle)}>Auction</h2>
                    <button type={"button"} onClick={closeAuctionModal}
                            className={'btn btn-outline-danger rounded-circle h-25'}>X
                    </button>
                </div>
                <AuctionReduxForm onSubmit={onAuctionSubmit}/>
            </Modal>
        </div>
    )
}
export default AdminCard