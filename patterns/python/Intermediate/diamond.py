
# Gestion of invalid input

while True:   
    try:
        rows = int(input("Enter the number of rows: ")) # Imput from user
        break                                           # Exit loop if input is valid   
    except ValueError:                                  # Handle invalid input   
        print("Invalid input. Please enter a number.")  # Prompt user again
    

# ------ Diamond Pattern ------ #
for i in range(1, rows+1):
    print((rows-i)*" ", end="")
    print(i*"*", end="")
    print((i-1)*"*")
for j in range(rows-1, 0, -1):
    print((rows-j)*" ", end="")
    print(j*"*", end="")
    print((j-1)*"*")
# ------ Diamond Pattern ------ #
