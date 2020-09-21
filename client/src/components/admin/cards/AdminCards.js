import React, {useState} from "react";
import css from "../../card/card.module.css";
import Modal from 'react-modal';
import './style.css'
import 'react-widgets/dist/css/react-widgets.css'
import CardReduxForm from "./CreateCardForm";
import SetReduxForm from "./CreateSetForm";
import AdminCard from "./AdminCard";
import {createAuction} from "../../../redux/auction-reducer";

const AdminCards = (props) => {
    let set = new Set()
    const onSelectCard = (e, cardId) => {
        if (createSet) {
            if (set.has(cardId)) {
                set.delete(cardId)
                e.currentTarget.classList.remove(css.cardNormal)
            } else {
                set.add(cardId)
                e.currentTarget.classList.add(css.cardNormal)
            }
        }
    }

    const onSubmitSet = values => {
        const cardArr = []
        set.forEach(s => cardArr.push(s))
        props.createSet(values.setName, cardArr, values.bonus)
    }

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [createSet, setCreateSet] = useState(false)

    function openCreateCardModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#000';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const onCreateSet = () => {
        setCreateSet(!createSet)
    }

    const onSubmit = values => {
        const image = values.image[0]
        props.createCard(values.cardName, values.status, values.type, values.gender,
            image, values.locations, values.episodes)
            .then(() => setIsOpen(false))
    }

    return (
        <>
            <div className={`row no-gutters p-4`}>
                <div className={'col-2'}/>
                <div className={'col-10 d-flex justify-content-center'}>
                    {!createSet ?
                        <button type={"button"} onClick={onCreateSet} className={'btn btn-outline-primary mr-3'}>Create
                            Set</button>
                        :
                        <>
                            <SetReduxForm onSubmit={onSubmitSet}/>
                            <button type={"button"} onClick={onCreateSet}
                                    className={'btn btn-outline-danger mr-3'}>Cancel
                            </button>
                        </>}
                    <button type={"button"} disabled={createSet} onClick={openCreateCardModal}
                            className={'btn btn-outline-success'}>Create Card
                    </button>

                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        className={css.cardModal}
                        contentLabel="Example Modal"
                    >
                        <div className={'row no-gutters justify-content-between'}>
                            <h2 ref={_subtitle => (subtitle = _subtitle)}>Add new Card</h2>
                            <button type={"button"} onClick={closeModal}
                                    className={'btn btn-outline-danger rounded-circle h-25'}>X
                            </button>
                        </div>
                        <CardReduxForm onSubmit={onSubmit} episodes={props.episodes} locations={props.locations}/>
                    </Modal>
                </div>
            </div>

            <div className={'row'}>
                <div className={'col-2'}/>
                <div className={'col'}>
                    <div className={`row no-gutters justify-content-around`}>
                        {props.cards.map(card => <AdminCard card={card} isCreateSet={createSet}
                                                            updateCard={props.updateCard}
                                                            createAuction={props.createAuction}
                                                            episodes={props.episodes} locations={props.locations}
                                                            selectedCards={onSelectCard} deleteCard={props.deleteCard}/>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminCards