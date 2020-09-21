import cssInput from "../../Auth/Login/Login.module.css";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControl";
import {required} from "../../utils/validators";

const PlaceABetForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
                <Field component={Input} validate={[required]} type={'number'} min={"0"}
                       className={`${cssInput.input} my-2 w-100`} name={"bet"} placeholder={'Bet'}/>
            <button type={"submit"} className={'btn btn-success w-100'}>Place a bet</button>
        </form>
    )
}

const PlaceABetReduxForm = reduxForm({
    form: 'placeABet'
})(PlaceABetForm)

export default PlaceABetReduxForm