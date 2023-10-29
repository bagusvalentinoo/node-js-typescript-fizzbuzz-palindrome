import palindrome from '@/palindrome'

describe('palindrome', () => {
    it('should return true for "racecar"', () => {
        expect(palindrome('racecar')).toBe(true)
    })

    it('should return false for "hello"', () => {
        expect(palindrome('hello')).toBe(false)
    })
})

