# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Frontend
Bienvenue dans l'application frontend . Cette application est construite avec React.

## Configuration et Démarrage du Projet

1. Installez Node.js sur votre machine si ce n'est pas déjà fait.

2. Clonez le répertoire du projet et accédez à la partie frontend :

   ```bash
   git clone https://github.com/Marielle0709/Services-Technical-Test 
   cd Services-Technical-Test 

## Installez les dépendances du projet :
    bash
    npm install


## Démarrer l'application en mode développement :
    bash
    npm start
    Cela lancera l'application sur http://localhost:3001.

## Composants React

   

## Communication avec le Backend

    Assurez-vous que le backend est en cours d'exécution à l'adresse spécifiée dans le fichier .env. Par défaut, l'application frontend suppose que le backend est accessible sur http://localhost:3000.# Getting Started with Create React App

  
## builder le projet avec maven
    mvn clean install

Étape 1: Construire l'image Docker

Placez le Dockerfile dans le répertoire racine de votre projet React. Ensuite, ouvrez un terminal et exécutez la commande suivante dans le répertoire où se trouve votre Dockerfile :

bash
## lancer avec Docker
 
 creer l'image docker:
docker build -t nom_de_votre_image .

executer le conteneur 
docker run -p 3001:3001 nom_de_votre_image