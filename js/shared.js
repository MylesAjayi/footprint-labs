/* ============================================================
   Footprint Labs — Shared JavaScript
   Theme toggle, mobile nav, toast, utilities
   ============================================================ */

(function () {
  'use strict';

  // ---------- Theme toggle ----------
  function getPreferredTheme() {
    const stored = localStorage.getItem('fp-theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fp-theme', theme);
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  applyTheme(getPreferredTheme());

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      // Ensure icon is correct on load
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      btn.textContent = current === 'dark' ? '☀️' : '🌙';
      btn.addEventListener('click', function () {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    }

    // ---------- Mobile nav toggle ----------
    const mobileBtn = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn && navLinks) {
      mobileBtn.addEventListener('click', function () {
        navLinks.classList.toggle('open');
        mobileBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
      });
    }
  });

  // ---------- Toast ----------
  window.fpToast = function (msg, durationMs) {
    durationMs = durationMs || 2500;
    let el = document.getElementById('fp-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'fp-toast';
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._timer);
    el._timer = setTimeout(function () { el.classList.remove('show'); }, durationMs);
  };

  // ---------- Debounce ----------
  window.fpDebounce = function (fn, ms) {
    var t;
    return function () {
      var ctx = this, args = arguments;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(ctx, args); }, ms);
    };
  };

  // ---------- Number formatting ----------
  window.fpFmt = function (n, decimals) {
    if (typeof decimals === 'undefined') decimals = 0;
    return Number(n).toLocaleString('en-GB', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  window.fpMoney = function (n, decimals) {
    if (typeof decimals === 'undefined') decimals = 2;
    return '£' + fpFmt(n, decimals);
  };

})();
