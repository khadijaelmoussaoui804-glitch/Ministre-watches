import { useState } from "react";
import "./App.css";

export default function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    product: null,
    currentIndex: 0
  });

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const products = [
    {
      id: 1,
      name: "Rolex Classic",
      price: 200,
      category: "luxury",
      isRealPhoto: true,
      colors: [
        { name: "Vert/Or", image: "rolex1.png" },
        { name: "Or/Blanc", image: "rolex2.png" },
        { name: "Argenté/Or", image: "rolex4.png" },
        { name: "Vert foncé/Or", image: "rolex3.png" },
      ],
      description: "Élégance intemporelle avec cadran et bracelet premium",
    },
    {
      id: 2,
      name: "Patek Philippe",
      price: 170,
      category: "luxury",
      isRealPhoto: true,
      colors: [
        { name: "Marron/Argenté", image: "patek1.png" },
        { name: "Bleu/Argenté", image: "patek2.png" },
        { name: "Blanc/Argenté", image: "patek3.png" },
      ],
      description: "Design sophistiqué Patek Philippe avec boîtier en acier",
    },
    {
      id: 3,
      name: "Tissot PRX",
      price: 180,
      category: "sport",
      isRealPhoto: true,
      colors: [
        { name: "Noir/Argenté", image: "tissot1.png" },
        { name: "Blanc/Argenté", image: "tissot2.png" },
        { name: "Turquoise/Or", image: "tissot3.png" },
      ],
      description: "Tissot PRX Powermatic 80 - Style sportif et moderne",
    },
    {
      id: 4,
      name: "Casio Quartz",
      price: 170,
      category: "classic",
      isRealPhoto: true,
      colors: [
        { name: "Vert/Cuir noir", image: "casio1.png" },
        { name: "Noir/Cuir noir", image: "casio2.png" },
        { name: "Bleu/Bracelet acier", image: "casio3.png" },
      ],
      description: "Casio Quartz vintage - Style rétro élégant et intemporel",
    },
    {
      id: 5,
      name: "AP HOMMES",
      price: 200,
      category: "luxury",
      isRealPhoto: true,
      colors: [
        { name: "Acier/Argenté", image: "ap1.png" },
      ],
      description: "Élégance iconique avec cadran 'Grande Tapisserie' et boîtier en acier.",
    },
    {
      id: 6,
      name: "Pack Casio + Tissot",
      price: 330,
      category: "pack",
      isPack: true,
      packImages: [
        { image: "casio3.png" },
        { image: "tissot1.png" }
      ],
      colors: [
        { name: "Pack 1" },
      ],
      description: "Pack de 2 montres : Casio Quartz + Tissot PRX - Économisez 20 DH",
    },
    {
      id: 7,
      name: "Pack Rolex + Patek",
      price: 350,
      category: "pack",
      isPack: true,
      packImages: [
        { image: "rolex1.png" },
        { image: "patek1.png" }
      ],
      colors: [
        { name: "Pack 2" },
      ],
      description: "Pack de 2 montres : Rolex Classic + Patek Philippe - Économisez 20 DH",
    },
    {
      id: 8,
      name: "Pack Patek + Tissot",
      price: 330,
      category: "pack",
      isPack: true,
      packImages: [
        { image: "patek1.png" },
        { image: "tissot1.png" }
      ],
      colors: [
        { name: "Pack 3" },
      ],
      description: "Pack de 2 montres : Patek Philippe + Tissot PRX - Économisez 20 DH",
    }
  ];
  const selectColor = (productId, colorIndex) => {
    setSelectedColors({
      ...selectedColors,
      [productId]: colorIndex
    });
  };

  const nextImage = (productId, product) => {
    const currentIndex = selectedColors[productId] || 0;
    const nextIndex = (currentIndex + 1) % product.colors.length;
    selectColor(productId, nextIndex);
  };

  const prevImage = (productId, product) => {
    const currentIndex = selectedColors[productId] || 0;
    const prevIndex = currentIndex === 0 ? product.colors.length - 1 : currentIndex - 1;
    selectColor(productId, prevIndex);
  };

  const openLightbox = (product, colorIndex) => {
    setLightbox({
      isOpen: true,
      product: product,
      currentIndex: colorIndex
    });
  };

  const closeLightbox = () => {
    setLightbox({
      isOpen: false,
      product: null,
      currentIndex: 0
    });
  };

  const nextLightboxImage = () => {
    if (!lightbox.product) return;
    const nextIndex = (lightbox.currentIndex + 1) % lightbox.product.colors.length;
    setLightbox({ ...lightbox, currentIndex: nextIndex });
  };

  const prevLightboxImage = () => {
    if (!lightbox.product) return;
    const prevIndex = lightbox.currentIndex === 0 
      ? lightbox.product.colors.length - 1 
      : lightbox.currentIndex - 1;
    setLightbox({ ...lightbox, currentIndex: prevIndex });
  };

  const addToCart = (product) => {
    const colorIndex = selectedColors[product.id] || 0;
    const selectedColor = product.colors[colorIndex];
    
    const productWithColor = {
      ...product,
      selectedColor: selectedColor,
      cartId: `${product.id}-${colorIndex}`
    };

    const existing = cart.find((item) => item.cartId === productWithColor.cartId);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.cartId === productWithColor.cartId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      );
    } else {
      setCart([...cart, { ...productWithColor, quantity: 1 }]);
    }
    setShowCart(true);
  };

  const updateQuantity = (cartId, delta) => {
    setCart(
      cart
        .map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter((item) => item.cartId !== cartId));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Validation spéciale pour le champ téléphone
    if (name === "phone") {
      // Permettre seulement les chiffres, espaces, et le signe +
      const cleanValue = value.replace(/[^\d\s+]/g, '');
      
      // Compter les chiffres sans espaces
      const digitsOnly = cleanValue.replace(/[\s+]/g, '');
      
      // Limiter selon les règles:
      // - Avec +212: max 12 chiffres (212 + 10 chiffres)
      // - Sans +212: max 10 chiffres
      const hasPlus = cleanValue.startsWith('+');
      const maxDigits = hasPlus ? 12 : 10;
      
      if (digitsOnly.length <= maxDigits) {
        setCustomerInfo({
          ...customerInfo,
          [name]: cleanValue,
        });
      }
    } else {
      setCustomerInfo({
        ...customerInfo,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    return (
      customerInfo.name.trim() !== "" &&
      customerInfo.phone.trim() !== "" &&
      customerInfo.address.trim() !== "" &&
      customerInfo.city.trim() !== ""
    );
  };

  const sendWhatsAppOrder = (e) => {
    e.preventDefault();
    
    if (!validateForm() || cart.length === 0) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const phoneNumber = "212786511901"; // Numéro du contact footer: +212 786 511 901
    
    const parts = [];
    parts.push("✨ *MINISTRE WATCHES*");
    parts.push("Nouvelle commande");
    parts.push("━━━━━━━━━━━━━━━━━━━━");
    parts.push("");
    parts.push("*CLIENT*");
    parts.push(customerInfo.name);
    parts.push(`📞 ${customerInfo.phone}`);
    parts.push(`📍 ${customerInfo.address}, ${customerInfo.city}`);
    parts.push("");
    parts.push("━━━━━━━━━━━━━━━━━━━━");
    parts.push("");
    parts.push("*PRODUITS*");
    parts.push("");
    cart.forEach((item, index) => {
      parts.push(`${index + 1}. *${item.name}*`);
      parts.push(`   ${item.selectedColor.name}`);
      parts.push(`   Qté: ${item.quantity} × ${item.price} DH = *${item.price * item.quantity} DH*`);
      parts.push("");
    });
    parts.push("━━━━━━━━━━━━━━━━━━━━");
    parts.push("");
    parts.push(`*TOTAL: ${getTotal()} DH*`);
    parts.push("✅ Livraison gratuite");
    parts.push("");
    parts.push("Merci pour votre confiance ! 🙏");
    
    const message = parts.join("%0A");
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
    
    setShowCheckoutForm(false);
    setShowCart(false);
    setCart([]);
    setCustomerInfo({
      name: "",
      phone: "",
      address: "",
      city: "",
    });
    
    alert("Votre commande a été envoyée via WhatsApp ! Merci 🎉");
  };

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="app">
      <header className="header">
        <div className="container header-content">
          <div className="logo" onClick={() => scrollTo("hero")}>
            <img src="/logo.png" alt="Ministre Watches Logo" className="logo-image" />
          </div>
          <nav className="nav">
            <button onClick={() => scrollTo("hero")}>Accueil</button>
            <button onClick={() => scrollTo("products")}>Montres</button>
            <button onClick={() => scrollTo("collections")}>Collections</button>
            <button onClick={() => scrollTo("footer")}>Contact</button>
          </nav>
          <button className="cart-button" onClick={() => setShowCart(!showCart)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {getItemCount() > 0 && <span className="cart-count">{getItemCount()}</span>}
          </button>
        </div>
      </header>

      <div className={`cart-panel ${showCart ? "open" : ""}`}>
        <div className="cart-header">
          <h3>Votre Panier</h3>
          <button className="close-cart" onClick={() => setShowCart(false)}>✕</button>
        </div>
        <div className="cart-content">
          {cart.length === 0 ? (
            <p className="empty-cart">Votre panier est vide</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.cartId} className="cart-item">
                  <div className="cart-item-info">
                    <img src={`/${item.selectedColor.image}`} alt={item.name} className="cart-item-preview" />
                    <div>
                      <h4>{item.name}</h4>
                      <p className="cart-item-color">{item.selectedColor.name}</p>
                      <p className="cart-item-price">{item.price} DH</p>
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.cartId, -1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cartId, 1)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.cartId)}>Supprimer</button>
                  </div>
                </div>
              ))}
              <div className="cart-total">
                <div className="total-row"><span>Sous-total</span><span>{getTotal()} DH</span></div>
                <div className="total-row"><span>Livraison</span><span className="free">Gratuite</span></div>
                <div className="total-row total-final"><span>Total</span><span>{getTotal()} DH</span></div>
              </div>
              <button className="checkout-btn" onClick={() => { setShowCart(false); setShowCheckoutForm(true); }}>
                Passer la commande
              </button>
            </>
          )}
        </div>
      </div>

      {showCheckoutForm && (
        <div className="checkout-modal">
          <div className="checkout-modal-overlay" onClick={() => setShowCheckoutForm(false)}></div>
          <div className="checkout-form-container">
            <div className="checkout-form-header">
              <h2>Informations de livraison</h2>
              <button className="close-form" onClick={() => setShowCheckoutForm(false)}>✕</button>
            </div>
            <form className="checkout-form" onSubmit={sendWhatsAppOrder}>
              <div className="form-group">
                <label htmlFor="name">Nom complet *</label>
                <input type="text" id="name" name="name" value={customerInfo.name} onChange={handleInputChange} placeholder="Votre nom complet" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Téléphone *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={customerInfo.phone} 
                  onChange={handleInputChange} 
                  placeholder="+212 6XX XXX XXX ou 06XX XXX XXX" 
                  pattern="^(\+212[0-9]{9}|0[0-9]{9})$"
                  title="Entrez 10 chiffres (ex: 0612345678) ou 12 chiffres avec +212"
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Adresse complète *</label>
                <textarea id="address" name="address" value={customerInfo.address} onChange={handleInputChange} placeholder="Numéro, rue, quartier..." rows="3" required />
              </div>
              <div className="form-group">
                <label htmlFor="city">Ville *</label>
                <input type="text" id="city" name="city" value={customerInfo.city} onChange={handleInputChange} placeholder="Votre ville" required />
              </div>
              <div className="form-summary">
                <div className="summary-row"><span>Articles ({getItemCount()})</span><span>{getTotal()} DH</span></div>
                <div className="summary-row"><span>Livraison</span><span className="free">Gratuite</span></div>
                <div className="summary-row total"><span>Total</span><span>{getTotal()} DH</span></div>
              </div>
              <button type="submit" className="submit-order-btn" disabled={!validateForm()}>
                Confirmer et envoyer via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}

      {showCart && <div className="cart-overlay" onClick={() => setShowCart(false)}></div>}

      <section className="hero" id="hero">
        <div className="hero-bg"></div>
        <div className="container hero-content">
          <div className="hero-text">
            <h1>MINISTRE<br />WATCHES</h1>
            <p className="subtitle">Timeless Elegance · Modern Craft</p>
            <p className="info">Benguerir – Livraison gratuite partout au Maroc</p>
            <button className="cta-button" onClick={() => scrollTo("products")}>
              DÉCOUVRIR LA COLLECTION
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="hero-watches">
            <div className="watch-display">
              <div className="watch-inner-circle">
                <img src="/logo.png" alt="Ministre Logo" className="watch-logo" style={{ clipPath: 'inset(0 20% 0 0)', transform: 'scale(1.2)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="products container" id="products">
        <div className="section-header">
          <h2>Collection Rolex</h2>
          <p className="section-subtitle">Montres de luxe exceptionnelles - Prix spécial 200 DH</p>
          <div className="category-filters">
            <button className={selectedCategory === "all" ? "active" : ""} onClick={() => { setSelectedCategory("all"); scrollTo("products"); }}>Toutes</button>
            <button className={selectedCategory === "classic" ? "active" : ""} onClick={() => { setSelectedCategory("classic"); scrollTo("products"); }}>Classic</button>
            <button className={selectedCategory === "sport" ? "active" : ""} onClick={() => { setSelectedCategory("sport"); scrollTo("products"); }}>Sport</button>
            <button className={selectedCategory === "luxury" ? "active" : ""} onClick={() => { setSelectedCategory("luxury"); scrollTo("products"); }}>Luxury</button>
            <button className={selectedCategory === "pack" ? "active" : ""} onClick={() => { setSelectedCategory("pack"); scrollTo("products"); }}>Packs</button>
          </div>
        </div>

        <div className="product-grid">
          {filteredProducts.map((p) => {
            const currentColorIndex = selectedColors[p.id] || 0;
            const currentColor = p.colors[currentColorIndex];
            
            return (
              <div className="product-card" key={p.id}>
                <div className="product-img-wrapper">
                  <div className="product-img-container">
                    {/* Navigation Arrows */}
                    {p.colors.length > 1 && (
                      <>
                        <button 
                          className="image-nav-arrow left-arrow"
                          onClick={(e) => {
                            e.stopPropagation();
                            prevImage(p.id, p);
                          }}
                          aria-label="Image précédente"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M15 18l-6-6 6-6" />
                          </svg>
                        </button>
                        <button 
                          className="image-nav-arrow right-arrow"
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage(p.id, p);
                          }}
                          aria-label="Image suivante"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </button>
                      </>
                    )}

                    <div className="product-img">
                      {p.isPack ? (
                        <div 
                          className="pack-images-container"
                          onClick={() => openLightbox(p, currentColorIndex)}
                          style={{ cursor: 'pointer' }}
                        >
                          <img 
                            src={`/${p.packImages[0].image}`} 
                            alt={p.name} 
                            className="pack-watch-img"
                          />
                          <div className="pack-plus">+</div>
                          <img 
                            src={`/${p.packImages[1].image}`} 
                            alt={p.name} 
                            className="pack-watch-img"
                          />
                        </div>
                      ) : p.isRealPhoto ? (
                        <img 
                          src={`/${currentColor.image}`} 
                          alt={p.name} 
                          className="product-real-photo"
                          onClick={() => openLightbox(p, currentColorIndex)}
                          style={{ cursor: 'pointer' }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            background: `linear-gradient(135deg, ${currentColor.main} 0%, ${currentColor.accent} 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '10px',
                            cursor: 'pointer'
                          }}
                          onClick={() => openLightbox(p, currentColorIndex)}
                        >
                          <div className="watch-face">
                            <div className="watch-hands" style={{ borderColor: currentColor.accent }}></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Image Indicators */}
                    {p.colors.length > 1 && (
                      <div className="image-indicators">
                        {p.colors.map((_, index) => (
                          <button
                            key={index}
                            className={`indicator-dot ${currentColorIndex === index ? 'active' : ''}`}
                            onClick={() => selectColor(p.id, index)}
                            aria-label={`Voir couleur ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="product-info">
                  <h3>{p.name}</h3>
                  <p className="product-description">{p.description}</p>
                  
                  {/* Color Selection Circles */}
                  {!p.isPack && p.isRealPhoto ? (
                    <div className="product-colors">
                      {p.colors.map((color, index) => (
                        <div
                          key={index}
                          className={`color-photo-dot ${currentColorIndex === index ? 'active' : ''}`}
                          onClick={() => selectColor(p.id, index)}
                          title={color.name}
                        >
                          <img 
                            src={`/${color.image}`} 
                            alt={color.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: '50%'
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : !p.isPack ? (
                    <div className="product-colors">
                      {p.colors.map((color, index) => (
                        <div
                          key={index}
                          className={`color-dot ${currentColorIndex === index ? 'active' : ''}`}
                          style={{ 
                            background: `linear-gradient(135deg, ${color.main}, ${color.accent})`,
                          }}
                          onClick={() => selectColor(p.id, index)}
                          title={color.name}
                        ></div>
                      ))}
                    </div>
                  ) : null}

                  <div className="product-footer">
                    <span className="product-price">{p.price} DH</span>
                    <button className="add-to-cart-btn" onClick={() => addToCart(p)}>Ajouter au panier</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredProducts.length === 0 && <p className="no-products">Aucune montre disponible dans cette catégorie.</p>}
      </section>

      <section className="collections container" id="collections">
        <h2>Nos Collections</h2>
        <div className="collections-grid">
          <div className="collection-card collection-classic" onClick={() => { setSelectedCategory("classic"); scrollTo("products"); }}>
            <h3>Classic</h3><p>Élégance intemporelle</p>
          </div>
          <div className="collection-card collection-sport" onClick={() => { setSelectedCategory("sport"); scrollTo("products"); }}>
            <h3>Sport</h3><p>Performance & style</p>
          </div>
          <div className="collection-card collection-luxury" onClick={() => { setSelectedCategory("luxury"); scrollTo("products"); }}>
            <h3>Luxury</h3><p>Sophistication absolue</p>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightbox.isOpen && lightbox.product && (
        <div className="lightbox-modal" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            ✕
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {lightbox.product.colors.length > 1 && (
              <>
                <button 
                  className="lightbox-arrow lightbox-arrow-left"
                  onClick={prevLightboxImage}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button 
                  className="lightbox-arrow lightbox-arrow-right"
                  onClick={nextLightboxImage}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}

            <div className="lightbox-image-container">
              {lightbox.product.isPack ? (
                <div className="pack-images-container" style={{ background: 'white', borderRadius: '12px', padding: '40px' }}>
                  <img 
                    src={`/${lightbox.product.packImages[0].image}`} 
                    alt={lightbox.product.name}
                    className="lightbox-pack-img"
                  />
                  <div className="pack-plus" style={{ fontSize: '48px' }}>+</div>
                  <img 
                    src={`/${lightbox.product.packImages[1].image}`} 
                    alt={lightbox.product.name}
                    className="lightbox-pack-img"
                  />
                </div>
              ) : lightbox.product.isRealPhoto ? (
                <img 
                  src={`/${lightbox.product.colors[lightbox.currentIndex].image}`} 
                  alt={lightbox.product.name}
                  className="lightbox-image"
                />
              ) : (
                <div
                  className="lightbox-image"
                  style={{
                    background: `linear-gradient(135deg, ${lightbox.product.colors[lightbox.currentIndex].main} 0%, ${lightbox.product.colors[lightbox.currentIndex].accent} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '10px'
                  }}
                >
                  <div className="watch-face" style={{ width: '250px', height: '250px' }}>
                    <div className="watch-hands" style={{ borderColor: lightbox.product.colors[lightbox.currentIndex].accent, height: '90px' }}></div>
                  </div>
                </div>
              )}
            </div>

            <div className="lightbox-info">
              <h3>{lightbox.product.name}</h3>
              <p className="lightbox-color-name">{lightbox.product.colors[lightbox.currentIndex].name}</p>
              <p className="lightbox-price">{lightbox.product.price} DH</p>
            </div>

            {lightbox.product.colors.length > 1 && (
              <div className="lightbox-indicators">
                {lightbox.product.colors.map((_, index) => (
                  <button
                    key={index}
                    className={`lightbox-indicator ${lightbox.currentIndex === index ? 'active' : ''}`}
                    onClick={() => setLightbox({ ...lightbox, currentIndex: index })}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="footer" id="footer">
        <div className="container footer-grid">
          <div className="footer-section">
            <div className="footer-logo-title"><img src="/logo.png" alt="Ministre Watches Logo" className="footer-logo-image" /></div>
            <p className="footer-desc">Ministre Watches</p>
            <p className="footer-desc">Montres de luxe et élégance</p>
            <p className="footer-desc">Benguerir, Maroc</p>
          </div>
          <div className="footer-section">
            <h4>Navigation</h4>
            <p onClick={() => scrollTo("hero")}>Accueil</p>
            <p onClick={() => scrollTo("products")}>Montres</p>
            <p onClick={() => scrollTo("collections")}>Collections</p>
            <p onClick={() => scrollTo("footer")}>Contact</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>WhatsApp : +212 786 511 901</p>
            <p>Email : contact@ministre-watches.ma</p>
            <p>Instagram : Ministre_watches</p>
          </div>
          <div className="footer-section">
            <h4>Service Client</h4>
            <p>Livraison gratuite au Maroc</p>
            <p>Paiement à la livraison</p>
            <p>Service après-vente</p>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <p>© 2026 Ministre Watches. Tous droits réservés. | Fait avec passion au Maroc 🇲🇦</p>
          </div>
        </div>
      </footer>
    </div>
  );
}