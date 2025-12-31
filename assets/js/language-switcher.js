(function() {
  'use strict';

  // Translation data - avoid Liquid syntax in script
  var siteTitle = 'Road to Technical Writer';
  var translations = {
    en: {
      'nav-1': 'CV',
      'nav-2': 'Blog Posts',
      'nav-3': 'Technical Writing',
      'site-title': siteTitle
    },
    zh: {
      'nav-1': '简历',
      'nav-2': '博客文章',
      'nav-3': '技术写作',
      'site-title': '技术写作者之路'
    }
  };

  // Get current language from localStorage, URL, or default to 'en'
  function getCurrentLanguage() {
    // Check URL first - normalize path for GitHub Pages compatibility
    var path = window.location.pathname;
    // Remove trailing slash for comparison (except root)
    var normalizedPath = path === '/' ? '/' : path.replace(/\/$/, '');

    if (normalizedPath === '/zh' || path.startsWith('/zh/')) {
      return 'zh';
    } else if (normalizedPath === '/en' || path.startsWith('/en/')) {
      return 'en';
    }
    // Then check localStorage
    return localStorage.getItem('site-language') || 'en';
  }

  var currentLang = getCurrentLanguage();

  // Navigation URLs for each language
  var navUrls = {
    en: {
      'nav-1': '/en/cv/',
      'nav-2': '/en/blog-posts/',
      'nav-3': '/en/technical-writing/',
      'site-title': '/en/'
    },
    zh: {
      'nav-1': '/zh/cv/',
      'nav-2': '/zh/blog-posts/',
      'nav-3': '/zh/technical-writing/',
      'site-title': '/zh/'
    }
  };

  // Get equivalent page URL in another language
  function getEquivalentUrl(targetLang) {
    var currentPath = window.location.pathname;
    // Get current language dynamically from URL
    var currentLangFromUrl = getCurrentLanguage();
    var currentBase = currentLangFromUrl === 'zh' ? '/zh' : '/en';
    var targetBase = targetLang === 'zh' ? '/zh' : '/en';

    // Normalize path - remove trailing slash for comparison (except root)
    var normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/\/$/, '');

    // Check if path starts with language prefix (with or without trailing slash)
    if (normalizedPath === currentBase || normalizedPath === currentBase + '/' || currentPath === currentBase || currentPath === currentBase + '/') {
      // Home page - redirect to target language home
      return targetBase + '/';
    } else if (currentPath.startsWith(currentBase + '/')) {
      // Language-specific page - swap the language prefix
      var newPath = currentPath.replace(currentBase, targetBase);
      // Ensure trailing slash for consistency
      if (!newPath.endsWith('/') && newPath.indexOf('?') === -1 && newPath.indexOf('#') === -1) {
        newPath += '/';
      }
      return newPath;
    }

    // Otherwise, redirect to home page in target language
    return targetBase + '/';
  }

  // Initialize language
  function initLanguage() {
    var langSwitcher = document.getElementById('lang-switcher');
    var langCurrent = document.getElementById('lang-current');
    var langOther = document.getElementById('lang-other');

    if (!langSwitcher || !langCurrent || !langOther) {
      return;
    }

    // Set document language
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en-US';
    if (document.body) {
      document.body.setAttribute('data-lang', currentLang);
    }

    // Update switcher display
    if (currentLang === 'zh') {
      langCurrent.textContent = '中文';
      langOther.textContent = 'EN';
    } else {
      langCurrent.textContent = 'EN';
      langOther.textContent = '中文';
    }

    // Translate elements
    translatePage();

    // Update navigation URLs
    updateNavigationUrls();

    // Filter posts by language (if on blog posts page)
    filterPostsByLanguage();

    // Add click handler (only once)
    if (!langSwitcher.hasAttribute('data-handler-attached')) {
      langSwitcher.setAttribute('data-handler-attached', 'true');

      // Use both click and mousedown events for better compatibility
      var handleLanguageSwitch = function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        // Get current language dynamically from URL
        var currentLangFromUrl = getCurrentLanguage();
        var newLang = currentLangFromUrl === 'en' ? 'zh' : 'en';
        localStorage.setItem('site-language', newLang);

        // Redirect to equivalent page in new language
        var newUrl = getEquivalentUrl(newLang);
        if (newUrl) {
          window.location.href = newUrl;
        }
        return false;
      };

      langSwitcher.addEventListener('click', handleLanguageSwitch, true);
      langSwitcher.addEventListener('mousedown', handleLanguageSwitch, true);

      // Also handle touch events for mobile
      langSwitcher.addEventListener('touchend', handleLanguageSwitch, true);
    }
  }

  // Update navigation URLs based on current language
  function updateNavigationUrls() {
    var navLinks = document.querySelectorAll('[data-i18n]');
    var urls = navUrls[currentLang] || navUrls.en;

    navLinks.forEach(function(link) {
      var key = link.getAttribute('data-i18n');
      if (urls[key] && link.tagName === 'A') {
        link.setAttribute('href', urls[key]);
      }
    });
  }

  // Filter posts by language
  function filterPostsByLanguage() {
    var container = document.getElementById('blog-posts-container');
    if (!container) return;

    var lang = currentLang;
    var items = container.querySelectorAll('.archive-item-wrapper');
    var years = container.querySelectorAll('.archive__subtitle');

    // Show/hide posts based on language
    items.forEach(function(item) {
      var itemLang = item.getAttribute('data-lang');
      if (itemLang === lang) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });

    // Hide empty year headers
    years.forEach(function(year) {
      var yearId = year.getAttribute('id');

      // Check if this year has any visible posts
      var yearItems = Array.from(items).filter(function(item) {
        if (item.style.display === 'none') return false;
        var prevYear = item.previousElementSibling;
        while (prevYear && !prevYear.classList.contains('archive__subtitle')) {
          prevYear = prevYear.previousElementSibling;
        }
        return prevYear && prevYear.getAttribute('id') === yearId;
      });

      if (yearItems.length === 0) {
        year.style.display = 'none';
      } else {
        year.style.display = '';
      }
    });
  }

  // Translate page elements
  function translatePage() {
    try {
      var elements = document.querySelectorAll('[data-i18n]');
      var t = translations[currentLang] || translations.en;

      for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        var key = el.getAttribute('data-i18n');
        if (t[key]) {
          el.textContent = t[key];
        }
      }
    } catch (e) {
      // Silently fail
    }
  }

  // Run on DOM ready with retry mechanism for GitHub Pages
  function tryInitLanguage(retries) {
    retries = retries || 0;
    var maxRetries = 20;

    var langSwitcher = document.getElementById('lang-switcher');
    if (!langSwitcher && retries < maxRetries) {
      // Element not found, retry after a short delay
      setTimeout(function() {
        tryInitLanguage(retries + 1);
      }, 100);
      return;
    }

    // Element found or max retries reached, initialize
    if (langSwitcher) {
      initLanguage();
    }
  }

  // Wait for everything to be ready
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // Page already loaded
    setTimeout(tryInitLanguage, 100);
  } else {
    // Wait for DOM and all resources
    window.addEventListener('load', function() {
      setTimeout(tryInitLanguage, 100);
    });
    // Also try on DOMContentLoaded as fallback
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(tryInitLanguage, 100);
    });
  }
})();

