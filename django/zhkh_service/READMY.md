## Подготовка к запуску

```sh
docker-compose build
```

## Запуск

```sh
docker-compose up
```

### Применение миграций

```sh
docker-compose run --rm web python manage.py migrate
```