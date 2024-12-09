# IDV-WEB4 / API REST / Projet_libre



# projet libre: Inspire Decor

---

> 🏷️ **L'idée est de créer une boutique en ligne (web) pour les produits de design d'intérieur, proposant une sélection de modèles pour les différentes pièces de la maison (chambre à coucher, salon, salle de bain, etc.), ainsi que des articles de décoration et d'aménagement correspondants pour chaque modèle proposé.**
> 

---

# 🧭 **Installation**

---

1. Clonez le référentiel du projet :

```jsx
git@github.com:mouaciOuissem/API-Rest-.git
```

1. Accédez au répertoire du projet  de l’API:
    
    ```jsx
    >cd api 
    >npm build run
    ```
    
2. Accédez au répertoire du projet :
    
    ```jsx
    >cd design-home
    >npm run install
    npm run strat
    ```
    

3.Ouvrez votre navigateur et accédez à l'URL suivante : `http://localhost:3000`

# 🔍 fonctionnalités

---

- Panier :
    - Voir la quantité de chaque article ajouté.
    - Voir le total des articles ainsi que le prix total.
    - sélectionner une adresse de livraison ou en ajouter une.
    
- Profile : Utilisateur client
    - Pas d’obligation de connexion pour accéder aux designs et aux articles (info et prix).
    - Obligation de connexion pour passer une commande et pour ajouter des articles au panier.
    - Avoir le contrôle sur ses informations ses informations (Modification de son nom et des ses adresses);
    - Suppression de  son compte.
    - Ne pas pouvoir ajouter au panier quand il reste plus d’articles dans le stock.

- Profile  : Administrateur :
    - Ajout, modification et suppression des produits et des catégories.
    - Suppression d’un utilisateur client.
    - Gérer les stocks.
- NavBar :
    - anglet Connexion.
    - anglet Inscription.
    - anglet Panier

---


## Prérequis :
Node.js et npm doivent être installés sur la machine.
Java JDK et Apache Maven doivent être installés pour exécuter le backend.
NodeJS v18 ou supérieur
npm v7 ou supérieur
JDK 11 ou supérieur

`


# Packages utilisés:
### Backend (Java Spring Boot):
- Spring Boot
- Spring Data JPA
- MySQL Connector
- Spring Web
- Spring Security

### Frontend (React.js):
- React
- React Router
- Axios
- Font Awesome




## Utilisation :
Assurez-vous d'avoir installé les prérequis mentionnés dans le fichier README.
1. Démarrez le backend en exécutant le projet Java Spring Boot.
2. Démarrez le frontend en exécutant la commande npm run start dans le répertoire du frontend.
3. Accédez à l'application dans votre navigateur à l'adresse http://localhost:3000.
4. Explorez les designs et les articles disponibles sans vous connecter.
5. Connectez-vous avec un compte utilisateur pour passer une commande, ajouter des articles au panier et gérer vos informations personnelles.
6. Utilisez un compte administrateur pour ajouter, modifier ou supprimer des produits, des catégories et pour gérer les stocks.
- Nous espérons que cette application vous offrira une expérience d'achat agréable et pratique. Merci d'avoir suivi ce projet et bonne continuation dans vos développements !
 
# Conclusion:
En conclusion, ce projet de boutique e-shop offre un parcours d'achat complet avec des fonctionnalités telles que la mise au panier, la sélection d'adresse d'envoi, la modification des produits, ainsi que l'ajout et la suppression d'articles. Les profils utilisateur client et administrateur sont également pris en charge, permettant aux utilisateurs de gérer leurs informations et aux administrateurs de gérer les produits, les catégories et les stocks. Le backend est développé en Java Spring Boot et le frontend en React.js, offrant une combinaison moderne et réactive pour une expérience utilisateur fluide.
 

---



