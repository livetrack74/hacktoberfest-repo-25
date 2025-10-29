public class SelectionSort {

    // Function to perform Selection Sort
    public void sort(int arr[]) {
        int n = arr.length;

        // Move the boundary of the unsorted subarray
        for (int i = 0; i < n - 1; i++) {
            int minIndex = i; // Assume the current element is minimum

            // Find the actual minimum in the unsorted part
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }

            // Swap the found minimum element with the first element
            int temp = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = temp;
        }
    }

    // Utility function to print the array
    static void printArray(int arr[]) {
        for (int value : arr) {
            System.out.print(value + " ");
        }
        System.out.println();
    }

    // Main function
    public static void main(String[] args) {
        int arr[] = {64, 25, 12, 22, 11};
        System.out.println("Original Array:");
        printArray(arr);

        SelectionSort ob = new SelectionSort();
        ob.sort(arr);

        System.out.println("Sorted Array:");
        printArray(arr);
    }
}

// Original Array:
// 64 25 12 22 11
// Sorted Array:
// 11 12 22 25 64

// ⚙️ Algorithm Steps

// Start from index 0.
// Find the minimum element in the unsorted portion of the array.
// Swap it with the first unsorted element.
// Move the boundary of the sorted part one step right.
// Repeat until the array is sorted.

// Time Complexity
// | Case             | Time Complexity | Explanation                                |
// | ---------------- | --------------- | ------------------------------------------ |
// |   Best Case      |   O(n²)         | Still compares all elements even if sorted |
// |   Average Case   |   O(n²)         | Typical scenario                           |
// |   Worst Case     |   O(n²)         | Reversed array or random order             |

// Space Complexity
// | Type                | Value    | Description                         |
// | ------------------- | -------- | ----------------------------------- |
// |   Auxiliary Space   |   O(1)   | Only a few temporary variables used |
// |   In-place?         | ✅ Yes   | Sorting is done in the same array   |
// |   Stable?           | ❌ No    | Equal elements may get swapped      |
