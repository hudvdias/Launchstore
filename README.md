# 🚀 Launchstore

#### Projeto construído durante o bootcamp Launchbase, da Rocketseat.

#### [Sobre](#-objetivo) — [Funcionalidades](#-funcionalidades) — [Demonstração](#-demonstração) — [Tecnologias](#-tecnologias) — [Utilização](#-utilização) — [Licença](#-licença) — [Autor](#-autor)

#### Status: Concluído ✅

## 💡 Objetivo

O objetivo do projeto é criar um site e-commerce que segue os padrões MVC, com validação de dados.

## 🛠 Funcionalidades

- [x] Conexão ao banco de dados;
- [x] Criação de usuários;
- [x] Alteração de dados do usuário;
- [x] Validação por token via e-mail para alteração de usuário;
- [x] Sistema de Login/Logout;
- [x] Criação, edição e remoção de anúncios pelo usuário;
- [x] Upload de múltiplas imagens com visualizador nos anúncios;
- [x] Processo de escolha de itens;
- [x] Carrinho de compras;
- [x] Visualização de status da venda pelo comprador;
- [x] Controle de status da venda pelo vendedor.

## 🎨 Demonstração

Em breve.

## 💻 Principais Tecnologias

- [x] HTML
- [x] CSS
- [x] Javascript
- [x] Node Js
- [x] Nunjucks
- [x] Express
- [x] PostgreSQL

*Para visualizar todos as tecnologias e pacotes utilizados no projeto, acesse o arquivo package.json.*

## 🚀 Utilização

```bash
# Faça um clone do diretório ou download dos arquivos
$ git clone https://github.com/hudvdias/launchstore.git
```

#### 👨‍💻 Servidor

*Para utilizar o banco de dados, você deve ter o [PostgreSQL](https://www.postgresql.org/) e o [Postbird](https://www.electronjs.org/apps/postbird) instalados na sua máquina.*

```bash
# Edite o arquivo "db.js" na pasta config para inserir suas credenciais do Postbird

# Crie o banco de dados com o nome "launchstoredb" através do Postbird

# Execute os comandos do arquivo "database.sql"

# Execute as seeds pelo terminal na pasta raiz do projeto
$ node seed.js
```

#### 🖥 Aplicação Web

*Para utilizar o serviço de email do projeto, é necessario criar uma conta no [Mailtrap](https://mailtrap.io/).*

```bash
# Instale as dependências na pasta raiz do projeto
$ npm install

# Inicie o servidor
$ npm start

# Altere o arquivo "mailer.js" na pasta utils para inserir suas credenciais do Mailtrap
```

## 📃 Licença

Este repositório está sob licença MIT. Para mais informações, leia o arquivo [LICENSE](https://github.com/hudvdias/ecoleta/blob/master/LICENSE).

## 🧑 Autor

Feito por **Hudson Dias**. [Entre em contato!](https://www.linkedin.com/in/hudvdias/)

Idealizado por [**Rocketseat**](https://rocketseat.com.br/).
