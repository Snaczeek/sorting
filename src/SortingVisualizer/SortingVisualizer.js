import React, { Component } from 'react';
import { getMergeSortAnimations, quickSort, bubbleSort, heapSort } from '../algorithms/AllSortignAlgorithms';

// Helper function to generate a random integer within a range
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Change this value for the speed of the animations.
let ANIMATION_SPEED_MS = 20;

// Change this value for the number of bars (value) in the array.
let NUMBER_OF_ARRAY_BARS = 200;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

// https://stackoverflow.com/questions/53833139/check-array-in-js-is-list-sorted
const isSorted = arr => arr.every((v,i,a) => !i || a[i-1] <= v);

class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      arraySize: NUMBER_OF_ARRAY_BARS,
    };
  }


  componentDidMount() {
    this.resetArray();
  }

  // Generate a new random array
  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 600));
    }
    this.setState({ array });
  }

  changeSize = (newSize) => {
    NUMBER_OF_ARRAY_BARS = newSize;
    this.setState({ arraySize: newSize });
    this.resetArray();
  }

  // Function to visualize the sorting algorithm 
  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    console.log(isSorted(this.state.array))
  }
  heapSort() {
    const animations = heapSort(this.state.array);
    let animationSpeed = 0;

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [action, barOneIdx, barTwoIdx] = animations[i];
      
      if (action === 'compare') {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, animationSpeed);
        animationSpeed += ANIMATION_SPEED_MS;
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, animationSpeed);
      } else if (action === 'swap') {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
        }, animationSpeed);
        animationSpeed += ANIMATION_SPEED_MS;
      }
    }
    console.log(isSorted(this.state.array))
  }
  quickSort() {
    const animations = quickSort(this.state.array);
    let animationSpeed = 1;
    // alert(animations)
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [action, barOneIdx, barTwoIdx] = animations[i];
      
      if (action === 'compare') {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, animationSpeed);
        animationSpeed += ANIMATION_SPEED_MS;
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, animationSpeed);
      } else if (action === 'swap') {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
        }, animationSpeed);
        animationSpeed += ANIMATION_SPEED_MS;
      }
    }
    console.log(isSorted(this.state.array))
  }
  
  bubbleSort() {
    const animations = bubbleSort(this.state.array);
    let animationSpeed = 1;

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [action, barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = animations[i];

      if (action === 'compare') {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, animationSpeed);
        animationSpeed += ANIMATION_SPEED_MS;
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, animationSpeed);
      } else if (action === 'swap') {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.height = `${barTwoHeight}px`;
          barTwoStyle.height = `${barOneHeight}px`;
        }, animationSpeed);
        animationSpeed += ANIMATION_SPEED_MS;
      }
    }
    console.log(isSorted(this.state.array))
  }
  

  render() {
    const { array } = this.state;

    return (
      <div className="sorting-visualizer">
        <div className="navbar">
          <div className='sizeOfArray'>
            <label>Size of array</label>
            <input type='range' id='size' name='size' min='10' max='300' step='1' onChange={(e) => this.changeSize(e.target.value)}/>
          </div>
        </div>
        <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        </div>
        <div className="controls">
          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.heapSort()}>Heap Sort</button>
          <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        </div>
      </div>
    );
  }
}

export default SortingVisualizer;
