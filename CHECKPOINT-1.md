# Checkpoint 1 - Profit Calculator with Expanding Toast
**Date:** December 9, 2025

## Summary
Interactive profit calculator with Apple-style expanding toast animation, built from Figma designs.

## Project Structure
```
Profit Calculator/
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── Dashboard.png (3x background)
│   └── Joy_Bakeshop_seller_image.png
├── fonts/
│   ├── SquareSansText-VF.woff2
│   ├── SquareSansDisplay-VF.woff2
│   └── SquareSansMono-VF.woff2
└── CHECKPOINT-1.md
```

## Features Implemented

### Collapsed Toast
- Floating toast positioned 40px from bottom, centered
- Seller logo (Joy Bakeshop) in blue container
- Headline: "You could keep $3,796/mo"
- Subtext: "Based on your sales and typical fees."
- "Show me" button + close button

### Expanded Calculator View
- Apple-style spring animation (cubic-bezier 0.32, 0.72, 0, 1)
- Background dims concurrently with expansion
- Content fades in with gentle stagger
- Scrollable content area
- Sticky footer with "Email me this breakdown" and "Get started" buttons

### Calculator Sections
1. **Hero** - Savings amount ($3,796/month)
2. **Savings Breakdown** - Fee savings, Rewards growth, Other savings, Total, Annual
3. **Your Numbers** - Total monthly sales, Number of locations
4. **Sales Breakdown** - In-store/Online/Third-party with color bar
5. **Move Orders to In-app** - Channel shift options (5%, 10%, 15%, 20%)
6. **Fees** - Third-party fee, App fees, Loyalty vendor cost
7. **What Drives Savings** - Explanatory text

## Typography
- Square Sans Display (headings, large numbers)
- Square Sans Text (body, labels)
- Variable fonts for flexibility

## Animations
- **Spring easing**: `cubic-bezier(0.32, 0.72, 0, 1)` (Apple-style)
- **Duration**: 0.5s for main transitions
- **Content stagger**: 0.1s, 0.15s, 0.2s delays

## Local Development
```bash
cd "/Users/mpringle/MP projects/Profit Calculator"
python3 -m http.server 8081
```
Open: http://localhost:8081

## Next Steps
- Wire up interactive calculator logic
- Connect steppers and inputs to update savings values
- Add form validation
- Email breakdown functionality
- "Get started" flow


