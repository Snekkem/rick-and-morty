import React, {useEffect} from "react";
import {getStatistics} from "../../../redux/dispatches/adminDispatch";
import {connect} from 'react-redux'
import AdminStatistics from "./AdminStatistics";

const AdminStatisticsContainer = (props) => {
    useEffect(() => {
        props.getStatistics()
    }, [])

    return <AdminStatistics statistics={props.statistics}/>
}

const mapStateToProps = (state) => {
    return {
        statistics: state.adminReducer.statistics
    }
}

export default connect(mapStateToProps, {getStatistics})(AdminStatisticsContainer)