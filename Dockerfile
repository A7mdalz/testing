FROM node

RUN git clone https://github.com/A7mdalz/testing.git
WORKDIR testing
RUN npm install

EXPOSE 3000

RUN mkdir -p /testing/public/uploads
RUN mkdir -p /testing/hsa

CMD ["node", "app.js"]
