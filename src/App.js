import './App.css';
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/game-page' element={<GamePage/>}/>
      </Routes>
      </div>
  );
}

export default App;