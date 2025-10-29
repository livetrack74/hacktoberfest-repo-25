import java.util.*;

public class MergeIntervals {

    public static int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;

        // Step 1: Sort intervals by start time
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

        List<int[]> merged = new ArrayList<>();
        int[] current = intervals[0];

        for (int i = 1; i < intervals.length; i++) {
            int[] next = intervals[i];

            // Overlap check: if next.start <= current.end
            if (next[0] <= current[1]) {
                current[1] = Math.max(current[1], next[1]); // merge
            } else {
                merged.add(current);
                current = next;
            }
        }

        merged.add(current);
        return merged.toArray(new int[merged.size()][]);
    }

    public static void main(String[] args) {
        int[][] input = {{1,3},{2,6},{8,10},{15,18}};
        int[][] result = merge(input);

        System.out.print("[");
        for (int[] arr : result) {
            System.out.print(Arrays.toString(arr) + " ");
        }
        System.out.println("]");
    }
}
