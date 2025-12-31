/*
* Greedy Navigation
*
* http://codepen.io/lukejacksonn/pen/PwmwWV
*
*/

var $nav = $('#site-nav');
var $btn = $('#site-nav button');
var $vlinks = $('#site-nav .visible-links');
var $hlinks = $('#site-nav .hidden-links');

var breaks = [];

function updateNav() {
  // Ensure language switcher is always in visible links and visible
  var $langSwitcher = $vlinks.children('.masthead__menu-item--lang');
  if ($langSwitcher.length === 0) {
    // If language switcher was moved to hidden links, move it back
    var $langInHidden = $hlinks.children('.masthead__menu-item--lang');
    if ($langInHidden.length > 0) {
      $langInHidden.appendTo($vlinks);
      $langSwitcher = $vlinks.children('.masthead__menu-item--lang');
    }
  }

  // Force language switcher to be visible
  if ($langSwitcher.length > 0) {
    $langSwitcher.css({
      'display': 'flex',
      'visibility': 'visible',
      'opacity': '1'
    });

    // Ensure the button inside is also visible
    var $langBtn = $langSwitcher.find('.language-switcher__btn');
    if ($langBtn.length > 0) {
      $langBtn.css({
        'display': 'inline-block',
        'visibility': 'visible',
        'opacity': '1'
      });
    }
  }

  // Calculate available space, reserving space for language switcher and hamburger button
  var langSwitcherWidth = $langSwitcher.length > 0 ? Math.max($langSwitcher.outerWidth(true), 80) : 80; // Minimum 80px for language switcher
  var btnWidth = $btn.hasClass('hidden') ? 0 : Math.max($btn.outerWidth(true), 50); // Minimum 50px for button
  var availableSpace = $nav.width() - btnWidth - langSwitcherWidth - 60; // 60px for padding/margins

  // Get all items except site title and language switcher
  var $navItems = $vlinks.children('*:not(.masthead__menu-item--lg):not(.masthead__menu-item--lang)');

  // Calculate total width of navigation items (excluding site title and language switcher)
  var totalNavWidth = 0;
  $navItems.each(function() {
    totalNavWidth += $(this).outerWidth(true);
  });

  // The visible list is overflowing the nav
  if(totalNavWidth > availableSpace) {
    // Show the dropdown btn if not already shown
    if($btn.hasClass('hidden')) {
      $btn.removeClass('hidden');
    }

    while (totalNavWidth > availableSpace && $navItems.length > 0) {
      // Record the width before moving
      breaks.push(totalNavWidth);

      // Move the last navigation item (not site title or language switcher) to hidden list
      var $lastItem = $navItems.last();
      if ($lastItem.length > 0 && !$lastItem.hasClass('masthead__menu-item--lg') && !$lastItem.hasClass('masthead__menu-item--lang')) {
        $lastItem.prependTo($hlinks);
        totalNavWidth -= $lastItem.outerWidth(true);
        $navItems = $navItems.not($lastItem);
      } else {
        break; // No more items to move
      }
    }

    // The visible list is not overflowing
  } else {
    // Recalculate after potential changes
    $navItems = $vlinks.children('*:not(.masthead__menu-item--lg):not(.masthead__menu-item--lang)');
    totalNavWidth = 0;
    $navItems.each(function() {
      totalNavWidth += $(this).outerWidth(true);
    });

    // There is space for another item in the nav
    while(breaks.length > 0 && availableSpace > totalNavWidth) {
      // Move the item to the visible list (but keep language switcher at the end)
      var $itemToMove = $hlinks.children().first();
      if ($itemToMove.length > 0) {
        // Insert before language switcher if it exists, otherwise append
        var $langSwitcher = $vlinks.children('.masthead__menu-item--lang');
        if ($langSwitcher.length > 0) {
          $itemToMove.insertBefore($langSwitcher);
        } else {
          $itemToMove.appendTo($vlinks);
        }
        totalNavWidth += $itemToMove.outerWidth(true);
        breaks.pop();
      } else {
        break;
      }
    }

    // Hide the dropdown btn if hidden list is empty
    if(breaks.length < 1) {
      $btn.addClass('hidden');
      $btn.removeClass('close');
      $hlinks.addClass('hidden');
    }
  }

  // Keep counter updated
  $btn.attr("count", breaks.length);

}

// Window listeners

$(window).on('resize', function() {
  updateNav();
});
if (screen.orientation) {
  screen.orientation.addEventListener("change", function(){
    updateNav();
  });
}

$btn.on('click', function() {
  $hlinks.toggleClass('hidden');
  $(this).toggleClass('close');
});

// Initialize after DOM is ready and a short delay to ensure styles are applied
$(document).ready(function() {
  // First, ensure language switcher is visible immediately
  var $langSwitcher = $vlinks.children('.masthead__menu-item--lang');
  if ($langSwitcher.length > 0) {
    $langSwitcher.css({
      'display': 'flex',
      'visibility': 'visible',
      'opacity': '1'
    });
  }

  // Then run updateNav after a short delay
  setTimeout(function() {
    updateNav();
  }, 100);

  // Also run after a longer delay to catch any late-loading styles
  setTimeout(function() {
    updateNav();
    // Force language switcher visibility again
    var $langSwitcher = $vlinks.children('.masthead__menu-item--lang');
    if ($langSwitcher.length > 0) {
      $langSwitcher.css({
        'display': 'flex',
        'visibility': 'visible',
        'opacity': '1'
      });
    }
  }, 500);
});