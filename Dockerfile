FROM node:6-slim

COPY ${PWD}/ /code/sporthub/
RUN cd /code/sporthub && npm install

WORKDIR /code/sporthub

RUN ["npm", "run", "bundle"]
VOLUME /code/sporthub/node_modules

EXPOSE 8080
CMD ["npm", "run", "serve"]
