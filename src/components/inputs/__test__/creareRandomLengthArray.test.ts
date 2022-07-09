import { expect,test  } from '@jest/globals';

import { createRandomLengthArray } from '../inputFunctions'

test('should return random array of length > 20', ()=>{
    const randomArr = createRandomLengthArray()
    expect(randomArr.length).toBeGreaterThan(20);
})