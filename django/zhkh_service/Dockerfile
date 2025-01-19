FROM python:3.9


SHELL ["/bin/bash", "-c"]


ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN pip install --upgrade pip

RUN mkdir /zhkh_service
WORKDIR /zhkh_service/

RUN mkdir /zhkh_service/static && mkdir /zhkh_service/media

COPY ./django/zhkh_service .
RUN pip install -r requirements.txt
RUN python manage.py collectstatic  --noinput