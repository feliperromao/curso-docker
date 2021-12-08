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

> Trabalhando com networks

- Listando networks
```sh
docker network ps
```


- Inspecionando networks
```sh
docker network inspect bridge
```


```json
[
    {
        "Name": "bridge",
        "Id": "f65d1464c5d822b4179da56c4d75fce186640b966e65cb363c89c897291c7d43",
        "Created": "2021-12-06T11:24:06.0774937Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.17.0.0/16",
                    "Gateway": "172.17.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "52208a70d28e2361a47daf4e8ea6f9322309c54d70344fe84a32fa3b682a88f4": {
                "Name": "ubuntu2",
                "EndpointID": "31a70284be616d1b1e393750cc0ce1b09e883062985f9b8159394d5b70ad78e7",
                "MacAddress": "02:42:ac:11:00:03",
                "IPv4Address": "172.17.0.3/16",
                "IPv6Address": ""
            },
            "63b747764b78f012e79268d56067d34da9aba5c269aa6d57c7908bc3b3c94d23": {
                "Name": "ubuntu1",
                "EndpointID": "bde71b7559e9324d382a2879831593ea48b55990b8de2f9410f9a72894fada17",
                "MacAddress": "02:42:ac:11:00:02",
                "IPv4Address": "172.17.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {
            "com.docker.network.bridge.default_bridge": "true",
            "com.docker.network.bridge.enable_icc": "true",
            "com.docker.network.bridge.enable_ip_masquerade": "true",
            "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
            "com.docker.network.bridge.name": "docker0",
            "com.docker.network.driver.mtu": "1500"
        },
        "Labels": {}
    }
]
```


- Criando uma nova rede
```sh
docker network create --driver bridge minharede
```


- Executando container em uma rede existente
```sh
docker run -dit --name ubuntu2 --network minharede bash
```


- Conectando um container existente em uma rede existente
```sh
docker network connect minharede ubuntu3
```


- Criando um container numa rede tipo host
```sh
docker run --rm -d --name nginx --network host nginx
```


> Contaienr acessando nossa maquina
```sh
curl http://host.docker.internal:8082
```

> Executando imagem criada substituindo o CMD no Dockerfile
```sh
docker run --rm -d --name laravel -p 8001:8001 feliperromao/laravel --host=0.0.0.0 --port=8001
```