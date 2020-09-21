import React, {useEffect} from "react";
import {appointment, getAllUsers, userLock} from "../../../redux/dispatches/adminDispatch";
import {connect} from 'react-redux'
import AdminUsers from "./AdminUsers";

const AdminUsersContainer = (props) => {
    useEffect(() => {
        props.getAllUsers()
    }, [])

    return <AdminUsers users={props.users} currentUser={props.currentUser} appointment={props.appointment}
                       userLock={props.userLock}/>
}

const mapStateToProps = (state) => {
    return {
        users: state.adminReducer.users,
        currentUser: state.authReducer.user
    }
}

export default connect(mapStateToProps, {getAllUsers, appointment, userLock})(AdminUsersContainer)