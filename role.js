'use strict';

var ROLE_KEY = 'edutrack_role';
var USER_KEY = 'edutrack_user';

/**
 * roleConfig — defines navigation, colors, and labels for each role
 */
var roleConfig = {
  administrator: {
    label:       'Administrator',
    sidebarClass:'admin-theme',
    color:       '#DC2626',
    dashUrl:     'admin-dashboard.html',
    navItems: [
      { icon:'&#8962;', label:'Home',      url:'index.html'           },
      { icon:'&#9636;', label:'Dashboard', url:'admin-dashboard.html' },
      { icon:'&#9632;', label:'Analytics', url:'analytics.html'       },
      { icon:'&#9632;', label:'Students',  url:'students.html', badge:'10' },
      { icon:'&#9632;', label:'Reports',   url:'report.html'          },
    ]
  },
  teacher: {
    label:       'Teacher',
    sidebarClass:'teacher-theme',
    color:       '#D97706',
    dashUrl:     'teacher-dashboard.html',
    navItems: [
      { icon:'&#8962;', label:'Home',        url:'index.html'             },
      { icon:'&#9636;', label:'Dashboard',   url:'teacher-dashboard.html' },
      { icon:'&#9632;', label:'Analytics',   url:'analytics.html'         },
      { icon:'&#9632;', label:'My Students', url:'students.html'          },
      { icon:'&#9632;', label:'Reports',     url:'report.html'            },
    ]
  },
  student: {
    label:       'Student',
    sidebarClass:'student-theme',
    color:       '#2563EB',
    dashUrl:     'student-dashboard.html',
    navItems: [
      { icon:'&#8962;', label:'Home',       url:'index.html'             },
      { icon:'&#9636;', label:'Dashboard',  url:'student-dashboard.html' },
      { icon:'&#9632;', label:'Analytics',  url:'analytics.html'         },
      { icon:'&#9632;', label:'My Profile', url:'profile.html'           },
      { icon:'&#9632;', label:'My Report',  url:'report.html'            },
    ]
  }
};

/** getRole — returns current role from localStorage */
function getRole() {
  return localStorage.getItem(ROLE_KEY) || 'administrator';
}

/** getUser — returns saved user data from localStorage */
function getUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY)) || { name:'Usman Tariq', email:'usman@edutrack.edu.pk' };
  } catch(e) {
    return { name:'Usman Tariq', email:'usman@edutrack.edu.pk' };
  }
}

/**
 * applyRoleNav — applies role-specific sidebar theme, menu, and user info
 * Called automatically when the page loads
 */
function applyRoleNav() {
  var role   = getRole();
  var config = roleConfig[role] || roleConfig.administrator;
  var user   = getUser();

  // Apply sidebar color theme class
  var sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.remove('admin-theme','teacher-theme','student-theme');
    sidebar.classList.add(config.sidebarClass);
  }

  // Update user info in sidebar footer
  var nameEl = document.querySelector('.user-info-name');
  var roleEl = document.querySelector('.user-info-role');
  var avatEl = document.querySelector('.sidebar .user-avatar');
  if (nameEl) nameEl.textContent = user.name || 'User';
  if (roleEl) roleEl.textContent = config.label;
  if (avatEl) {
    var initials = (user.name || 'U').split(' ').map(function(w) { return w[0]; }).join('').toUpperCase().slice(0,2);
    avatEl.textContent      = initials;
    avatEl.style.background = config.color;
  }

  // Build role-specific navigation menu
  var nav = document.getElementById('sidebarNav');
  if (!nav) return;

  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  nav.innerHTML = '<div class="nav-label">Menu</div>' +
    config.navItems.map(function(item) {
      var isActive = currentPage === item.url;
      return '<a class="nav-link' + (isActive ? ' active' : '') + '" href="' + item.url + '" aria-label="' + item.label + '">' +
        '<span class="nav-link-icon">' + item.icon + '</span>' +
        item.label +
        (item.badge ? '<span class="nav-badge">' + item.badge + '</span>' : '') +
        '<span class="nav-tooltip">' + item.label + '</span>' +
        '</a>';
    }).join('') +
    '<div class="nav-label">Info</div>' +
    '<a class="nav-link' + (currentPage==='about.html'?' active':'') + '" href="about.html"><span class="nav-link-icon">&#9632;</span> About<span class="nav-tooltip">About</span></a>' +
    '<a class="nav-link' + (currentPage==='profile-manage.html'?' active':'') + '" href="profile-manage.html"><span class="nav-link-icon">&#9632;</span> Profile<span class="nav-tooltip">Profile</span></a>' +
    '<a class="nav-link' + (currentPage==='demo.html'?' active':'') + '" href="demo.html"><span class="nav-link-icon">&#9632;</span> Demo<span class="nav-tooltip">Final Demo</span></a>';
}

// Apply role navigation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyRoleNav);
} else {
  applyRoleNav();
}