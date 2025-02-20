FROM node:14

# Definir o diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos
COPY . .

# Construir a aplicação
RUN npm run build

# Instalar o servidor HTTP estático
RUN npm install -g serve

# Expor a porta
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["serve", "-s", "dist"]
