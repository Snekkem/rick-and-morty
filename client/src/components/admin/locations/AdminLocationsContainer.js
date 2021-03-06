import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {createLocation, deleteLocation, getAllLocations, updateLocation} from '../../../redux/dispatches/adminDispatch'
import AdminLocations from './AdminLocations'

export const AdminLocationsContainer = ({locations, createLocation, getAllLocations, updateLocation, deleteLocation}) => {
    useEffect(() => {
        getAllLocations()
    }, [])

    return (
        <AdminLocations locations={locations} updateLocation={updateLocation} deleteLocation={deleteLocation}
                        createLocation={createLocation}/>
    )
}

const mapStateToProps = (state) => ({
    locations: state.adminReducer.locations
})

const mapDispatchToProps = {
    getAllLocations,
    updateLocation,
    deleteLocation,
    createLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLocationsContainer)
