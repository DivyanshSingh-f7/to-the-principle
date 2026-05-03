"use strict";

/* ============================================================
   PRODUCT CATALOGUE
   ============================================================ */
const PRODUCTS = [
  {
    id: 1,
    name: "WASHED STORM BLUE",
    price: 980,
    badge: "New",
    description: "Make a statement with our Washed Storm Blue Wide Leg jeans. Featuring a relaxed, wide-leg silhouette with a vintage washed finish, these jeans bring effortless street-style energy to any outfit. The deep storm blue tone fades naturally at the knees and thighs for that worn-in look you'll love on day one.",
    features: ["Wide Leg Fit", "Vintage Wash", "Stretch Denim", "Mid Rise", "5-Pocket Style"],
    image: "washed storm blue 1.PNG",
    gallery: [
      { type: "image", src: "washed storm blue 1.PNG",  label: "Look 1" },
      { type: "image", src: "washed storm blue 2.PNG",  label: "Look 2" },
      { type: "image", src: "washed storm blue 3.PNG",  label: "Look 3" },
      { type: "image", src: "washed storm blue 4.PNG",  label: "Look 4" },
      { type: "video", src: "washed storm blue vid.mp4", label: "Video" },
      {type: "image", src: "Grey Minimalist Clean Size Chart Instagram Post.png", label: "Size Chart"},
    ],
    outOfStockSizes: [],
  },
  {
    id: 2,
    name: "ICE BLUE",
    price: 980,
    badge: "New",
    description: "Clean, crisp, and endlessly versatile — our Ice Blue jeans are a wardrobe essential. The pale, frost-washed denim gives a fresh minimal aesthetic that pairs with everything from oversized tees to tailored jackets. Cut with a slim-straight profile for a modern silhouette that moves with you.",
    features: ["Slim Straight Fit", "Ice Wash", "Comfort Stretch", "Low Rise", "Contrast Stitching"],
    image: "ice blue 1.PNG",
    gallery: [
      { type: "image", src: "ice blue 1.PNG",  label: "Look 1" },
      { type: "image", src: "ice blue 2.PNG",  label: "Look 2" },
      { type: "image", src: "ice blue 3.PNG",  label: "Look 3" },
      { type: "image", src: "ice blue 4.PNG",  label: "Look 4" },
      { type: "video", src: "ice blue vid.mp4", label: "Video" },
      {type: "image", src: "Grey Minimalist Clean Size Chart Instagram Post.png", label: "Size Chart"},
    ],
    outOfStockSizes: ["30","32"],
  },
  {
    id: 3,
    name: "WASHED BLACK",
    price: 980,
    badge: "New",
    description: "The ultimate dark-side essential. Our Washed Black jeans combine the edginess of raw black denim with a softened, worn-in wash that gives them character from day one. Versatile enough for casual days yet sharp enough for nights out — these are the jeans that do it all.",
    features: ["Tapered Fit", "Washed Black", "Premium Denim", "Mid Rise", "Reinforced Seams"],
    image: "washed black 1.PNG",
    gallery: [
      { type: "image", src: "washed black 1.PNG",  label: "Look 1" },
      { type: "image", src: "washed black 2.PNG",  label: "Look 2" },
      { type: "image", src: "washed black 3.PNG",  label: "Look 3" },
      { type: "image", src: "washed black 4.PNG",  label: "Look 4" },
      { type: "video", src: "washed black vid.mp4", label: "Video" },
      {type:"image",src:"Grey Minimalist Clean Size Chart Instagram Post (1).png",label:"Size Chart"},

    ],
    outOfStockSizes: ["36"],
  },
];

/* ---- State ---- */
let cart = [];
let selectedProduct = null;
let selectedSize = null;
let currentGalleryIndex = 0;

/* ---- DOM ---- */
const productGrid    = document.getElementById("productGrid");
const cartCount      = document.getElementById("cartCount");
const cartToggle     = document.getElementById("cartToggle");
const cartOverlay    = document.getElementById("cartOverlay");
const cartSidebar    = document.getElementById("cartSidebar");
const cartClose      = document.getElementById("cartClose");
const cartItems      = document.getElementById("cartItems");
const cartFooter     = document.getElementById("cartFooter");
const cartNavLink    = document.getElementById("cartNavLink");
const hamburger      = document.getElementById("hamburger");
const nav            = document.getElementById("nav");
const header         = document.getElementById("header");
const toast          = document.getElementById("toast");

const productModal   = document.getElementById("productModal");
const modalOverlay   = document.getElementById("modalOverlay");
const modalClose     = document.getElementById("modalClose");
const modalName      = document.getElementById("modalName");
const modalPrice     = document.getElementById("modalPrice");
const modalBadge     = document.getElementById("modalBadge");
const modalDescription = document.getElementById("modalDescription");
const modalFeatures  = document.getElementById("modalFeatures");
const modalAddToCart = document.getElementById("modalAddToCart");
const sizeOptions    = document.getElementById("sizeOptions");
const galleryMain    = document.getElementById("galleryMain");
const galleryLabel   = document.getElementById("galleryLabel");
const galleryThumbs  = document.getElementById("galleryThumbs");
const galleryPrev    = document.getElementById("galleryPrev");
const galleryNext    = document.getElementById("galleryNext");

const imgLightbox    = document.getElementById("imgLightbox");
const lightboxClose  = document.getElementById("lightboxClose");
const lightboxImg    = document.getElementById("lightboxImg");

// Instagram popup elements
const instaPopupOverlay   = document.getElementById("instaPopupOverlay");
const instaPopupClose     = document.getElementById("instaPopupClose");
const instaOrderSummary   = document.getElementById("instaOrderSummary");
const instaPopupCopyBtn   = document.getElementById("instaPopupCopyBtn");
const instaPopupProceedBtn = document.getElementById("instaPopupProceedBtn");

/* ============================================================
   PRODUCT RENDERING
   ============================================================ */
function renderProducts() {
  productGrid.innerHTML = PRODUCTS.map((p) => `
    <article class="card" data-id="${p.id}" role="button" tabindex="0" aria-label="View ${p.name}">
      <div class="card__img-wrap">
        ${p.badge ? `<span class="card__badge">${p.badge}</span>` : ""}
        <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.visibility='hidden'" />
      </div>
      <div class="card__body">
        <h3 class="card__name">${p.name}</h3>
        <p class="card__price">₹${p.price.toFixed(2)}</p>
        <button class="btn--cart" data-action="open-modal" data-id="${p.id}" aria-label="View ${p.name}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          Add to Cart
        </button>
      </div>
    </article>
  `).join("");
}

/* ============================================================
   GALLERY LOGIC
   ============================================================ */
function stopAllVideos() {
  galleryMain.querySelectorAll("video").forEach(v => { v.pause(); v.currentTime = 0; });
}

function getProductMedia(product) {
  const media = Array.isArray(product.gallery) ? [...product.gallery] : [];
  if (product.sizeChart) {
    media.push({ type: "image", src: product.sizeChart, label: "Size Chart" });
  }
  return media;
}

function setGallerySlide(index) {
  if (!selectedProduct) return;
  const media = getProductMedia(selectedProduct);
  if (!media.length) return;

  currentGalleryIndex = (index + media.length) % media.length;
  const item = media[currentGalleryIndex];

  stopAllVideos();

  const existingMedia = galleryMain.querySelector("img, video");
  if (existingMedia) existingMedia.remove();

  galleryLabel.textContent = item.label;

  let el;
  if (item.type === "video") {
    el = document.createElement("video");
    el.src = item.src;
    el.controls = true;
    el.playsInline = true;
    el.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;background:#000;";
    galleryMain.style.cursor = "default";
  } else {
    el = document.createElement("img");
    el.src = item.src;
    el.alt = selectedProduct.name + " " + item.label;
    el.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;";
    el.onerror = function() { this.style.visibility = "hidden"; };
    galleryMain.style.cursor = "zoom-in";
  }

  galleryMain.insertBefore(el, galleryLabel);

  galleryThumbs.querySelectorAll(".gallery-thumb").forEach((t, i) => {
    t.classList.toggle("active", i === currentGalleryIndex);
  });
}

function buildGalleryThumbs(product) {
  const media = getProductMedia(product);
  galleryThumbs.innerHTML = media.map((item, i) => {
    if (item.type === "video") {
      return `
        <div class="gallery-thumb" data-index="${i}">
          <video src="${item.src}" muted preload="metadata" style="width:100%;height:100%;object-fit:cover;pointer-events:none;"></video>
          <div class="thumb-play-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>`;
    }
    return `
      <div class="gallery-thumb" data-index="${i}">
        <img src="${item.src}" alt="${item.label}" onerror="this.style.visibility='hidden'" />
      </div>`;
  }).join("");

  galleryThumbs.querySelectorAll(".gallery-thumb").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      setGallerySlide(parseInt(thumb.dataset.index, 10));
    });
  });
}

galleryPrev.addEventListener("click", () => setGallerySlide(currentGalleryIndex - 1));
galleryNext.addEventListener("click", () => setGallerySlide(currentGalleryIndex + 1));

galleryMain.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    lightboxImg.src = e.target.src;
    imgLightbox.classList.add("active");
  }
});

lightboxClose.addEventListener("click", () => imgLightbox.classList.remove("active"));
imgLightbox.addEventListener("click", (e) => {
  if (e.target === imgLightbox) imgLightbox.classList.remove("active");
});

/* ============================================================
   MODAL LOGIC
   ============================================================ */
function openModal(id) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;

  selectedProduct = product;
  selectedSize = null;
  currentGalleryIndex = 0;

  modalBadge.textContent = product.badge || "";
  modalBadge.style.display = product.badge ? "inline-block" : "none";
  modalName.textContent = product.name;
  modalPrice.textContent = `₹${product.price.toFixed(2)}`;
  modalDescription.textContent = product.description || "";

  modalFeatures.innerHTML = (product.features || []).map(f =>
    `<span class="modal-feature-tag">${f}</span>`
  ).join("");

  updateSizeOptions(product);
  sizeOptions.querySelectorAll("button").forEach(b => b.classList.remove("active"));

  buildGalleryThumbs(product);
  setGallerySlide(0);

  productModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function updateSizeOptions(product) {
  const disabledSizes = new Set((product.outOfStockSizes || []).map(String));
  sizeOptions.querySelectorAll("button").forEach((btn) => {
    const size = btn.dataset.size;
    const isDisabled = disabledSizes.has(size);
    btn.disabled = isDisabled;
    btn.textContent = isDisabled ? `${size} ` : size;
    btn.classList.remove("active");
  });
}

function closeModal() {
  stopAllVideos();
  productModal.classList.remove("active");
  if (!cartSidebar.classList.contains("active")) document.body.style.overflow = "";
  selectedProduct = null;
  selectedSize = null;
}

sizeOptions.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-size]");
  if (!btn) return;
  selectedSize = btn.dataset.size;
  sizeOptions.querySelectorAll("button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
});

modalAddToCart.addEventListener("click", () => {
  if (!selectedProduct) return;
  if (!selectedSize) {
    sizeOptions.style.outline = "2px solid #e04747";
    sizeOptions.style.borderRadius = "6px";
    setTimeout(() => { sizeOptions.style.outline = ""; sizeOptions.style.borderRadius = ""; }, 1200);
    showToast("Please select a size first");
    return;
  }
  const cartKey = `${selectedProduct.id}-${selectedSize}`;
  const existing = cart.find(i => i.cartKey === cartKey);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...selectedProduct, size: selectedSize, cartKey, qty: 1 });
  }
  updateCartCount();
  animateBadge();
  showToast(`"${selectedProduct.name}" (Size ${selectedSize}) added to cart`);
  closeModal();
});

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (productModal.classList.contains("active")) {
    if (e.key === "ArrowLeft") setGallerySlide(currentGalleryIndex - 1);
    if (e.key === "ArrowRight") setGallerySlide(currentGalleryIndex + 1);
    if (e.key === "Escape") closeModal();
    return;
  }
  if (e.key === "Escape" && cartSidebar.classList.contains("active")) closeCart();
  if (e.key === "Escape" && instaPopupOverlay.classList.contains("active")) closeInstaPopup();
});

/* ============================================================
   INSTAGRAM POPUP LOGIC
   ============================================================ */
function buildOrderMessage() {
  let message = "Hello! I want to order from TO THE PRINCIPLE:\n\n";
  cart.forEach(item => {
    message += `• ${item.name} — Size ${item.size} (x${item.qty}) — ₹${item.price}\n`;
  });
  message += `\nTotal: ₹${getCartTotal().toFixed(2)}\n\nPlease confirm availability. Thank you!`;
  return message;
}

function openInstaPopup() {
  const message = buildOrderMessage();
  instaOrderSummary.textContent = message;
  instaPopupCopyBtn.textContent = "";
  instaPopupCopyBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
    Copy Order Summary`;
  instaPopupCopyBtn.classList.remove("copied");
  instaPopupProceedBtn.href = "https://ig.me/m/_totheprinciple_";
  instaPopupOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeInstaPopup() {
  instaPopupOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

instaPopupClose.addEventListener("click", closeInstaPopup);
instaPopupOverlay.addEventListener("click", (e) => {
  if (e.target === instaPopupOverlay) closeInstaPopup();
});

instaPopupCopyBtn.addEventListener("click", () => {
  const text = instaOrderSummary.textContent;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      instaPopupCopyBtn.classList.add("copied");
      instaPopupCopyBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Copied!`;
      showToast("Order summary copied!");
    }).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
});

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.cssText = "position:fixed;left:-9999px;top:-9999px;opacity:0;";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    instaPopupCopyBtn.classList.add("copied");
    instaPopupCopyBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      Copied!`;
    showToast("Order summary copied!");
  } catch (err) {
    showToast("Please select and copy the text manually");
  }
  document.body.removeChild(ta);
}

/* ============================================================
   CART LOGIC
   ============================================================ */
function removeFromCart(cartKey) {
  cart = cart.filter(i => i.cartKey !== cartKey);
  updateCartCount();
  renderCartPanel();
}

function changeQty(cartKey, delta) {
  const item = cart.find(i => i.cartKey === cartKey);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(cartKey); return; }
  updateCartCount();
  renderCartPanel();
}

function getTotalItems() { return cart.reduce((s, i) => s + i.qty, 0); }
function getCartTotal()  { return cart.reduce((s, i) => s + i.price * i.qty, 0); }

function getPricingBreakdown() {
  const baseTotal = getCartTotal();
  const gst       = Math.round(baseTotal * 0.18);
  const discount  = gst;
  return { baseTotal, gst, discount };
}

function renderCartPanel() {
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <p>Your cart is empty.<br>Start shopping!</p>
      </div>`;
    cartFooter.innerHTML = "";
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item" data-key="${item.cartKey}">
      <img class="cart-item__img" src="${item.image}" alt="${item.name}" onerror="this.style.visibility='hidden'" />
      <div class="cart-item__info">
        <p class="cart-item__name">${item.name}</p>
        <p class="cart-item__size">Size: ${item.size}</p>
        <p class="cart-item__price">₹${item.price.toFixed(2)}</p>
        <div class="cart-item__qty">
          <button class="qty-btn" data-action="decrease" data-key="${item.cartKey}" aria-label="Decrease">−</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn" data-action="increase" data-key="${item.cartKey}" aria-label="Increase">+</button>
        </div>
      </div>
      <button class="cart-item__remove" data-action="remove" data-key="${item.cartKey}" aria-label="Remove">&times;</button>
    </div>
  `).join("");

  const itemCount = getTotalItems();
  const { baseTotal, gst, discount } = getPricingBreakdown();
  const final = getCartTotal();

  cartFooter.innerHTML = `
    <div style="font-size:0.8rem;color:#555;margin-bottom:4px;display:flex;justify-content:space-between;">
      <span>Subtotal (${itemCount} item${itemCount !== 1 ? "s" : ""})</span>
      <span>₹${baseTotal.toFixed(2)}</span>
    </div>
    <div style="font-size:0.78rem;color:#888;margin-bottom:4px;display:flex;justify-content:space-between;">
      <span>GST (18%)</span>
      <span style="color:#c0392b;">+₹${gst.toFixed(2)}</span>
    </div>
    <div style="font-size:0.78rem;color:#27ae60;margin-bottom:10px;display:flex;justify-content:space-between;font-weight:600;">
      <span>🎉 Special Discount</span>
      <span>−₹${discount.toFixed(2)}</span>
    </div>
    <div style="height:1px;background:#e8e5e0;margin-bottom:12px;"></div>
    <div class="cart-total">
      <span style="font-weight:700;">Total Payable</span>
      <strong>₹${final.toFixed(2)}</strong>
    </div>
    <p style="font-size:0.7rem;color:#27ae60;text-align:right;margin-top:-8px;margin-bottom:12px;">
      You save ₹${discount.toFixed(2)} on this order!
    </p>
    <button class="btn--checkout" id="checkoutBtn">Proceed to Checkout</button>`;

  document.getElementById("checkoutBtn").addEventListener("click", () => {
    const message = buildOrderMessage();
    const whatsappUrl = `https://wa.me/918650584101?text=${encodeURIComponent(message)}`;

    cartFooter.innerHTML = `
      <div class="cart-total">
        <span>Total (${getTotalItems()} item${getTotalItems() !== 1 ? "s" : ""})</span>
        <strong>₹${getCartTotal().toFixed(2)}</strong>
      </div>
      <p style="font-size:0.78rem;color:#888;text-align:center;margin-bottom:12px;font-weight:500;">Choose how to send your order:</p>
      <div style="display:flex;gap:10px;">
        <a href="${whatsappUrl}" target="_blank" style="
          flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
          padding:13px 10px; border-radius:8px; font-size:0.8rem; font-weight:700;
          letter-spacing:0.06em; text-transform:uppercase; text-decoration:none;
          background:#25D366; color:#fff; transition:opacity 0.2s;
        " onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </a>
        <button id="instaOrderBtn" style="
          flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
          padding:13px 10px; border-radius:8px; font-size:0.8rem; font-weight:700;
          letter-spacing:0.06em; text-transform:uppercase; border:none; cursor:pointer;
          font-family:inherit;
          background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);
          color:#fff; transition:opacity 0.2s;
        " onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
          Instagram
        </button>
      </div>`;

    document.getElementById("instaOrderBtn").addEventListener("click", () => {
      openInstaPopup();
    });
  });
}

function openCart() {
  cartSidebar.classList.add("active");
  cartOverlay.classList.add("active");
  cartSidebar.setAttribute("aria-hidden", "false");
  cartOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  renderCartPanel();
}
function closeCart() {
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
  cartSidebar.setAttribute("aria-hidden", "true");
  cartOverlay.setAttribute("aria-hidden", "true");
  if (!productModal.classList.contains("active")) document.body.style.overflow = "";
}

function updateCartCount() { cartCount.textContent = getTotalItems(); }

let toastTimer = null;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function animateBadge() {
  cartCount.classList.remove("bump");
  void cartCount.offsetWidth;
  cartCount.classList.add("bump");
  cartCount.addEventListener("transitionend", () => cartCount.classList.remove("bump"), { once: true });
}

/* ============================================================
   EVENT DELEGATION
   ============================================================ */
productGrid.addEventListener("click", (e) => {
  const btn = e.target.closest('[data-action="open-modal"]');
  if (btn) { e.stopPropagation(); openModal(parseInt(btn.dataset.id, 10)); return; }
  const card = e.target.closest(".card");
  if (card) openModal(parseInt(card.dataset.id, 10));
});

productGrid.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    const card = e.target.closest(".card");
    if (card) { e.preventDefault(); openModal(parseInt(card.dataset.id, 10)); }
  }
});

cartItems.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const key = btn.dataset.key, action = btn.dataset.action;
  if (action === "increase") changeQty(key, 1);
  if (action === "decrease") changeQty(key, -1);
  if (action === "remove")   removeFromCart(key);
});

cartToggle.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
cartNavLink.addEventListener("click", (e) => { e.preventDefault(); openCart(); if (nav.classList.contains("open")) closeNav(); });

function openNav() { nav.classList.add("open"); hamburger.classList.add("active"); hamburger.setAttribute("aria-expanded", "true"); }
function closeNav() { nav.classList.remove("open"); hamburger.classList.remove("active"); hamburger.setAttribute("aria-expanded", "false"); }
hamburger.addEventListener("click", () => nav.classList.contains("open") ? closeNav() : openNav());
nav.querySelectorAll(".nav__link").forEach(link => { if (link.id !== "cartNavLink") link.addEventListener("click", closeNav); });

window.addEventListener("scroll", () => { header.classList.toggle("scrolled", window.scrollY > 30); }, { passive: true });

/* ============================================================ INIT */
renderProducts();
updateCartCount();