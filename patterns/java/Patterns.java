import java.util.ArrayList;
import java.util.List;

public class Patterns {

    private static void printChars(char c, int n) {
        for (int i = 0; i < n; i++) {
            System.out.print(c);
        }
    }

    public static void pyramid(int n) {
        for (int i = 1; i <= n; i++) {
            printChars(' ', n - i);
            printChars('*', 2 * i - 1);
            System.out.println();
        }
    }

    public static void inverted(int n) {
        for (int i = n; i >= 1; i--) {
            printChars(' ', n - i);
            printChars('*', 2 * i - 1);
            System.out.println();
        }
    }

    public static void diamond(int n) {
        pyramid(n);
        for (int i = n - 1; i >= 1; i--) {
            printChars(' ', n - i);
            printChars('*', 2 * i - 1);
            System.out.println();
        }
    }

    public static void hollowPyramid(int n) {
        for (int i = 1; i <= n; i++) {
            printChars(' ', n - i);
            if (i == 1 || i == n) {
                printChars('*', 2 * i - 1);
            } else {
                System.out.print("*");
                printChars(' ', 2 * i - 3);
                System.out.print("*");
            }
            System.out.println();
        }
    }

    public static void pascals(int n) {
        List<Integer> row = new ArrayList<>();
        row.add(1);
        for (int i = 0; i < n; i++) {
            StringBuilder rowStr = new StringBuilder();
            for (int num : row) {
                rowStr.append(num).append(" ");
            }
            
            int padding = (2 * n - rowStr.length()) / 2;
            printChars(' ', padding);
            System.out.println(rowStr.toString().trim());

            List<Integer> nextRow = new ArrayList<>();
            nextRow.add(1);
            for (int j = 0; j < row.size() - 1; j++) {
                nextRow.add(row.get(j) + row.get(j + 1));
            }
            nextRow.add(1);
            row = nextRow;
        }
    }

    public static void hourglass(int n) {
        inverted(n);
        for (int i = 2; i <= n; i++) {
            printChars(' ', n - i);
            printChars('*', 2 * i - 1);
            System.out.println();
        }
    }

    public static void zigzag(int n) {
        int height = 4;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < height; j++) {
                if (j == 0 || j == height - 1) {
                    printChars('*', n);
                    System.out.println();
                } else {
                    printChars(' ', n - i - 1);
                    System.out.println("*");
                }
            }
        }
    }

    public static void main(String[] args) {
        String pattern = "pyramid";
        int n = 5;

        if (args.length >= 1) {
            pattern = args[0];
        }
        if (args.length >= 2) {
            try {
                n = Integer.parseInt(args[1]);
            } catch (NumberFormatException e) {
                System.err.println("Error: Size must be an integer.");
                return;
            }
        }

        switch (pattern) {
            case "pyramid":         pyramid(n);         break;
            case "inverted":        inverted(n);        break;
            case "diamond":         diamond(n);         break;
            case "hollow_pyramid":  hollowPyramid(n);   break;
            case "pascals":         pascals(n);         break;
            case "hourglass":       hourglass(n);       break;
            case "zigzag":          zigzag(n);          break;
            default:
                System.out.println("Unknown pattern. Choose from: pyramid, inverted, diamond, hollow_pyramid, pascals, hourglass, zigzag");
        }
    }
}