import React, {useState, useEffect} from 'react'
import { getMergeSortAnimations, quickSortAnimations, bubbleSortAnimations, heapSortAnimations } from '../algorithms/AllSortignAlgorithms';

function SortingVis() {
    const [size, setSize] = useState(200)
    const [isSorting, setSorting] = useState(false)
    const [array, setArray] = useState([1])


    const PRIMARY_COLOR = 'turquoise';
    const SECONDARY_COLOR = '#FF3D7F';
    const ANIMATION_SPEED_MS = 20;
    
    // On firt load, create array random array of size 30
    useEffect(() =>{
      let arr = []
      for (let i = 0; i < 30; i++){
        arr.push(randomIntFromInterval(7, 500));
      }
      setArray(arr)
    }, [])
    
    function randomIntFromInterval(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);;
    }

    function handleSize(e){
        if (isSorting){
          return
        }
        setSize(e.target.value);
        let arr = [];
        for (let i = 0; i < e.target.value; i++){
            arr.push(randomIntFromInterval(7, 500));
        }
        setArray(arr)
    }

    function resetArray(){
      if (isSorting.current){
        return
      }
      let arr = []
      for (let i = 0; i < array.length; i++){
        arr.push(randomIntFromInterval(7, 500));
      }
      setArray(arr)
    }
    
    function mergeSort(){
      if (isSorting){
        return
      }
      setSorting(true) 
      let copy = [...array]
      const animations = getMergeSortAnimations(array);
      let originalArray = [...array]
      setArray(copy)
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
        
        // Cleanup at the end of animations
        if (i == animations.length - 1){
          setTimeout(() => {
            setSorting(false)
            setArray(originalArray)
            console.log(array)
          }, i * ANIMATION_SPEED_MS)
        }      
      }
    }

    function handleAnimations(type='quickSort'){
      if (isSorting){
        return
      }
      setSorting(true)
      let copy = [...array]
      let animations = []
      if (type === 'quickSort'){
        animations = quickSortAnimations(array);
      } 
      else if (type === 'heapSort'){
        animations = heapSortAnimations(array);
      }
      else if (type === 'bubbleSort'){
        animations = bubbleSortAnimations(array);
      }
      let originalArray = [...array]
      setArray(copy)
      let animationSpeed = ANIMATION_SPEED_MS;

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
        if (i == animations.length - 1){
          setTimeout(() =>{
            setSorting(false)
            setArray(originalArray)
          }, animationSpeed)
        }
      }
    }

    function Button({onClick, text}){
      if (isSorting){
        return <button disabled className='button-disabled'>{text}</button>
      }else{
        return <button onClick={onClick}>{text}</button>
      }
    }

    return (
    <div>
      <div className="sorting-visualizer">
        <div className="navbar">
          <div className='sizeOfArray'>
            <label>Size of array</label>
            <input type='range' id='size' name='size' min='10' max='300' step='1' onChange={handleSize}/>
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
          <Button onClick={() => resetArray()} text={"Generate New Array"}/>
          <Button onClick={() => mergeSort()} text={"Merge Sort"}/>
          <Button onClick={() => handleAnimations('heapSort')} text={"Heap Sort"}/>
          <Button onClick={() => handleAnimations('quickSort')} text={"Quick Sort"}/>
          <Button onClick={() => handleAnimations('bubbleSort')} text={"Bubble Sort"}/>
        </div>
        {isSorting ?
          <div className='message'>
            <div className='message-text'>Sorting</div>
            <div className='loader'></div>
          </div> 
        : null}
    </div>
    </div>
  )
}

export default SortingVis
