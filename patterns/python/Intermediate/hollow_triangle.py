"""This python program prints hollow triangle.
An example of hollow triangle with 5 rows is:
* 
* * 
*   * 
*     * 
* * * * *
An example of hollow triangle with 6 rows is:
* 
* * 
*   * 
*     * 
*       * 
* * * * * *"""


rows = int(input())
for i in range(1, rows):
    for j in range(1, i+1):
        if j == 1 or j == i:
            print("* ", end="")
        else:
            print(" ", end=" ")
    print()
for k in range(1, rows+1):
    print("* ", end="")