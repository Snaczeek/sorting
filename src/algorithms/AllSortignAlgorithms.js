export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

export function quickSort(array){
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations)
    // alert(array)
    return animations
}

function quickSortHelper(array, left, right, animations){
    if (left < right){
        let pivot = partition(array, left, right, animations);
        quickSortHelper(array, left, pivot - 1, animations);
        quickSortHelper(array, pivot + 1, right, animations);
    }
}

function partition(array, left, right, animations) {
  let pivot = array[left];
  let i = left;
  let j = right;

  while (i < j) {
    while (array[i] <= pivot && i < right) {
      i++;
      animations.push(['compare', i, left]);
    }
    while (array[j] > pivot) {
      j--;
      animations.push(['compare', j, left]);
    }

    if (i < j) {
      animations.push(['swap', i, j, array[i], array[j]]);
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  animations.push(['swap', left, j, array[left], array[j]]);
  array[left] = array[j];
  array[j] = pivot;

  return j;
}

export function bubbleSort(array) {
    const animations = [];
    const n = array.length;
  
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Push indices for comparison animation
        animations.push(['compare', j, j + 1]);
  
        if (array[j] > array[j + 1]) {
          // Push indices and values for swap animation
          animations.push(['swap', j, j + 1, array[j], array[j + 1]]);
          // Swap elements
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
    }
  
    return animations;
  }

  export function heapSort(array) {
    const animations = [];
    const n = array.length;

    // Build the max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i, animations);
    }

    // Extract elements from the max heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Push the animation for swapping elements before the swap
        animations.push(['swap', 0, i]);
        
        // Swap the root with the last element
        const temp = array[0];
        array[0] = array[i];
        array[i] = temp;

        // Update the heights of the bars
        animations.push(['height', 0, i, array[0], array[i]]);

        // Heapify the reduced heap
        heapify(array, i, 0, animations);
    }

  return animations;

  }
  
  function heapify(array, n, i, animations) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
  
    // Push indices for comparison animation
    if (left < n) {
      animations.push(['compare', largest, left]);
    }
    if (right < n) {
      animations.push(['compare', largest, right]);
    }
  
    if (left < n && array[left] > array[largest]) {
      largest = left;
    }
  
    if (right < n && array[right] > array[largest]) {
      largest = right;
    }
  
    if (largest !== i) {
      // Push indices and values for swap animation
      animations.push(['swap', i, largest, array[i], array[largest]]);
      const temp = array[i];
      array[i] = array[largest];
      array[largest] = temp;
  
      // Recursively heapify the affected subtree
      heapify(array, n, largest, animations);
    }
  }
  