import logo from './logo.svg';
import './App.css';
import DataEntryTable from './table/DataEntryTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{backgroundColor:'white', height:'150px', width:'900px'}}>
        <DataEntryTable tableName='locations'/>
        </div>
        <div style={{backgroundColor:'white', height:'150px', width:'900px'}}>
        <DataEntryTable tableName='trips'/>
        </div>
        <div style={{backgroundColor:'white', height:'150px', width:'900px'}}>
        <DataEntryTable tableName='vehicles'/>
        </div>
        <div style={{backgroundColor:'white', height:'150px', width:'900px'}}>
        <DataEntryTable tableName='vehicle_types'/>
        </div>
      </header>
    </div>
  );
}

export default App;
