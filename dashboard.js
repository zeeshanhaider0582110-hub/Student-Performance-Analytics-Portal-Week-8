'use strict';

/**
 * animateCounter — counts from 0 to target using requestAnimationFrame
 * @param {HTMLElement} el       - Element to update
 * @param {number}      target   - Target number to count to
 * @param {number}      duration - Animation duration in ms (default 1200)
 */
function animateCounter(el, target, duration) {
  duration    = duration || 1200;
  var isDecimal = target % 1 !== 0;
  var start     = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = Math.min((timestamp - start) / duration, 1);
    // Cubic ease-out: decelerates towards end
    var eased   = 1 - Math.pow(1 - progress, 3);
    var current = eased * target;
    el.textContent = isDecimal
      ? current.toFixed(1)
      : Math.floor(current).toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      // Ensure exact final value
      el.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
    }
  }
  requestAnimationFrame(step);
}

/**
 * animateProgressBars — animates all progress and trend bars
 * Uses CSS transitions for smooth width animation
 */
function animateProgressBars() {
  // Subject/department progress bars
  document.querySelectorAll('.prog-fill[data-w]').forEach(function(bar) {
    var target = parseFloat(bar.getAttribute('data-w')) || 0;
    bar.style.width = '0%';
    setTimeout(function() {
      bar.style.transition = 'width 1s cubic-bezier(.4,0,.2,1)';
      bar.style.width = target + '%';
    }, 200);
  });

  // Trend bars under stat cards
  document.querySelectorAll('.trend-fill[data-w]').forEach(function(bar) {
    var target = parseFloat(bar.getAttribute('data-w')) || 0;
    bar.style.width = '0%';
    setTimeout(function() {
      bar.style.transition = 'width 1s cubic-bezier(.4,0,.2,1)';
      bar.style.width = target + '%';
    }, 400);
  });
}

/**
 * initCounters — sets up IntersectionObserver to trigger counters
 * when stat cards scroll into view (performance optimization)
 */
function initCounters() {
  var els = document.querySelectorAll('[data-count]');
  if (!els.length) return;

  if ('IntersectionObserver' in window) {
    // Only animate when element is 30% visible
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el     = entry.target;
          var target = parseFloat(el.getAttribute('data-count'));
          animateCounter(el, target);
          observer.unobserve(el); // Animate only once
        }
      });
    }, { threshold: 0.3 });

    els.forEach(function(el) { observer.observe(el); });
  } else {
    // Fallback for browsers without IntersectionObserver
    els.forEach(function(el) {
      animateCounter(el, parseFloat(el.getAttribute('data-count')));
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initCounters();
    animateProgressBars();
  });
} else {
  initCounters();
  animateProgressBars();
}