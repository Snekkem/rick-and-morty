import React from "react";
import AdminSet from "./AdminSet";

const AdminSets = (props) => {
    return (
        props.sets.map(set => <div className={'row no-gutters justify-content-center'}>
            <AdminSet key={set._id} setInfo={set}/>
        </div>)
    )
}


export default AdminSets