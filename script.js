let currentProductPage = 1;
const totalProductPages = 9;
const productsPerPage = 9;

function showProductPage(page) {
  currentProductPage = Math.max(1, Math.min(totalProductPages, page));

  document.querySelectorAll('.product-page').forEach(section => {
    section.hidden = Number(section.dataset.page) !== currentProductPage;
  });

  document.querySelectorAll('.page-btn').forEach(btn => {
    const active = Number(btn.dataset.page) === currentProductPage;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-current', active ? 'page' : 'false');
  });

  const prev = document.getElementById('prevPage');
  const next = document.getElementById('nextPage');
  if (prev) prev.disabled = currentProductPage === 1;
  if (next) next.disabled = currentProductPage === totalProductPages;
}

function buildPagination() {
  const wrap = document.getElementById('productPagination');
  if (!wrap) return;
  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= totalProductPages; i++) {
    const b = document.createElement('button');
    b.className = 'page-btn';
    b.type = 'button';
    b.dataset.page = i;
    b.textContent = i;
    b.addEventListener('click', () => showProductPage(i));
    fragment.appendChild(b);
  }
  wrap.replaceChildren(fragment);
}

function setProduct(product) {
  const message = document.getElementById('message');
  if (message) message.value = `I am interested in: ${product}`;
  document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});
}

function sendEnquiry(e) {
  e.preventDefault();
  const name = document.getElementById('name')?.value.trim() || '';
  const phone = document.getElementById('phone')?.value.trim() || '';
  const category = document.getElementById('category')?.value || '';
  const message = document.getElementById('message')?.value.trim() || '';
  const text = `Hello Multi Plaza,\n\nName: ${name}\nPhone: ${phone}\nRequirement: ${category}\nMessage: ${message || 'Please contact me regarding this requirement.'}`;
  window.open(`https://wa.me/919856090557?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
}

document.addEventListener('DOMContentLoaded', () => {
  buildPagination();
  document.getElementById('prevPage')?.addEventListener('click', () => showProductPage(currentProductPage - 1));
  document.getElementById('nextPage')?.addEventListener('click', () => showProductPage(currentProductPage + 1));

  document.querySelector('.menu-btn')?.addEventListener('click', () => {
    document.querySelector('.nav')?.classList.toggle('open');
  });
  document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
    document.querySelector('.nav')?.classList.remove('open');
  }));

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const backToTop = document.getElementById('backToTop');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      backToTop?.classList.toggle('show', window.scrollY > 500);
      ticking = false;
    });
  }, {passive:true});
  backToTop?.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

  showProductPage(1);
});
