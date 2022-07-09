import { actionHash, indexes, pivotHash, SortAnimationState} from '../interfaces';
import {swap} from '../shared';

export function runSelectionSort(array:number[]):SortAnimationState{
    const indexes: indexes = [];
    const actionHash: actionHash={};
    const pivotHash : pivotHash = {};

    function makeRecordInHash(currentAnimIdx:number, action:string, leftIdx:number, rightIdx:number, ){
        actionHash[currentAnimIdx] = action;
        pivotHash[currentAnimIdx] = {leftIdx:leftIdx, rightIdx:rightIdx}
    }

    //init animation setup
    let leftIdx = 0; 
    let rightIdx = 1;
    let currentAnimIdx = 0;
    indexes.push([leftIdx, rightIdx]);
    actionHash[currentAnimIdx] = 'compare';
    pivotHash[currentAnimIdx] = {lastSorted:0, leftIdx:leftIdx, rightIdx:rightIdx}
    currentAnimIdx++;


    for(let i = 0; i<array.length; i++){
        let currentSmallestAtIdx = i;
        let j = i+1;

        indexes.push([leftIdx, rightIdx]);
        actionHash[currentAnimIdx] = 'compare';
        pivotHash[currentAnimIdx] = {lastSorted:i, leftIdx:currentSmallestAtIdx, rightIdx:j}
        currentAnimIdx++;

        while(j<array.length){
            indexes.push([leftIdx, rightIdx]);
            actionHash[currentAnimIdx] = 'compare';
            pivotHash[currentAnimIdx] = {lastSorted:i, leftIdx:currentSmallestAtIdx, rightIdx:j}
            currentAnimIdx++;
            //compare
            if(array[j]<array[currentSmallestAtIdx]){
                currentSmallestAtIdx = j;

                
            }
            j++;
            indexes.push([leftIdx, rightIdx]);
            actionHash[currentAnimIdx] = 'compare';
            pivotHash[currentAnimIdx] = {lastSorted:i, leftIdx:currentSmallestAtIdx, rightIdx:j}
            currentAnimIdx++;
        }

        //swap

        swap(array, i, currentSmallestAtIdx);

        indexes.push([i, currentSmallestAtIdx]);
        actionHash[currentAnimIdx] = 'swap';
        pivotHash[currentAnimIdx] = {lastSorted:i, leftIdx:i, rightIdx:currentSmallestAtIdx}
        currentAnimIdx++;
    }



    const testData = array;
    return { indexes, actionHash, pivotHash, testData };
}