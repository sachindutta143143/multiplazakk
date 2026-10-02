const MULTI_PLAZA_YOUTUBE_VIDEOS = [
  {id:"",title:"Photocopier & MFP Demonstration"},
  {id:"",title:"Printer & Scanner Solutions"},
  {id:"",title:"Digital Duplicator Demonstration"},
  {id:"",title:"Office Automation & Service"},
  {id:"",title:"Colour Xerox & Printing"},
  {id:"",title:"Multi Plaza Product Showcase"}
];
function renderYouTubeVideos(){const g=document.getElementById("youtube-grid");if(!g)return;g.innerHTML=MULTI_PLAZA_YOUTUBE_VIDEOS.map((v,i)=>{const id=v.id.trim();const thumb=id?`https://i.ytimg.com/vi/${id}/hqdefault.jpg`:"assets/product-showcase.jpg";return `<button class="youtube-card" type="button" data-video="${id}" aria-label="Watch ${v.title}"><span class="youtube-thumb"><img src="${thumb}" alt="${v.title} - Multi Plaza Mizoram" loading="lazy" decoding="async"><span class="play">▶</span></span><strong>${v.title}</strong><small>Watch on YouTube</small></button>`}).join("");g.addEventListener("click",e=>{const c=e.target.closest(".youtube-card");if(!c)return;const id=c.dataset.video;if(!id){window.open("https://www.youtube.com/", "_blank", "noopener");return;}const modal=document.createElement("div");modal.className="youtube-modal";modal.innerHTML=`<div class="youtube-modal-bg"></div><div class="youtube-modal-box"><button class="youtube-close" aria-label="Close">×</button><iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0" title="Multi Plaza YouTube video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`;document.body.appendChild(modal);const close=()=>modal.remove();modal.querySelector(".youtube-close").onclick=close;modal.querySelector(".youtube-modal-bg").onclick=close;});}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",renderYouTubeVideos);else renderYouTubeVideos();
