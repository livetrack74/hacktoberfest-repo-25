"""
LeetCode Problem: 26. Remove Duplicates from Sorted Array

Given an integer array nums sorted in non-decreasing order,
remove the duplicates in-place such that each unique element
appears only once. The relative order of the elements should be kept the same.

Example:
Input: nums = [1,1,2]
Output: 2, nums = [1,2,_]

Explanation:
Your function should return k = 2, with the first k elements being [1,2].
It does not matter what you leave beyond the returned k (hence underscores).
"""

def remove_duplicates(nums):
    """
    Removes duplicates from sorted array in-place.
    Returns the count of unique elements (k).
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    if not nums:
        return 0

    k = 1  # pointer for unique elements
    for i in range(1, len(nums)):
        if nums[i] != nums[i - 1]:
            nums[k] = nums[i]
            k += 1

    return k


if __name__ == "__main__":
    nums = [1, 1, 2, 2, 3, 4, 4, 5]
    print("Original:", nums)
    k = remove_duplicates(nums)
    print("After removing duplicates:", nums[:k])
    print("Unique count (k):", k)
