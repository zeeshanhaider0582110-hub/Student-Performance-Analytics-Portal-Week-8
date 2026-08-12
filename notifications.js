'use strict';

/** Notification data store */
var notifData = [
  { id:1, icon:'📝', iconColor:'blue',  text:'Ayesha Malik submitted <strong>Math Assignment #7</strong>', time:'2 minutes ago', unread:true  },
  { id:2, icon:'⚠️', iconColor:'red',   text:'Bilal Ahmed GPA dropped below 2.0 — flagged as at-risk',   time:'1 hour ago',   unread:true  },
  { id:3, icon:'✅', iconColor:'green', text:'Physics Mid-Term grades published — Class avg: 74%',        time:'3 hours ago',  unread:true  },
  { id:4, icon:'📅', iconColor:'amber', text:'Final Exams begin tomorrow — All departments',              time:'5 hours ago',  unread:false },
  { id:5, icon:'👤', iconColor:'blue',  text:'Hassan Raza enrolled in Computer Science',                  time:'Yesterday',    unread:false },
  { id:6, icon:'📊', iconColor:'green', text:'Semester report generated for Year 2 cohort',               time:'2 days ago',   unread:false },
];

/**
 * renderNotifications — builds notification list HTML and updates unread badge
 */
function renderNotifications() {
  var list    = document.getElementById('notifList');
  var countEl = document.getElementById('notifCount');
  if (!list) return;

  // Count unread
  var unreadCount = notifData.filter(function(n) { return n.unread; }).length;
  if (countEl) {
    countEl.textContent = unreadCount;
    countEl.style.display = unreadCount > 0 ? 'block' : 'none';
  }

  // Build HTML
  list.innerHTML = notifData.map(function(n) {
    return '<div class="notif-item ' + (n.unread ? 'unread' : '') + '" data-id="' + n.id + '">' +
      '<div class="notif-icon ' + n.iconColor + '">' + n.icon + '</div>' +
      '<div>' +
        '<div class="notif-text">' + n.text + '</div>' +
        '<div class="notif-time">' + n.time + '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  // Click to mark individual as read
  list.querySelectorAll('.notif-item').forEach(function(item) {
    item.addEventListener('click', function() {
      var id    = parseInt(this.dataset.id);
      var notif = notifData.find(function(n) { return n.id === id; });
      if (notif) { notif.unread = false; renderNotifications(); }
    });
  });
}

/** toggleNotifPanel — opens or closes the notification panel */
function toggleNotifPanel() {
  var panel = document.getElementById('notifPanel');
  if (panel) panel.classList.toggle('open');
}

/** markAllRead — marks all notifications as read */
function markAllRead() {
  notifData.forEach(function(n) { n.unread = false; });
  renderNotifications();
  if (window.showToast) showToast('All notifications marked as read.', 'success');
}

/**
 * initNotifications — binds all event listeners
 * Called after DOM is ready
 */
function initNotifications() {
  renderNotifications();

  // Bell button — clone to remove any existing listeners
  var notifBtn = document.getElementById('notifBtn');
  if (notifBtn) {
    var newBtn = notifBtn.cloneNode(true);
    notifBtn.parentNode.replaceChild(newBtn, notifBtn);
    newBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleNotifPanel();
    });
  }

  // Mark all read button
  var markBtn = document.getElementById('markAllRead');
  if (markBtn) {
    markBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      markAllRead();
    });
  }

  // Close button inside panel
  var closeBtn = document.getElementById('closeNotif');
  if (closeBtn) {
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      var panel = document.getElementById('notifPanel');
      if (panel) panel.classList.remove('open');
    });
  }

  // Close when clicking outside the panel
  document.addEventListener('click', function(e) {
    var panel   = document.getElementById('notifPanel');
    var bellBtn = document.getElementById('notifBtn');
    if (!panel || !bellBtn) return;
    if (!panel.contains(e.target) && !bellBtn.contains(e.target)) {
      panel.classList.remove('open');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      var panel = document.getElementById('notifPanel');
      if (panel) panel.classList.remove('open');
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNotifications);
} else {
  initNotifications();
}

// Expose globally
window.toggleNotifPanel = toggleNotifPanel;
window.markAllRead      = markAllRead;