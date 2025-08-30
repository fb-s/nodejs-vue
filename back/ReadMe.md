# Начало

```npm install```

# Postgres

## Если нужен в Docker

```docker run -d --name test_car_db -e POSTGRES_DB=test_car -e POSTGRES_USER=user -e POSTGRES_PASSWORD=1234 -p 5432:5432 postgres:16```

## Сделать копию .env из .env.example

```copy .env.example .env```

## Если уже есть Postgres, то указать в .env свои параметры

## При первом запуске запустить

```npm run db:init```

## Применить миграции для создания таблиц

```npm run migrate```

## Добавляем данные

```npm run seed```

# Start api

```npm run start``` или ```npm run dev```
