import logo from './logo.svg';
import './App.css';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import React, { useEffect } from 'react';


function App() {
  useEffect(() => {
    document.title = 'Sorting Visualizer';
  }, []);

  return (
    
    <div className="App">
      <SortingVisualizer></SortingVisualizer>
      <footer>
        <p>Created by Mateusz Filoda</p>
      </footer>    
    </div>
  );
}

export default App;
