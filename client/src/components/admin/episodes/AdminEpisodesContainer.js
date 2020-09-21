import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {createEpisode, deleteEpisode, getAllEpisodes, updateEpisode} from '../../../redux/dispatches/adminDispatch'
import AdminEpisodes from "./AdminEpisodes";

export const AdminEpisodesContainer = ({episodes, createEpisode, getAllEpisodes, updateEpisode, deleteEpisode}) => {
    useEffect(() => {
        getAllEpisodes()
    }, [])

    return (
        <AdminEpisodes episodes={episodes} createEpisode={createEpisode} updateEpisode={updateEpisode}
                       deleteEpisode={deleteEpisode}/>
    )
}

const mapStateToProps = (state) => ({
    episodes: state.adminReducer.episodes
})

const mapDispatchToProps = {
    getAllEpisodes,
    deleteEpisode,
    updateEpisode,
    createEpisode
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEpisodesContainer)