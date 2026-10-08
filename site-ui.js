(() => {
 const nav=document.querySelector('.site-nav');
 if(nav){const toggle=nav.querySelector('.site-menu-toggle'),links=nav.querySelector('.site-nav-links');const close=()=>{links.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');nav.querySelectorAll('details').forEach(d=>d.open=false)};toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';links.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open))});links.addEventListener('click',e=>{if(e.target.closest('a'))close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});document.addEventListener('click',e=>{if(!nav.contains(e.target))close()});nav.querySelectorAll('a').forEach(a=>{if(new URL(a.href).pathname===location.pathname&&a.getAttribute('href')!=='/')a.setAttribute('aria-current','page')});}
 if(new URLSearchParams(location.search).get('review')==='5'&&document.body.classList.contains('site-home')){
  const questions=['Что конкретно предлагается?','Кому и в каких ситуациях?','Какой результат можно получить?','Почему стоит читать дальше?','Что сделать прямо сейчас?'];
  const targets=['.hero-service','.hero .eyebrow','.hero .lead','.hero-trust','.hero .actions'];
  targets.forEach((s,i)=>{const el=document.querySelector(s);el.classList.add('review-tagged');const pin=document.createElement('span');pin.className='review-marker';pin.textContent=String(i+1);pin.setAttribute('aria-label',questions[i]);el.append(pin)});
  const legend=document.createElement('aside');legend.className='review-legend';legend.innerHTML='<strong>5 вопросов из видео</strong>'+questions.map((q,i)=>'<p><b>'+(i+1)+'</b><span>'+q+'</span></p>').join('')+'<small>Цифры нанесены только на рендер для обсуждения.</small>';document.body.append(legend);
 }
})();
