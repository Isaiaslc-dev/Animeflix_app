import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import Search from './components/Search'
import Spinner from './components/Spinner'
import AnimeCard from './components/AnimeCard'
import { updateSearchCount, getTrendingAnimes } from './appwrite'

const API_BASE_URL = 'https://api.jikan.moe/v4'


const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [animeList, setAnimeList] = useState([])
  const [trendingAnimes, setTrendingAnimes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  // Debounce: espera 1 segundo após usuário parar de digitar
  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm)
  }, 1000, [searchTerm])

  // Buscar animes na API
  const fetchAnimes = async (query = '') => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      // Endpoints da Jikan API
      const endpoint = query
        ? `${API_BASE_URL}/anime?q=${encodeURIComponent(query)}&sfw=true`
        : `${API_BASE_URL}/top/anime?limit=20`

      // Fetch simples - SEM autenticação!
      const response = await fetch(endpoint)

      if (!response.ok) {
        throw new Error('Falha ao buscar animes')
      }

      const data = await response.json()

      // Jikan retorna dados em data.data
      setAnimeList(data.data || [])

      // Salvar busca no Appwrite se houver resultados
      if (query && data.data.length > 0) {
        await updateSearchCount(query, data.data[0])
        await loadTrendingAnimes()
      }
    } catch (error) {
      console.error('Erro ao buscar animes:', error)
      setErrorMessage('Erro ao buscar animes. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  // Carregar animes mais buscados do Appwrite
  const loadTrendingAnimes = async () => {
    try {
      const animes = await getTrendingAnimes()
      setTrendingAnimes(animes)
    } catch (error) {
      console.error('Erro ao buscar trending:', error)
    }
  }

  // Buscar quando termo de busca mudar (com debounce)
  useEffect(() => {
    fetchAnimes(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  // Carregar trending na inicialização
  useEffect(() => {
    loadTrendingAnimes()
  }, [])

  return (
    <main>
      {/* Background pattern */}
      <div className="pattern" />

      <div className="wrapper">
        {/* Header com busca */}
        <header>
          <img src="/herotwo.png" alt="Heroes Banner" />
          <h1>
            Find <span className="text-gradient">Animes</span> You'll Love
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {/* Seção de Trending Animes */}
        {trendingAnimes.length > 0 && (
          <section className="trending">
            <h2>Trending Animes</h2>
            <ul>
              {trendingAnimes.map((anime, index) => (
                <li key={anime.$id}>
                  <p>{index + 1}</p>
                  <img src={anime.poster_url} alt={anime.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Seção de Todos os Animes */}
        <section className="all-animes">
          <h2>All Animes</h2>

          {/* Loading */}
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            // Erro
            <p className="text-red-500">{errorMessage}</p>
          ) : animeList.length === 0 ? (
            // Nenhum resultado
            <p className="text-gray-400 text-center mt-10">
              No animes found. Try searching for something else.
            </p>
          ) : (
            // Lista de animes
            <ul>
              {animeList.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
