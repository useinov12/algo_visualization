import { actionHash, searchIndexes, pivotHash, SearchAnimationState } from '../interfaces';



export function runJumpSearch(array:number[], target:number):SearchAnimationState{
    const indexes :searchIndexes = [];
    const actionHash :actionHash= {};
    const pivotHash :pivotHash = {};

    let taregtIdx = array.indexOf(target);

    const sortedArray = array.sort((a,b)=>a-b);



    let length = array.length;
    let rootOfLength = Math.sqrt(length);
    let step = Math.floor(rootOfLength);
    let blockStart = 0, currentStep = step;


    //animation 
    let currentAnimIdx = 0;

    // init checl
    indexes.push([0]);
    actionHash[currentAnimIdx] = 'check';
    pivotHash[currentAnimIdx] = {check:0, foundAt:-1, target:taregtIdx}
    currentAnimIdx++;

    //cort animatton
    indexes.push([0]);
    actionHash[currentAnimIdx] = 'sort';
    taregtIdx = sortedArray.indexOf(target);
    pivotHash[currentAnimIdx] = { check:0, foundAt:-1, target:taregtIdx }
    currentAnimIdx++;

    while(sortedArray[Math.min(currentStep, length)-1] < target ){
        blockStart = currentStep;
        currentStep +=step;

        indexes.push([0]);
        actionHash[currentAnimIdx] = 'check';
        pivotHash[currentAnimIdx] = {check:currentStep, foundAt:-1, target:taregtIdx}
        currentAnimIdx++;


        if(blockStart >= length){
           break;
        };
    }

    const linearHelper = (sortedArray:number[], blockStart:number, target:number, currentStep:number, length:number):number => {



        while(sortedArray[blockStart]< target){
            blockStart++;
            if(blockStart == Math.min(currentStep, length)){
                return -1;
            };
    
            if(sortedArray[blockStart] == target){

                indexes.push([blockStart]);
                actionHash[currentAnimIdx] = 'found';
                pivotHash[currentAnimIdx] = {check:blockStart, foundAt:blockStart, target:taregtIdx}
                currentAnimIdx++;

                return blockStart;
            }

            indexes.push([0]);
            actionHash[currentAnimIdx] = 'check';
            pivotHash[currentAnimIdx] = {check:blockStart, foundAt:-1, target:taregtIdx}
            currentAnimIdx++;
    
        }
        return -1;
    }

    const testData = linearHelper(sortedArray, blockStart, target, currentStep, length );

    return { indexes, actionHash, pivotHash, testData };
}

