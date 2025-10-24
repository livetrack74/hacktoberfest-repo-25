"""
LeetCode Problem: 53. Maximum Subarray

Given an integer array nums, find the contiguous subarray (containing at least one number)
which has the largest sum and return its sum.

Example:
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
"""

def max_subarray(nums):
    """
    Implements Kadane's Algorithm.
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    if not nums:
        return 0

    max_current = max_global = nums[0]

    for num in nums[1:]:
        max_current = max(num, max_current + num)
        max_global = max(max_global, max_current)

    return max_global


if __name__ == "__main__":
    nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
    print("Input:", nums)
    print("Maximum Subarray Sum:", max_subarray(nums))
