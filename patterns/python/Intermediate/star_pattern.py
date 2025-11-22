
# Gestion of invalid input

while True:   
    try:
        rows = int(input("Enter the number of rows: ")) # Imput from user
        break                                           # Exit loop if input is valid   
    except ValueError:                                  # Handle invalid input   
        print("Invalid input. Please enter a number.")  # Prompt user again
    


#printing stars from 1 to the given number of rows in increasing order
for i in range(1, rows + 1):
    print("* " * i)
