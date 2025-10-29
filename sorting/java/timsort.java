public class TimSort {
    static int RUN = 32;

    // Insertion sort for small chunks
    public static void insertionSort(int arr[], int left, int right) {
        for (int i = left + 1; i <= right; i++) {
            int temp = arr[i];
            int j = i - 1;
            while (j >= left && arr[j] > temp) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = temp;
        }
    }

    // Merge function like merge sort
    public static void merge(int arr[], int l, int m, int r) {
        int len1 = m - l + 1, len2 = r - m;
        int left[] = new int[len1];
        int right[] = new int[len2];

        for (int x = 0; x < len1; x++)
            left[x] = arr[l + x];
        for (int x = 0; x < len2; x++)
            right[x] = arr[m + 1 + x];

        int i = 0, j = 0, k = l;

        while (i < len1 && j < len2) {
            if (left[i] <= right[j]) {
                arr[k] = left[i];
                i++;
            } else {
                arr[k] = right[j];
                j++;
            }
            k++;
        }

        // Copy remaining elements
        while (i < len1) {
            arr[k] = left[i];
            k++;
            i++;
        }

        while (j < len2) {
            arr[k] = right[j];
            k++;
            j++;
        }
    }

    // TimSort main function
    public static void timSort(int arr[], int n) {
        // Sort individual subarrays of size RUN
        for (int i = 0; i < n; i += RUN)
            insertionSort(arr, i, Math.min((i + RUN - 1), (n - 1)));

        // Start merging from size RUN (32, 64, 128,...)
        for (int size = RUN; size < n; size = 2 * size) {
            for (int left = 0; left < n; left += 2 * size) {
                int mid = left + size - 1;
                int right = Math.min((left + 2 * size - 1), (n - 1));

                if (mid < right)
                    merge(arr, left, mid, right);
            }
        }
    }

    // Print array
    public static void printArray(int arr[]) {
        for (int x : arr)
            System.out.print(x + " ");
        System.out.println();
    }

    // Driver code
    public static void main(String args[]) {
        int arr[] = {5, 21, 7, 23, 19, 10, 3, 2, 15};
        System.out.println("Original Array:");
        printArray(arr);

        timSort(arr, arr.length);

        System.out.println("Sorted Array:");
        printArray(arr);
    }
}
// Original Array:
// 5 21 7 23 19 10 3 2 15
// Sorted Array:
// 2 3 5 7 10 15 19 21 23

// ⚙️ Algorithms

// Divide the array into small chunks called runs (size usually 32 or 64).
// Each run is sorted using Insertion Sort (fast for small data).
// Merge the sorted runs using a Merge Sort-like process.
// Continue merging until one sorted array remains.

// | Case             | Time Complexity | Explanation                  |
// | ---------------- | --------------- | ---------------------------- |
// |   Best Case      |    O(n)         | When array is already sorted |
// |   Average Case   |    O(n log n)   | Typical case during merges   |
// |   Worst Case     |    O(n log n)   | Same as Merge Sort           |


// Tim Sort is a hybrid sorting algorithm that combines:

// Insertion Sort (for small chunks)

// Merge Sort (for merging chunks efficiently)