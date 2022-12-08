import React from 'react';
import { Loading } from './Loading';
import { Error } from './Error'
const SECURITY_CODE = 'paradigma';
class ClassState extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      error: false,
      loading: false,
      value: ''
    };
  }

  // componentWillMount() {
  // UNSAFE_componentWillMount() {
  //   console.log("componentWillMount")
  // }
  
  // componentDidMount() {
  //   console.log("componentDidMount")
  // }

  componentDidUpdate() {
    console.log('actualizacion');

    if (!!this.state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validación")
  
        this.setState({ loading: false });

        if (SECURITY_CODE === this.state.value){
          this.setState({ loading: false, error: false })
        } else {
          this.setState({ loading: false, error: true })          
        }
        
        console.log("terminando la validación")
      }, 3000);
    }
  }
  
  render() {
    return (
      <div className='form-container'>
        <h2>Eliminar {this.props.name}</h2>
        
        <p className='text'>Por favor, escribe el código de seguridad.</p>

        {(this.state.error && !this.state.loading) && (
          <Error />
        )}

        {this.state.loading && (
          <Loading />
        )}

        <input
         value={this.state.value}
         onChange={(event) => {
          this.setState({ value: event.target.value })
         }}
         placeholder="Código de seguridad" />
        <button
          onClick={() => this.setState({ loading: true })}
        >Comprobar</button>
      </div>
    );
  }
}

export { ClassState };