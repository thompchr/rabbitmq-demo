FROM dockerfile/nodejs
RUN mkdir /opt/app
COPY . /opt/app
WORKDIR /opt/app
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]