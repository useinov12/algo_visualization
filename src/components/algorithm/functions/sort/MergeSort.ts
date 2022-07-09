import { actionHash, indexes, pivotHash, SortAnimationState } from '../interfaces';


/* Merge sort */
export function runMergeSort(array:number[]):SortAnimationState{
    const indexes: indexes = [];
    const actionHash: actionHash={};
    const pivotHash : pivotHash = {};
    let testData :number[] = [];

    const scopes = getGlobalIndexesForMergeSort(array);

    let currentAnimIdx = 0;
    actionHash[currentAnimIdx] = 'comapre';
    pivotHash[currentAnimIdx] = { leftIdx:0, rightIdx:1 };
    // currentAnimIdx++;

    /* fill up buffer */
    while(scopes.length>0){
        const buffer = [];
        const scope = scopes.pop()!;
  
        let leftIdx = scope[0];
        let rightIdx = scope[1];
        let middleIdx = Math.floor((leftIdx+rightIdx)/2);

        let leftPointer = leftIdx;
        let rightPointer = middleIdx+1;

        while(leftPointer <= middleIdx && rightPointer<=rightIdx ){


            //compare animation
            indexes.push([leftPointer, rightPointer]);
            currentAnimIdx++;
            actionHash[currentAnimIdx] = 'comapre';
            pivotHash[currentAnimIdx] = { leftIdx:leftPointer, rightIdx:rightPointer };

            if(array[leftPointer]<=array[rightPointer]){
                buffer.push(array[leftPointer])
                leftPointer++;
            } else {
                buffer.push(array[rightPointer])
                rightPointer++;
            }


            //compare animation
            indexes.push([leftPointer, rightPointer]);
            currentAnimIdx++;
            actionHash[currentAnimIdx] = 'comapre';
            pivotHash[currentAnimIdx] = { leftIdx:leftPointer, rightIdx:rightPointer };


        }

        while(leftPointer <= middleIdx ){

            //compare animation
            indexes.push([leftPointer, rightPointer]);
            currentAnimIdx++;
            actionHash[currentAnimIdx] = 'comapre';
            pivotHash[currentAnimIdx] = { leftIdx:leftPointer, rightIdx:rightPointer };


            buffer.push(array[leftPointer]);
            leftPointer++;

        }

        while(rightPointer<=rightIdx){
            indexes.push([leftPointer, rightPointer]);
            currentAnimIdx++;
            actionHash[currentAnimIdx] = 'comapre';
            pivotHash[currentAnimIdx] = { leftIdx:leftPointer, rightIdx:rightPointer };

            buffer.push(array[rightPointer])
            rightPointer++;

        }
        /* buffer is full */

        /* use current scope of Main array indexes to swap values from buffer */
        let j = 0;

        indexes.push([0, buffer[0]]);
        currentAnimIdx++;
        actionHash[currentAnimIdx] = 'overwrite';
        pivotHash[currentAnimIdx] = { leftIdx:leftIdx, rightIdx:leftIdx };


        for(let i = leftIdx; i<=rightIdx; i++){
        //    if(j !== 0 ){ 
                array[i] = buffer[j];

                indexes.push([i, buffer[j]]);
                currentAnimIdx++;
                actionHash[currentAnimIdx] = 'overwrite';
                pivotHash[currentAnimIdx] = { leftIdx:i, rightIdx:i };
                j++;
        //    }
        }


    }
 
    testData = array;
    return { indexes, actionHash, pivotHash, testData }
}

const getGlobalIndexesForMergeSort = (array:number[]) => {
    type scope = [number, number]
    type stackOfScopes = scope[]

    const intialScope :scope = [0, array.length-1]

    const scopes :stackOfScopes = [intialScope];
    const stack :stackOfScopes= [intialScope];


    while(stack.length>0){
        const scope = stack.shift()!;
        const leftIdx = scope[0]
        const rightIdx = scope[1]

        let middleIdx = Math.floor((leftIdx+rightIdx)/2);

        if(rightIdx - middleIdx > 0 ){
            scopes.push([middleIdx+1, rightIdx])
            if((rightIdx - middleIdx )>2)stack.push([middleIdx+1, rightIdx])
        } else {
            scopes.push([middleIdx, rightIdx])
            if((rightIdx - middleIdx )>=2)stack.push([middleIdx, rightIdx])
        }
        if(middleIdx - leftIdx >0 ){
            scopes.push([leftIdx, middleIdx])
            if((middleIdx - leftIdx)>=2)stack.push([leftIdx, middleIdx])
        }


    }
    return scopes;
}




/* if(rightIdx !== middleIdx){
    scopes.push([middleIdx+1, rightIdx])
    if((rightIdx - middleIdx )>2)stack.push([middleIdx+1, rightIdx])
} else {
    scopes.push([middleIdx, rightIdx])
    if((rightIdx - middleIdx )>=2)stack.push([middleIdx, rightIdx])
}
if(leftIdx !== middleIdx ){
    scopes.push([leftIdx, middleIdx])
    if((middleIdx - leftIdx)>=2)stack.push([leftIdx, middleIdx])
} */


/* if(rightIdx - middleIdx > 0 ){
    scopes.push([middleIdx+1, rightIdx])
    if((rightIdx - middleIdx )>2)stack.push([middleIdx+1, rightIdx])
} else {
    scopes.push([middleIdx, rightIdx])
    if((rightIdx - middleIdx )>=2)stack.push([middleIdx, rightIdx])
}
if(middleIdx - leftIdx >0 ){
    scopes.push([leftIdx, middleIdx])
    if((middleIdx - leftIdx)>=2)stack.push([leftIdx, middleIdx])
} */