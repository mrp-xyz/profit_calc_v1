# Checkpoint 3 - Profit Calculator v1 (Final)

**Date:** December 11, 2025  
**Git:** https://github.com/mrp-xyz/profit_calc_v1

## Summary
Interactive profit calculator for Neighborhoods on Cash App - allows sellers to estimate savings based on their business metrics.

## Toast (Collapsed View)
- **Headline:** "Estimate your savings on $170K/mo"
- **Subhead:** "By joining Neighborhoods on Cash App"
- **Actions:** "Show me" button + close (X)

## Expanded View

### Hero Section
- Large savings amount with odometer animation (e.g., "$5,793/month")
- Subhead: "What you could keep when you join Neighborhoods on Cash App"

### Your Numbers
- **Average monthly sales:** Editable text input (default $170,000)
- **Number of locations:** Stepper +/- (default 2)

### Your Sales Breakdown
- Color-coded bar graph (teal/purple/orange)
- In-store: 70% (teal)
- Online: 20% (purple)  
- Third-party: 10% (orange)
- Editable percentage inputs

### Your Fees
- Third-party marketplace fee: 20% (stepper)

### With Neighborhoods on Cash App
- Large display heading
- Value prop description with "Learn more" link

### Keep More of Every Order
- Explains 1% vs marketplace fees
- **Potential share of sales from direct orders:** 3%, 7%, 10%, 15% options
- Shows calculated savings for each option

### Estimated Rewards Impact
- How rewards work (bullet list)
- **Potential rewards activity:** Steady, Typical, High options

### Other Savings
- Replace paid tools description

### Summary Ledger
- Fee savings
- Rewards growth
- Other savings
- Total (monthly)
- Annual savings

### Footer
- "Remind me later" (secondary)
- "Get started" (primary)

## Calculation Logic
```
Fee Savings = monthlySales × directOrderPercent × (thirdPartyFee - 0.01) × locations × 0.95

Rewards Growth = $668.50 base × activityMultiplier × locations
  - Steady: 0.67x
  - Typical: 1.0x
  - High: 1.31x

Other Savings = $80 × locations

Total = Fee Savings + Rewards Growth + Other Savings
Annual = Total × 12
```

## Tech Stack
- Vanilla HTML/CSS/JavaScript
- Square Sans font family (Display, Text, Mono)
- Odometer-style number animation
- No frameworks/dependencies

## Files
- `index.html` - Structure
- `styles.css` - Styling
- `script.js` - Interactivity & calculations
- `assets/` - Images
- `fonts/` - Square Sans fonts
