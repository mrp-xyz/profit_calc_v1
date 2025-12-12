# Checkpoint 2 - Profit Calculator Refinements
**Date:** December 9, 2025

## Summary
Refined animations, spacing, button styling, and layout based on Figma specs.

## Changes Since Checkpoint 1

### Animation Improvements
- Apple-style spring curve: `cubic-bezier(0.32, 0.72, 0, 1)`
- Smooth 0.5s transitions
- Content fades in with staggered timing (0.1s, 0.15s, 0.2s delays)
- Background dims concurrently with expansion

### Layout Updates
- Sticky header with logo + savings amount
- Header text: "Joy Bakeshop, you could keep"
- $3,796/month amount stays visible while scrolling
- Removed gray line above footer buttons
- "Estimates only" text moved to bottom of scroll, left-aligned

### Spacing Updates (from Figma)
- Sales breakdown: 32px gap between bar and items
- Stepper buttons: 12px margin, 4px padding
- Icon containers: 24px min size
- Border radius: 6px (fields), 4px (icon containers)

### Button Styling
- Secondary button: Gray background (#f0f0f0), no border, black text
- Primary button: Black background (#101010), white text
- Both: 48px min-height, 100px border-radius (pill shape)

## Project Structure
```
Profit Calculator/
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── Dashboard.png
│   └── Joy_Bakeshop_seller_image.png
├── fonts/
│   ├── SquareSansText-VF.woff2
│   ├── SquareSansDisplay-VF.woff2
│   └── SquareSansMono-VF.woff2
├── CHECKPOINT-1.md
└── CHECKPOINT-2.md
```

## Local Development
```bash
cd "/Users/mpringle/MP projects/Profit Calculator"
python3 -m http.server 8081
```
Open: http://localhost:8081

## Pending
- Interactive calculator logic
- Form validation
- Wire up steppers to update values
