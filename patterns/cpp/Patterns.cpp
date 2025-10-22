#include <iostream>
#include <string>
#include <vector>
#include <functional>
#include <map>

void printChars(char c, int n) {
    if (n > 0) {
        std::cout << std::string(n, c);
    }
}

void pyramid(int n) {
    for (int i = 1; i <= n; ++i) {
        printChars(' ', n - i);
        printChars('*', 2 * i - 1);
        std::cout << std::endl;
    }
}

void inverted(int n) {
    for (int i = n; i >= 1; --i) {
        printChars(' ', n - i);
        printChars('*', 2 * i - 1);
        std::cout << std::endl;
    }
}

void diamond(int n) {
    pyramid(n);
    for (int i = n - 1; i >= 1; --i) {
        printChars(' ', n - i);
        printChars('*', 2 * i - 1);
        std::cout << std::endl;
    }
}

void hollowPyramid(int n) {
    for (int i = 1; i <= n; ++i) {
        printChars(' ', n - i);
        if (i == 1 || i == n) {
            printChars('*', 2 * i - 1);
        } else {
            std::cout << "*";
            printChars(' ', 2 * i - 3);
            std::cout << "*";
        }
        std::cout << std::endl;
    }
}

void pascals(int n) {
    std::vector<long> row = {1};
    for (int i = 0; i < n; ++i) {
        std::string rowStr;
        for (size_t k = 0; k < row.size(); ++k) {
            rowStr += std::to_string(row[k]) + (k == row.size() - 1 ? "" : " ");
        }

        int padding = (2 * n - rowStr.length()) / 2;
        printChars(' ', padding);
        std::cout << rowStr << std::endl;

        std::vector<long> nextRow;
        nextRow.push_back(1);
        for (size_t j = 0; j < row.size() - 1; ++j) {
            nextRow.push_back(row[j] + row[j+1]);
        }
        nextRow.push_back(1);
        row = nextRow;
    }
}

void hourglass(int n) {
    inverted(n);
    for (int i = 2; i <= n; ++i) {
        printChars(' ', n - i);
        printChars('*', 2 * i - 1);
        std::cout << std::endl;
    }
}

void zigzag(int n) {
    int height = 4;
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < height; ++j) {
            if (j == 0 || j == height - 1) {
                printChars('*', n);
                std::cout << std::endl;
            } else {
                printChars(' ', n - i - 1);
                std::cout << "*" << std::endl;
            }
        }
    }
}

int main(int argc, char* argv[]) {
    std::string pattern = "pyramid";
    int n = 5;

    if (argc >= 2) {
        pattern = argv[1];
    }
    if (argc >= 3) {
        try {
            n = std::stoi(argv[2]);
        } catch (const std::invalid_argument& e) {
            std::cerr << "Error: Size must be an integer." << std::endl;
            return 1;
        }
    }

    std::map<std::string, std::function<void(int)>> funcs = {
        {"pyramid", pyramid},
        {"inverted", inverted},
        {"diamond", diamond},
        {"hollow_pyramid", hollowPyramid},
        {"pascals", pascals},
        {"hourglass", hourglass},
        {"zigzag", zigzag}
    };

    if (funcs.count(pattern)) {
        funcs[pattern](n);
    } else {
        std::cout << "Unknown pattern. Choose from: pyramid, inverted, diamond, hollow_pyramid, pascals, hourglass, zigzag" << std::endl;
    }

    return 0;
}