import { expect,test  } from '@jest/globals';
import { createArrayOfLength } from '../inputFunctions';

test('should return array of length n ', ()=>{
    const n = 25
    const array = createArrayOfLength(n)
    expect(array.length).toEqual(n)
})