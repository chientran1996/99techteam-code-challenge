/**
* Three independent implementations for summing 1..n.
* REQUIREMENTS/ASSUMPTIONS:
* - n is an integer >= 0
* - Result < Number.MAX_SAFE_INTEGER (the problem assumes this)
*
* All 3 functions:
* - validate the input (n is non-negative, an integer)
* - ensure that it does not exceed the safe range of Number in JS
*/

function assertValid(n: number): void {
    if (!Number.isInteger(n)) throw new TypeError("n must be an integer");
    if (n < 0) throw new RangeError("n must be >= 0");

    // To ensure sum = n(n+1)/2 <= Number.MAX_SAFE_INTEGER,
    // get an approximate threshold: n_max ≈ floor(sqrt(2*MAX_SAFE_INTEGER))
    const maxN = Math.floor(Math.sqrt(Number.MAX_SAFE_INTEGER * 2));
    if (n > maxN) {
        throw new RangeError(`n too large for safe integer result (max ≈ ${maxN})`);
    }
}

/**
* a) Cumulative loop.
* - Time: O(n)
* - Space: O(1)
* Advantages: easy to understand, easy to debug. Disadvantages: time consuming when n is very large.
*/
export function sum_to_n_a(n: number): number {
    assertValid(n);
    let sum = 0;
    for (let i = 1; i <= n; i++) sum += i;
    return sum;
}

/**
* b) Gauss formula: 1 + 2 + ... + n = n(n + 1)/2
* - Time: O(1)
* - Space: O(1)
* Advantages: fastest and clear when input conditions are guaranteed.
*/
export function sum_to_n_b(n: number): number {
    assertValid(n);
    return (n * (n + 1)) / 2;
}

/**
* c) Divide & Conquer on the range [1..n].
* - Total: O(n)
* - Recursion depth: O(log n)
* Idea: split [l..r] → [l..mid] + [mid+1..r].
* Can be useful when parallelizing (in other environments) or limiting stack depth.
*/
export function sum_to_n_c(n: number): number {
    assertValid(n);

    const sumRange = (l: number, r: number): number => {
        if (l > r) return 0;
        if (l === r) return l;
        const mid = (l + r) >> 1;
        return sumRange(l, mid) + sumRange(mid + 1, r);
    };

    return sumRange(1, n);
}