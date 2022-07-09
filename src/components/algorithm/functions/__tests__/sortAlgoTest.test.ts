import { expect,test,beforeEach, afterEach  } from '@jest/globals';


import { createArrayOfLength } from '../../../inputs/inputFunctions'

import { runBubbleSort, runQuickSort, runMergeSort, runSelectionSort } from '../sort';

let randomArray:number[]
let copy:number[]




beforeEach(()=>{
    randomArray = createArrayOfLength(500)
    copy = [...randomArray]
});

afterEach(()=>{
    randomArray = [];
    copy = [];
});




test('should return sorted array', ()=>{
    
    const JsSorted = copy.sort((a,b)=>a-b);
    const { testData } = runBubbleSort(randomArray);
    expect(testData).toEqual(JsSorted)
})

test('should return sorted array', ()=>{

    const JsSorted = copy.sort((a,b)=>a-b);
    const { testData } = runQuickSort(randomArray);
    expect(testData).toEqual(JsSorted)
})



test('should return sorted array', ()=>{

    const JsSorted = copy.sort((a,b)=>a-b);
    const { testData } = runMergeSort(randomArray);
    expect(testData).toEqual(JsSorted)
}) 


test('should return sorted array', ()=>{

    const JsSorted = copy.sort((a,b)=>a-b);
    const { testData } = runSelectionSort(randomArray);
    expect(testData).toEqual(JsSorted)
}) 



