# CRUD com Wesocket (protocolo TCP/IP abstraído pela lib socket.io) - Elaine Manoelle

## Description

Estava cansada de só ver exemplos de websocket com Chat, então esse é um exemplo de websocket simulando um sistema de pedidos CRUD em Angular e NodeJS, e que se comunica com o backend em NodeJ usando o protocolo TCP/IP do Websocket abstraído pela lib socket.io e insere num banco de dado MongoDB

## Requirements
* Você deve ter instalado em sua máquina:
  * NodeJS (npm)
  * Angular CLI
  * MongoDB
  
## Installation

* No diretório raíz, rode `npm install` para instalar as dependências do backend em NodeJS.
* No diretório /client, rode `npm install` para instalar as dependências do frontend em Angular.
* Certifique-se de que seu MongoDB local está rodando.

## Development server

* No diretório raíz, rode `npm run start` para levantar o backend. 
* No diretório /client, rode `npm run start` para rodar e ver o frontend.

## How can you test?
* Abra a URL http://localhost:4200 em duas ou mais janelas do navegador. 
* Tente deixar todas as janelas uma ao lado da outra para que possa ter todas na sua visão ao mesmo tempo.
* Agora em uma das janelas utilize o CRUD: Adicione, edite ou exclua um pedido. Pronto, você verá isso ser replicado em tempo real nas demais telas.
* OBS: Só queria deixar registrado que websocket é maravilhoso. rs

## For further information

* Email: elaine.manoelle@pmipe.org.br
* Social Network: www.linkedin.com/in/elainemanoelle.
