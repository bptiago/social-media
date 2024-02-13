# social-media

This is an Instagram-like fullstack application. This project was made using React, Node.js, Express and MySQL. 

In this app, you can do the following:
1) Create an account
2) Login an account
3) Create posts (only text, no media)
4) Like/unlike posts
5) Make comments on posts
6) Check your profile page
7) Remove posts

To setup the DB, you need to create a new database (name should be social_media) on MySQL Workbench and change the "./server/config/config.json" database settings (user, password...). Since this app uses Sequelize, all necessary tables will be automatically created as soon as you start the server. 

<b>The database design currently looks like this:</b>

![socialMedia drawio](https://github.com/bptiago/social-media/assets/125921557/b1d15e21-174e-4a95-af7f-edfdffdc4ca8)


To load all the node packages, go to "./client" and "./server" folders and run "npm init" on the terminal.

To start the servers, run "npm start" on "./client" and "./server" folders. You will need two separate terminals for this.
