
FROM node


RUN git clone https://github.com/A7mdalz/testing.git

RUN npm install testing/

expose 3000

CMD ["node", "testing/app.js"]
