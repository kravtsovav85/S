(function (m, e, t, r, i, k, a) {
  m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
  m[i].l = 1 * new Date();
  for (var j = 0; j < e.scripts.length; j += 1) {
    if (e.scripts[j].src === r) return;
  }
  k = e.createElement(t);
  a = e.getElementsByTagName(t)[0];
  k.async = true;
  k.src = r;
  a.parentNode.insertBefore(k, a);
})(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=111508227', 'ym');

ym(111508227, 'init', {
  ssr: true,
  webvisor: true,
  clickmap: true,
  ecommerce: 'dataLayer',
  referrer: document.referrer,
  url: location.href,
  accurateTrackBounce: true,
  trackLinks: true
});

