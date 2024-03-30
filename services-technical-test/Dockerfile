FROM node:20.9.0

# Définir le répertoire de travail dans l'image
WORKDIR /app

# Copier les fichiers nécessaires dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier les fichiers du projet dans le répertoire de travail
COPY . .

# Construire l'application React (assurez-vous d'avoir déjà exécuté npm run build)
RUN npm run build

# Exposer le port sur lequel votre application React s'exécute (par défaut : 3000)
EXPOSE 3001

# Commande pour démarrer l'application lorsqu'un conteneur est lancé
CMD ["npm", "run","dev"]