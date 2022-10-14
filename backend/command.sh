find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc"  -delete
python3 manage.py makemigrations accounts chat && python3 manage.py migrate
#python3 manage.py makemigrations
#python3 manage.py migrate --run-syncdb
python3 manage.py runserver 0.0.0.0:8000