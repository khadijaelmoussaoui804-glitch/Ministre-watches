# MINISTRE WATCHES 🕐

Site e-commerce de montres de luxe avec système de panier complet.

## ✨ Fonctionnalités

- **Logo professionnel** : Design géométrique inspiré de votre image
- **Système de panier** : Ajout, modification de quantité, suppression d'articles
- **Montres colorées** : Chaque montre a sa propre palette de couleurs (noir/gris avec accents de couleur)
- **Design responsive** : Optimisé pour mobile et desktop
- **Animations fluides** : Transitions et effets visuels professionnels
- **Livraison gratuite** : Partout au Maroc

## 🎨 Palette de Couleurs

- **Base** : Noir (#000000) et différentes nuances de gris
- **Accents produits** :
  - Classic Noir : Or (#D4AF37)
  - Modern Steel : Bleu cobalt (#63B3ED)
  - Minimal Black : Blanc pur (#FFFFFF)
  - Urban Grey : Rouge carmin (#F56565)

## 📁 Structure du Projet

```
ministre-watches/
├── src/
│   ├── App.jsx          # Composant principal avec logique panier
│   ├── App.css          # Styles complets (logo, panier, produits)
│   └── main.jsx         # Point d'entrée React
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Installation

1. **Installer les dépendances**
```bash
npm install
```

2. **Lancer le serveur de développement**
```bash
npm run dev
```

3. **Build pour production**
```bash
npm run build
```

## 💡 Utilisation

### Ajouter un produit au panier
Cliquez sur "Ajouter au panier" sur n'importe quelle carte produit.

### Gérer le panier
- Cliquez sur l'icône panier (en haut à droite) pour ouvrir/fermer le panneau
- Utilisez les boutons +/- pour modifier les quantités
- Cliquez sur "Supprimer" pour retirer un article
- Le total se calcule automatiquement

### Navigation
- Logo cliquable pour retourner en haut
- Navigation smooth scroll vers les sections
- Bouton CTA "Découvrir la collection"

## 🎯 Caractéristiques du Code

### Logo SVG Personnalisé
Le logo utilise un path SVG pour créer le "M" géométrique de MINISTRE, inspiré de votre image de référence.

### Gestion d'état avec React Hooks
- `useState` pour gérer le panier et l'affichage du panneau
- Fonctions pour ajouter, supprimer et modifier les quantités

### Design System
Variables CSS pour cohérence :
- Couleurs (primaire, secondaire, accents)
- Transitions et animations
- Ombres (soft, medium, hard)

### Responsive Design
Points de rupture pour mobile/tablette/desktop avec ajustements appropriés.

## 📦 Composants Principaux

### Header
- Logo professionnel MINISTRE
- Navigation avec scroll smooth
- Bouton panier avec compteur de produits

### Hero Section
- Titre accrocheur avec animations
- Bouton CTA
- Affichage de montre animé

### Products Grid
- Cartes produit avec images colorées
- Badge "Nouveau"
- Sélecteur de couleurs
- Bouton "Ajouter au panier"

### Cart Panel
- Panneau latéral coulissant
- Liste des articles avec preview
- Contrôles de quantité
- Calcul du total
- Bouton "Commander via WhatsApp"

### Collections
- 3 catégories (Classic, Sport, Luxury)
- Cartes avec dégradés de couleurs

### Footer
- Logo et informations de contact
- Navigation rapide
- Réseaux sociaux

## 🎨 Personnalisation

Pour modifier les produits, éditez l'array `products` dans `App.jsx` :

```javascript
const products = [
  {
    id: 1,
    name: "Nom de la montre",
    price: 899,
    color: "#couleur-principale",
    accent: "#couleur-accent",
    description: "Description...",
  },
  // ...
];
```

## 📱 Contact WhatsApp

Le bouton "Commander via WhatsApp" peut être configuré pour ouvrir WhatsApp avec les détails de la commande. Ajoutez cette logique dans le `onClick` du bouton :

```javascript
const sendWhatsApp = () => {
  const message = cart.map(item => 
    `${item.name} x${item.quantity} = ${item.price * item.quantity} DH`
  ).join('%0A');
  
  window.open(`https://wa.me/212XXXXXXXXX?text=${message}`);
};
```

## 🔧 Technologies Utilisées

- **React** 18.2.0 : Framework JavaScript
- **Vite** 5.0.8 : Build tool et dev server
- **CSS3** : Styles avec variables, animations, grid, flexbox

## 📄 License

Projet créé pour Ministre Watches - Benguerir, Maroc

---

**Fait avec ❤️ pour MINISTRE WATCHES**