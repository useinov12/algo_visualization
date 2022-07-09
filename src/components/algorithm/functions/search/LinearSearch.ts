import { actionHash, searchIndexes, pivotHash, SearchAnimationState } from '../interfaces';

export function runLinearSearch(array:number[], target:number):SearchAnimationState{
    const indexes :searchIndexes = [];
    const actionHash :actionHash= {};
    const pivotHash :pivotHash = {};

    const taregtIdx = array.indexOf(target)

    let i = 0;
    let currentAnimIdx = 0;
    indexes.push([i]);
    actionHash[currentAnimIdx] = 'check';
    pivotHash[currentAnimIdx] = {check:i, foundAt:-1, target:taregtIdx}
    currentAnimIdx++;
    
    while( i < array.length-1 ){
        indexes.push([i]);
        actionHash[currentAnimIdx] = 'check';
        pivotHash[currentAnimIdx] = {check:i, foundAt:-1, target:taregtIdx}
        currentAnimIdx++;

        if(array[i] === target) {
            indexes.push([i]);
            actionHash[currentAnimIdx] = 'found';
            pivotHash[currentAnimIdx] = {check:i, foundAt:i, target:taregtIdx}
            currentAnimIdx++;

            // return i; 
            break;
        }
        i++;
    }

    const testData = i;
    return { indexes, actionHash, pivotHash, testData };
}