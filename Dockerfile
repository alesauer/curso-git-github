# Estágio 1: Build da aplicação React + Vite
FROM node:20-alpine AS builder

WORKDIR /app

# Copia manifestos de dependência
COPY package.json package-lock.json ./

# Instala as dependências de forma limpa e reprodutível
RUN npm ci

# Copia todo o código fonte
COPY . .

# Gera o build de produção no diretório /app/dist
RUN npm run build

# Estágio 2: Servidor Web Nginx otimizado para produção
FROM nginx:alpine

# Remove o arquivo de configuração padrão
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copia a configuração personalizada com suporte a SPA e gzip
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os artefatos estáticos gerados no estágio anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta padrão HTTP
EXPOSE 80

# Inicia o Nginx em primeiro plano
CMD ["nginx", "-g", "daemon off;"]
