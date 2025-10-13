using System;

class Pyramid {
    static void pyramid(int n = 5) {
        for (int i = 1; i <= n; i++) {
            Console.Write(new string(' ', n - i));
            Console.WriteLine(new string('*', 2*i - 1));
        }
    }
    static void Main() {
        pyramid(5);
    }
}
