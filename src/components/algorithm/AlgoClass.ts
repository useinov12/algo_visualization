import React from 'react'
import { HashTable} from './functions/interfaces';

import * as types from 'constants/algoTypes';
import * as links from 'constants/links';

import { runBubbleSort, runQuickSort, runMergeSort, runSelectionSort } from './functions/sort';
import { runLinearSearch, runBinarySearch, runJumpSearch, runInterpolationSearch} from './functions/search'
import {getRandomTarget} from '../inputs/inputFunctions'

const {
    bubble_sort, quick_sort, 
    merge_sort, selection_sort, 
    linear_search, binary_search, 
    jump_search, interpolation_search
} = types;

const {
    bubble_link, quick_link, 
    merge_link, selection_link, 
    linera_link, binary_link, 
    jump_link, interpolation_link
} = links;

const initTable = {
    indexes:[],
    actionHash:[],
    pivotHash:{},
    testData:[]
}


export default class AlgoClass{
    type:string;
    link:string;
    animationHashTable:HashTable;

    constructor(name:string){
        this.type = name;
        this.link = '#'
        this.animationHashTable = initTable;
    }

    getAnimationHash(unsortedArray:number[]){
        this.runAalgorithm(unsortedArray);
        return this.animationHashTable;
    }
    getLink(){
        return this.getLinkHelper(this.type);
    }
    private runAalgorithm(unsortedArray:number[] ){
        const hash = this.reducerAlgo(this.type, unsortedArray);
        this.setAnimationHash(hash);
    }
    private reducerAlgo(algo:string, array:number[]):HashTable{
        if(algo === bubble_sort)return runBubbleSort(array);
        if(algo === quick_sort)return runQuickSort(array);
        if(algo === merge_sort)return runMergeSort(array);
        if(algo === selection_sort)return runSelectionSort(array);

        const randomTarget = getRandomTarget(array.length)
        if(algo === linear_search)return runLinearSearch(array, randomTarget);
        if(algo === binary_search)return runBinarySearch(array, randomTarget);
        if(algo === jump_search)return runJumpSearch(array, randomTarget);
        if(algo === interpolation_search)return runInterpolationSearch(array, randomTarget);
        return initTable;
    }
    private setAnimationHash(animationHash:HashTable){
        this.animationHashTable = animationHash;
    }
    private getLinkHelper(algo:string){
        if(algo === bubble_sort) this.link = bubble_link;
        if(algo === quick_sort) this.link = quick_link;
        if(algo === merge_sort) this.link = merge_link;
        if(algo === selection_sort) this.link = selection_link;

        if(algo === linear_search) this.link = linera_link;
        if(algo === binary_search) this.link = binary_link;
        if(algo === jump_search) this.link = jump_link;
        if(algo === interpolation_search) this.link = interpolation_link;
        return this.link;
    }
}

