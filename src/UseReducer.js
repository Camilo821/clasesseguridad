import React from "react";
import './UseState.css'
import { Error } from './Error';
import { Loading } from './Loading';
const SECURITY_CODE = 'paradigma';

function UseReducer({ name }){
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const onConfirm = () => {
        dispatch({
            type: actionTypes.confirm
        })
    }
    const onError = () => {
        dispatch({
            type: actionTypes.error
        })
    }
    const onWrite = ({target : { value }}) => {
        dispatch({
            type: actionTypes.write, payload: value
        })
    }
    const onCheck = () => {
        dispatch({
            type: actionTypes.check
        })
    }
    const onDelete = () => {
        dispatch({
            type: actionTypes.delete
        })
    }
    const onReset = () => {
        dispatch({
            type: actionTypes.reset
        })
    }
    React.useEffect(() => {
        console.log("Empieza el efecto");
        if (!!state.loading){
            setTimeout(() => {
                console.log("Haciendo la validación");
                if (state.value === SECURITY_CODE){
                    onConfirm();
                }else {
                    onError();
                }
                console.log("Terminando la validación");
            }, 3000);
        }


        console.log("Termina el efecto");
    }, [state.loading])
    if(!state.deleted && !state.confirmed){
        // PRIMER ESTADO
        return(
            <div className="form-container">
                <h2>Eliminar {name}</h2>
                <p className="text">Por favor escribe el código de seguridad</p>
                {(state.error && !state.loading) && (<Error />)}
                {state.loading && <Loading />}
                <input 
                    placeholder="Código de seguridad"
                    value={state.value}
                    onChange={onWrite}
                />

                <button onClick={onCheck}>
                    Comprobar
                </button>
            </div>
        );
    } else if(state.confirmed && !state.deleted){
        // ESTADO DE CONFIRMACIÓN
        return(
            <React.Fragment>
                <div className="state-container">
                    <h2>¿Estas seguro?</h2>
                    <button className="button-true" onClick={onDelete}>
                        Si, eliminar
                    </button>
                    <button className="button-false" onClick={onReset}>
                        Nop, me arrepentí
                    </button>
                </div>
            </React.Fragment>
        );
    } else {
        // ELIMINADO
        return(
            <React.Fragment>
                <div className="state-container">
                    <h2>Eliminado con exito</h2>
                    <button className="recover-button" onClick={onReset}>
                        Recuperar
                    </button>
                </div>
            </React.Fragment>
        );
    }
}


const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
};


const actionTypes = {
    confirm: 'CONFIRM',
    error: 'ERROR',
    check: 'CHECK',
    delete: 'DELETE',
    reset: 'RESET',
    write: 'WRITE'
}
const reducerObject = (state, payload) => ({
    [actionTypes.confirm]:{
        ...state,
        error: false,
        loading: false,
        confirmed: true
    },
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false
    },
    [actionTypes.check]: {
        ...state,
        loading: true
    },
    [actionTypes.delete]: {
        ...state,
        deleted: true
    },
    [actionTypes.reset]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: ''
    },
    [actionTypes.write]: {
        ...state,
        value: payload
    }
});


const reducer = (state, action) => {
    if (reducerObject(state)[action.type]){
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state
    }
}



export { UseReducer }