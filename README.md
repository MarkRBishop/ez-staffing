## ez-staffing

![screenshot of the application]()

## Description

This application using iquirer, node.js and mysql is a simple demonstration of how you can manipulate a mysql database from the command line. It utilizes a schema and a seed, although you can write your own seed as well if you desire. It uses inquirer to prompt and view lists which then will display, add or edit information in the database.

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

## Links

Video of application in use:


Repository to pull the files from:


## Usage

After getting the application started with the steps above, you can scroll through the different options using the arrow keys. Depending on what you chose to do, there will be a series of prompts or perhaps even another list for you to scroll through.

## License

N/A