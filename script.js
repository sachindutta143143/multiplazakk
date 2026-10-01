let currentProductPage = 1;
const totalProductPages = 9;

function buildPagination(){
  const wrap=document.getElementById('productPagination');
  if(!wrap) return;
  wrap.innerHTML='';
  for(let i=1;i<=totalProductPages;i++){
    const b=document.createElement('button');
    b.className='page-btn';
    b.dataset.page=i;
    b.textContent=i;
    b.addEventListener('click',()=>showProductPage(i));
    wrap.appendChild(b);
  }
}

function showProductPage(page){
  currentProductPage = Math.max(1, Math.min(totalProductPages, page));
  document.querySelectorAll('.product-page').forEach(section=>{
    section.style.display = Number(section.dataset.page) === currentProductPage ? 'grid' : 'none';
  });
  document.querySelectorAll('.page-btn').forEach(btn=>{
    const active=Number(btn.dataset.page)===currentProductPage;
    btn.classList.toggle('active',active);
    btn.setAttribute('aria-current',active?'page':'false');
  });
  const prev=document.getElementById('prevPage'), next=document.getElementById('nextPage');
  if(prev) prev.disabled=currentProductPage===1;
  if(next) next.disabled=currentProductPage===totalProductPages;
}

buildPagination();
document.getElementById('prevPage')?.addEventListener('click',()=>showProductPage(currentProductPage-1));
document.getElementById('nextPage')?.addEventListener('click',()=>showProductPage(currentProductPage+1));

function setProduct(product){
  const message = document.getElementById('message');
  if(message) message.value = `I am interested in: ${product}`;
  document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});
}

function buildPagination(){
  const wrap=document.getElementById('productPagination');
  if(!wrap) return;
  wrap.innerHTML='';
  for(let i=1;i<=totalProductPages;i++){
    const b=document.createElement('button'); b.className='page-btn'; b.dataset.page=i; b.textContent=i;
    b.addEventListener('click',()=>showProductPage(i)); wrap.appendChild(b);
  }
}

function showProductPage(page){
  currentProductPage = Math.max(1, Math.min(totalProductPages, page));
  const cards=[...document.querySelectorAll('.featured-product')];
  cards.forEach((card,i)=>{ card.style.display=(Math.floor(i/productsPerPage)+1===currentProductPage)?'block':'none'; });
  document.querySelectorAll('.page-btn').forEach(btn=>{
    const active=Number(btn.dataset.page)===currentProductPage; btn.classList.toggle('active',active); btn.setAttribute('aria-current',active?'page':'false');
  });
  const prev=document.getElementById('prevPage'), next=document.getElementById('nextPage');
  if(prev) prev.disabled=currentProductPage===1; if(next) next.disabled=currentProductPage===totalProductPages;
}

buildPagination();
document.getElementById('prevPage')?.addEventListener('click',()=>showProductPage(currentProductPage-1));
document.getElementById('nextPage')?.addEventListener('click',()=>showProductPage(currentProductPage+1));

document.querySelector('.menu-btn')?.addEventListener('click',()=>{
  document.querySelector('.nav')?.classList.toggle('open');
});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{
  document.querySelector('.nav')?.classList.remove('open');
}));

document.getElementById('year').textContent = new Date().getFullYear();

const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll',()=>{
  backToTop?.classList.toggle('show', window.scrollY > 500);
});
backToTop?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

function sendEnquiry(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const category = document.getElementById('category').value;
  const message = document.getElementById('message').value.trim();
  const text = `Hello Multi Plaza,%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0ARequirement: ${encodeURIComponent(category)}%0AMessage: ${encodeURIComponent(message || 'Please contact me regarding this requirement.')}`;
  window.open(`https://wa.me/919856090557?text=${text}`, '_blank');
}

showProductPage(1);
