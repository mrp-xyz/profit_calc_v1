# Checkpoint 3 - Profit Calculator

**Date:** December 9, 2025

## Summary
Interactive profit calculator with fully functional inputs, real-time calculations, delightful odometer animation, and design system aligned components.

## What's Working

### Core Features
- Collapsed toast with "Show me" expand interaction
- Expanded view with smooth grow animation and background dimming
- Sticky header with hero savings amount
- Scrollable content area (hidden scrollbar) with sticky footer buttons
- Fixed 720px width for both states (no jitter on value changes)

### Hero Animation (Odometer Style)
- Each digit is a scrolling column of 0-9
- Digits roll up/down to target value like a cash register
- Staggered animation timing per digit (40ms delay)
- Smooth cubic-bezier easing for mechanical feel
- Proper baseline alignment with flex-end

### Functional Inputs (All Connected to Calculation!)
- **Total monthly sales**: Editable text input → affects all savings
- **Number of locations**: +/- stepper → multiplies all savings
- **Sales breakdown**: 
  - In-store, Online, Third-party percentage inputs
  - Third-party % directly affects Fee Savings calculation
  - Dynamic bar graph with 4px gap between segments
  - Error state when total exceeds 100% (calculation still updates - better UX)
- **Channel shift** (5/10/15/20%): % of third-party sales moved to in-app
- **Fees section**:
  - Third-party marketplace fee: affects fee savings differential
  - App fees + loyalty cost: contribute to Other Savings

### Calculation Logic
```
Third-party Sales = Monthly Sales × Third-party %
Shifted Sales = Third-party Sales × Channel Shift %
Fee Savings = Shifted Sales × (3P Fee - 1%) × Locations

Rewards Growth = Monthly Sales × 5% lift × 25% margin × Locations
Other Savings = (App Fees + Loyalty Cost) × Locations

Total = Fee Savings + Rewards Growth + Other Savings
```

### Design System Alignment
- **Channel shift buttons**: Match Square design system
  - Height: 72px (min 64px)
  - Border: 1px #dadada → 2px #101010 on select
  - Border radius: 6px (--radius-100)
  - Padding: 16px horizontal
  - Gap: 12px
  - Typography: Display Bold 19px / Text Regular 16px #666

### UI/UX
- Square Sans font family (Display, Text, Mono)
- Tabular nums for consistent digit widths
- Smooth transitions and animations
- Clean expanded view without visible scrollbar
- Collapsed banner updates instantly (no animation)
- Ledger values fade for subtlety

## Files
- `index.html` - Main structure
- `styles.css` - All styling including odometer CSS
- `script.js` - Interactions, calculations, and odometer animation
- `assets/` - Dashboard background and seller logo
- `fonts/` - Square Sans font files

## Design Decisions
- No auto-rebalancing on sales breakdown (users input real business data)
- Error state for >100% shows but calculation still updates (non-punitive UX)
- Odometer animation only on hero expanded view
- Sales breakdown third-party % directly impacts fee savings
