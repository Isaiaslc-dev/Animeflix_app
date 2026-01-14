# 🎬 Animeflix App

> Aplicação web para buscar e descobrir animes usando a API do Jikan, com rastreamento de buscas populares via Appwrite.

## 📋 Sobre o Projeto

 Animeflix App é uma aplicação moderna de busca de animes que permite aos usuários:

- 🔍 Buscar animes em tempo real com debounce
- 🎯 Visualizar animes populares
- 📊 Ver os animes mais buscados (trending)
- ⭐ Conferir avaliações, ano de lançamento, episódios, terminado ou em lançamento e idioma inglês ou original
- 🎨 Interface moderna e responsiva com gradientes e animações

## ✨ Funcionalidades

- **Busca com Debounce**: Busca otimizada que aguarda 1 segundo após o usuário parar de digitar
- **Trending Animes**: Top 5 animes mais buscados pelos usuários, armazenados no Appwrite
- **Animes Populares**: Exibe animes populares quando não há busca ativa
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Loading States**: Feedback visual durante carregamento
- **Error Handling**: Tratamento adequado de erros da API

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 19.2** - Biblioteca JavaScript para interfaces
- **Vite 7.2** - Build tool ultra-rápido
- **TailwindCSS v4** - Framework CSS utility-first
- **React Hooks** - useState, useEffect, useDebounce

### Backend & Database
- **Appwrite** - Backend-as-a-Service para armazenar buscas
- **Jikan API** - An unofficial & open-source API for the “most active online anime + manga community and database"

### Bibliotecas Adicionais
- **react-use** - Hooks utilitários para React (useDebounce)
- **appwrite SDK** - Cliente JavaScript para Appwrite

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Appwrite Cloud (https://cloud.appwrite.io/)

### Passo a Passo

1. **Clone o repositório**
   
git clone (https://github.com/Isaiaslc-dev/animeflix_app)


3. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
# Appwrite
VITE_APPWRITE_PROJECT_ID=seu_project_id
VITE_APPWRITE_DATABASE_ID=seu_database_id
VITE_APPWRITE_COLLECTION_ID=seu_collection_id
```

4. **Configure o Appwrite**

Crie um database e collection com os seguintes atributos:

| Atributo    | Tipo    | Tamanho | Obrigatório | Default Value
|-------------|---------|---------|-------------|
| searchTerm  | String  | 1000     | ✅ Sim    |
| count       | Integer | -       | ❌ Não     |  1
| movie_id    | Integer | -       | ✅ Sim     |
| poster_url  | String  | -     | ✅ Sim       |
| title       | String  | 255   | ✅ Sim       |

**Permissões**: Role `Any` com permissões de Read, Create, Update

5. **Execute o projeto**
```bash
npm run dev
```

Acesse: http://localhost:5173

## 🎨 Estrutura do Projeto

```
movie-search-app/
├── public/
│   ├── herotwo-img.png          # Banner principal
│   ├── BGanime.png           # Background pattern
│   ├── search.svg            # Ícone de busca
│   ├── star.svg              # Ícone de estrela
│   └── No-Poster.png         # Placeholder
├── src/
│   ├── components/
│   │   ├── Search.jsx        # Input de busca
│   │   ├── Spinner.jsx       # Loading spinner
│   │   └── AnimeCard.jsx     # Card de animes
│   ├── App.jsx               # Componente principal
│   ├── appwrite.js           # Config Appwrite
│   ├── index.css             # Estilos globais
│   └── main.jsx              # Entry point
├── .env                      # Variáveis de ambiente
├── .gitignore
├── package.json
└── vite.config.js
```

## 🔑 Obtendo as API Keys

### Jikan REST API

1. Acesse o Jikan API em https://docs.api.jikan.moe/
2. Vá em Servers -> Jikan REST API
3. Copie a URL e cole no seu App.

### Appwrite Setup

1. Crie uma conta em https://cloud.appwrite.io/
2. Crie um novo projeto
3. Crie um Database
4. Crie uma Collection com os atributos mencionados acima
5. Configure as permissões para `Any` (Read, Create, Update)
6. Copie os IDs para o `.env`

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Lint
npm run lint
```

## 📱 Screenshots

### Tela Principal
![Screenshot da aplicação mostrando busca] 
<img width="1871" height="902" alt="image" src="https://github.com/user-attachments/assets/42c60550-47c5-4d45-a950-626d40eb634c" />

### Trending Movies
![Screenshot mostrando os filmes mais buscados] 
<img width="1053" height="267" alt="image" src="https://github.com/user-attachments/assets/69b65175-90f7-4a97-b5ba-c261585f0700" />

### Responsivo
![Screenshot da versão mobile] 
<img width="451" height="757" alt="image" src="https://github.com/user-attachments/assets/a23898b1-dbb2-440b-883f-cc94382b2027" />


## 👨‍💻 Autor

**Isaias Lourenço da Costa**
- GitHub: [@Isaiaslc-dev](https://github.com/Isaiaslc-dev)
- LinkedIn: [Isaias Lourenço da Costa](www.linkedin.com/in/isaiascostadev)

## 🙏 Agradecimentos

- [Jikan] (https://jikan.moe/) pela API gratuita de animes
- [Appwrite](https://appwrite.io/) pela plataforma BaaS
- [React](https://react.dev/) pela incrível biblioteca
- [Vite](https://vitejs.dev/) pelo build tool ultra-rápido
- [TailwindCSS](https://tailwindcss.com/) pelo framework CSS

## 📚 Documentação

- [Jikan API v4 Docs] (https://docs.api.jikan.moe/)
- [Appwrite Docs](https://appwrite.io/docs)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
