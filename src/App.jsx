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
    email: "",
  });

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const products = [
    {
      id: 1,
      name: "Classic Noir",
      price: 899,
      category: "classic",
      colors: [
        { name: "Noir/Or", main: "#1a1a1a", accent: "#D4AF37" },
        { name: "Noir/Argent", main: "#1a1a1a", accent: "#C0C0C0" },
      ],
      image: "classic",
      description: "Élégance intemporelle avec cadran noir et aiguilles dorées",
    },
    {
      id: 2,
      name: "Modern Steel",
      price: 1099,
      category: "sport",
      colors: [
        { name: "Acier/Bleu", main: "#4A5568", accent: "#63B3ED" },
        { name: "Acier/Vert", main: "#4A5568", accent: "#48BB78" },
      ],
      image: "modern",
      description: "Design contemporain en acier brossé avec détails bleu cobalt",
    },
    {
      id: 3,
      name: "Minimal Black",
      price: 999,
      category: "luxury",
      colors: [
        { name: "Noir/Blanc", main: "#000000", accent: "#FFFFFF" },
        { name: "Noir/Rouge", main: "#000000", accent: "#F56565" },
      ],
      image: "minimal",
      description: "Minimalisme absolu, cadran noir profond et index blancs",
    },
    {
      id: 4,
      name: "Urban Grey",
      price: 949,
      category: "sport",
      colors: [
        { name: "Gris/Rouge", main: "#718096", accent: "#F56565" },
        { name: "Gris/Orange", main: "#718096", accent: "#ED8936" },
      ],
      image: "urban",
      description: "Style urbain avec touches rouge carmin et bracelet gris",
    },
    {
      id: 5,
      name: "Royal Gold",
      price: 1299,
      category: "luxury",
      colors: [
        { name: "Or/Noir", main: "#D4AF37", accent: "#1a1a1a" },
        { name: "Or/Blanc", main: "#D4AF37", accent: "#FFFFFF" },
      ],
      image: "royal",
      description: "Luxe absolu avec finition or et détails raffinés",
    },
    {
      id: 6,
      name: "Sport Pro",
      price: 1199,
      category: "sport",
      colors: [
        { name: "Noir/Jaune", main: "#2D3748", accent: "#ECC94B" },
        { name: "Noir/Cyan", main: "#2D3748", accent: "#4FD1C5" },
      ],
      image: "sport",
      description: "Performance maximale pour les athlètes exigeants",
    },
    {
      id: 7,
      name: "Classic Brown",
      price: 949,
      category: "classic",
      colors: [
        { name: "Marron/Or", main: "#8B4513", accent: "#D4AF37" },
        { name: "Marron/Argent", main: "#8B4513", accent: "#C0C0C0" },
      ],
      image: "classic-brown",
      description: "Élégance classique avec bracelet en cuir marron",
    },
    {
      id: 8,
      name: "Ocean Blue",
      price: 1099,
      category: "sport",
      colors: [
        { name: "Bleu/Argent", main: "#2C5282", accent: "#C0C0C0" },
        { name: "Bleu/Blanc", main: "#2C5282", accent: "#FFFFFF" },
      ],
      image: "ocean",
      description: "Inspiration marine avec résistance à l'eau 200m",
    },
    {
      id: 9,
      name: "Rose Gold",
      price: 1399,
      category: "luxury",
      colors: [
        { name: "Rose/Blanc", main: "#B76E79", accent: "#FFFFFF" },
        { name: "Rose/Noir", main: "#B76E79", accent: "#1a1a1a" },
      ],
      image: "rose",
      description: "Sophistication contemporaine en or rose",
    },
    {
      id: 10,
      name: "Carbon Elite",
      price: 1499,
      category: "sport",
      colors: [
        { name: "Carbone/Rouge", main: "#1C1C1C", accent: "#E53E3E" },
        { name: "Carbone/Bleu", main: "#1C1C1C", accent: "#3182CE" },
      ],
      image: "carbon",
      description: "Technologie carbone ultra-légère et résistante",
    },
    {
      id: 11,
      name: "Vintage Classic",
      price: 899,
      category: "classic",
      colors: [
        { name: "Beige/Or", main: "#D2B48C", accent: "#D4AF37" },
        { name: "Beige/Marron", main: "#D2B48C", accent: "#8B4513" },
      ],
      image: "vintage",
      description: "Inspiration rétro avec cadran vintage authentique",
    },
    {
      id: 12,
      name: "Diamond Prestige",
      price: 1899,
      category: "luxury",
      colors: [
        { name: "Platine/Diamant", main: "#E5E4E2", accent: "#FFFFFF" },
        { name: "Platine/Noir", main: "#E5E4E2", accent: "#000000" },
      ],
      image: "diamond",
      description: "Prestige ultime avec incrustations de diamants",
    },
  ];

  const selectColor = (productId, colorIndex) => {
    setSelectedColors({
      ...selectedColors,
      [productId]: colorIndex
    });
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
    setCustomerInfo({
      ...customerInfo,
      [name]: value,
    });
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

    // Remplacer par votre vrai numéro WhatsApp (format: 212XXXXXXXXX)
    const phoneNumber = "212657425822";
    
    let message = "🕐 *NOUVELLE COMMANDE MINISTRE WATCHES*%0A%0A";
    
    // Informations client
    message += "👤 *INFORMATIONS CLIENT*%0A";
    message += `Nom: ${customerInfo.name}%0A`;
    message += `Téléphone: ${customerInfo.phone}%0A`;
    if (customerInfo.email) {
      message += `Email: ${customerInfo.email}%0A`;
    }
    message += `Adresse: ${customerInfo.address}%0A`;
    message += `Ville: ${customerInfo.city}%0A%0A`;
    
    message += "🛍️ *COMMANDE*%0A";
    cart.forEach((item, index) => {
      message += `*${index + 1}. ${item.name}*%0A`;
      message += `   Couleur: ${item.selectedColor.name}%0A`;
      message += `   Quantité: ${item.quantity}%0A`;
      message += `   Prix unitaire: ${item.price} DH%0A`;
      message += `   Sous-total: ${item.price * item.quantity} DH%0A%0A`;
    });
    
    message += `💰 *TOTAL: ${getTotal()} DH*%0A`;
    message += `✅ _Livraison gratuite partout au Maroc_`;
    
    // Ouvrir WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
    
    // Réinitialiser après envoi
    setShowCheckoutForm(false);
    setShowCart(false);
    setCart([]);
    setCustomerInfo({
      name: "",
      phone: "",
      address: "",
      city: "",
      email: "",
    });
    
    alert("Votre commande a été envoyée via WhatsApp ! Merci 🎉");
  };

  // Filtrer les produits selon la catégorie sélectionnée
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="container header-content">
          <div className="logo" onClick={() => scrollTo("hero")}>
            <img 
              src="/logo.png" 
              alt="Ministre Watches Logo" 
              className="logo-image"
            />
          </div>

          <nav className="nav">
            <button onClick={() => scrollTo("hero")}>Accueil</button>
            <button onClick={() => scrollTo("products")}>Montres</button>
            <button onClick={() => scrollTo("collections")}>Collections</button>
            <button onClick={() => scrollTo("footer")}>Contact</button>
            <button
              className="cart-button"
              onClick={() => setShowCart(!showCart)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {getItemCount() > 0 && (
                <span className="cart-count">{getItemCount()}</span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* CART PANEL */}
      <div className={`cart-panel ${showCart ? "open" : ""}`}>
        <div className="cart-header">
          <h3>Votre Panier</h3>
          <button className="close-cart" onClick={() => setShowCart(false)}>
            ✕
          </button>
        </div>

        <div className="cart-content">
          {cart.length === 0 ? (
            <p className="empty-cart">Votre panier est vide</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.cartId} className="cart-item">
                  <div className="cart-item-info">
                    <div
                      className="cart-item-preview"
                      style={{
                        background: `linear-gradient(135deg, ${item.selectedColor.main}, ${item.selectedColor.accent})`,
                      }}
                    ></div>
                    <div>
                      <h4>{item.name}</h4>
                      <p className="cart-item-color">{item.selectedColor.name}</p>
                      <p className="cart-item-price">{item.price} DH</p>
                    </div>
                  </div>

                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.cartId, -1)}>
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cartId, 1)}>
                        +
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.cartId)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-total">
                <div className="total-row">
                  <span>Sous-total</span>
                  <span>{getTotal()} DH</span>
                </div>
                <div className="total-row">
                  <span>Livraison</span>
                  <span className="free">Gratuite</span>
                </div>
                <div className="total-row total-final">
                  <span>Total</span>
                  <span>{getTotal()} DH</span>
                </div>
              </div>

              <button className="checkout-btn" onClick={() => {
                setShowCart(false);
                setShowCheckoutForm(true);
              }}>
                Passer la commande
              </button>
            </>
          )}
        </div>
      </div>

      {/* FORMULAIRE DE COMMANDE */}
      {showCheckoutForm && (
        <div className="checkout-modal">
          <div className="checkout-modal-overlay" onClick={() => setShowCheckoutForm(false)}></div>
          <div className="checkout-form-container">
            <div className="checkout-form-header">
              <h2>Informations de livraison</h2>
              <button className="close-form" onClick={() => setShowCheckoutForm(false)}>
                ✕
              </button>
            </div>

            <form className="checkout-form" onSubmit={sendWhatsAppOrder}>
              <div className="form-group">
                <label htmlFor="name">Nom complet *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  placeholder="Votre nom complet"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Téléphone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  placeholder="+212 6XX XXX XXX"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email (optionnel)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  placeholder="votre@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Adresse complète *</label>
                <textarea
                  id="address"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  placeholder="Numéro, rue, quartier..."
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">Ville *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={customerInfo.city}
                  onChange={handleInputChange}
                  placeholder="Votre ville"
                  required
                />
              </div>

              <div className="form-summary">
                <div className="summary-row">
                  <span>Articles ({getItemCount()})</span>
                  <span>{getTotal()} DH</span>
                </div>
                <div className="summary-row">
                  <span>Livraison</span>
                  <span className="free">Gratuite</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>{getTotal()} DH</span>
                </div>
              </div>

              <button 
                type="submit" 
                className="submit-order-btn"
                disabled={!validateForm()}
              >
                Confirmer et envoyer via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}

      {/* OVERLAY */}
      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}></div>
      )}

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-bg"></div>
        <div className="container hero-content">
          <div className="hero-text">
            <h1>MINISTRE<br />WATCHES</h1>
            <p className="subtitle">Timeless Elegance · Modern Craft</p>
            <p className="info">Benguerir – Livraison gratuite partout au Maroc</p>
            <button
              className="cta-button"
              onClick={() => scrollTo("products")}
            >
              DÉCOUVRIR LA COLLECTION
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="hero-watches">
            <div className="watch-display">
              <div className="watch-inner-circle">
                <img 
                  src="/logo.png" 
                  alt="Ministre Logo" 
                  className="watch-logo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="products container" id="products">
        <div className="section-header">
          <h2>Best Sellers</h2>
          <p className="section-subtitle">
            Notre collection signature de montres d'exception
          </p>
          
          <div className="category-filters">
            <button 
              className={selectedCategory === "all" ? "active" : ""}
              onClick={() => {
                setSelectedCategory("all");
                scrollTo("products");
              }}
            >
              Toutes
            </button>
            <button 
              className={selectedCategory === "classic" ? "active" : ""}
              onClick={() => {
                setSelectedCategory("classic");
                scrollTo("products");
              }}
            >
              Classic
            </button>
            <button 
              className={selectedCategory === "sport" ? "active" : ""}
              onClick={() => {
                setSelectedCategory("sport");
                scrollTo("products");
              }}
            >
              Sport
            </button>
            <button 
              className={selectedCategory === "luxury" ? "active" : ""}
              onClick={() => {
                setSelectedCategory("luxury");
                scrollTo("products");
              }}
            >
              Luxury
            </button>
          </div>
        </div>

        <div className="product-grid">
          {filteredProducts.map((p) => {
            const currentColorIndex = selectedColors[p.id] || 0;
            const currentColor = p.colors[currentColorIndex];
            
            return (
              <div className="product-card" key={p.id}>
                <div className="product-img-wrapper">
                  <div
                    className="product-img"
                    style={{
                      background: `linear-gradient(135deg, ${currentColor.main} 0%, ${currentColor.accent} 100%)`,
                    }}
                  >
                    <div className="watch-face">
                      <div
                        className="watch-hands"
                        style={{ borderColor: currentColor.accent }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="product-info">
                  <h3>{p.name}</h3>
                  <p className="product-description">{p.description}</p>

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

                  <div className="product-footer">
                    <span className="product-price">{p.price} DH</span>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => addToCart(p)}
                    >
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredProducts.length === 0 && (
          <p className="no-products">Aucune montre disponible dans cette catégorie.</p>
        )}
      </section>

      {/* COLLECTIONS */}
      <section className="collections container" id="collections">
        <h2>Nos Collections</h2>

        <div className="collections-grid">
          <div 
            className="collection-card collection-classic"
            onClick={() => {
              setSelectedCategory("classic");
              scrollTo("products");
            }}
          >
            <h3>Classic</h3>
            <p>Élégance intemporelle</p>
          </div>

          <div 
            className="collection-card collection-sport"
            onClick={() => {
              setSelectedCategory("sport");
              scrollTo("products");
            }}
          >
            <h3>Sport</h3>
            <p>Performance & style</p>
          </div>

          <div 
            className="collection-card collection-luxury"
            onClick={() => {
              setSelectedCategory("luxury");
              scrollTo("products");
            }}
          >
            <h3>Luxury</h3>
            <p>Sophistication absolue</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" id="footer">
        <div className="container footer-grid">
          <div className="footer-section">
            <div className="footer-logo-title">
              <img 
                src="/logo.png" 
                alt="Ministre Watches Logo" 
                className="footer-logo-image"
              />
            </div>
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
            <p>WhatsApp : +212 657 425 822</p>
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