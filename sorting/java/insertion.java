public class InsertionSort {

    // Function to perform insertion sort
    public void sort(int arr[]) {
        int n = arr.length;
        for (int i = 1; i < n; i++) {
            int key = arr[i]; // current element to insert
            int j = i - 1;

            // Move elements of arr[0..i-1] that are greater than key
            // to one position ahead of their current position
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key; // place key at correct position
        }
    }

    // Utility function to print array
    static void printArray(int arr[]) {
        for (int value : arr) {
            System.out.print(value + " ");
        }
        System.out.println();
    }

    // Main method
    public static void main(String[] args) {
        int arr[] = {12, 11, 13, 5, 6};
        System.out.println("Original array:");
        printArray(arr);

        InsertionSort ob = new InsertionSort();
        ob.sort(arr);

        System.out.println("Sorted array:");
        printArray(arr);
    }
}
// Original array:
// 12 11 13 5 6
// Sorted array:
// 5 6 11 12 13

// ⚙️ Algorithm Steps

// Start from the second element (index 1).
// Compare it with elements before it.
// Shift larger elements to the right.
// Insert the current element at its correct position.
// Repeat for all elements.

// 🧠 Complexity
// Case	   Time Complexity
// Best	       O(n) (already sorted)
// Average  	O(n²)
// Worst	    O(n²)
// Space	    O(1) (in-place)
