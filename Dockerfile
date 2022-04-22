# https://blog.codeexpertslearning.com.br/dockerizando-uma-aplica%C3%A7%C3%A3o-react-js-f6a22e93bc5d

# Base dependency
FROM node:16

# Create app directory
WORKDIR /usr/app

# INSTALL app dependencies
COPY package*.json ./
RUN npm install
RUN npm install react-scripts@3.3.1

# BUNDDLE app source (copying code)
COPY . .

# ENV:APP
ENV PUBLIC_URL=jandaya

# ENV:API
ENV REACT_APP_API_URL=http://localhost:3333

# ENV:Configs
ENV REACT_APP_TIME_LIMIT_MORNING=15
ENV REACT_APP_TIME_LIMIT_AFTERNOON=17
ENV REACT_APP_TIME_LIMIT_NIGHT=21

# Inicializa a aplicação
CMD ["npm", "start"]