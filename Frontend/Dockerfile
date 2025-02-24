FROM node:18

# Definir o diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o restante dos arquivos
COPY . .

# Construir a aplicação
RUN npm run build

# Instalar o servidor HTTP estático
RUN npm install -g serve

# Expor a porta
EXPOSE 3000

# Adicionar health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Definir variáveis de ambiente
ENV NODE_ENV=production

# Comando para iniciar o servidor
CMD ["serve", "-s", "dist"]
