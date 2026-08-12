'use strict';

// ── Cached DOM references (queried once for performance) ──
var _sidebar   = null;
var _overlay   = null;
var _hamburger = null;

function getSidebar()  { return _sidebar   || (_sidebar   = document.getElementById('sidebar')); }
function getOverlay()  { return _overlay   || (_overlay   = document.getElementById('sidebarOverlay')); }

// ── Sidebar functions ──
function openSidebar() {
  var s = getSidebar(), o = getOverlay();
  if (!s) return;
  s.classList.add('open');
  if (o) o.classList.add('active');
  document.body.style.overflow = 'hidden';
  s.setAttribute('aria-hidden', 'false');
}

function closeSidebar() {
  var s = getSidebar(), o = getOverlay();
  if (!s) return;
  s.classList.remove('open');
  if (o) o.classList.remove('active');
  document.body.style.overflow = '';
  s.setAttribute('aria-hidden', 'true');
}

function toggleSidebar() {
  var s = getSidebar();
  s && s.classList.contains('open') ? closeSidebar() : openSidebar();
}

// ── Bind hamburger button ──
var hb = document.getElementById('hamburger');
if (hb) hb.addEventListener('click', toggleSidebar);

// ── Close sidebar on overlay click ──
var ov = document.getElementById('sidebarOverlay');
if (ov) ov.addEventListener('click', closeSidebar);

// ── Close sidebar on nav link click (mobile only) ──
document.querySelectorAll('.nav-link').forEach(function(link) {
  link.addEventListener('click', function() {
    if (window.innerWidth < 769) closeSidebar();
  });
});

// ── Debounced resize — close sidebar on desktop ──
var resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    if (window.innerWidth >= 769) closeSidebar();
  }, 150);
});

// ── Keyboard accessibility ──
document.addEventListener('keydown', function(e) {
  // Escape closes sidebar and notification panel
  if (e.key === 'Escape') {
    closeSidebar();
    var np = document.getElementById('notifPanel');
    if (np) np.classList.remove('open');
  }

  // Tab trap — keep focus inside open mobile sidebar
  if (e.key === 'Tab' && window.innerWidth < 769) {
    var s = getSidebar();
    if (s && s.classList.contains('open')) {
      var focusable = s.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      var first = focusable[0];
      var last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  }
});

// ── Toast notification system ──
var _toastWrap = null;
function getToastWrap() {
  return _toastWrap || (_toastWrap = document.getElementById('toast-wrap'));
}

/**
 * showToast — displays a temporary notification message
 * @param {string} msg   - Message to display
 * @param {string} type  - 'success' | 'error' | 'info'
 */
function showToast(msg, type) {
  type = type || 'info';
  var icons = { success: '✓', error: '✕', info: 'i' };
  var wrap  = getToastWrap();
  if (!wrap) return;

  var t = document.createElement('div');
  t.className = 'toast ' + type;
  t.setAttribute('role', 'alert');
  t.setAttribute('aria-live', 'polite');
  t.innerHTML = '<strong>' + (icons[type] || 'i') + '</strong> ' + msg;
  wrap.appendChild(t);

  // Animate out after 3 seconds
  setTimeout(function() {
    t.style.transition = 'opacity .3s, transform .3s';
    t.style.opacity    = '0';
    t.style.transform  = 'translateX(110%)';
    setTimeout(function() { if (t.parentNode) t.remove(); }, 320);
  }, 3000);
}

// ── Modal helpers ──
function openModal(id) {
  var m = document.getElementById(id);
  if (m) { m.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
}

function closeModal(id) {
  var m = document.getElementById(id);
  if (m) { m.style.display = 'none'; document.body.style.overflow = ''; }
}

// Close modal when clicking the backdrop
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.style.display = 'none';
    document.body.style.overflow = '';
  }
});

// ── Expose functions globally ──
window.showToast  = showToast;
window.openModal  = openModal;
window.closeModal = closeModal;