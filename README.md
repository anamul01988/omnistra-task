# Omnistra Dashboard - Integration Task

A high-fidelity implementation of the Omnistra Integrations section and dynamic navigation system, built using **React 19**, **Vite**, and **Framer Motion**.

## 🚀 Live Demo & Repository

- **GitHub Repository:** [https://github.com/anamul01988/omnistra-task](https://github.com/anamul01988/omnistra-task)

---

## 🛠️ Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion (Figma-accurate scroll transforms)
- **Icons:** SVG-based for maximum sharpness and performance

---

## ⚙️ Setup & Run Instructions

### 1. Local Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/anamul01988/omnistra-task.git
cd omnistra-task
npm install
```

### 2. Development Command

Start the local development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### 3. Build Command

Generate a production-ready bundle:

```bash
npm run build
```

The output will be in the `dist/` folder.

---

## ✨ Key Features & Implementation Details

### 1. Pixel-Accurate Animations

- **Logo Convergence:** 10 floating integration icons converge into a single centered button as the user scrolls.
- **Dynamic Background:** The section background shrinks and transforms into a rounded button-like container with a premium glow effect.
- **Scroll Synchronization:** Used `useScroll` and `useTransform` with a `useSpring` filter to ensure silky-smooth movement that feels physical and responsive.

### 2. Smart Navigation System

- **Context-Aware Theming:** The Navbar automatically detects when it is over a light-colored section (like the Integrations area) and switches its theme (colors, logo, and dropdowns) from dark to light for perfect visibility.
- **Micro-interactions:** Smooth hover transitions on the navigation "pill", laser-border effects on buttons, and animated dropdown shells.

### 3. Component Architecture

- **Reusability:** Extracted core UI patterns into standalone components like `LogoCard`, `BrandIcon`, `DropdownShell`, and `NavButton`.
- **Clean Code:** Followed modern React patterns, removed unnecessary comments, and centralized animation constants for maintainability.

---

## 📝 Assumptions & Decisions

- **Scroll Range:** The animation sequence is mapped to approximately 30%–60% of the section's scroll progress to ensure it completes while the section is fully visible in the viewport.
- **Responsive Offsets:** Logo starting positions (x/y) are calculated relative to the center. While fixed on desktop for pixel accuracy, they use `max-width` constraints to remain centered and safe on mobile viewports.
- **Font Families:** Integrated `Montserrat` for headings and `Inter` for body text to match the premium design aesthetic.
- **Header Height:** Assumed a 4.5rem (72px) header height for scroll-offset calculations.

---

## 📸 Screenshots

_(Include screenshots in your final submission repo to highlight responsive states)_

---

### Submitted by: Anamul Haque
