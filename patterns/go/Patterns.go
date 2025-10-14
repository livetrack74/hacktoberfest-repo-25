package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func printChars(char string, n int) {
	if n > 0 {
		fmt.Print(strings.Repeat(char, n))
	}
}

func pyramid(n int) {
	for i := 1; i <= n; i++ {
		printChars(" ", n-i)
		printChars("*", 2*i-1)
		fmt.Println()
	}
}

func inverted(n int) {
	for i := n; i >= 1; i-- {
		printChars(" ", n-i)
		printChars("*", 2*i-1)
		fmt.Println()
	}
}

func diamond(n int) {
	pyramid(n)
	for i := n - 1; i >= 1; i-- {
		printChars(" ", n-i)
		printChars("*", 2*i-1)
		fmt.Println()
	}
}

func hollowPyramid(n int) {
	for i := 1; i <= n; i++ {
		printChars(" ", n-i)
		if i == 1 || i == n {
			printChars("*", 2*i-1)
		} else {
			fmt.Print("*")
			printChars(" ", 2*i-3)
			fmt.Print("*")
		}
		fmt.Println()
	}
}

func pascals(n int) {
	row := []int64{1}
	for i := 0; i < n; i++ {
		var rowStrBuilder strings.Builder
		for j, num := range row {
			rowStrBuilder.WriteString(strconv.FormatInt(num, 10))
			if j < len(row)-1 {
				rowStrBuilder.WriteString(" ")
			}
		}
		rowStr := rowStrBuilder.String()
		padding := (2*n - len(rowStr)) / 2
		printChars(" ", padding)
		fmt.Println(rowStr)

		nextRow := []int64{1}
		for j := 0; j < len(row)-1; j++ {
			nextRow = append(nextRow, row[j]+row[j+1])
		}
		nextRow = append(nextRow, 1)
		row = nextRow
	}
}

func hourglass(n int) {
	inverted(n)
	for i := 2; i <= n; i++ {
		printChars(" ", n-i)
		printChars("*", 2*i-1)
		fmt.Println()
	}
}

func zigzag(n int) {
	height := 4
	for i := 0; i < n; i++ {
		for j := 0; j < height; j++ {
			if j == 0 || j == height-1 {
				printChars("*", n)
				fmt.Println()
			} else {
				printChars(" ", n-i-1)
				fmt.Println("*")
			}
		}
	}
}

func main() {
	pattern := "pyramid"
	n := 5

	args := os.Args[1:]
	if len(args) >= 1 {
		pattern = args[0]
	}
	if len(args) >= 2 {
		val, err := strconv.Atoi(args[1])
		if err == nil {
			n = val
		} else {
			fmt.Println("Error: Size must be an integer.")
			return
		}
	}

	switch pattern {
	case "pyramid":
		pyramid(n)
	case "inverted":
		inverted(n)
	case "diamond":
		diamond(n)
	case "hollow_pyramid":
		hollowPyramid(n)
	case "pascals":
		pascals(n)
	case "hourglass":
		hourglass(n)
	case "zigzag":
		zigzag(n)
	default:
		fmt.Println("Unknown pattern. Choose from: pyramid, inverted, diamond, hollow_pyramid, pascals, hourglass, zigzag")
	}
}