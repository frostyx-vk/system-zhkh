FROM python:3.9


SHELL ["/bin/bash", "-c"]


ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN pip install --upgrade pip

WORKDIR /zhkh_service/

COPY ./django/zhkh_service/docker_chat .
