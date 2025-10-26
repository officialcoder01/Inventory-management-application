# .devcontainer/Dockerfile
FROM node:20

# Install PostgreSQL client
RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /workspace
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]
