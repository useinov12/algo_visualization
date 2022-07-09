import { swap } from 'components/algorithm/functions/shared';

/* ANIMATION REDUCERS */
export function animationReducer(type:string, action:string, coordinates:number[],  array:number[]){
    let res
    switch(type){
        case 'bubble':  
            res = bubbleAnimation(action, coordinates,array)
            return res;

        case 'selection':  
            res = selectionAnimation(action, coordinates,array)
            return res;

        case 'quick' : 
            res = quickAnimation(action, coordinates, array)
            return res;

        case 'merge' : 
            res = mergeAnimation(action, coordinates, array)
            return res;

        case 'linear' : 
            res = linearAnimation(action, coordinates, array)
            return res;

        case 'binary' : 
            res = binaryAnimation(action, coordinates, array)
            return res;
        case 'interpolation' : 
            res = interpolationAnimation(action, coordinates, array)
            return res;

        case 'jump' : 
            res = jumpAnimation(action, coordinates, array)
            return res;
            
        default:
            return array;
    }
}

function bubbleAnimation(action:string, coordinates:number[],  array:number[]):number[] {
    switch(action){
        case 'compare': return array;
        case 'swap' :
            swap(array, coordinates[0], coordinates[1])
            return array;
        default:
            return array;
    }
}
function quickAnimation(action:string, coordinates:number[], array:number[]) :number[]  {
    switch(action){
        case 'compare': return array;
        case 'swap' : 
            swap(array, coordinates[0], coordinates[1])
            return array;
        default:
            return array;
    }
}


function mergeAnimation(action:string, coordinates:number[], array:number[]) :number[]  {
    switch(action){
        case 'compare':
            console.log(array)
            return array;
        case 'overwrite' : 
            const i = coordinates[0];
            const value = coordinates[1];
            array[i] = value;
            return array;

        default:
            return array;
    }
}

function selectionAnimation(action:string, coordinates:number[],  array:number[]):number[] {
    switch(action){
        case 'compare': return array;
        case 'swap' :
            swap(array, coordinates[0], coordinates[1])
            return array;
        default:
            return array;
    }
}

function linearAnimation(action:string, coordinates:number[],  array:number[]):number[] {
    switch(action){
        case 'check': return array;
        case 'found': return array;
        default:
            return array;
    }
}
function jumpAnimation(action:string, coordinates:number[],  array:number[]):number[] {
    switch(action){
        case 'check': return array;
        case 'found': return array;
        case 'sort' : return array.sort((a,b)=>a-b)
        /* case 'overwrite' : 
        const i = coordinates[0];
        const value = coordinates[1];
        array[i] = value;
        return array; */
        default:
            return array;
    }
}
function binaryAnimation(action:string, coordinates:number[],  array:number[]):number[] {
    switch(action){
        case 'check': return array;
        case 'found': return array;
        case 'sort' : return array.sort((a,b)=>a-b);
        /* case 'overwrite' : 
            const i = coordinates[0];
            const value = coordinates[1];
            array[i] = value;
        return array; */

        default:
            return array;
    }
}
function interpolationAnimation(action:string, coordinates:number[],  array:number[]):number[] {
    switch(action){
        case 'check': return array;
        case 'found': return array;
        case 'sort' : return array.sort((a,b)=>a-b);
        /* case 'overwrite' : 
            const i = coordinates[0];
            const value = coordinates[1];
            array[i] = value;
        return array; */

        default:
            return array;
    }
}
