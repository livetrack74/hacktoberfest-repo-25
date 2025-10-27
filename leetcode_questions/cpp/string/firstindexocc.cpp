// 28.Find the Index of the First Occurrence in a String -Easy
// Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

 

// Example 1:

// Input: haystack = "sadbutsad", needle = "sad"
// Output: 0
// Explanation: "sad" occurs at index 0 and 6.
// The first occurrence is at index 0, so we return 0.
// Example 2:

// Input: haystack = "leetcode", needle = "leeto"
// Output: -1
// Explanation: "leeto" did not occur in "leetcode", so we return -1.


#include <iostream>
using namespace std;
#include <string>

int strStr(string haystack, string needle) {
        int ans=haystack.find(needle);
        return ans;
} 
int main() {
    string haystack="hello";
    string needle="ll";
    cout<<strStr(haystack,needle);
    cout<<endl;
 return 0;
}