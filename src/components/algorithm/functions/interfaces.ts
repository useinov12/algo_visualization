export interface actionHash{
    [key :number] : string
}
export interface pivotHash{
    [key :number] : any;
}
export type indexes = [number, number][]
export type searchIndexes = any

export interface SortAnimationState {
    indexes:indexes 
    
    actionHash:actionHash,
    pivotHash:pivotHash,
    testData:number[]
}

export interface SearchAnimationState{
    indexes:searchIndexes,
    actionHash:actionHash,
    pivotHash:pivotHash,
    testData:number
}
export type HashTable = SortAnimationState | SearchAnimationState