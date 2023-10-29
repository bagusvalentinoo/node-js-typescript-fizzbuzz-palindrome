import * as readlineSync from 'readline-sync'
import fizzBuzz from '@/fizzBuzz'
import palindrome from "@/palindrome"

const fizzBuzzStart = () => {
    console.log('FizzBuzz')
    const num = readlineSync.questionInt('Masukkan angka: ')
    console.log(`Hasil FizzBuzz: ${fizzBuzz(num)}`)
}

const palindromeStart = () => {
    console.log('Palindrome')
    const word = readlineSync.question('Masukkan kata: ')
    console.log(`Hasil Palindrome: ${palindrome(word)}`)
}

fizzBuzzStart()
console.log('')
palindromeStart()