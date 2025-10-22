using System;
using System.Collections.Generic;
using System.Linq;

public class Patterns
{
    private static void PrintChars(char c, int n)
    {
        if (n > 0)
        {
            Console.Write(new string(c, n));
        }
    }

    public static void Pyramid(int n)
    {
        for (int i = 1; i <= n; i++)
        {
            PrintChars(' ', n - i);
            PrintChars('*', 2 * i - 1);
            Console.WriteLine();
        }
    }

    public static void Inverted(int n)
    {
        for (int i = n; i >= 1; i--)
        {
            PrintChars(' ', n - i);
            PrintChars('*', 2 * i - 1);
            Console.WriteLine();
        }
    }

    public static void Diamond(int n)
    {
        Pyramid(n);
        for (int i = n - 1; i >= 1; i--)
        {
            PrintChars(' ', n - i);
            PrintChars('*', 2 * i - 1);
            Console.WriteLine();
        }
    }
    
    public static void HollowPyramid(int n)
    {
        for (int i = 1; i <= n; i++)
        {
            PrintChars(' ', n - i);
            if (i == 1 || i == n)
            {
                PrintChars('*', 2 * i - 1);
            }
            else
            {
                Console.Write("*");
                PrintChars(' ', 2 * i - 3);
                Console.Write("*");
            }
            Console.WriteLine();
        }
    }

    public static void Pascals(int n)
    {
        List<long> row = new List<long> { 1 };
        for (int i = 0; i < n; i++)
        {
            string rowStr = string.Join(" ", row);
            int padding = (2 * n - rowStr.Length) / 2;
            PrintChars(' ', padding);
            Console.WriteLine(rowStr);

            List<long> nextRow = new List<long> { 1 };
            for (int j = 0; j < row.Count - 1; j++)
            {
                nextRow.Add(row[j] + row[j + 1]);
            }
            nextRow.Add(1);
            row = nextRow;
        }
    }

    public static void Hourglass(int n)
    {
        Inverted(n);
        for (int i = 2; i <= n; i++)
        {
            PrintChars(' ', n - i);
            PrintChars('*', 2 * i - 1);
            Console.WriteLine();
        }
    }
    
    public static void Zigzag(int n)
    {
        int height = 4;
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < height; j++)
            {
                if (j == 0 || j == height - 1)
                {
                    PrintChars('*', n);
                    Console.WriteLine();
                }
                else
                {
                    PrintChars(' ', n - i - 1);
                    Console.WriteLine("*");
                }
            }
        }
    }

    public static void Main(string[] args)
    {
        string pattern = args.Length > 0 ? args[0] : "pyramid";
        int n = 5;
        if (args.Length > 1 && int.TryParse(args[1], out int parsedN))
        {
            n = parsedN;
        }

        var funcs = new Dictionary<string, Action<int>>
        {
            ["pyramid"] = Pyramid,
            ["inverted"] = Inverted,
            ["diamond"] = Diamond,
            ["hollow_pyramid"] = HollowPyramid,
            ["pascals"] = Pascals,
            ["hourglass"] = Hourglass,
            ["zigzag"] = Zigzag,
        };

        if (funcs.ContainsKey(pattern))
        {
            funcs[pattern](n);
        }
        else
        {
            Console.WriteLine($"Unknown pattern. Choose from: {string.Join(", ", funcs.Keys)}");
        }
    }
}