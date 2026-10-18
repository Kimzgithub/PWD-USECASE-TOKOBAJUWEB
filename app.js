(() => {
  const $ = (s, r = document) => r.querySelector(s), KEY = 'abyssal_cart';
  const rp = n => 'Rp ' + n.toLocaleString('id-ID');
  let cart = []; try { cart = JSON.parse(localStorage.getItem(KEY) || '[]') } catch (e) { }
  const page = document.body.dataset.page;
  const nav = [['store.html', 'SHOP', 'store'], ['jurnal.html', 'JOURNAL', 'jurnal'], ['index.html#stores', 'STORES', ''], ['contact.html', 'CONTACT', 'contact']];
  document.body.insertAdjacentHTML('afterbegin', `<header class="top px"><a class="logo" href="index.html">ABYSSAL</a><nav class="nav-c">${nav.map(n => `<a href="${n[0]}" class="${n[2] == page ? 'on' : ''}">${n[1]}</a>`).join('')}</nav><div class="nav-r"><button id="cartBtn" aria-label="Buka keranjang">CART (<span id="cnt">0</span>)</button><a href="#">LOGIN</a></div></header>
<div class="ov"></div>
<aside class="drawer" aria-label="Keranjang belanja"><div class="dh"><h2 class="mono">KERANJANG</h2><button id="closeCart" aria-label="Tutup keranjang"><i data-lucide="x"></i></button></div><div id="items" class="items"></div><div class="df"><div class="tot"><span>Total</span><b id="tot"></b></div><button class="btn-r w-100">CHECKOUT</button></div></aside>`);
  document.body.insertAdjacentHTML('beforeend', `<footer class="ft px"><span class="mono">ABYSSAL</span><span>© 2026 Abyssal. Seluruh hak dilindungi.</span></footer>`);
  const render = () => {
    $('#cnt').textContent = cart.reduce((a, c) => a + c.q, 0);
    $('#items').innerHTML = cart.length ? cart.map((c, i) => `<div class="it" style="--i:${i}"><div class="th"><i data-lucide="${c.icon || 'shirt'}"></i></div><div><b>${c.name}</b><small>${rp(c.price)}</small><div class="qty"><button data-d="-1" data-id="${c.id}" aria-label="Kurangi">−</button><span>${c.q}</span><button data-d="1" data-id="${c.id}" aria-label="Tambah">+</button></div></div></div>`).join('') : '<p class="empty">Keranjang masih kosong.<br>Pilih produk di halaman Shop.</p>';
    $('#tot').textContent = rp(cart.reduce((a, c) => a + c.q * c.price, 0));
    try { localStorage.setItem(KEY, JSON.stringify(cart)) } catch (e) { }
    lucide.createIcons();
  };
  const toggle = o => { document.body.classList.toggle('cart-open', o); if (o) render() };
  const bump = () => { const b = $('#cartBtn'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump') };
  const fly = el => {
    const t = $('#cartBtn').getBoundingClientRect(), f = el.getBoundingClientRect(), d = document.createElement('i'); d.className = 'fly'; d.style.left = f.left + f.width / 2 + 'px'; d.style.top = f.top + f.height / 2 + 'px'; document.body.appendChild(d);
    d.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${t.left + t.width / 2 - f.left - f.width / 2}px,${t.top + t.height / 2 - f.top - f.height / 2}px) scale(.3)`, opacity: .5 }], { duration: 700, easing: 'cubic-bezier(.5,-.3,.7,.4)' }).onfinish = () => { d.remove(); bump() }
  };
  $('#cartBtn').onclick = () => toggle(true);
  $('#closeCart').onclick = $('.ov').onclick = () => toggle(false);
  addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false) });
  $('#items').onclick = e => { const b = e.target.closest('[data-d]'); if (!b) return; const c = cart.find(x => x.id == b.dataset.id); c.q += +b.dataset.d; if (c.q < 1) cart = cart.filter(x => x !== c); render() };
  window.Cart = { add(p, el) { const c = cart.find(x => x.id == p.id); c ? c.q++ : cart.push({ ...p, q: 1 }); $('#cnt').textContent = cart.reduce((a, c) => a + c.q, 0); try { localStorage.setItem(KEY, JSON.stringify(cart)) } catch (e) { } el ? fly(el) : bump() } };
  render();
})();