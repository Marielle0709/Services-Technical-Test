# Backend

Bienvenue dans l'application backend . Cette application est construite avec Node.js, Prisma, et MySQL.
Installation et Démarrage du Projet

 ## Installez les dépendances du projet :
    npm install

 ## Prisma

Prisma est un outil de gestion de base de données qui simplifie les opérations SQL et facilite le travail avec les bases de données relationnelles.

    Le fichier schema.prisma définit le schéma de la base de données à l'aide de la syntaxe Prisma.

    Les migrations Prisma sont utilisées pour appliquer ces changements de schéma à la base de données.

    Pour générer les fichiers Prisma, exécutez la commande suivante :
    npx prisma generate
    npx prisma format 
    npx prisma migrate

    Vous pouvez également explorer les opérations CRUD générées automatiquement par Prisma en consultant le dossier prisma/client.

 ## API Endpoints

   vous pouvez visualiser et tester tous les endpoints grace a swagger-ui sur http://localhost:3000/api-docs/
        
## Configuration de la Base de Données

1. Installez MySQL sur votre machine si ce n'est pas déjà fait.

2. Créez une base de données MySQL pour l'application. Vous pouvez le faire à l'aide d'un outil comme MySQL Workbench ou via la ligne de commande.

3. Exécutez les migrations pour créer les tables nécessaires dans votre base de données :

   ```bash
   npx format prisma
   npx generate prisma
   npx prisma migrate dev
## demmarer le serveur
   ```bash
    node app.js
## demmarer avec docker
docker build -t backend .
docker run backend

