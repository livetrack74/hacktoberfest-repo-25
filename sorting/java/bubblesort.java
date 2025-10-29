// 🫧 Bubble Sort in Java
// Author: gp

import java.util.Scanner;

public class BubbleSort {

    // Function to perform bubble sort
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        boolean swapped;

        // Traverse through all array elements
        for (int i = 0; i < n - 1; i++) {
            swapped = false;

            // Last i elements are already in place
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // swap arr[j] and arr[j+1]
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }

            // If no elements were swapped in inner loop, array is sorted
            if (!swapped) break;
        }
    }

    // Utility function to print array
    public static void printArray(int[] arr) {
        for (int num : arr)
            System.out.print(num + " ");
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

        bubbleSort(arr);

        System.out.println("\n✅ Sorted Array:");
        printArray(arr);

        sc.close();
    }
}


// Enter number of elements: 6
// Enter elements:
// 5 1 4 2 8 3

// 🧩 Original Array:
// 5 1 4 2 8 3 
// ✅ Sorted Array:
// 1 2 3 4 5 8


// | Step | Description                         |
// | ---- | ----------------------------------- |
// | 1️⃣  | Compare adjacent elements.          |
// | 2️⃣  | Swap if they’re in the wrong order. |
// | 3️⃣  | Repeat until the array is sorted.   |

// Time Complexity:

// Worst / Average: O(n²)
// Best (already sorted): O(n) (optimized with swapped flag)

// Space Complexity:

//  O(1) (in-place sorting)