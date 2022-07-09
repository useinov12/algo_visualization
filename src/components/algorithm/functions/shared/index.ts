/* shared functions */
export function swap(array:number[], i:number, j:number){
    let holder = array[i]
    array[i] = array[j]
    array[j] = holder
}

