Система ЖКХ (System ZHKH)

Полный стек веб-приложения для Системы ЖКХ на React (Frontend) + Django REST Framework (Backend) + PostgreSQL (Database) + Docker.

📝 Описание

Приложение предназначено для автоматизации и управления сервисами ЖКХ.

Функциональность предлагает:
Авторизацию и регистрацию пользователей (JWT, Djoser);
Работу с ролями и правами доступа;
CRUD-операции с сущностями системы (заявки, услуги, пользователи и т.д.);
REST API для взаимодействия frontend и backend;
Поддержку CORS для работы с frontend-приложением;

Backend реализован на Django + Django REST Framework.
Frontend — SPA-приложение на React с использованием Chakra UI.

⚙️ Используемые технологии
Frontend:
React 18
React Router DOM
Chakra UI
Axios
React Toastify
Socket.io

Backend:
Python 3
Django 4.2
Django REST Framework
Djoser
Simple JWT
Gunicorn + Uvicorn
PostgreSQL
psycopg2

База данных:
PostgreSQL 16

Контейнеризация:
Docker

🐳 Запуск проекта через Docker

Перейти в корень проекта, где находится docker-compose.yml

Выполнить команду:
docker-compose up --build

Docker поднимает:
PostgreSQL
Backend (Django + DRF)
Frontend (React)

🌐 Доступ к приложению:

Frontend:
http://localhost:3001

Backend API:
http://localhost:8000

Админ-панель Django:
http://localhost:8000/admin
