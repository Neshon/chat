docker command:
#### Сборка проекта
- docker-compose build --no-cache
#### Создание миграций
- docker-compose run web python manage.py makemigrations
#### Применение миграций
- docker-compose run web python manage.py migrate
#### Создание супер пользователя
- docker-compose run web python manage.py createsuperuser
#### Если не работают миграции
- docker-compose run web python manage.py migrate --run-syncdb
- docker-compose run web python manage.py migrate --fake {app}
- docker-compose exec web python manage.py migrate --noinput




#### Запуск проекта
- docker-compose up

#### Пересборка проекта, только изменившаяся часть
- docker-compose up -d --no-deps --build {services}

#### Список образов
- docker images
#### Список контейнеров
- docker ps


####
- docker volume prune
- docker rm -f $(docker ps -qa)
- docker rmi -f $(docker images -aq)
