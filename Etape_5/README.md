# IDV-WEB4 / API REST / Etape 5



## analyse du contexte : 
Ce document décrit les étapes nécessaires pour mettre en place une application ReactJS qui communique avec une API SpringBoot en utilisant des appels RESTful. L'API SpringBoot est écrite en Java et l'application ReactJS est écrite en JavaScript.
 
## Prérequis :
NodeJS v18 ou supérieur
npm v7 ou supérieur
JDK 11 ou supérieur
Maven

## Installation et configuration :
1. Création de l'Api ReactJs :
```npx create-react-app nom-api```

2. Ouvrez un terminal dans le dossier racine du projet et installez les dépendances en exécutant la commande suivante :
``` npm install ```

3. Démarrez l'application ReactJS en exécutant la commande suivante dans un autre terminal :
``` npm run start ```

4. Démarrez l'API SpringBoot en exécutant la commande suivante dans un terminal :
``` mvn spring-boot:run ```
 
5. Ouvrez un navigateur web et accédez à l'URL suivante pour accéder à l'application ReactJS :
``` http://localhost:3000 ```

## Installation et configuration d'Axios et :
Axios est une bibliothèque JavaScript qui permet de réaliser des requêtes HTTP depuis une application cliente. Nous allons l'utiliser pour communiquer avec notre API SpringBoot.

1. Pour installer Axios, ouvrez un terminal dans le dossier racine de votre projet et exécutez la commande suivante :
```npm install axios ```




## Installation et configuration de react-router-dom :
React Router est une bibliothèque JavaScript qui permet de gérer la navigation dans une application ReactJS. Nous allons l'utiliser pour créer des routes entre les différentes pages de notre application.

1. Pour installer React Router, ouvrez un terminal dans le dossier racine de votre projet et exécutez la commande suivante :
``` npm install react-router-dom ```

## Utilisation :
L'application ReactJS communique avec l'API SpringBoot en utilisant des appels RESTful. Voici les fonctionnalités disponibles :

* Enregistrement et connexion : un utilisateur peut s'enregistrer et se connecter.
* Liste des utilisateurs : un utilisateur connecté peut voir la liste des utilisateurs.
* Informations de l'utilisateur : en cliquant sur un utilisateur dans la liste, l'application affiche les informations et les adresses de l'utilisateur.
* Un button de déconnection. 
 
## Pas encore fait : 

- Des difficultés au niveau d’affichage des adresses et ainsi que les actions supprimer, ajouter ,modifier ainsi que celles de user  



