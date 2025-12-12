/**
 * Dashboard with Profit Calculator Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  // ================================
  // DOM Elements
  // ================================
  
  const overlay = document.getElementById('overlay');
  const modal = document.getElementById('profit-calc-modal');
  const btnOpenCalc = document.getElementById('btn-open-calc');
  const modalClose = document.getElementById('modal-close');
  const btnRemind = document.getElementById('btn-remind');
  
  // Calculator inputs
  const salesInput = document.getElementById('sales-input');
  const locationsInput = document.getElementById('locations-input');
  const thirdpartyFeeEl = document.getElementById('thirdparty-fee');
  
  const inputInstore = document.getElementById('input-instore');
  const inputOnline = document.getElementById('input-online');
  const inputThirdparty = document.getElementById('input-thirdparty');
  
  const barInstore = document.getElementById('bar-instore');
  const barOnline = document.getElementById('bar-online');
  const barThirdparty = document.getElementById('bar-thirdparty');
  const breakdownError = document.getElementById('breakdown-error');
  
  const heroAmount = document.getElementById('hero-amount');
  const feeSavingsEl = document.querySelector('[data-calc="fee-savings"]');
  const rewardsGrowthEl = document.querySelector('[data-calc="rewards-growth"]');
  const otherSavingsEl = document.querySelector('[data-calc="other-savings"]');
  const totalSavingsEl = document.querySelector('[data-calc="total"]');
  const annualSavingsEl = document.querySelector('[data-calc="annual"]');
  
  const directOrderOptions = document.querySelectorAll('#direct-order-options .channel-option');
  const rewardsOptions = document.querySelectorAll('#rewards-options .channel-option');
  
  const animationState = new Map();

  // ================================
  // Modal Open/Close
  // ================================
  
  function openModal() {
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  btnOpenCalc.addEventListener('click', openModal);
  modalClose.addEventListener('click', closeModal);
  btnRemind.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  // ================================
  // Utility Functions
  // ================================
  
  function formatNumber(num) {
    return num.toLocaleString('en-US');
  }
  
  function parseFormattedNumber(str) {
    return parseInt(str.replace(/,/g, ''), 10) || 0;
  }

  // ================================
  // Getter Functions
  // ================================
  
  function getDirectOrderPercent() {
    const selected = document.querySelector('#direct-order-options .channel-option.selected');
    if (!selected) return 0.07;
    const value = parseInt(selected.dataset.value, 10);
    return value / 100;
  }
  
  function getRewardsMultiplier() {
    const selected = document.querySelector('#rewards-options .channel-option.selected');
    if (!selected) return 1.0;
    const value = selected.dataset.value;
    switch (value) {
      case 'steady': return 0.67;
      case 'typical': return 1.0;
      case 'high': return 1.31;
      default: return 1.0;
    }
  }

  // ================================
  // Main Calculation
  // ================================
  
  function updateSavingsCalculation() {
    const monthlySales = parseFormattedNumber(salesInput?.value || '170000');
    const locations = parseInt(locationsInput?.textContent, 10) || 1;
    const directOrderPercent = getDirectOrderPercent();
    const rewardsMultiplier = getRewardsMultiplier();
    
    const thirdPartyPercent = (parseFloat(inputThirdparty?.value) || 10) / 100;
    const thirdPartyFee = (parseInt(thirdpartyFeeEl?.dataset.value, 10) || 20) / 100;
    const squareFee = 0.01;
    
    const otherSavingsPerLocation = 80;
    
    const directOrderSales = monthlySales * directOrderPercent;
    const feeSavings = directOrderSales * (thirdPartyFee - squareFee) * locations * 0.95;
    
    const rewardsBase = 668.50;
    const rewardsGrowth = rewardsBase * rewardsMultiplier * locations;
    
    const otherSavings = otherSavingsPerLocation * locations;
    
    const totalMonthly = feeSavings + rewardsGrowth + otherSavings;
    const totalAnnual = totalMonthly * 12;
    
    updateDirectOrderSavings(monthlySales, thirdPartyFee, squareFee, locations);
    updateRewardsSavings(rewardsBase, locations);
    
    animateHeroValue(heroAmount, Math.round(totalMonthly), '/month');
    
    fadeValue(feeSavingsEl, Math.round(feeSavings), '/month');
    fadeValue(rewardsGrowthEl, Math.round(rewardsGrowth), '/month');
    fadeValue(otherSavingsEl, Math.round(otherSavings), '/month');
    fadeValue(totalSavingsEl, Math.round(totalMonthly), '/month');
    fadeValue(annualSavingsEl, Math.round(totalAnnual), '/year');
  }
  
  function updateDirectOrderSavings(monthlySales, thirdPartyFee, squareFee, locations) {
    const options = document.querySelectorAll('#direct-order-options .channel-option');
    options.forEach(option => {
      const percent = parseInt(option.dataset.value, 10) / 100;
      const directSales = monthlySales * percent;
      const savings = directSales * (thirdPartyFee - squareFee) * locations * 0.95;
      const savingsEl = option.querySelector('.channel-savings');
      if (savingsEl) {
        savingsEl.textContent = '+$' + formatNumber(Math.round(savings)) + '/mo';
      }
    });
  }
  
  function updateRewardsSavings(rewardsBase, locations) {
    const multipliers = { 'steady': 0.67, 'typical': 1.0, 'high': 1.31 };
    const options = document.querySelectorAll('#rewards-options .channel-option');
    options.forEach(option => {
      const multiplier = multipliers[option.dataset.value] || 1.0;
      const savings = rewardsBase * multiplier * locations;
      const savingsEl = option.querySelector('.channel-savings');
      if (savingsEl) {
        savingsEl.textContent = '+$' + formatNumber(Math.round(savings)) + '/mo';
      }
    });
  }

  // ================================
  // Breakdown Bar
  // ================================
  
  function updateBreakdownBar() {
    const instore = parseFloat(inputInstore?.value) || 0;
    const online = parseFloat(inputOnline?.value) || 0;
    const thirdparty = parseFloat(inputThirdparty?.value) || 0;
    const total = instore + online + thirdparty;

    if (breakdownError) {
      breakdownError.textContent = total > 100 
        ? 'Total exceeds 100%. Please adjust your values.' 
        : '';
    }

    if (barInstore) {
      barInstore.style.width = instore > 0 ? `${instore}%` : '0';
      barInstore.style.display = instore > 0 ? 'block' : 'none';
    }
    if (barOnline) {
      barOnline.style.width = online > 0 ? `${online}%` : '0';
      barOnline.style.display = online > 0 ? 'block' : 'none';
    }
    if (barThirdparty) {
      barThirdparty.style.width = thirdparty > 0 ? `${thirdparty}%` : '0';
      barThirdparty.style.display = thirdparty > 0 ? 'block' : 'none';
    }
    
    updateSavingsCalculation();
  }

  // ================================
  // Odometer Animation
  // ================================
  
  function animateHeroValue(element, targetValue, suffix = '') {
    if (!element) return;
    
    const prevValue = animationState.get(element);
    const isFirstRender = prevValue === undefined;
    
    if (prevValue === targetValue) return;
    
    animationState.set(element, targetValue);
    
    const targetStr = formatNumber(targetValue);
    const prevStr = !isFirstRender ? formatNumber(prevValue) : targetStr;
    
    element.innerHTML = '';
    
    const dollarSpan = document.createElement('span');
    dollarSpan.textContent = '$';
    element.appendChild(dollarSpan);
    
    let digitIndex = 0;
    for (let i = 0; i < targetStr.length; i++) {
      const targetChar = targetStr[i];
      
      if (targetChar === ',') {
        const commaSpan = document.createElement('span');
        commaSpan.textContent = ',';
        element.appendChild(commaSpan);
      } else {
        const prevDigit = getDigitAt(prevStr, i, targetChar);
        const shouldAnimate = !isFirstRender && prevDigit !== targetChar;
        
        const wrapper = document.createElement('span');
        wrapper.className = 'odometer-digit';
        
        const column = document.createElement('span');
        column.className = 'odometer-column';
        
        for (let d = 0; d <= 9; d++) {
          const digitSpan = document.createElement('span');
          digitSpan.className = 'odometer-value';
          digitSpan.textContent = d;
          column.appendChild(digitSpan);
        }
        
        wrapper.appendChild(column);
        
        const toPos = parseInt(targetChar) || 0;
        const fromPos = parseInt(prevDigit) || 0;
        
        if (shouldAnimate) {
          column.style.transform = `translateY(${-fromPos * 56}px)`;
          const delay = digitIndex * 40;
          setTimeout(() => {
            column.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
            column.style.transform = `translateY(${-toPos * 56}px)`;
          }, delay);
        } else {
          column.style.transform = `translateY(${-toPos * 56}px)`;
        }
        
        element.appendChild(wrapper);
        digitIndex++;
      }
    }
    
    const suffixSpan = document.createElement('span');
    suffixSpan.textContent = suffix;
    element.appendChild(suffixSpan);
  }
  
  function getDigitAt(str, index, fallback) {
    const char = str[index];
    if (char && char !== ',') return char;
    return fallback;
  }
  
  function fadeValue(element, targetValue, suffix = '') {
    if (!element) return;
    
    const newText = '$' + formatNumber(targetValue) + suffix;
    if (element.textContent === newText) return;
    
    if (element.dataset.initialized) {
      element.style.transition = 'opacity 0.15s ease';
      element.style.opacity = '0.3';
      
      setTimeout(() => {
        element.textContent = newText;
        element.style.opacity = '1';
      }, 100);
    } else {
      element.textContent = newText;
      element.dataset.initialized = 'true';
    }
  }

  // ================================
  // Event Listeners
  // ================================
  
  directOrderOptions.forEach(option => {
    option.addEventListener('click', () => {
      directOrderOptions.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      updateSavingsCalculation();
    });
  });

  rewardsOptions.forEach(option => {
    option.addEventListener('click', () => {
      rewardsOptions.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      updateSavingsCalculation();
    });
  });

  [inputInstore, inputOnline, inputThirdparty].forEach(input => {
    if (input) {
      input.addEventListener('input', updateBreakdownBar);
      input.addEventListener('change', updateBreakdownBar);
    }
  });

  if (salesInput) {
    salesInput.addEventListener('blur', () => {
      const value = parseFormattedNumber(salesInput.value);
      salesInput.value = formatNumber(value);
    });
    salesInput.addEventListener('input', updateSavingsCalculation);
    salesInput.addEventListener('change', updateSavingsCalculation);
  }

  document.querySelectorAll('.stepper-btn[data-target="locations-input"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const currentValue = parseInt(locationsInput.textContent, 10) || 1;
      const newValue = action === 'increase' 
        ? currentValue + 1 
        : Math.max(1, currentValue - 1);
      locationsInput.textContent = newValue;
      updateSavingsCalculation();
    });
  });

  document.querySelectorAll('.stepper-btn[data-target="thirdparty-fee"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      let currentValue = parseInt(thirdpartyFeeEl.dataset.value, 10) || 20;
      const newValue = action === 'increase' 
        ? Math.min(50, currentValue + 1) 
        : Math.max(1, currentValue - 1);
      thirdpartyFeeEl.dataset.value = newValue;
      thirdpartyFeeEl.textContent = `${newValue}%`;
      updateSavingsCalculation();
    });
  });

  // ================================
  // Initialize
  // ================================
  updateBreakdownBar();
  updateSavingsCalculation();

  console.log('Dashboard initialized');
});

