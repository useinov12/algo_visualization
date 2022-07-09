import { actionHash, indexes, pivotHash, SortAnimationState } from '../interfaces';
import {swap} from '../shared'


/* Quick Sort */
export function runQuickSort(array:number[]):SortAnimationState{
    const indexes: indexes = [];
    const actionHash: actionHash={};
    const pivotHash : pivotHash = {};

    
    const quickSortHelper = ( array:number[] ) => {
    
        let start :number  = 0;
        let end :number  = array.length-1;
    
        type StackType = { startIdx:number, endIdx:number }
        let stack :StackType[] = [ { startIdx:start, endIdx:end } ];

        //Initial record
        let currentAnimIdx = 0;
        indexes.push([0, array.length-1]);
        actionHash[currentAnimIdx] = 'compare';
        pivotHash[currentAnimIdx] = { leftIdx:1, rightIdx:array.length-1, pivotIdx:0 };
        
    
        while(stack.length){
            //Get current scope from stack
            const currnetRange = stack.pop();
            const startIdx:number = currnetRange?.startIdx!
            const endIdx :number = currnetRange?.endIdx!
    
            //Partition current scope
            let pivotIdx = startIdx;
            let leftIdx = startIdx+1;
            let rightIdx = endIdx;

            indexes.push( [leftIdx, rightIdx] );
            currentAnimIdx++;
            actionHash[currentAnimIdx] = 'compare';
            pivotHash[currentAnimIdx] = { leftIdx:leftIdx, rightIdx:rightIdx, pivotIdx:pivotIdx };
            
            while(rightIdx>=leftIdx){


                if(array[leftIdx]>array[pivotIdx] && array[rightIdx]<array[pivotIdx]){

                    swap(array, leftIdx, rightIdx);

                    indexes.push([leftIdx, rightIdx]);
                    currentAnimIdx++;
                    actionHash[currentAnimIdx] = 'swap';
                    pivotHash[currentAnimIdx] = { leftIdx:leftIdx, rightIdx:rightIdx, pivotIdx:pivotIdx };

                }
                if(array[leftIdx] <= array[pivotIdx]) {

                    leftIdx++;

                    indexes.push([leftIdx, rightIdx]);
                    currentAnimIdx++;
                    actionHash[currentAnimIdx] = 'compare';
                    pivotHash[currentAnimIdx] = { leftIdx:leftIdx, rightIdx:rightIdx, pivotIdx:pivotIdx };

                }
                if(array[rightIdx] >= array[pivotIdx]){

                    rightIdx--;

                    indexes.push( [leftIdx, rightIdx] );
                    currentAnimIdx++;
                    actionHash[ currentAnimIdx ] = 'compare';
                    pivotHash[ currentAnimIdx ] = { leftIdx:leftIdx, rightIdx:rightIdx, pivotIdx:pivotIdx };

                }
            }
            
            // swap pivot after partition
            swap(array, pivotIdx, rightIdx);

            indexes.push([pivotIdx, rightIdx]);
            currentAnimIdx++;
            actionHash[currentAnimIdx] = 'swap';
            pivotHash[currentAnimIdx] = { leftIdx:leftIdx, rightIdx:pivotIdx, pivotIdx:rightIdx };

            pivotIdx = rightIdx;
            if(pivotIdx+1 < endIdx){
                stack.push( { startIdx:rightIdx+1, endIdx:endIdx } )
            }
            if(pivotIdx-1 > startIdx){
                stack.push({ startIdx:startIdx, endIdx:rightIdx-1 } )
            }
        }
    }

    quickSortHelper(array);



    const testData = array;
    return { indexes, actionHash, pivotHash, testData }
}    
