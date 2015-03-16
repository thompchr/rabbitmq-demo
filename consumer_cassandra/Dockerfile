FROM dockerfile/nodejs
RUN mkdir /opt/app
COPY . /opt/app
WORKDIR /opt/app
RUN cd /opt/app
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]
