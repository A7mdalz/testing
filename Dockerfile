FROM node

RUN git clone https://github.com/A7mdalz/testing.git
WORKDIR testing
RUN npm install

RUN mkdir /hrapp
RUN mkdir /hrapp2
RUN mkdir /hrapp3

VOLUME [ "/hrapp" ]
VOLUME [ "/hrapp2" ]
VOLUME [ "/hrapp3" ]

EXPOSE 3000

CMD ["node", "app.js"]
