import './App.css';
import { UseState } from './UseState.js';
import { UseReducer } from './UseReducer';

function App() {
  return (
    <div className="App">
      <UseState name="UseState" />
      <UseReducer name="UseReducer" />
    </div>
  );
}

export default App;
