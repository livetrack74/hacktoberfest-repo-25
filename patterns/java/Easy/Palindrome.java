public class Palindrome {
    public static void main(String[] args) {
        String s = "RaceCar";
        String lower = s.toLowerCase();
        String rev = new StringBuilder(lower).reverse().toString();
        if (lower.equals(rev)) {
            System.out.println("Yes");
        } else {
            System.out.println("No");
        }
    }
}
