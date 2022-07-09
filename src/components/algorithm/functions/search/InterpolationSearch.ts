import { actionHash, searchIndexes, pivotHash, SearchAnimationState } from '../interfaces';

export function runInterpolationSearch(array:number[], target:number):SearchAnimationState{
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


    const interpolationHelper = (array:number[], target:number, lo:number, hi:number) =>{
        let pos:number;

        let localLow = lo;
        let localHi = hi;

        while (localLow <= localHi && target >= array[localLow] && target <= array[localHi]) {
            
        
            // Probing the position with keeping
            // uniform distribution in mind.
            pos = lo + Math.floor(((localHi - localLow) / (array[localHi] - array[localLow])) * (target - array[localLow]));


            indexes.push([0]);
            actionHash[currentAnimIdx] = 'check';
            pivotHash[currentAnimIdx] = {check:pos, foundAt:-1, target:taregtIdx}
            currentAnimIdx++;


            // Condition of target found
            if (array[pos] == target){
                indexes.push([pos]);
                actionHash[currentAnimIdx] = 'found';
                pivotHash[currentAnimIdx] = {check:pos, foundAt:pos, target:taregtIdx}
                currentAnimIdx++;

                return pos;
            }
        
            // If target is larger, target is in right sub array
            if (array[pos] < target){
                localLow = pos+1;
                indexes.push([0]);
                actionHash[currentAnimIdx] = 'check';
                pivotHash[currentAnimIdx] = {check:pos, foundAt:-1, target:taregtIdx}
                currentAnimIdx++;
            }
        
            // If target is smaller, target is in left sub array
            if (array[pos] > target){
                localHi = pos-1;
                indexes.push([0]);
                actionHash[currentAnimIdx] = 'check';
                pivotHash[currentAnimIdx] = {check:pos, foundAt:-1, target:taregtIdx}
                currentAnimIdx++;
            }

        }
        return -1;
    }

    const testData = interpolationHelper(sortedArray, target, 0, array.length-1);
    return { indexes, actionHash, pivotHash, testData };
}