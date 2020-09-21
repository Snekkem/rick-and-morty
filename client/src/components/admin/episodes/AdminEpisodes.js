import React, {useState} from 'react'
import AdminEpisode from './AdminEpisode'
import Modal from 'react-modal';
import CreateEpisodeReduxForm from "./CreateEpisode";
import css from './episode.module.css'

function AdminEpisodes({episodes, createEpisode, updateEpisode, deleteEpisode}) {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#000';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const submit = values => {
        createEpisode(values.episodeName, values.episode)
    }

    return (
        <div className={'row no-gutters'}>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                className={css.Modal}
                contentLabel="Example Modal"
            >
                <div className={'row no-gutters justify-content-between'}>
                    <h4 ref={_subtitle => (subtitle = _subtitle)}>Add new Episode</h4>
                    <button type={"button"} onClick={closeModal}
                            className={'btn btn-outline-danger rounded-circle h-25'}>X
                    </button>
                </div>
                <CreateEpisodeReduxForm onSubmit={submit}/>
            </Modal>
            <div className={'col-2'}/>
            <table className="col-10 table table-hover table-dark">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Episode</th>
                    <th scope="col">Air Date</th>
                    <th scope="col">
                        <button type={'button'} onClick={openModal} className={'btn btn-success'}>Create</button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {episodes.map((episode, index) => (
                    <AdminEpisode key={`${episode._id}${index}`} deleteEpisode={deleteEpisode} updateEpisode={updateEpisode}
                                  episode={episode} index={index}/>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminEpisodes
