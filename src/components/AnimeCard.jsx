import React from 'react'

const AnimeCard = ({ anime }) => {
  const {
    title,           // Título em japonês romanizado
    title_english,   // Título em inglês (pode ser null)
    score,           // Nota (0-10)
    images,          // Objeto com URLs das imagens
    episodes,        // Número de episódios
    status,          // "Airing", "Finished Airing", etc
    year,            // Ano de lançamento
    type,            // "TV", "Movie", "OVA", etc
  } = anime

  return (
    <div className="anime-card">
      <img
        src={images?.jpg?.large_image_url || '/No-Poster.png'}
        alt={title_english || title}
        loading="lazy"
      />

      <div className="mt-4">
        {/* Prioriza título em inglês, senão usa japonês */}
        <h3>{title_english || title}</h3>

        <div className="content">
          {/* Rating */}
          <div className="rating">
            <img src="/star.svg" alt="rating" />
            <p>{score ? score.toFixed(1) : 'N/A'}</p>
          </div>

          <span>•</span>

          <p className="lang">
            {episodes ? `${episodes} eps` : type || 'N/A'}
          </p>

          <span>•</span>

          {/* Ano de lançamento */}
          <p className="year">{year || 'N/A'}</p>
        </div>

        {/* Status (Airing, Finished, etc) */}
        {status && (
          <p className="text-xs text-gray-400 mt-2">
            {status}
          </p>
        )}
      </div>
    </div>
  )
}

export default AnimeCard