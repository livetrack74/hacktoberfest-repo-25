// ⚙️ Cycle Sort in Java
// Author: gp

import java.util.Scanner;

public class CycleSort {

    // Function to perform Cycle Sort
    public static void cycleSort(int[] arr) {
        int n = arr.length;

        // Traverse array elements and place them in correct positions
        for (int cycle_start = 0; cycle_start < n - 1; cycle_start++) {
            int item = arr[cycle_start];
            int pos = cycle_start;

            // Find where to place the item
            for (int i = cycle_start + 1; i < n; i++) {
                if (arr[i] < item)
                    pos++;
            }

            // If the item is already in the correct position
            if (pos == cycle_start)
                continue;

            // Skip duplicates
            while (item == arr[pos])
                pos++;

            // Swap item into the correct position
            int temp = item;
            item = arr[pos];
            arr[pos] = temp;

            // Rotate the rest of the cycle
            while (pos != cycle_start) {
                pos = cycle_start;

                for (int i = cycle_start + 1; i < n; i++) {
                    if (arr[i] < item)
                        pos++;
                }

                while (item == arr[pos])
                    pos++;

                temp = item;
                item = arr[pos];
                arr[pos] = temp;
            }
        }
    }

    // Utility to print array
    public static void printArray(int[] arr) {
        for (int num : arr)
            System.out.print(num + " ");
        System.out.println();
    }

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

        cycleSort(arr);

        System.out.println("\n✅ Sorted Array:");
        printArray(arr);

        sc.close();
    }
}


// Enter number of elements: 6
// Enter elements:
// 4 5 3 2 1 6

// 🧩 Original Array:
// 4 5 3 2 1 6
// ✅ Sorted Array:
// 1 2 3 4 5 6


// | Property             | Value                       |
// | -------------------- | --------------------------- |
// |   Best Case          | O(n²)                       |
// |   Average Case       | O(n²)                       |
// |   Worst Case         | O(n²)                       |
// |   Space Complexity   | O(1)                        |
// |   Best For           | Minimizing number of writes |
