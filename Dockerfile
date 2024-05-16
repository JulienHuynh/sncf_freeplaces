# Utilisez l'image Node.js officielle en tant que base
FROM node:16

# Définissez le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez le fichier package.json et package-lock.json pour installer les dépendances
COPY server/package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers de l'application dans le conteneur
COPY server .

# Exposez le port sur lequel votre application s'exécute
EXPOSE 8245

# Commande pour démarrer l'application
CMD [ -d "node_modules" ] && npm run start || npm ci && npm run start