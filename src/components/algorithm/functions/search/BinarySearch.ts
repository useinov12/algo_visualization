import { actionHash, searchIndexes, pivotHash, SearchAnimationState } from '../interfaces';

export function runBinarySearch(array:number[], target:number):SearchAnimationState{
    const indexes :searchIndexes = [];
    const actionHash :actionHash= {};
    const pivotHash :pivotHash = {};

    let taregtIdx = array.indexOf(target);

    const sortedArray = array.sort((a,b)=>a-b);
    

    let currentAnimIdx = 0;
    //init check
    indexes.push([0]);
    actionHash[currentAnimIdx] = 'check';
    pivotHash[currentAnimIdx] = {check:0, foundAt:-1, target:taregtIdx}
    currentAnimIdx++;

    //sort animation
    indexes.push([0]);
    actionHash[currentAnimIdx] = 'sort';
    taregtIdx = sortedArray.indexOf(target);
    pivotHash[currentAnimIdx] = { check:0, foundAt:-1, target:taregtIdx }
    currentAnimIdx++;


    let binaryHelper = function (arr:number[], target:number, leftIdx:number, rightIdx:number) {



        while (leftIdx<=rightIdx){
     
            const midIdx=Math.floor((leftIdx + rightIdx)/2);

            indexes.push([0]);
            actionHash[currentAnimIdx] = 'check';
            pivotHash[currentAnimIdx] = {check:midIdx, foundAt:-1, target:taregtIdx}
            currentAnimIdx++;
            
            if (arr[midIdx]===target) {
                indexes.push([midIdx]);
                actionHash[currentAnimIdx] = 'found';
                pivotHash[currentAnimIdx] = {check:midIdx, foundAt:midIdx, target:taregtIdx}
                currentAnimIdx++;

                return midIdx;

            } else if (target < arr[midIdx]){
                rightIdx = midIdx-1;
            }
            else if (target > arr[midIdx]){
                leftIdx = midIdx + 1;
            }
        }
        return -1;
    }


    const testData = binaryHelper(sortedArray, target, 0, array.length-1);
    return { indexes, actionHash, pivotHash, testData };
}