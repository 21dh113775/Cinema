import { Star } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import timeFormat from '../lib/timeFormat';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between p-4 bg-gray-800 rounded-xl hover:-translate-y-2 transition-all duration-300 w-64 shadow-xl hover:shadow-2xl overflow-hidden group border border-gray-700/50">
      <img
        onClick={() => {
          navigate(`/movies/${movie.id}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        src={movie.backdrop_path}
        alt={`${movie.title} poster`}
        loading="lazy"
        className="rounded-lg h-56 w-full object-cover cursor-pointer transition-transform group-hover:scale-105"
      />
      
      <div className="mt-3 space-y-2">
        <h3 className="font-semibold text-white text-lg line-clamp-2 hover:text-red-400 transition-colors">{movie.title}</h3>
        <p className="text-sm text-gray-400">
          {new Date(movie.release_date).getFullYear()} •{' '}
          {movie.genres?.slice(0, 2).map(genre => genre.name).join(" • ")} •{' '}
          {timeFormat(movie.runtime)}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => {
            navigate(`/movies/${movie.id}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-4 py-1.5 bg-red-600 hover:bg-red-700 transition-all rounded-full font-medium text-sm text-white shadow-md hover:shadow-lg cursor-pointer transform hover:scale-105"
        >
          Mua Vé
        </button>
        <div className="flex items-center gap-1.5 text-sm text-gray-300">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span className="font-medium">{movie.vote_average?.toFixed(1) || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;