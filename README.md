# RU 
# URL Shortener API

REST API сервис для сокращения ссылок, построенный на NestJs + PostgreSQL.

# Стек проекта
 * NestJs 
 * TypeOrm
 * PostgreSQL
 * class-validator
 * Swagger


## Как установить и запустить 

### 1. Клонировать репозиторий 
 откройте командную строку и введите :
 ```
  git clone <https://github.com/Ergena11y/UrlShortener.git>
  cd url-shortener
 ```
### 2. Установить зависимости 
```
  yarn install
```

### 3. Создать .env  файл  
 Пример уже имеется в репозитори под названием:  .env.example, отсатется только заполнить оставшиеся поля.
 
### 4. Запустить 
  ````
   yarn start:dev 
 ````

# API
## Метод, URL, Описание: 
 1)Get /link получить все ссылки ,   

 2)Get /link/:code редирект с короткой ссылки на оригинальный URL + кол-во кликов,

 3)Post /link/links создать короткую ссылку

# Пример запроса:

 Post /link/links
 Content-Type: application/json
````
{
 "link": "https://google.com"
 }
````

### Пример ответа:
```
{
  "id": 1,
  "code": "4t0yb7",
  "originalUrl": "https://google.com",
  "clicks": 0,
  "createdAt": "2026-06-15T11:35:57.700Z"
}
```

# Документация:
 Swagger доступен по адресу: `http://localhost:3000/docs`
 
## Как запустить тесты :

В командной строке ввести :
````
yarn test
````
##  Docker:

Для того чтобы поднять докер, ввести в командной строке: 
````
 docker-compose up -d
 ````
 

# ENG

# URL Shortener API

A REST API service for shortening links, built on NestJs + PostgreSQL.

# Project Stack
* NestJs
* TypeOrm
* PostgreSQL
* class-validator
* Swagger

## How to Install and Run

### 1. Clone the repository
Open a command prompt and enter:
```
git clone <https://github.com/Ergena11y/UrlShortener.git>
cd url-shortener
```
### 2. Install dependencies
```
yarn install
```

### 3. Create a .env file
An example is already in the repository called: .env.example, just fill in the remaining fields.

### 4. Run
````
yarn start:dev
````

# API
## Method, URL, Description:

1) Get /link - get all links,

2) Get /link/:code - redirect from a short link to the original URL + number of clicks,

3) Post /link/links - create a short link

# Request example:

Post /link/links
Content-Type: application/json
````
{
"link": "https://google.com"
}
````

### Response example:
```
{
"id": 1,
"code": "4t0yb7",
"originalUrl": "https://google.com",
"clicks": 0,
"createdAt": "2026-06-15T11:35:57.700Z"
}
```

# Documentation:
Swagger is available at: `http://localhost:3000/docs`

## How to run tests:

In the command line, enter:
````
yarn test
````
## Docker:

To start Docker, enter:
````
docker-compose up -d
````