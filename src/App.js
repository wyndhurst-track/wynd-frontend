import './styles/App.css';
import Header from './Header.js';
import CowWidget from './widgets/CowWidget.js';
import SelectWidget from './widgets/SelectWidget.js';

function App() {
  return (
    <div className="App">
      <Header />
      <CowWidget />
      <SelectWidget />
    </div>
  );
}

export default App;
