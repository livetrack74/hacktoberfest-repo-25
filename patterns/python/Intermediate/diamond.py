rows = int(input("Enter the number of rows: "))
for i in range(1, rows+1):
    print((rows-i)*" ", end="")
    print(i*"*", end="")
    print((i-1)*"*")
for j in range(rows-1, 0, -1):
    print((rows-j)*" ", end="")
    print(j*"*", end="")
    print((j-1)*"*")
