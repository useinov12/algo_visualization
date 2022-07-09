import { expect,test  } from '@jest/globals';
import { randomizeArray, createAscendingArray } from '../inputFunctions';


test('should randomly shuffle array values', ()=>{
    const ascArray = createAscendingArray(50);
    const copy = [...ascArray];
    const randomizeedArray = randomizeArray(ascArray);
    expect(randomizeedArray).not.toEqual(copy)
})