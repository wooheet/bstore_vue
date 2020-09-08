FROM node:10

# Create app directory
WORKDIR /app
ADD . /app/

# global install & update
RUN npm i -g npm && npm i -g yarn

RUN npm install
RUN npm rebuild node-sass
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000
EXPOSE 80

# start command
CMD [ "npm", "run", "start" ]