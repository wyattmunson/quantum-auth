FROM ubuntu
COPY . /app
docker pull postgres

EXPOSE 5151
