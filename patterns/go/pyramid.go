package main
import (
	"fmt"
	"strings"
)

func pyramid(n int) {
	for i := 1; i <= n; i++ {
		fmt.Println(strings.Repeat(" ", n-i) + strings.Repeat("*", 2*i-1))
	}
}

func main() {
	pyramid(5)
}
