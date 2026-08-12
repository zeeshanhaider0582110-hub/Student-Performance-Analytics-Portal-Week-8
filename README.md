# Student-Performance-Analytics-Portal-Week-8

# EduTrack — Student Performance Analytics Portal

> A complete multi-role front-end web application built using HTML5, CSS3, and JavaScript over 8 weeks as part of a Web Development Internship.

---

## 📌 Project Overview

EduTrack is a web-based Student Performance Analytics Portal that helps educators, teachers, and students monitor academic performance, manage student records, generate reports, and visualize data through interactive charts.

The portal supports three user roles — Administrator, Teacher, and Student — each with its own color-themed dashboard, navigation menu, and relevant features. All data is simulated on the front end using hardcoded values and localStorage.

---

## ✨ Features

### Authentication
- Login form with email and password validation
- Role selector — Administrator, Teacher, Student
- Each role redirects to its own color-themed dashboard
- Session authentication using sessionStorage
- Auth guard on every page — blocks direct URL access without login
- Register new account with password strength meter — Weak, Medium, Strong
- Forgot password and reset password flow
- Sign Out button in sidebar on every page

### Role-Based Dashboards
- **Administrator** — Red sidebar, 6 stat cards, department overview, teacher table, system activity feed
- **Teacher** — Amber sidebar, course management, pending reviews, student performance table
- **Student** — Blue sidebar, personal GPA, today's schedule, assignment tracking table

### Analytics and Charts — analytics.html
- 5 interactive Chart.js charts
- GPA trend line chart across 6 semesters
- Grade distribution doughnut chart — A B C D F breakdown
- Department enrollment bar chart
- Monthly attendance multi-line chart for all 4 years
- Subject performance bar chart with year filter dropdown
- All charts rebuild automatically when dark mode is toggled
- Charts show interactive tooltips on hover

### Student Records — students.html
- Table with 10 students and 11 data columns
- Live search bar with row highlighting
- Status filter chip buttons — All, Active, New, Warning, At-Risk
- Advanced filter panel — department, year, GPA range, attendance minimum
- Active filter tags that can be removed one by one
- Sortable columns — click any header to sort ascending or descending
- Pagination with page number buttons and record count
- Export to CSV — downloads a real file using the Blob API
- Export to PDF — opens browser print dialog
- Student registration form with live ✅ ❌ validation icons

### Form Validation — All 6 Forms
- Live ✅ ❌ icons appear on each field as you type
- Validation runs on blur and clears automatically when fixed
- Student ID validated against format STU-YYYY-XXXX
- Password strength meter — Weak, Medium, Strong
- Specific error messages explaining exactly what is wrong
- All errors clear automatically when field is corrected

### Dark Mode
- Toggle button in topbar on every page
- Theme applied before page renders — no flash of wrong colors
- Saved to localStorage and persists after browser close
- All elements styled for dark — cards, tables, forms, charts, sidebar


### Profile Management — profile-manage.html
- 4 tabs — Personal Info, Security, Preferences, Notifications
- Edit name, email, phone, role, department, bio
- Change password with strength meter and confirmation
- Dark mode toggle in Preferences tab
- Notification alert settings with toggle switches
- Active login sessions with revoke button
- All changes saved to localStorage

### Performance and Accessibility
- requestAnimationFrame for smooth 60fps counter animations
- IntersectionObserver — counters only animate when visible on screen
- Page loading spinner with 1.5 second fallback on all pages
- Breadcrumb navigation on all content pages
- Skip to main content link on every page
- ARIA labels on all buttons and navigation elements
- Tab focus trap inside mobile sidebar
- Escape key closes sidebar and notification panel
- focus-visible outlines on all interactive elements
- Cross-browser compatible — Chrome, Edge, Firefox

### Responsive Design
- Desktop 1440px — full sidebar, 4-column stat grid
- Laptop 1024px — sidebar narrows, grid adjusts to fit
- Tablet 768px — sidebar collapses, 2-column grid
- Mobile 480px — hidden sidebar, hamburger button, bottom navigation bar
- Small mobile 380px — single column layout
- Tables scroll horizontally on small screens
- Print styles — clean output without navigation or sidebar

---

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| HTML5 | — | Page structure, semantic markup, accessibility |
| CSS3 | — | Flexbox, Grid, CSS variables, animations, responsive |
| JavaScript | ES6 | DOM manipulation, validation, auth, sorting, filtering |
| Chart.js | 4.4.0 | Interactive data visualization charts |
| Google Fonts | — | Inter typeface for all typography |
| localStorage | Browser API | Theme, role, registered users, student data |
| sessionStorage | Browser API | Login session authentication |
| IntersectionObserver | Browser API | Animate counters only when visible |
| Blob API | Browser API | Real CSV file download |
| requestAnimationFrame | Browser API | Smooth 60fps animations |

---

## 🚀 Installation Steps

No build tools, frameworks, or installations required. Pure HTML, CSS, and JavaScript.

**Step 1 — Download or clone the project**
```
git clone https://github.com/YOURNAME/edutrack-portal.git
```

**Step 2 — Open in VS Code**
```
File → Open Folder → select edutrack-portal
```

**Step 3 — Install Live Server extension**
```
Extensions panel → search Live Server → Install
```

**Step 4 — Launch the project**
```
Right click login.html → Open with Live Server
```

**Step 5 — Login with demo credentials**
```
Email:    zeeshan@edutrack.edu.pk
Password: edutrack2026
```

**Step 6 — Select a role**
```
Administrator → Red dashboard
Teacher       → Amber dashboard
Student       → Blue dashboard
```

---

## 📁 Folder Structure

```
edutrack-portal/
│
├── 📄 login.html                  Login — role selector, session auth
├── 📄 register.html               Register — password strength, localStorage
├── 📄 forgot-password.html        Forgot password — email validation
├── 📄 reset-password.html         Reset password — strength meter
│
├── 📄 index.html                  Home — animated stats, activity feed
├── 📄 dashboard.html              Dashboard — charts, progress bars
├── 📄 admin-dashboard.html        Admin — red theme, full overview
├── 📄 teacher-dashboard.html      Teacher — amber theme, classes
├── 📄 student-dashboard.html      Student — blue theme, personal stats
│
├── 📄 analytics.html              Analytics — 5 Chart.js charts
├── 📄 report.html                 Report — grade distribution, history
├── 📄 students.html               Students — search, filter, pagination
├── 📄 profile.html                Student profile — dynamic from URL
├── 📄 profile-manage.html         Profile management — 4 tabs
│
├── 📄 about.html                  About — mission, team, stats
├── 📄 contact.html                Contact — validated form
├── 📄 demo.html                   Final demo — all modules overview
│
├── 📁 css/
│   └── 📄 style.css               All styles — 1900+ lines
│
├── 📁 js/
│   ├── 📄 nav.js                  Sidebar, toast, modal, keyboard nav
│   ├── 📄 dashboard.js            Animated counters, progress bars
│   ├── 📄 students.js             Student form, search, filter, sort
│   ├── 📄 contact.js              Contact form validation
│   ├── 📄 theme.js                Dark and light mode toggle
│   ├── 📄 notifications.js        Notification panel and data
│   └── 📄 role.js                 Role-based sidebar and navigation
│
├── 📁 screenshots/                All documentation screenshots
│
├── 📄 README.md                   Project documentation
├── 📄 BUG-FIX-REPORT.md          14 bugs with root cause and fix
└── 📄 BROWSER-TESTING-REPORT.md  Testing across Chrome, Edge, Firefox
```

---

## 🔐 User Flows

### Flow 1 — Authentication
```
demo.html
    ↓
login.html → select role → enter credentials → validate
    ↓
Administrator → admin-dashboard.html  (red sidebar)
Teacher       → teacher-dashboard.html (amber sidebar)
Student       → student-dashboard.html (blue sidebar)
    ↓
Sign Out → login.html
```

### Flow 2 — Student Management
```
students.html
    ├── Type in search box → rows filter live
    ├── Click status chip  → filter by status
    ├── Advanced filters   → department, year, GPA, attendance
    ├── Click column header → sort ascending or descending
    ├── Click View button  → profile.html?id=STU-XXXX
    └── Click CSV button   → file downloads to computer
```

### Flow 3 — Analytics
```
analytics.html
    ├── GPA line chart     → 6 semester trend
    ├── Grade doughnut     → A B C D F breakdown
    ├── Department bar     → enrollment per dept
    ├── Attendance lines   → monthly by year group
    ├── Subject bar        → change year → chart updates
    └── Export buttons     → CSV download or PDF print
```

### Flow 4 — Profile
```
profile-manage.html
    ├── Personal Info tab  → edit name, email, role
    ├── Security tab       → change password
    ├── Preferences tab    → dark mode, language
    └── Notifications tab  → toggle alert settings
```

---

## 📊 All Pages

| # | Page | Description |
|---|------|-------------|
| 1 | login.html | Role selector, session auth, form validation |
| 2 | register.html | Password strength meter, localStorage |
| 3 | forgot-password.html | Email validation, reset simulation |
| 4 | reset-password.html | Password match, strength meter |
| 5 | index.html | Animated counters, activity feed, quick links |
| 6 | dashboard.html | Charts, progress bars, top students |
| 7 | admin-dashboard.html | Red theme, 6 cards, teacher table |
| 8 | teacher-dashboard.html | Amber theme, courses, pending reviews |
| 9 | student-dashboard.html | Blue theme, GPA, schedule, assignments |
| 10 | analytics.html | 5 interactive Chart.js charts |
| 11 | report.html | Grade history, term comparison |
| 12 | students.html | Search, filter, sort, paginate, export |
| 13 | profile.html | Dynamic profile loaded from URL |
| 14 | profile-manage.html | 4-tab settings page |
| 15 | about.html | Mission, team, platform stats |
| 16 | contact.html | Validated contact form |
| 17 | demo.html | Final project demonstration page |

---

## 📝 What I Learned — Week by Week

| Week | Topics Learned |
|------|---------------|
| 1 | HTML5 structure, CSS Flexbox and Grid, multi-page layout, responsive design, CSS variables |
| 2 | JavaScript DOM manipulation, form validation, sessionStorage auth, animated counters, mobile nav |
| 3 | localStorage persistence, URL parameters, table sorting, password strength, advanced search |
| 4 | Role-based navigation, CSS theming for dark mode, notification panel, profile tabs, accessibility |
| 5 | Chart.js visualizations, CSV export with Blob API, multi-condition filtering, pagination logic |
| 6 | Bug fixing, cross-browser compatibility, performance with requestAnimationFrame, testing reports |
| 7 | Project integration, loading states, breadcrumbs, user flows, demo page preparation |
| 8 | Code commenting, final review, consistent UI polish, complete documentation, project organization |

---

## 🏆 Project Statistics

| Metric | Count |
|--------|-------|
| HTML Pages | 17 |
| JavaScript Files | 7 |
| CSS Lines | 1900+ |
| Interactive Charts | 5 |
| Role Dashboards | 3 |
| Forms Validated | 6 |
| Bugs Fixed | 14 |
| Features Tested | 65 |
| Browsers Tested | 3 |
| Weeks Built | 8 |

---

## 📋 Project Documents

| File | Description |
|------|-------------|
| README.md | Full project documentation — all 8 weeks |
| BUG-FIX-REPORT.md | 14 bugs with problem, root cause, and fix |
| BROWSER-TESTING-REPORT.md | All 17 pages tested across Chrome, Edge, Firefox |

---

## 👤 Author

| Field | Details |
|-------|---------|
| **Name** | *Zeeshan Haider* |
| **Institution** | *Abasyn University Islamabad Campus* |
| **Internship** | Web Development Internship — Weeek 8 @Codiora House (Private) Limited |
| **Project** | EduTrack Student Performance Analytics Portal |
| **Year** | 2026 |

---

