//GENERATE ARRAY FUNCTIONS

/* used outside */
export const createArrayOfLength = (length:number) :number[]=> {
    const orderedArray = createAscendingArray(length)
    return  randomizeArray(orderedArray);
}
export const createRandomLengthArray = ():number[] =>{
    let randomLength =  randomNumber(100)
    let randomArr = createArrayOfLength(randomLength)
    return randomArr
}

export const getRandomTarget =  (length:number) =>{
    return randomNumber(length)
}

/* internal */
export const createAscendingArray = (length:number) :number[] =>{
    let array = [];
    for(let i=0; i<length; i++){
        array.push(i+1)
    }
    return array;
}
export const randomNumber = (n:number) :number => {
    let number =  Math.floor(Math.random()*n);;
    if(number<20)number = number+20;
    return number;
}
export const randomizeArray = (array:number[]) :number[] =>{
    let n = array.length
    let t; 
    let i;
    while(n){
        i = Math.floor(Math.random()* n--);
        t = array[n]
        array[n] = array[i]
        array[i] = t
    }
    return array;
}
