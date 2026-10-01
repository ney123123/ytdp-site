// Heading reveal (one-shot) + star-burst on the primary CTA. Both skip under reduced motion.
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var items = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  if (reduce) return;
  document.querySelectorAll('.js-burst').forEach(function (btn) {
    btn.addEventListener('click', function (ev) {
      var r = btn.getBoundingClientRect();
      var x = ev.clientX || r.left + r.width / 2;
      var y = ev.clientY || r.top + r.height / 2;
      var s = document.createElement('span');
      s.className = 'star-burst';
      s.style.left = x + 'px';
      s.style.top = y + 'px';
      document.body.appendChild(s);
      s.addEventListener('animationend', function () { s.remove(); });
    });
  });
})();
