// 204.Count Primes-medium
// Given an integer n, return the number of prime numbers that are strictly less than n.

 

// Example 1:

// Input: n = 10
// Output: 4
// Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.
// Example 2:

// Input: n = 0
// Output: 0
// Example 3:

// Input: n = 1
// Output: 0
 
#include <iostream>
using namespace std;
#include <vector>
#include <cmath>  

int countPrimes(int n) {//sieve of Eratosthenes
        vector<bool> isPrime(n+1,true);
        int count =0;
        for(int i=2;i<n;i++){
            if(isPrime[i]){
                count++;
            }
        
            for(int j=i*2;j<n;j=j+i){
                isPrime[j]=false;
            }
        }
        return count;
    }

int main() {
    int n;
    cout << "Enter a number: ";
    cin >> n;
    int primeCount = countPrimes(n);
    cout << "Number of prime numbers less than " << n << " is: " << primeCount << endl; 
 return 0;
}