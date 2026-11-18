/**
 * Inline script (runs during HTML parsing, before hydration): marks JS as
 * available and starts a single IntersectionObserver for [data-reveal].
 * Exposed as window.__anhReveal so client-side navigations can re-scan.
 */
export const revealScript = `(function(){var d=document.documentElement;d.classList.add('js');function scan(){var els=document.querySelectorAll('[data-reveal]:not(.is-visible)');if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('is-visible')});return}var io=window.__anhIO||(window.__anhIO=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('is-visible');window.__anhIO.unobserve(x.target)}})},{rootMargin:'0px 0px -8% 0px'}));els.forEach(function(e){io.observe(e)})}window.__anhReveal=scan;window.addEventListener('load',function(){setTimeout(function(){d.classList.add('anim-on')},2500)});if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',scan)}else{scan()}})();`;
