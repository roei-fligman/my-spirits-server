function Fibonacci(n) {
    if (n <= 1)
        return n;
    return Fibonacci(n - 1) + Fibonacci(n - 2);
}

function CountSubstringOccurrences(str, substr) {
    let count = 0;
    let index = 0;
    while ((index = str.indexOf(substr, index)) != -1) {
        count++;
        index += substr.length;
    }
    return count;
}

function sumArray(arr) {
    return arr.reduce((acc, curr) => acc + curr, 0);
}