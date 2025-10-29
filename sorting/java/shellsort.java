public class ShellSort {

    // Function to perform Shell Sort
    public void sort(int arr[]) {
        int n = arr.length;

        // Start with a big gap, then reduce it
        for (int gap = n / 2; gap > 0; gap /= 2) {

            // Perform gapped insertion sort
            for (int i = gap; i < n; i++) {
                int temp = arr[i];
                int j;

                // Shift earlier gap-sorted elements up until correct location found
                for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                    arr[j] = arr[j - gap];
                }

                // Place temp (the original arr[i]) in its correct location
                arr[j] = temp;
            }
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
        int arr[] = {12, 34, 54, 2, 3};
        System.out.println("Original array:");
        printArray(arr);

        ShellSort ob = new ShellSort();
        ob.sort(arr);

        System.out.println("Sorted array:");
        printArray(arr);
    }
}
// Original array:
// 12 34 54 2 3
// Sorted array:
// 2 3 12 34 54


// ⚙️ Algorithm Steps

// Start with a large gap (usually n/2).
// Perform insertion sort on elements spaced by the gap.
// Gradually reduce the gap (e.g., gap = gap / 2).
// Repeat until the gap becomes 1 (regular insertion sort).



// | Case                 | Time Complexity          | Explanation                    |
// | -------------------- | ------------------------ | ------------------------------ |
// |   Best Case          | O(n log n)               | Depends on chosen gap sequence |
// |   Average Case       | O(n^(3/2))   or better   | Better than O(n²)              |
// |   Worst Case         | O(n²)                    | For bad gap sequences          |
// |   Space Complexity   | O(1)                     | In-place, no extra memory used |

// Shell Sort = 🧠 Smart Insertion Sort using gaps → faster for medium-sized datasets.