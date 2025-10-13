#include <iostream>
#include <string>
using namespace std;

void pyramid(int n=5){
    for(int i=1;i<=n;i++){
        cout << string(n-i, ' ') << string(2*i-1, '*') << "\n";
    }
}

int main(){
    pyramid(5);
    return 0;
}
