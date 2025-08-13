import './App.css';
import { HolaMundo } from './components/HolaMundo';
import { TarjetaPresentacion } from './components/TarjeaPresentacion';
import { Contador } from './components/Contador'
import { ListaTareas } from './components/ListaTareas';
import { Formulario } from './components/Formulario';
 
function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <HolaMundo></HolaMundo>

        <TarjetaPresentacion/>

        <Contador></Contador>

        <ListaTareas></ListaTareas>

        <Formulario></Formulario>

      </header>
    </div>
  );
}

export default App;
