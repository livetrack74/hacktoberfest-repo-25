
import java.util.Scanner;

public class QuickSort {

    // Function to partition the array
    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high]; // pivot element
        int i = low - 1;       // index of smaller element

        for (int j = low; j < high; j++) {
            // If current element <= pivot, swap it
            if (arr[j] <= pivot) {
                i++;
                // swap arr[i] and arr[j]
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        // Place pivot in the correct position
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        return i + 1; // return partition index
    }

    // Recursive QuickSort
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high); // partition index

            // Recursively sort elements before and after partition
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    // Utility function to print the array
    public static void printArray(int[] arr) {
        for (int num : arr)
            System.out.print(num + " ");
        System.out.println();
    }

    // Main driver
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter number of elements: ");
        int n = sc.nextInt();

        int[] arr = new int[n];
        System.out.println("Enter elements:");
        for (int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        System.out.println("\n🧩 Original Array:");
        printArray(arr);

        quickSort(arr, 0, n - 1);

        System.out.println("\n✅ Sorted Array:");
        printArray(arr);
        sc.close();
    }
}
// Enter number of elements: 6
// Enter elements:
// 10 7 8 9 1 5

// 🧩 Original Array:
// 10 7 8 9 1 5 

// ✅ Sorted Array:
// 1 5 7 8 9 10
// Time Complexity:

// Best / Average: O(n log n)

// Worst: O(n²) (when array is already sorted)

// Space Complexity: O(log n) (recursive stack)