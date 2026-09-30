let currentProductPage = 1;
const totalProductPages = 9;

function setProduct(product){
  const message = document.getElementById('message');
  if(message) message.value = `I am interested in: ${product}`;
  document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});
}

function showProductPage(page){
  currentProductPage = Math.max(1, Math.min(totalProductPages, page));
  document.querySelectorAll('.product-page').forEach(section=>{
    section.style.display = Number(section.dataset.page) === currentProductPage ? 'grid' : 'none';
  });
  document.querySelectorAll('.page-btn').forEach(btn=>{
    const active = Number(btn.dataset.page) === currentProductPage;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-current', active ? 'page' : 'false');
  });
  const prev = document.getElementById('prevPage');
  const next = document.getElementById('nextPage');
  if(prev) prev.disabled = currentProductPage === 1;
  if(next) next.disabled = currentProductPage === totalProductPages;
  document.getElementById('featuredProducts')?.scrollIntoView({behavior:'smooth', block:'start'});
}

document.querySelectorAll('.page-btn').forEach(btn=>{
  btn.addEventListener('click',()=>showProductPage(Number(btn.dataset.page)));
});
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
