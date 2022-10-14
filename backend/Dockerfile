FROM python:3.9

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE 1

RUN mkdir -p /app

WORKDIR /app

RUN pip install --upgrade pip
COPY requirements.txt /app/

RUN pip install -r requirements.txt


COPY . /app/