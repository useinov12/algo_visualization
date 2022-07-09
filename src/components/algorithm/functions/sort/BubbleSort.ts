import { actionHash, indexes, pivotHash, SortAnimationState } from '../interfaces';
import {swap} from '../shared'

/* Bubble Sort */
export function runBubbleSort(array:number[]):SortAnimationState{
    const indexes :indexes = [];
    const actionHash :actionHash= {};
    const pivotHash :pivotHash = {};

    function makeRecordInHash(currentAnimIdx:number, action:string, leftIdx:number, rightIdx:number, ){
        actionHash[currentAnimIdx] = action;
        pivotHash[currentAnimIdx] = {leftIdx:leftIdx, rightIdx:rightIdx}
    }


    for(let i = 0; i<array.length; i++){
        for(let j = 0; j<array.length-i-1; j++){

            //init animation setup
            const leftIdx = j; 
            const rightIdx = j+1;
            indexes.push([leftIdx, rightIdx]);
            const currentAnimIdx = indexes.length-1;

            if(array[leftIdx]<array[rightIdx]) makeRecordInHash(currentAnimIdx, 'compare', leftIdx, rightIdx);
            else {  
                makeRecordInHash(currentAnimIdx, 'swap', leftIdx, rightIdx);
                swap(array, leftIdx, rightIdx);
            } 
        }
    }

    const testData = array;
    return { indexes, actionHash, pivotHash, testData };
}

