"""
LeetCode Problem: 1. Two Sum

Given an array of integers nums and an integer target, return indices of 
the two numbers such that they add up to target.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
"""

def two_sum(nums, target):
    """
    Returns indices of the two numbers that add up to target.
    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

if __name__ == "__main__":
    nums = [2, 7, 11, 15]
    target = 9
    print("Input:", nums)
    print("Target:", target)
    print("Output:", two_sum(nums, target))  # Output: [0, 1]
