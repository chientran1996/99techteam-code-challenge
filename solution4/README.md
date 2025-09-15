# Problem 4 — Three Ways to Sum to *n*

A professional Next.js + TypeScript solution to the coding challenge:

> Implement three different functions to calculate the sum of integers from 1 to *n*.  
> Each function must be unique and include complexity analysis.

This project demonstrates:
- **Next.js 15.5.3 (App Router)** with **TypeScript**
- Three independent implementations of `sum_to_n(n)`
- **Input validation** (non-negative integers, safe within `Number.MAX_SAFE_INTEGER`)
- **Unit tests** with [Vitest](https://vitest.dev/) and coverage report
- A simple **API route** and **UI demo** for interactive exploration
- **ESLint + Prettier** integration for consistent code style

---

## Requirements

- **Node.js** ≥ 20 (LTS recommended)
- Package manager: **npm**
- Optional: VSCode with ESLint & Prettier extensions for best developer experience

---

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <https://github.com/chientran1996/99techteam-code-challenge.git> solution4
   cd solution4

2. **Install dependencies**
   ```bash
   npm install

3. **Run development server**
   ```bash
   npm run dev
   Open http://localhost:3000 in your browser.


## Testing

1. **Run all tests**
   ```bash
   npm test

2. **Watch mode**
   ```bash
   npm run test:watch

3. **Generate coverage report**
   ```bash
   npm test -- --coverage


## Implementations

All three implementations validate input before computing:

1. **Iterative loop**
   ```bash
   function sum_to_n_a(n: number): number

- Complexity: O(n) time, O(1) space
- Simple and explicit, but slower for large n

2. **Gauss formula**
   ```bash
   function sum_to_n_b(n: number): number

- Complexity: O(1) time, O(1) space
- Best performance, recommended for production

3. **Divide & Conquer**
   ```bash
   function sum_to_n_c(n: number): number

- Complexity: O(n) total operations, recursion depth O(log n)
- Useful for parallelization or stack safety in other environments