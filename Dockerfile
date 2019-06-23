# specify the node base image with your desired version node:<version>
FROM node
#copy . . 
CMD ["cd", "/usr/src/app"]
RUN git clone https://github.com/A7mdalz/testing.git


CMD ["node", "testing/app.js"]
#RUN node app.js
