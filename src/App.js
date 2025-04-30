import logo from './logo.svg';
import './App.css';
import Chart from './components/Chart';
import { LeafletGlobalStyles } from './components/StyledLegend';



function App() {
  return (
    <div className="App">
      <LeafletGlobalStyles />
      <Chart />
    </div>
  );
}

export default App;
