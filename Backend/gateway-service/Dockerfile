FROM node:18

# Definir o diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos
COPY . .

# Expor a porta
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "run", "dev"]
