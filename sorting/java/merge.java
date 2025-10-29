
import java.util.Scanner;

public class MergeSort {

    // Function to merge two sorted halves
    public static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1; // size of left subarray
        int n2 = right - mid;    // size of right subarray

        int[] L = new int[n1];
        int[] R = new int[n2];

        // Copy data to temp arrays
        for (int i = 0; i < n1; i++)
            L[i] = arr[left + i];
        for (int j = 0; j < n2; j++)
            R[j] = arr[mid + 1 + j];

        // Merge temp arrays back into arr[left...right]
        int i = 0, j = 0, k = left;

        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
        }

        // Copy remaining elements of L[]
        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
        }

        // Copy remaining elements of R[]
        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
        }
    }

    // Recursive merge sort function
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = (left + right) / 2;

            // Sort first and second halves
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);

            // Merge the sorted halves
            merge(arr, left, mid, right);
        }
    }

    // Display array
    public static void printArray(int[] arr) {
        for (int x : arr)
            System.out.print(x + " ");
        System.out.println();
    }

    // Main function
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

        mergeSort(arr, 0, n - 1);

        System.out.println("\n✅ Sorted Array:");
        printArray(arr);
        sc.close();
    }
}

// Enter number of elements: 6
// Enter elements:
// 5 2 9 1 3 7

// 🧩 Original Array:
// 5 2 9 1 3 7 

// ✅ Sorted Array:
// 1 2 3 5 7 9
 
//algorithm

// | Step | Description                                   |
// | ---- | --------------------------------------------- |
// | 1️⃣  | Divide the array into two halves recursively. |
// | 2️⃣  | Sort each half individually using recursion.  |
// | 3️⃣  | Merge the two sorted halves into one.         |



// Time Complexity: O(n log n)
// Space Complexity: O(n) (for temporary arrays)
