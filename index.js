import{a as S,S as v,i}from"./assets/vendor-BjRz3xa9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function e(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=e(o);fetch(o.href,n)}})();const R="https://pixabay.com/api/",q="49685797-d155f5292c9f3a9a86069a294";async function f(t,r=1){const e={key:q,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:r};try{return(await S.get(R,{params:e})).data}catch(s){throw console.error("Error fetching images:",s),s}}const h=document.querySelector(".gallery"),m=document.querySelector(".loader"),p=document.querySelector(".load-more"),B=new v(".gallery a",{captionsData:"alt",captionDelay:250});function g(t){const r=t.map(e=>`
    <li class="gallery-item">
      <a href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${e.likes}</p>
        <p><b>Views:</b> ${e.views}</p>
        <p><b>Comments:</b> ${e.comments}</p>
        <p><b>Downloads:</b> ${e.downloads}</p>
      </div>
    </li>
  `).join("");h.insertAdjacentHTML("beforeend",r),B.refresh()}function E(){h.innerHTML=""}function y(){m.classList.remove("hidden")}function L(){m.classList.add("hidden")}function M(){p.classList.remove("hidden")}function d(){p.classList.add("hidden")}let a=1,l="",b=0;const u=document.querySelector(".form"),$=document.querySelector(".load-more");d();u.addEventListener("submit",async t=>{t.preventDefault();const r=u.elements["search-text"].value.trim();if(!r){i.warning({message:"Please enter a search term",position:"topRight"});return}l=r,a=1,E(),d(),y();try{const e=await f(l,a);e.hits.length===0?i.info({message:"Sorry, no images found.",position:"topRight"}):(g(e.hits),b=e.totalHits,w(e.hits.length))}catch(e){console.error("Fetch error:",e),i.error({message:"Error fetching images.",position:"topRight"})}finally{L()}});$.addEventListener("click",async()=>{a+=1,y();try{const t=await f(l,a);g(t.hits),w(t.hits.length),P()}catch(t){console.error("Fetch error during load more:",t),i.error({message:"Error fetching images.",position:"topRight"})}finally{L()}});function w(t){document.querySelectorAll(".gallery-item").length>=b||t<15?(d(),i.info({message:"You've reached the end of the results.",position:"topRight"})):M()}function P(){const t=document.querySelector(".gallery-item");if(!t)return;const r=t.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
