#include <iostream>
using namespace std;
#include <vector>
#include <cmath>  
//204.SEARCH IN A 2D MATRIX II
// Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:

// Integers in each row are sorted in ascending from left to right.
// Integers in each column are sorted in ascending from top to bottom.
 

// Example 1:


// Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
// Output: true
bool searchMatrix(vector<vector<int>>& matrix, int target) {//row and column both sorted
        int m= matrix.size();
        int n=matrix[0].size();
        int r=0;
        int c=n-1;
        while(r<m && c>=0){
            if(target==matrix[r][c]){
                return true;
            }
            else if(target<matrix[r][c]){
                c--;
            }
            else{
                r++;
            }
        }
        return false;
    }

    //
    //74.SEARCH IN A 2D MATRIX I
//     You are given an m x n integer matrix matrix with the following two properties:

// Each row is sorted in non-decreasing order.
// The first integer of each row is greater than the last integer of the previous row.
// Given an integer target, return true if target is in matrix or false otherwise.

// You must write a solution in O(log(m * n)) time complexity.

 

// Example 1:


// Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
// Output: true
    bool searchrow(vector<vector<int>>& mat, int target,int m){
        int st=0;
        int end=mat[0].size()-1;
        while(st<=end){
            int mid=st+(end-st)/2;
            if(mat[m][mid]==target){
                return true;
            }
            else if(target<mat[m][mid]){
                end=m-1;
            }
            else{
                st=m+1;
            }
        }
        return false;
    }
    bool searchmatrix2(vector<vector<int>>& matrix, int target) {//row  sorted (lastrow last element < next row first element)
        int m= matrix.size();
        int n=matrix[0].size();
        int st=0;
        int end=m-1;
        while(st<=end){
            int mid=st+(end-st)/2;
            if(target>=matrix[mid][0] && target<=matrix[mid][n-1]){
                return searchrow(matrix,target,mid);
            }
            else if(target>matrix[mid][n-1]){
                st=mid+1;
            }
            else{
              end=mid-1;
            }
        }
        return false;
    }
int main() {
    vector<vector<int>> matrix = {
        {1, 3, 5},
        {7, 9, 11},
        {13, 15, 17}
    };
   
    int target = 9;
    if (searchMatrix(matrix, target)) {
        cout << "Element found in the matrix." << endl;
    } else {
        cout << "Element not found in the matrix." << endl;
    }
        target = 14;
    if (searchmatrix2(matrix, target)) {
        cout << "Element found in the matrix." << endl;
    } else {
        cout << "Element not found in the matrix." << endl;
    }

    
 return 0;
}