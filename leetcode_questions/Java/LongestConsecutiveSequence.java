import java.util.HashSet;
import java.util.Set;

public class LongestConsecutiveSequence {

    public static int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int num : nums) set.add(num);

        int longest = 0;

        for (int num : set) {
            // Start of a new sequence
            if (!set.contains(num - 1)) {
                int current = num;
                int streak = 1;

                while (set.contains(current + 1)) {
                    current++;
                    streak++;
                }

                longest = Math.max(longest, streak);
            }
        }

        return longest;
    }

    public static void main(String[] args) {
        int[] nums = {100, 4, 200, 1, 3, 2};
        System.out.println("Longest consecutive sequence length: " + longestConsecutive(nums));
        // Output: 4
    }
}
