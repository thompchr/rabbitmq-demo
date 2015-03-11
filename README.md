RabbitMQ with Node.js Proof of Concept
==============

Introduction
--------------
This program demonstrates basic pub/sub functionality using RabbitMQ and Node.js.

Requirements
--------------
- Docker https://www.docker.com/
- Docker Compose https://docs.docker.com/compose/

Running
--------------
From the root directory run <code>docker-compose up</code> which should run:
- Producer server
- Consumer server
- RabbitMQ server

Usage
--------------
To test out the functionality, go to http://docker-ip:8080 and enter a message you would like to send.  The consumer
will print the message to its log.