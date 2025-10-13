public class Pyramid {
    public static void pyramid(int n) {
        for (int i = 1; i <= n; i++) {
            System.out.print(" ".repeat(n - i));
            System.out.println("*".repeat(2 * i - 1));
        }
    }
    public static void main(String[] args) {
        pyramid(5);
    }
}
