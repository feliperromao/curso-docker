# curso-docker
Curso de docker da fullcycle


## Comandos básicos

> Executando uma imagem local
```sh
docker run {IMAGE_NAME}
```


> Executando uma imagem no modo interativo `-i` e modo tty `-t`
```sh
docker run -it {IMAGE_NAME} {COMMAND}
```
Exemplo

```sh
docker run -it ubuntu:latest bash
```


> Executando um container e remover apos o processo do container encerrar
```sh
docker run -it --rm ubuntu:latest bash
```


> Expondo portas do container
```sh
docker run -p 8080:80 nginx
```
Nesse exemplo acima a porta 80 do container foi exposta e esta acessivel na maquina local pela porta 8080

HOTS: 8080

CONTAINER: 80


> Executando container no modo detached (desacoplado) `-d`
```sh
docker run -d -p 8080:80 nginx
```


> Atribuindo um nome para o container `--name`
```sh
docker run --name nginx
```


> Executando um comando detro do container
```sh
docker exec -it nginx bash
```


> Trabalhando com bind mounts `-v`
```sh
docker run -d --name nginx -p 8080:80 -v ~/estudos/curso-docker/html/:/usr/share/nginx/html nginx
```

```sh
docker run -d --name nginx -p 8080:80 --mount type=bind,source="$(pwd)"/html,target=/usr/share/nginx/html nginx
```


> Trabalhando com volumes

- Listando volumes
```sh
docker volume ls
```

- Criando volumes
```sh
docker volume create NOME_DO_VOLUME
```

- Inspecionando um volume
```sh
docker volume inspect NOME_DO_VOLUME
```

```json
[
    {
        "CreatedAt": "2021-12-07T00:09:57Z",
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/NOME_DO_VOLUME/_data",
        "Name": "NOME_DO_VOLUME",
        "Options": {},
        "Scope": "local"
    }
]
```

- exemplo de execução com um container
```sh
docker run --name nginx -d --mount type=volume,source=meuvolume,target=/app nginx
```

- Montando com o volumes `-v`
```sh
docker run --name nginx3 -d -v meuvolume:/app nginx
```

- Limpando volumes nao utilizados

```sh
docker volume prune
```

> Trabalhando com imagens
- Baixando imagem do repositorio
```sh
docker pull php
```

- Listando imagens baixadas
```sh
docker images
```

- Removendo imagem
```sh
docker rmi php
```

- Criando image local a partir de um arquivo Dockerfile
```sh
docker build -t feliperromao/nginx-com-vim:latest .
```

- Criando imagem a partir de um arquivo dockerfile em outra pasta
```sh
docker build -f ./nginx/Dockerfile -t feliperromao/nginx-fullcycle .
```
