// 704. Binary Search-Easy
// Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

// You must write an algorithm with O(log n) runtime complexity.

 

// Example 1:

// Input: nums = [-1,0,3,5,9,12], target = 9
// Output: 4
// Explanation: 9 exists in nums and its index is 4
// Example 2:

// Input: nums = [-1,0,3,5,9,12], target = 2
// Output: -1
// Explanation: 2 does not exist in nums so return -1


#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>
#include<climits>

int linersearch(vector<int> &arr, int target) {
    int n = arr.size();
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}
int binarysearch(vector<int> &arr, int target) {//sortedarray
    int left = 0;
    int right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}
int main() {
    vector<int> arr = {4, 2, 1, 5, 3};
    int target = 5;
    cout << linersearch(arr, target) << endl;
    sort(arr.begin(), arr.end());
    cout << binarysearch(arr, target) << endl;
 return 0;
}