FROM node:16
COPY build build
COPY server server
COPY node_modules node_modules
COPY package-lock.json .
COPY package.json .
RUN ls .
CMD node server