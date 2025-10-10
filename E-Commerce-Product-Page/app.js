// Utilities
const $ = (q, root=document) => root.querySelector(q);
const $$ = (q, root=document) => Array.from(root.querySelectorAll(q));

/* ===== Ratings: paint stars based on data-stars ===== */
function paintStars() {
  $$(".stars").forEach(el=>{
    const val = parseFloat(el.dataset.stars || "0");
    el.style.setProperty("--p", (Math.max(0, Math.min(5, val)) / 5)*100);
  });
}
paintStars();

/* ===== Gallery: thumbs -> hero, zoom lens ===== */
const hero = $("#heroImg");
const lens = $("#zoomLens");
let zoomOn = false;

function setHero(src, thumbBtn){
  hero.src = src.includes("http") ? src : hero.src; // using demo images from unsplash
  $$(".thumb").forEach(t=>t.classList.remove("is-active"));
  thumbBtn.classList.add("is-active");
}
$$(".thumb").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const src = $("img", btn).src.replace("&w=600", "&w=1400");
    setHero(src, btn);
  });
  btn.addEventListener("keydown",(e)=>{
    if(e.key === "Enter" || e.key === " "){ e.preventDefault(); btn.click();}
  });
});

hero.addEventListener("mousemove",(e)=>{
  const rect = hero.getBoundingClientRect();
  const x = e.clientX - rect.left, y = e.clientY - rect.top;
  lens.style.left = (x-70)+"px";
  lens.style.top  = (y-70)+"px";
  if(zoomOn){
    lens.style.display = "block";
    hero.style.transformOrigin = `${(x/rect.width)*100}% ${(y/rect.height)*100}%`;
    hero.style.transform = "scale(1.25)";
  }
});
["mouseenter","mouseleave"].forEach(ev=>{
  hero.addEventListener(ev,()=>{
    zoomOn = ev==="mouseenter";
    if(!zoomOn){ lens.style.display="none"; hero.style.transform="scale(1)";}
  });
});

/* ===== Wishlist ===== */
const wishBtn = $("#wishBtn");
const stickyWish = $("#stickyWish");
wishBtn.addEventListener("click", ()=>{
  const pressed = wishBtn.getAttribute("aria-pressed")==="true";
  wishBtn.setAttribute("aria-pressed", String(!pressed));
  showToast(!pressed ? "Added to wishlist ❤️" : "Removed from wishlist");
});
stickyWish.addEventListener("click", ()=> wishBtn.click());

/* ===== Options: color, size ===== */
const colorGroup = $("#colorGroup");
const sizeGroup = $("#sizeGroup");
function selectToggle(group, cls="is-selected"){
  group.addEventListener("click",(e)=>{
    const btn = e.target.closest("button"); if(!btn) return;
    $$(".is-selected", group).forEach(b=>b.classList.remove(cls));
    btn.classList.add(cls);
    updateStickyVariant();
  });
  group.addEventListener("keydown",(e)=>{
    if(e.key==="Enter" || e.key===" "){
      const btn = e.target.closest("button"); if(btn){ e.preventDefault(); btn.click(); }
    }
  });
}
selectToggle(colorGroup);
selectToggle(sizeGroup);

function currentVariant(){
  const color = $(".swatch.is-selected")?.dataset.color ?? "black";
  const size = $(".seg.is-selected")?.dataset.size ?? "S";
  return { color, size };
}
function updateStickyVariant(){
  const {color,size} = currentVariant();
  $("#stickyVariant").textContent = `${capitalize(color)} / ${size}`;
}
function capitalize(s){ return s[0].toUpperCase()+s.slice(1); }
updateStickyVariant();

/* ===== Quantity ===== */
const qtyInput = $("#qtyInput");
$("#qtyMinus").addEventListener("click",()=> changeQty(-1));
$("#qtyPlus").addEventListener("click",()=> changeQty(1));
function changeQty(delta){
  const min = parseInt(qtyInput.min||"1");
  const max = parseInt(qtyInput.max||"5");
  let v = parseInt(qtyInput.value||"1")+delta;
  v = Math.min(max, Math.max(min, v));
  qtyInput.value = v;
}

/* ===== Pincode checker (mock) ===== */
$("#pinCheckBtn").addEventListener("click", ()=>{
  const p = $("#pinInput").value.trim();
  const msg = $("#pinMsg");
  if(!/^\d{6}$/.test(p)){ msg.textContent = "Please enter a valid 6-digit pincode."; msg.style.color="var(--bad)"; return; }
  // Simple mock: allow delivery if last digit even
  const ok = parseInt(p[p.length-1]) % 2 === 0;
  msg.textContent = ok ? "Delivery available • Arrives in 2–4 days" : "Sorry, not deliverable to this pincode yet.";
  msg.style.color = ok ? "var(--good)" : "var(--bad)";
});

/* ===== Price math (example) ===== */
const mrp = 11999, sale = 7999;
$("#finalPrice").textContent = `₹${sale.toLocaleString("en-IN")}`;
$("#mrp").textContent = `₹${mrp.toLocaleString("en-IN")}`;
$("#offPct").textContent = `${Math.round((1 - sale/mrp)*100)}% off`;
$("#stickyPrice").textContent = `₹${sale.toLocaleString("en-IN")}`;

/* ===== Tabs ===== */
const tabs = $$(".tab");
const panels = [$("#tab-details"), $("#tab-specs"), $("#tab-shipping")];
tabs.forEach(t=>{
  t.addEventListener("click", ()=>{
    tabs.forEach(b=>b.classList.remove("is-active"));
    t.classList.add("is-active");
    panels.forEach(p=>{ p.hidden = true; p.classList.remove("is-active"); });
    const id = t.dataset.tab;
    const panel = $("#tab-"+id);
    panel.hidden = false; panel.classList.add("is-active");
  });
});

/* ===== Add to cart + Sticky bar ===== */
const cartCount = $("#cartCount");
const addToCart = $("#addToCart");
const stickyAdd = $("#stickyAdd");
function addItem(){
  const qty = parseInt(qtyInput.value||"1");
  const count = parseInt(cartCount.textContent||"0") + qty;
  cartCount.textContent = String(count);
  showToast(`Added ${qty} item${qty>1?"s":""} to cart 🛒`);
}
addToCart.addEventListener("click", addItem);
stickyAdd.addEventListener("click", addItem);

/* ===== Sticky price reflects variant if needed (demo) ===== */
function syncSticky(){
  $("#stickyPrice").textContent = `₹${sale.toLocaleString("en-IN")}`;
}
["click","input"].forEach(ev=>{
  document.addEventListener(ev, syncSticky, true);
});

/* ===== Toast ===== */
let toastTimer;
function showToast(text){
  const t = $("#toast");
  t.textContent = text;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.classList.remove("show"), 2200);
}

/* ===== Theme toggle ===== */
const themeBtn = $("#themeToggle");
themeBtn.addEventListener("click", ()=>{
  const isDark = document.documentElement.dataset.theme !== "light";
  document.documentElement.dataset.theme = isDark ? "light" : "dark";
});

/* ===== Keyboard a11y extras ===== */
$$(".swatch, .seg, .thumb, .tab").forEach(el=>{
  el.tabIndex = 0;
});

/* ===== Optional: fake cart open (demo only) ===== */
$("#openCartBtn").addEventListener("click", ()=>{
  showToast("Cart drawer would open here ✨");
});
