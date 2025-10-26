// 1910.Remove all Occurrences of a Substring-medium
// Given two strings s and part, perform the following operation on s until all occurrences of the substring part are removed:

// Find the leftmost occurrence of the substring part and remove it from s.
// Return s after removing all occurrences of part.

// A substring is a contiguous sequence of characters in a string.

 

// Example 1:

// Input: s = "daabcbaabcbc", part = "abc"
// Output: "dab"
// Explanation: The following operations are done:
// - s = "daabcbaabcbc", remove "abc" starting at index 2, so s = "dabaabcbc".
// - s = "dabaabcbc", remove "abc" starting at index 4, so s = "dababc".
// - s = "dababc", remove "abc" starting at index 3, so s = "dab".
// Now s has no occurrences of "abc".

#include <iostream>
using namespace std;
#include <string>
#include <algorithm>

string removesv1(string &s, string &part) {
   int n=s.length();
    int m=part.length();
    while(n>=0 && s.find(part)<n){
      s.erase(s.find(part),m);
    }
    return s;
}

int main() {
    string s = "daabcbaabcbc";
    string part = "abc";
    cout<<removesv1(s,part);
 return 0;
}