FROM node

RUN git clone https://github.com/A7mdalz/testing.git
WORKDIR testing
RUN npm install

EXPOSE 3000

CMD ["node", "testing/app.js"]
