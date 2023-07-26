import Search from './components/Search';
import './App.css';

function App() {
  const handleOnSearchChange = () => {};
  return (
    <div className='container'>
      <Search onSearchChange={handleOnSearchChange} />
    </div>
  );
}

export default App;
