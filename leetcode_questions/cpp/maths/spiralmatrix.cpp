// 54.Spiral Matrix-medium
// Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:

// Integers in each row are sorted in ascending from left to right.
// Integers in each column are sorted in ascending from top to bottom.
 

// Example 1:


// Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
// Output: true


#include <iostream>
using namespace std;
#include <vector>
#include <cmath>

vector<int> spiralOrder(vector<vector<int>>& matrix) {
        int m= matrix.size();
        int n=matrix[0].size();
        int scol=0;
        int srow=0;
        int erow=m-1;
        int ecol=n-1;
        vector<int> ans;
        while(srow<=erow && scol<=ecol){
            for(int i=scol;i<=ecol;i++){
                ans.push_back(matrix[srow][i]);
            }
            for(int j=srow+1;j<=erow;j++){
                ans.push_back(matrix[j][ecol]);
            }
            for(int i=ecol-1;i>=scol;i--){
                if(srow==erow){
                    break;
                }
                ans.push_back(matrix[erow][i]);
            }
            for(int j=erow-1;j>=srow+1;j--){
                if(scol==ecol){
                    break;
                }
                ans.push_back(matrix[j][scol]);
            }
            
            srow++;
            erow--;
            scol++;
            ecol--;
        }
        return ans;
    }

int main() {
    vector<vector<int>> matrix = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    vector<int> result = spiralOrder(matrix);
    cout << "Spiral Order: ";
    for (int num : result) {
        cout << num << " ";
    }
    cout << endl;
 return 0;
}