// 121. Best Time to Buy and Sell Stock-Easy
// You are given an array prices where prices[i] is the price of a given stock on the ith day.

// You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

// Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

 

// Example 1:

// Input: prices = [7,1,5,3,6,4]
// Output: 5
// Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
// Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
// Example 2:

// Input: prices = [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transactions are done and the max profit = 0.

#include <iostream>
using namespace std;
#include <vector>
#include<algorithm>
#include<climits>

int maxprofit(vector<int> &arr){
  int bestbuy =arr[0];
  int maxprofit=0;
  int n=arr.size();
  for(int i=1;i<n;i++){
    if(arr[i]>bestbuy){
      maxprofit=max(maxprofit,arr[i]-bestbuy);
    }
    else{
      bestbuy=min(arr[i],bestbuy);
    }
  }
  return maxprofit;
}
int main() {
    vector<int> arr={7,1,5,3,6,4};
    vector<int> arr2={7,6,4,3,1};
    cout<<maxprofit(arr)<<endl;
    cout<<maxprofit(arr2)<<endl;
 return 0;
}