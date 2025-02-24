FROM node:18

# Definir o diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Reinstalar bcrypt para a arquitetura correta
RUN npm rebuild bcrypt --build-from-source

# Remover node_modules local para evitar conflitos
RUN rm -rf node_modules

# Copiar o restante dos arquivos
COPY . .

# Expor a porta
EXPOSE 3001

# Comando para iniciar o servidor
CMD ["npm", "run", "dev"]