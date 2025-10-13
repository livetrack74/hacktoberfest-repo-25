"""
LeetCode Problem: 20. Valid Parentheses

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
determine if the input string is valid.

An input string is valid if:
1. Open brackets are closed by the same type of brackets.
2. Open brackets are closed in the correct order.
3. Every closing bracket has a corresponding opening bracket.

Example:
Input: s = "()[]{}"
Output: True

Input: s = "(]"
Output: False
"""

def is_valid(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}

    for char in s:
        if char in mapping.values():
            stack.append(char)
        elif char in mapping:
            if not stack or stack[-1] != mapping[char]:
                return False
            stack.pop()
        else:
            # ignore non-bracket characters (optional)
            continue

    return not stack


if __name__ == "__main__":
    test_cases = ["()", "()[]{}", "(]", "([)]", "{[]}", "(((())))", "{[()]}", "[(])"]

    for s in test_cases:
        print(f"{s:10} → {is_valid(s)}")
