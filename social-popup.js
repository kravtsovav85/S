(function () {
  'use strict';

  if (!document.querySelector('script[src="/metrika.js"]')) {
    var metrikaScript = document.createElement('script');
    metrikaScript.src = '/metrika.js';
    metrikaScript.async = true;
    document.head.appendChild(metrikaScript);
  }

  var KEY = 'ak-social-popup';
  var opened = false;
  var previousFocus = null;

  function remember(action, days) {
    try { localStorage.setItem(KEY, JSON.stringify({ action: action, until: Date.now() + days * 86400000 })); } catch (_) {}
  }
  function suppressed() {
    try { return Number(JSON.parse(localStorage.getItem(KEY) || '{}').until || 0) > Date.now(); } catch (_) { return false; }
  }
  function track(action, detail) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'social_popup', action: action, detail: detail || '' });
  }
  function build() {
    var style = document.createElement('style');
    style.textContent = '.ak-social{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:24px;background:rgba(14,20,18,.62);backdrop-filter:blur(6px);opacity:0;visibility:hidden;transition:opacity .22s,visibility .22s}.ak-social.is-open{opacity:1;visibility:visible}.ak-social__dialog{position:relative;width:min(100%,760px);overflow:hidden;background:#f7f5f1;color:#151917;border:1px solid rgba(255,255,255,.24);box-shadow:0 30px 90px rgba(8,13,11,.34);transform:translateY(16px);transition:transform .22s}.ak-social.is-open .ak-social__dialog{transform:translateY(0)}.ak-social__layout{display:grid;grid-template-columns:280px 1fr;min-height:480px}.ak-social__visual{position:relative;display:flex;align-items:center;justify-content:center;padding:46px 32px;background:linear-gradient(145deg,#14231e,#243a32);overflow:hidden}.ak-social__visual:before{content:"";position:absolute;width:250px;height:250px;border:1px solid rgba(201,148,112,.18);border-radius:50%;top:-105px;left:-95px}.ak-social__book{position:relative;width:172px;aspect-ratio:3/4;padding:27px 22px;background:#f2ede4;color:#17231f;box-shadow:14px 18px 0 rgba(6,13,10,.18),0 24px 50px rgba(6,13,10,.28);transform:rotate(-3deg)}.ak-social__book:before{content:"";position:absolute;inset:0 auto 0 0;width:7px;background:#9d623f}.ak-social__book-kicker{display:block;color:#9d623f;font:700 9px/1.3 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;letter-spacing:.14em;text-transform:uppercase}.ak-social__book-title{display:block;margin-top:17px;font:400 25px/1.02 "Iowan Old Style",Baskerville,Georgia,serif;letter-spacing:-.03em}.ak-social__book-line{display:block;width:32px;height:2px;margin:22px 0;background:#9d623f}.ak-social__book-author{display:block;font:600 9px/1.4 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;letter-spacing:.08em;text-transform:uppercase}.ak-social__content{display:flex;flex-direction:column;justify-content:center;padding:48px 48px 42px}.ak-social__eyebrow{margin-bottom:14px;color:#9d623f;font:700 12px/1.3 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;letter-spacing:.15em;text-transform:uppercase}.ak-social h2{margin:0 0 17px;color:#17231f;font:400 clamp(32px,4vw,45px)/1.04 "Iowan Old Style",Baskerville,Georgia,serif;letter-spacing:-.035em}.ak-social p{margin:0;color:#505651;font:400 15px/1.57 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.ak-social__steps{display:grid;gap:9px;margin:22px 0 25px;padding:0;list-style:none}.ak-social__steps li{display:grid;grid-template-columns:22px 1fr;gap:10px;align-items:start;color:#353c38;font:500 13px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.ak-social__steps span{display:grid;place-items:center;width:20px;height:20px;border:1px solid rgba(157,98,63,.55);border-radius:50%;color:#9d623f;font-size:10px}.ak-social__close{position:absolute;z-index:2;top:17px;right:17px;width:42px;height:42px;border:1px solid rgba(23,35,31,.25);border-radius:50%;background:rgba(247,245,241,.82);color:#17231f;font-size:25px;line-height:1;cursor:pointer}.ak-social__primary{display:flex;align-items:center;justify-content:center;min-height:56px;padding:0 24px;background:#17231f;color:#fff;text-align:center;text-decoration:none;font:650 15px/1.2 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;transition:background .18s,transform .18s}.ak-social__primary:hover{background:#21342d;transform:translateY(-1px)}.ak-social__note{display:block;margin-top:14px;color:#777c77;text-align:center;font:400 11px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.ak-social a:focus-visible,.ak-social button:focus-visible{outline:2px solid #c99470;outline-offset:3px}@media(max-width:680px){.ak-social{align-items:end;padding:0}.ak-social__dialog{width:100%;max-height:94dvh;overflow:auto}.ak-social__layout{display:block;min-height:0}.ak-social__visual{min-height:190px;padding:28px}.ak-social__book{width:116px;padding:18px 15px;box-shadow:9px 11px 0 rgba(6,13,10,.18),0 18px 36px rgba(6,13,10,.26)}.ak-social__book-title{margin-top:10px;font-size:17px}.ak-social__book-line{margin:14px 0}.ak-social__content{padding:27px 24px 25px}.ak-social h2{font-size:31px}.ak-social__steps{margin:18px 0 21px}.ak-social__close{border-color:rgba(255,255,255,.34);background:rgba(20,35,30,.72);color:#fff}}@media(prefers-reduced-motion:reduce){.ak-social,.ak-social__dialog,.ak-social__primary{transition:none}}';
    var root = document.createElement('div');
    root.className = 'ak-social';
    root.setAttribute('aria-hidden', 'true');
    root.innerHTML = '<section class="ak-social__dialog" role="dialog" aria-modal="true" aria-labelledby="ak-social-title"><button class="ak-social__close" type="button" aria-label="Закрыть">&times;</button><div class="ak-social__layout"><div class="ak-social__visual" aria-hidden="true"><div class="ak-social__book"><span class="ak-social__book-kicker">Практический гайд</span><strong class="ak-social__book-title">Как меняется привычка лидера</strong><span class="ak-social__book-line"></span><span class="ak-social__book-author">Алексей Кравцов</span></div></div><div class="ak-social__content"><div class="ak-social__eyebrow">Гайд в подарок</div><h2 id="ak-social-title">Подпишитесь — и заберите практический гайд</h2><p>«Как меняется привычка лидера» поможет увидеть, почему одного решения недостаточно, чтобы изменить устойчивый способ действовать.</p><ol class="ak-social__steps"><li><span>1</span>Перейдите в Telegram-бот</li><li><span>2</span>Подпишитесь на канал</li><li><span>3</span>Получите гайд сразу после проверки</li></ol><a class="ak-social__primary" href="https://t.me/AlekseyKravtsovBot?start=website_popup_guide" target="_blank" rel="noopener">Подписаться и получить гайд</a><small class="ak-social__note">Бесплатно. Файл придёт в Telegram после подтверждения подписки.</small></div></div></section>';
    document.head.appendChild(style);
    document.body.appendChild(root);
    return root;
  }
  function init() {
    var previewMode = new URLSearchParams(window.location.search).get('popup') === 'guide';
    if (suppressed() && !previewMode) return;
    var root = build();
    var dialog = root.querySelector('.ak-social__dialog');
    var closeButton = root.querySelector('.ak-social__close');
    function open(source) {
      if (opened || (suppressed() && !previewMode)) return;
      opened = true; previousFocus = document.activeElement;
      root.classList.add('is-open'); root.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; closeButton.focus(); track('open', source);
      window.removeEventListener('scroll', onScroll);
    }
    function close() {
      if (!opened) return;
      root.classList.remove('is-open'); root.setAttribute('aria-hidden', 'true'); document.body.style.overflow = '';
      remember('dismissed', 14); track('dismiss');
      if (previousFocus && previousFocus.focus) previousFocus.focus();
    }
    function onScroll() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= .55) open('scroll');
    }
    closeButton.addEventListener('click', close);
    root.addEventListener('click', function (event) { if (event.target === root) close(); });
    root.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { remember(link.classList.contains('ak-social__primary') ? 'telegram' : 'social', 90); track('click', link.textContent.toLowerCase()); });
    });
    document.addEventListener('keydown', function (event) {
      if (!opened) return;
      if (event.key === 'Escape') close();
      if (event.key === 'Tab') {
        var focusable = Array.prototype.slice.call(dialog.querySelectorAll('a,button'));
        if (event.shiftKey && document.activeElement === focusable[0]) { event.preventDefault(); focusable[focusable.length - 1].focus(); }
        else if (!event.shiftKey && document.activeElement === focusable[focusable.length - 1]) { event.preventDefault(); focusable[0].focus(); }
      }
    });
    window.addEventListener('scroll', onScroll, { passive: true });
    if (previewMode) window.setTimeout(function () { open('preview'); }, 250);
    else window.setTimeout(function () { open('timer'); }, 35000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
