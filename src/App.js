import logo from './logo.svg';
import './App.css';
import SortingVis from './components/SortingVis';
import React, { useEffect } from 'react';


function App() {
  useEffect(() => {
    document.title = 'Sorting Visualizer';
  }, []);

  return (
    
    <div className="App">
      <SortingVis />
      <footer>
        <p>Created by <a href='https://github.com/Snaczeek/sorting'>Mateusz Filoda</a></p>
      </footer>    
    </div>
  );
}

export default App;
