FROM nginx:latest

# Cria uma pasta dentro do container na hora da criação da imagem
WORKDIR /app

RUN apt-get update && \
    apt-get install vim -y

COPY html/ /usr/share/nginx/html

ENTRYPOINT ["echo", "Hello"]

CMD ["Nginx"]