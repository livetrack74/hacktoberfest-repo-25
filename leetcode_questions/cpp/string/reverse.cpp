// 344. Reverse String - Easy
// Write a function that reverses a string. The input string is given as an array of characters s.

// You must do this by modifying the input array in-place with O(1) extra memory.

 

// Example 1:

// Input: s = ["h","e","l","l","o"]
// Output: ["o","l","l","e","h"]
// Example 2:

// Input: s = ["H","a","n","n","a","h"]
// Output: ["h","a","n","n","a","H"]


#include <iostream>
using namespace std;
#include <vector>
#include <string>
#include <algorithm>

void reverseString(vector<char>& s) {
    int n=s.size();
    int st=0;
    int end=n-1;
    while(st<end){
        swap(s[st],s[end]);
        st++;
        end--;
    }
}
int main() {
   vector s = ["h","e","l","l","o"]
    reverseString(s);
    cout<<s;
 return 0;
}