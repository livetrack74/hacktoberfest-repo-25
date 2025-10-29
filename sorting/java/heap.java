public class HeapSort {
    
    // Function to perform heap sort
    public void sort(int arr[]) {
        int n = arr.length;

        // Step 1: Build a max heap
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }

        // Step 2: Extract elements from heap one by one
        for (int i = n - 1; i > 0; i--) {
            // Move current root (largest) to the end
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            // call heapify on the reduced heap
            heapify(arr, i, 0);
        }
    }

    // To heapify a subtree rooted at index i
    void heapify(int arr[], int n, int i) {
        int largest = i;          // Initialize largest as root
        int left = 2 * i + 1;     // left child
        int right = 2 * i + 2;    // right child

        // If left child is larger than root
        if (left < n && arr[left] > arr[largest])
            largest = left;

        // If right child is larger than largest so far
        if (right < n && arr[right] > arr[largest])
            largest = right;

        // If largest is not root
        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;

            // Recursively heapify the affected subtree
            heapify(arr, n, largest);
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
    public static void main(String args[]) {
        int arr[] = {12, 11, 13, 5, 6, 7};
        System.out.println("Original array:");
        printArray(arr);

        HeapSort ob = new HeapSort();
        ob.sort(arr);

        System.out.println("Sorted array:");
        printArray(arr);
    }
}

// Original array:
// 12 11 13 5 6 7
// Sorted array:
// 5 6 7 11 12 13

// Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure.
// It works in two main steps:
// Build a Max Heap from the array.
// (The largest element is at the root.)
// Extract the max element one by one and rebuild the heap.

// 🧠 Time Complexity:

// Best: O(n log n)

// Average: O(n log n)

// Worst: O(n log n)

// 💾 Space Complexity: O(1) (in-place sorting)