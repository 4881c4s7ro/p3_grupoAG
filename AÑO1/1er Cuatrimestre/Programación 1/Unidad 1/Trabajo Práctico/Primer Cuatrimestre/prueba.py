def inputPhase():
    try:
        var1 = float(input("Enter a number: "))
        var2 = float(input("Enter another number: "))
    except ValueError:
        print("Invalid input. Please enter numeric values.")
        return None, None
    
if(__name__ == "__main__"):
    num1, num2 = inputPhase()
    if num1 is not None and num2 is not None:
        print(f"You entered: {num1} and {num2}")
    else:
        print("No valid numbers were entered.")