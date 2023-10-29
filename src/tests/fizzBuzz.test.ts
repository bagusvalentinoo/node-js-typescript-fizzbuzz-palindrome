import fizzBuzz from '@/fizzBuzz'

describe('Test FizzBuzz Function', () => {
    it('returns Fizz when the number is divisible by 3', () => {
        expect(fizzBuzz(3)).toBe('Fizz')
        expect(fizzBuzz(6)).toBe('Fizz')
    })

    it('returns Buzz when the number is divisible by 5', () => {
        expect(fizzBuzz(5)).toBe('Buzz')
        expect(fizzBuzz(10)).toBe('Buzz')
    })

    it('returns FizzBuzz when the number is divisible by both 3 and 5', () => {
        expect(fizzBuzz(15)).toBe('Fizz Buzz')
        expect(fizzBuzz(30)).toBe('Fizz Buzz')
    })

    it('returns the number itself when not divisible by 3 or 5', () => {
        expect(fizzBuzz(1)).toBe('1')
        expect(fizzBuzz(7)).toBe('7')
    })
})