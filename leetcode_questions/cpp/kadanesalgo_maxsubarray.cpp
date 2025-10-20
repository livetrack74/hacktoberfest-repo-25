
//53. Maximum Subarray
//Given an integer array nums, find the subarray with the largest sum, and return its sum.

 

// Example 1:

// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: The subarray [4,-1,2,1] has the largest sum 6.
// Example 2:

// Input: nums = [1]
// Output: 1
// Explanation: The subarray [1] has the largest sum 1.
// Example 3:

// Input: nums = [5,4,-1,7,8]
// Output: 23
// Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.


#include <iostream>
using namespace std;
#include <vector>
#include<algorithm>
#include<climits>

int maxsubarrayv1(vector<int> &arr){//kadane's algorithm
    int maxsum=INT_MIN;
    int cursum=0;
    for(int i=0;i<arr.size();i++){
        cursum+=arr[i];
        maxsum=max(maxsum,cursum);
        if(cursum<0){
            cursum=0;
        }
    }
    return maxsum;
}

int maxsubarrayv2(vector<int> &arr){//bruteforce
    int maxsum = INT_MIN;
    int n = arr.size();
    for(int i = 0; i < n; i++) {
        int cursum = 0;
        for(int j = i; j < n; j++) {
            cursum += arr[j];
            maxsum = max(maxsum, cursum);
        }
    }
    return maxsum;
}


    


int main() {
    vector<int> arr={-2,1,-3,4,-1,2,1,-5,4};
    cout<<maxsubarrayv1(arr)<<endl;
    cout<<maxsubarrayv2(arr)<<endl;
 return 0;
}