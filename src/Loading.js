import React from "react";
import './Loading.css'


class Loading extends React.Component {
    render(){
        return(
            <div className="loading-container">
                <p className="loading">Cargando...</p>
            </div>
        );
    }
}


export { Loading }