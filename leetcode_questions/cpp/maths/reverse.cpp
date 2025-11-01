// 7.Reverse Integer-medium
// Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

// Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

 

// Example 1:

// Input: x = 123
// Output: 321
// Example 2:

// Input: x = -123
// Output: -321
// Example 3:

// Input: x = 120
// Output: 21

#include <iostream>
#include<climits>
#include<vector>
#include<algorithm>
#include<cmath>

int reverse(int x){
        int revnum=0;
        while(x!=0){
            int digit=x%10;
            if(revnum>INT_MAX/10 || revnum<INT_MIN/10){
                return 0;
            }
            revnum=revnum*10+digit;
            x/=10;
        }
        return revnum;
    }

using namespace std;
int main() {
    int a=1220;
    cout<<reverse(a);
 return 0;
}