'use strict';

/* ── Registration form validation ── */
const regForm = document.getElementById('regForm');
if (regForm) {
  regForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    ['fName','lName','email','stuId','dept','year'].forEach(id => {
      const el  = document.getElementById(id);
      const err = document.getElementById(id + 'Err');
      if (!el || !err) return;
      if (!el.value.trim()) { el.classList.add('error'); err.classList.add('show'); valid = false; }
      else { el.classList.remove('error'); err.classList.remove('show'); }
    });
    const em = document.getElementById('email');
    const emE = document.getElementById('emailErr');
    if (em?.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value)) {
      em.classList.add('error');
      if (emE) { emE.textContent = 'Enter a valid email address.'; emE.classList.add('show'); }
      valid = false;
    }
    if (valid) {
      // Save to localStorage
      const student = {
        name: document.getElementById('fName').value + ' ' + document.getElementById('lName').value,
        email: em.value,
        id: document.getElementById('stuId').value,
        dept: document.getElementById('dept').value,
        year: document.getElementById('year').value,
        createdAt: new Date().toISOString()
      };
      const students = JSON.parse(localStorage.getItem('edutrack_students') || '[]');
      students.push(student);
      localStorage.setItem('edutrack_students', JSON.stringify(students));
      showToast('Student registered and saved successfully.', 'success');
      regForm.reset();
    } else {
      showToast('Please correct the errors above.', 'error');
    }
  });
  regForm.querySelectorAll('.form-control').forEach(el => {
    el.addEventListener('input', () => {
      el.classList.remove('error');
      const err = document.getElementById(el.id + 'Err');
      if (err) err.classList.remove('show');
    });
  });
}

/* ── Search + Filter ── */
let activeFilter = 'all';
let searchQuery  = '';

function applyFilters() {
  const rows       = document.querySelectorAll('#stuTable tbody tr');
  const emptyState = document.getElementById('emptyState');
  const countEl    = document.getElementById('recordCount');
  let visible = 0;

  rows.forEach(row => {
    const text   = row.textContent.toLowerCase();
    const matchQ = !searchQuery || text.includes(searchQuery);
    const matchF = activeFilter === 'all' || text.includes(activeFilter);
    if (matchQ && matchF) {
      row.style.display = '';
      row.classList.toggle('row-match', !!searchQuery);
      visible++;
    } else {
      row.style.display = 'none';
      row.classList.remove('row-match');
    }
  });
  if (emptyState) emptyState.style.display = visible === 0 ? 'block' : 'none';
  if (countEl)    countEl.textContent = `Showing ${visible} of 1,284 students`;
}

document.getElementById('searchInput')?.addEventListener('input', function() {
  searchQuery = this.value.toLowerCase().trim();
  applyFilters();
});

document.querySelectorAll('.chip[data-filter]').forEach(chip => {
  chip.addEventListener('click', function() {
    document.querySelectorAll('.chip[data-filter]').forEach(c => c.classList.remove('active'));
    this.classList.add('active');
    activeFilter = this.dataset.filter;
    applyFilters();
  });
});

/* ── Advanced Search Toggle ── */
document.getElementById('advSearchBtn')?.addEventListener('click', function() {
  const panel = document.getElementById('advSearchPanel');
  panel?.classList.toggle('open');
  this.textContent = panel?.classList.contains('open') ? 'Hide Filters' : 'Advanced Search';
});

document.getElementById('advSearchApply')?.addEventListener('click', function() {
  const dept = document.getElementById('advDept')?.value.toLowerCase() || '';
  const year = document.getElementById('advYear')?.value.toLowerCase() || '';
  const gpaMin = parseFloat(document.getElementById('advGpaMin')?.value) || 0;
  const gpaMax = parseFloat(document.getElementById('advGpaMax')?.value) || 4.0;

  const rows = document.querySelectorAll('#stuTable tbody tr');
  let visible = 0;

  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    const gpaEl = row.querySelector('td:nth-child(6) strong');
    const gpa = gpaEl ? parseFloat(gpaEl.textContent) : 0;

    const matchDept = !dept || text.includes(dept);
    const matchYear = !year || text.includes(year);
    const matchGpa  = gpa >= gpaMin && gpa <= gpaMax;

    if (matchDept && matchYear && matchGpa) {
      row.style.display = ''; visible++;
    } else {
      row.style.display = 'none';
    }
  });

  const countEl = document.getElementById('recordCount');
  if (countEl) countEl.textContent = `Showing ${visible} of 1,284 students`;
  showToast(`Filter applied — ${visible} students found.`, 'info');
});

document.getElementById('advSearchReset')?.addEventListener('click', function() {
  ['advDept','advYear','advGpaMin','advGpaMax'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  searchQuery = '';
  activeFilter = 'all';
  document.querySelectorAll('.chip[data-filter]').forEach(c => c.classList.remove('active'));
  document.querySelector('.chip[data-filter="all"]')?.classList.add('active');
  const si = document.getElementById('searchInput');
  if (si) si.value = '';
  applyFilters();
  showToast('Filters cleared.', 'info');
});

/* ── TABLE SORTING ── */
let sortCol = -1;
let sortDir = 1;

document.querySelectorAll('th.sortable').forEach((th, idx) => {
  th.addEventListener('click', function() {
    const table = document.getElementById('stuTable');
    const tbody = table.tBodies[0];
    const rows  = Array.from(tbody.rows);

    if (sortCol === idx) { sortDir *= -1; }
    else { sortCol = idx; sortDir = 1; }

    document.querySelectorAll('th.sortable').forEach(t => {
      t.classList.remove('sort-asc','sort-desc');
    });
    this.classList.add(sortDir === 1 ? 'sort-asc' : 'sort-desc');

    rows.sort((a, b) => {
      const aText = a.cells[idx]?.textContent.trim().toLowerCase() || '';
      const bText = b.cells[idx]?.textContent.trim().toLowerCase() || '';
      const aNum  = parseFloat(aText);
      const bNum  = parseFloat(bText);
      if (!isNaN(aNum) && !isNaN(bNum)) return (aNum - bNum) * sortDir;
      return aText.localeCompare(bText) * sortDir;
    });

    rows.forEach(r => tbody.appendChild(r));
    showToast('Table sorted.', 'info');
  });
});

/* ── View profile button ── */
document.querySelectorAll('.btn-view').forEach(b => {
  b.addEventListener('click', () => {
    localStorage.setItem('edutrack_view_student', b.dataset.id || 'STU-2026-0001');
    window.location.href = 'profile.html?id=' + (b.dataset.id || 'STU-2026-0001');
  });
});

document.querySelectorAll('.btn-edit').forEach(b => {
  b.addEventListener('click', () => showToast(`Editing: ${b.dataset.name}`, 'info'));
});