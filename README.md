
# Food For Thought Sever
This projects acts as server for Food For Thought client side and admin side projects.

Client and Dashboard Github Links

Admin/Dashboard: https://github.com/nikhilnim/food-for-thought-admin

Client: https://github.com/nikhilnim/food-for-thought-client

## Appendix

This project works in conjunction with Client side and Admin control panel. Client for viewing recipes and admin for managing recipes.

Client github: https://github.com/nikhilnim/food-for-thought-client

Admin github: https://github.com/nikhilnim/food-for-thought-admin

Base URL for SERVER : http://localhost:5050/

PLEASE NOTE: 

Certain routes are behind auth wall by JWT you need to sign up login on client side.

/users/profile

/users/favrecipe

/users/favrecipe/:recipeId

**** Password storage is not using encryption. ******* 

Test username and Password for client side

USERNAME: yuri@gmail.com 

PASSWORD: root 


## Run Locally

Clone the project

```bash
  git clone https://github.com/nikhilnim/food-for-thought-server
```

Go to the project directory

```bash
  cd food-for-thought-server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## API Reference

#### Get all recipes

```http
  GET /recipes
```

#### Get a recipe by id

```http
  GET /recipes/:id
```

#### Create a new recipe
```http
  POST /recipes
```

#### Upodate a recipe
```http
  POST /recipes/:id
```

#### DELETE a recipe
```http
  DELETE /recipes/:id
```

#### Get a recipe more than a certain protein value

```http
  GET /protein/:val
```

#### Get a recipe more than a certain calorie value

```http
  GET /calories/:val
```

#### Get a recipe less than a certain calorie value and more than certain protein value

```http
  GET /protein/:proVal/calories/:calVal
```

#### Sign up

```http
  POST /users/signup
```

#### Login

```http
  POST /users/login
```

#### Get Users Profile

```http
  Get /users/profile
```

#### POST Users favrecipe
```http
  POST /users/favrecipe
```


#### DELETE Users favrecipe
```http
  POST /users/favrecipe/:recipeId
```

