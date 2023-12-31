# base image
FROM node:14-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
RUN npm install @vue/cli -g

# start app
CMD ["yarn", "serve"]