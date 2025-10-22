//1. Two Sum-Easy
// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.

 

// Example 1:

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
// Example 2:

// Input: nums = [3,2,4], target = 6
// Output: [1,2]
// Example 3:

// Input: nums = [3,3], target = 6
// Output: [0,1]

#include <iostream>
using namespace std;
#include<vector>
#include<algorithm>
#include<unordered_map>

vector<int> twoSumv1(vector<int>& nums, int target) {//brute force approach
    vector<int> ans;
    vector<int> noans={-1,-1};
    for(int i=0;i<nums.size();i++){
        for(int j=i+1;j<nums.size();j++){
            if(nums[i]+nums[j]==target){
                ans.push_back(i);
                ans.push_back(j);
                return ans;
                break;
            }
        }
    }
    return noans;
}
vector<int> twoSumv2(vector<int>& nums, int target){ //for sorted array
    vector<int> ans;
    vector<int> noans={-1,-1};
    int n=nums.size();
    int st=0;
    int end=n-1;
    while(st<end){
        int sum=nums[st]+nums[end];
        if(sum==target){
            ans.push_back(st);
            ans.push_back(end);
            break;
        }
        else if(sum<target){
            st++;
        }
        else{
            end--;
        }
    }
    return ans;

}

vector<int> twoSumv3(vector<int>& nums, int target) {//hashing technique
        unordered_map <int,int> m;
        vector<int> ans;
        for(int i=0;i<nums.size();i++){
            int first=nums[i];
            int sec= target-first;
            if(m.find(sec)!=m.end()){
                ans.push_back(i);
                ans.push_back(m[sec]);
                break;
            }
            m[first]=i; //storing index of first element hash map
        }
        sort(ans.begin(),ans.end());
        return ans;
    }


int main() {
    vector<int> nums = {2,4,6,7};
    int target=9;
    vector<int> result1 = twoSumv1(nums, target);
    vector<int> result2 = twoSumv2(nums, target);
    for(int i:result1){
      cout<<i<<" ";
    }
    cout<<endl;
    for(int i:result2){
      cout<<i<<" ";
    }
    cout<<endl;
     vector<int> result3 = twoSumv3(nums, target);
    for(int i:result3){
      cout<<i<<" ";
    }
    cout<<endl;
  return 0;
}