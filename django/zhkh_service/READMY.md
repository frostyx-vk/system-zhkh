## Подготовка к запуску

```sh
docker_chat-compose build
```

## Запуск

```sh
docker_chat-compose up
```

### Применение миграций

```sh
docker_chat-compose run --rm web python manage.py migrate
```