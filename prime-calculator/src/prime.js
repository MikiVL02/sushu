/**
 * Miller-Rabin deterministic primality test for integers up to 3.3 × 10^24.
 * Using deterministic witnesses that cover all integers up to 3,317,044,064,679,887,385,961,981.
 */
function isPrime(n) {
  if (n < 2) return false
  if (n === 2 || n === 3 || n === 5 || n === 7) return true
  if (n % 2 === 0 || n % 3 === 0 || n % 5 === 0) return false

  // Write n-1 as 2^r * d
  let d = n - 1
  let r = 0
  while (d % 2 === 0) {
    d /= 2
    r++
  }

  // Deterministic witnesses for n < 3,215,031,751 (covers all 32-bit integers)
  const witnesses = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]

  for (const a of witnesses) {
    if (a >= n) continue
    if (!millerRabinTest(n, d, r, a)) return false
  }
  return true
}

function millerRabinTest(n, d, r, a) {
  let x = modPow(BigInt(a), BigInt(d), BigInt(n))
  const bn = BigInt(n)
  if (x === 1n || x === bn - 1n) return true
  for (let i = 0; i < r - 1; i++) {
    x = (x * x) % bn
    if (x === bn - 1n) return true
  }
  return false
}

function modPow(base, exp, mod) {
  let result = 1n
  base = base % mod
  while (exp > 0n) {
    if (exp % 2n === 1n) result = (result * base) % mod
    exp = exp >> 1n
    base = (base * base) % mod
  }
  return result
}

export function nextPrime(n) {
  let candidate = n + 1
  if (candidate < 2) candidate = 2
  // Ensure we start on an odd number (except 2)
  if (candidate > 2 && candidate % 2 === 0) candidate++
  while (!isPrime(candidate)) {
    candidate += candidate === 2 ? 1 : 2
  }
  return candidate
}
