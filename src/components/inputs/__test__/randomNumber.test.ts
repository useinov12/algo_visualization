import { expect,test, describe  } from '@jest/globals';
import { randomNumber } from '../inputFunctions';


describe('return random value greater than 20 and less than n', ()=>{
    const n = 50
    test('should return integer greater than 0', ()=>{
        
        expect(randomNumber(n)).toBeGreaterThan(20)
    })
    test('should return integer to less than n', ()=>{
        expect(randomNumber(n)).toBeLessThan(n)
    })
})  