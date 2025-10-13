#!/usr/bin/env python3
import sys

def pyramid(n):
    for i in range(1, n+1):
        print(" "*(n-i) + "*"*(2*i-1))

def inverted(n):
    for i in range(n,0,-1):
        print(" "*(n-i) + "*"*(2*i-1))

def diamond(n):
    pyramid(n)
    for i in range(n-1,0,-1):
        print(" "*(n-i) + "*"*(2*i-1))

def hollow_pyramid(n):
    for i in range(1, n+1):
        if i == 1:
            print(" "*(n-1) + "*")
        elif i == n:
            print("*"*(2*n-1))
        else:
            print(" "*(n-i) + "*" + " "*(2*i-3) + "*")

def pascals(n):
    # simple Pascal's triangle (numbers)
    row = [1]
    for _ in range(n):
        print(" ".join(map(str, row)).center(2*n))
        row = [1] + [row[i]+row[i+1] for i in range(len(row)-1)] + [1]

def main():
    args = sys.argv[1:]
    pattern = args[0] if len(args) >= 1 else "pyramid"
    n = int(args[1]) if len(args) >= 2 else 5

    funcs = {
        "pyramid": pyramid,
        "inverted": inverted,
        "diamond": diamond,
        "hollow_pyramid": hollow_pyramid,
        "pascals": pascals
    }
    if pattern not in funcs:
        print("Unknown pattern. Choose from:", ", ".join(funcs.keys()))
        return
    funcs[pattern](n)

if __name__ == "__main__":
    main()
