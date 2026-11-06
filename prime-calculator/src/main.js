import './style.css'
import { nextPrime } from './prime.js'

document.querySelector('#app').innerHTML = `
  <header class="site-header">
    <div class="site-header-inner">
      <svg class="site-logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="6" fill="#0d0f12"/>
        <rect x="3"  y="3"  width="5" height="5" rx="1" fill="#4fc3f7" opacity="0.2"/>
        <rect x="10" y="3"  width="5" height="5" rx="1" fill="#4fc3f7"/>
        <rect x="17" y="3"  width="5" height="5" rx="1" fill="#4fc3f7"/>
        <rect x="24" y="3"  width="5" height="5" rx="1" fill="#4fc3f7" opacity="0.2"/>
        <rect x="3"  y="10" width="5" height="5" rx="1" fill="#4fc3f7"/>
        <rect x="10" y="10" width="5" height="5" rx="1" fill="#4fc3f7" opacity="0.2"/>
        <rect x="17" y="10" width="5" height="5" rx="1" fill="#4fc3f7"/>
        <rect x="24" y="10" width="5" height="5" rx="1" fill="#4fc3f7" opacity="0.2"/>
        <rect x="3"  y="17" width="5" height="5" rx="1" fill="#4fc3f7" opacity="0.2"/>
        <rect x="10" y="17" width="5" height="5" rx="1" fill="#4fc3f7" opacity="0.2"/>
        <rect x="17" y="17" width="5" height="5" rx="1" fill="#4fc3f7"/>
        <rect x="24" y="17" width="5" height="5" rx="1" fill="#4fc3f7" opacity="0.2"/>
        <rect x="3"  y="24" width="5" height="5" rx="1" fill="#4fc3f7"/>
        <rect x="10" y="24" width="5" height="5" rx="1" fill="#4fc3f7" opacity="0.2"/>
        <rect x="17" y="24" width="5" height="5" rx="1" fill="#4fc3f7" opacity="0.2"/>
        <rect x="24" y="24" width="5" height="5" rx="1" fill="#4fc3f7" opacity="0.2"/>
      </svg>
      <span class="site-title">素数计算器</span>
    </div>
  </header>
  <div class="container">
    <h1>素数计算器</h1>
    <p class="subtitle">输入任意整数，找出比它更大的第一个素数</p>

    <div class="card">
      <div class="input-group">
        <input
          type="number"
          id="numberInput"
          placeholder="输入一个整数..."
          min="0"
        />
        <button id="calcBtn">计算</button>
      </div>
      <div id="result" class="result hidden"></div>
    </div>
  </div>
`

const input = document.querySelector('#numberInput')
const btn = document.querySelector('#calcBtn')
const result = document.querySelector('#result')

function calculate() {
  const raw = input.value.trim()
  if (raw === '') {
    showError('请输入一个整数')
    return
  }

  const n = parseInt(raw, 10)
  if (isNaN(n)) {
    showError('请输入有效的整数')
    return
  }
  if (n < 0) {
    showError('请输入非负整数')
    return
  }
  if (n > Number.MAX_SAFE_INTEGER - 1000) {
    showError('数字过大，超出计算范围')
    return
  }

  const prime = nextPrime(n)
  showSuccess(n, prime)
}

function showSuccess(n, prime) {
  result.className = 'result success'
  result.innerHTML = `
    <div class="result-label">比 <span class="num">${n.toLocaleString()}</span> 大的第一个素数是</div>
    <div class="result-value">${prime.toLocaleString()}</div>
  `
}

function showError(msg) {
  result.className = 'result error'
  result.textContent = msg
}

btn.addEventListener('click', calculate)
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') calculate()
})
