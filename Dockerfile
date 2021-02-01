FROM node

ADD ./ /data

WORKDIR /data

RUN npm i

EXPOSE 9001

CMD ["node index.js"]