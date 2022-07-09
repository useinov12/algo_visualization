import { expect,test,beforeEach, afterEach  } from '@jest/globals';

import { createArrayOfLength, getRandomTarget } from '../../../inputs/inputFunctions';
import { runLinearSearch, runBinarySearch, runJumpSearch, runInterpolationSearch } from '../search'


let randomArray:number[]
let copy:number[]
let randomTarget :number

beforeEach(()=>{
    randomArray = createArrayOfLength(500)
    copy = [...randomArray]
    randomTarget = getRandomTarget(randomArray.length)
});

afterEach(()=>{
    randomArray = [];
    copy = [];
    randomTarget = getRandomTarget(randomArray.length)
});



test('should match target value', ()=>{
    
    const { testData } = runLinearSearch(randomArray, randomTarget);
    expect(randomArray[testData]).toEqual(randomTarget)
})



test('should match target value', ()=>{

    const sorted = randomArray.sort((a,b)=>a-b)
    const { testData } = runBinarySearch(sorted, randomTarget);
    expect(sorted[testData]).toEqual(randomTarget)
})


test('should match target value', ()=>{

    const sorted = randomArray.sort((a,b)=>a-b)
    const { testData } = runJumpSearch(sorted, randomTarget);
    expect(sorted[testData]).toEqual(randomTarget)
})

test('should match target value', ()=>{

    const sorted = randomArray.sort((a,b)=>a-b)
    const { testData } = runInterpolationSearch(sorted, randomTarget);
    expect(sorted[testData]).toEqual(randomTarget)
})




