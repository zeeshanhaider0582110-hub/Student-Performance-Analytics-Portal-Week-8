'use strict';

var THEME_KEY = 'edutrack_theme';

/**
 * applyTheme — sets data-theme attribute and updates toggle button icon
 * @param {string} theme - 'dark' | 'light'
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  var btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/**
 * toggleTheme — switches between dark and light mode
 */
function toggleTheme() {
  var current = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// Apply saved theme immediately — before page renders to avoid flash
(function() {
  var saved = localStorage.getItem(THEME_KEY) || 'light';
  document.documentElement.setAttribute('data-theme', saved);
})();

// Bind toggle button after DOM is ready
function bindThemeBtn() {
  var btn = document.getElementById('themeToggle');
  if (btn) {
    var current = localStorage.getItem(THEME_KEY) || 'light';
    btn.textContent = current === 'dark' ? '☀️' : '🌙';
    btn.replaceWith(btn.cloneNode(true)); // Remove old listeners
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bindThemeBtn);
} else {
  bindThemeBtn();
}

// Expose globally for inline onclick usage
window.toggleTheme = toggleTheme;