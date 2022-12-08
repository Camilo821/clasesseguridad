import React from "react";
import './UseState.css'
import { Error } from './Error';
import { Loading } from './Loading';
const SECURITY_CODE = 'paradigma';

function UseState({ name }){
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    }); 
    const onConfirm = () => {
        setState({
            ...state,
            loading: false,
            error: false,
            confirmed: true
        });
    }
    const onError = () => {
        setState({
            ...state,
            error:true,
            loading: false
        });
    }
    const onWrite = (event) => {
        setState({
            ...state,
            value:event.target.value
        });
    }
    const onCheck = () => {
        setState({
            ...state,
            loading: true
        });
    }
    const onDelete = () => {
        setState({
            ...state,
            deleted: true
        });
    }
    const onReset = () => {
        setState({
            ...state,
            confirmed:false,
            deleted:false,
            value: ''
        });
    }
    React.useEffect(() => {
        console.log("Empieza el efecto");
        if (!!state.loading){
            setTimeout(() => {
                console.log("Haciendo la validación")
                if (state.value === SECURITY_CODE){
                    onConfirm()
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
                    onChange={(event) => {
                        onWrite(event);
                    }}
                />

                <button onClick={() => {
                    onCheck();
                }} >Comprobar</button>
            </div>
        );
    } else if(state.confirmed && !state.deleted){
        // ESTADO DE CONFIRMACIÓN
        return(
            <React.Fragment>
                <div className="state-container">
                    <h2>¿Estas seguro?</h2>
                    <button className="button-true" onClick={() => {
                        onDelete();
                    }}>Si, eliminar</button>
                    <button className="button-false" onClick={() => {
                        onReset();
                    }}>Nop, me arrepentí</button>
                </div>
            </React.Fragment>
        );
    } else {
        // ELIMINADO
        return(
            <React.Fragment>
                <div className="state-container">
                    <h2>Eliminado con exito</h2>
                    <button className="recover-button" onClick={() => {
                        onReset();
                    }}>Recuperar</button>
                </div>
            </React.Fragment>
        );
    }
}


export { UseState }