// 75. Sort Colors/ Dutch National Flag Problem-Medium
// Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

// We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

// You must solve this problem without using the library's sort function.

 

// Example 1:

// Input: nums = [2,0,2,1,1,0]
// Output: [0,0,1,1,2,2]
// Example 2:

// Input: nums = [2,0,1]
// Output: [0,1,2]

#include <iostream>
using namespace std;
#include <vector>
#include<algorithm>
#include<climits>

void sortcolorsv1(vector<int> &arr){
  int count0=0;
  int count1=0;
  int count2=0;
  for(int i=0;i<arr.size();i++){
    if(arr[i]==0){
      count0++;
    }
    else if(arr[i]==1){
      count1++;
    }
    else{
      count2++;
    }
  }
  int idx=0;
  for(int i=0;i<count0;i++){
    arr[idx++]=0;
  }
  
  for(int i=0;i<count1;i++){
    arr[idx++]=1;
  }
  
  for(int i=0;i<count2;i++){
    arr[idx++]=2;
  }
}
  void sortcolorsv2(vector<int> &arr){
    int low=0;
    int mid=0;
    int high=arr.size()-1;
    while(mid<=high){
      if(arr[mid]==0){
        swap(arr[low],arr[mid]);
        low++;
        mid++;
      }
      else if(arr[mid]==1){
        mid++;
      }
      else{
        swap(arr[mid],arr[high]);
        high--;
      }
    }
}
int main() {
    vector<int> arr={2,0,2,1,1,0};
    sortcolorsv2(arr);
    for(int i=0;i<arr.size();i++){
      cout<<arr[i]<<" ";
    }
    cout<<endl; 
    sortcolorsv1(arr);
    for(int i=0;i<arr.size();i++){
      cout<<arr[i]<<" ";
    }
 return 0;
}