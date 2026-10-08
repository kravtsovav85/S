(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),root=document.documentElement;
 const constrained=navigator.connection?.saveData||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=2)||(navigator.deviceMemory&&navigator.deviceMemory<=2);
 const forcedStatic=new URLSearchParams(location.search).get('motion')==='static';
 const sync=()=>{root.dataset.motion=reduced.matches||constrained||forcedStatic?'static':document.hidden?'paused':'live';};sync();
 const hero=document.querySelector('.hero');hero.insertAdjacentHTML('beforeend','<div class="hero-wave" aria-hidden="true"></div>');
 const meeting=document.querySelector('.meeting');meeting.insertAdjacentHTML('afterbegin','<div class="silk-wave" aria-hidden="true"></div>');
 const visibility=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('effects-inview',e.isIntersecting)));[hero,meeting,document.querySelector('.nav')].forEach(e=>visibility.observe(e));
 document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
})();
