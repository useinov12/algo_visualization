import { expect,test, describe  } from '@jest/globals';
import { createAscendingArray} from '../inputFunctions';

describe('should return ascending ordered array of n length starting at 1 and end with length-1', ()=>{

    test('ascArray[0] should be equal to 1', ()=>{
        const n = 50;
        const ascArray = createAscendingArray(n)
        expect(ascArray[0]).toBe(1)
    })
    test('ascArray[length-1] should be equal to n', ()=>{
        const n = 50;
        const ascArray = createAscendingArray(n)
        expect(ascArray[n-1]).toBe(n)
    })

    test('ascArray[n-1] should be equal to n', ()=>{
        const n = 13;
        const ascArray = createAscendingArray(n)
        expect(ascArray[n-1]).toEqual(n)
    })
})
