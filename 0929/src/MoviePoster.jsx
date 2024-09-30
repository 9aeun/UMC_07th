import React, { useState } from 'react';
import { MOVIES } from './mocks/movies'; // movies.js에서 리스트를 불러옴

const MoviePosters = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const baseUrl = 'https://image.tmdb.org/t/p/w500'; // 이미지 베이스 URL

  const posterStyle = {
    position: 'relative',
    display: 'inline-block',
    margin: '10px',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {MOVIES.results.map((movie, index) => (
        <div
          key={movie.id} // movie의 id를 키로 사용
          style={posterStyle}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <img 
            src={`${baseUrl}${movie.poster_path}`} // 전체 이미지 URL
            alt={movie.original_title} 
            width="200" 
            height="300" 
          />
          <div
            style={{
              ...overlayStyle,
              opacity: hoveredIndex === index ? 1 : 0,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default MoviePosters;
