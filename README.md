## ez-staffing

![screenshot of the application](https://github.com/MarkRBishop/ez-staffing/blob/main/assets/ss-of-ez-staffing.png?raw=true)

## Description

This application using iquirer, node.js and mysql is a simple demonstration of how you can manipulate a mysql database from the command line. It utilizes a schema and a seed, although you can write your own seed as well if you desire. It uses inquirer to prompt and view lists which then will display, add or edit information in the database.

## Links

Video of application in use:
https://drive.google.com/file/d/1xeW7bP0uqCQbEXF9MbNMJJReiwGt7egj/view

Repository to pull the files from:
https://github.com/MarkRBishop/ez-staffing


## Getting started

0. Pull the repository into your desired directory and navigate to the base directory of the repository

1. Install npm 

```
npm i
```

2. Rename the .env.example to .env and edit the user name and password information

3. Run mysql -u (your user name) -p, for example:

```
mysql -u -root -p
```

4. Enter your password when prompted

5. Run the schema.sql

```
source db/schema.sql
```

6. Either run the seeds.sql or start entering your own mysql commands to fill the database

```
source db/seeds.sql
```

7. quit mysql by typing quit

8. start the application with node

```
node index.js
```

## Usage

After getting the application started with the steps above, you can scroll through the different options using the arrow keys. Depending on what you chose to do, there will be a series of prompts or perhaps even another list for you to scroll through. After you're finished just hit CTRL C to end the program.

## License

N/A