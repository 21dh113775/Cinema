import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyShowsData, dummyTrailers, dummyDateTimeData } from '../assets/assets';
import { Star, Clock, MapPin, Ticket, Play, Loader2 } from 'lucide-react';
import BlurCircle from '../components/BlurCircle';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch movie data based on ID
  useEffect(() => {
    const timer = setTimeout(() => {
      const selectedMovie = dummyShowsData.find((m) => m._id === id);
      setMovie(selectedMovie || null);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-red-500 animate-spin mx-auto mb-4" />
              <h2 className="text-white text-xl font-semibold mb-2">Đang tải chi tiết phim...</h2>
              <p className="text-gray-400">Vui lòng chờ trong giây lát</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-24 px-4">
        <div className="max-w-7xl mx-auto text-center py-20">
          <h2 className="text-white text-2xl font-bold mb-4">Phim không tồn tại</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Chúng tôi không thể tìm thấy thông tin về phim này. Hãy kiểm tra lại ID hoặc quay lại trang chính.
          </p>
          <button
            onClick={() => navigate('/movies')}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-300"
          >
            Quay lại danh sách phim
          </button>
        </div>
      </div>
    );
  }

  // Extract showtimes for the movie (assuming showId matches movie._id)
  const showtimes = Object.values(dummyDateTimeData).flat().filter(show => show.showId === movie._id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-24 pb-12">
      <BlurCircle top="100px" left="0" />
      <BlurCircle bottom="100px" right="0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <img
              src={movie.backdrop_path}
              alt={`${movie.title} poster`}
              className="w-full lg:w-1/3 rounded-xl shadow-2xl object-cover h-96"
              loading="lazy"
            />
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
                {movie.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-gray-300 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>{movie.vote_average?.toFixed(1) || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <span>{movie.genres.map(g => g.name).join(', ')}</span>
                </div>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                {movie.overview || 'Không có mô tả chi tiết cho phim này.'}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate(`/movies/book/${movie._id}`)}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Ticket className="w-5 h-5" /> Mua Vé
                </button>
                <button
                  onClick={() => navigate(`/movies/trailer/${movie._id}`)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Play className="w-5 h-5" /> Xem Trailer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Thông tin chi tiết</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <p className="mb-2"><strong>Thời lượng:</strong> {movie.runtime} phút</p>
              <p className="mb-2"><strong>Ngày phát hành:</strong> {new Date(movie.release_date).toLocaleDateString('vi-VN')}</p>
              <p className="mb-2"><strong>Tagline:</strong> {movie.tagline || 'Không có tagline'}</p>
            </div>
            <div>
              <p className="mb-2"><strong>Ngôn ngữ:</strong> {movie.original_language.toUpperCase()}</p>
              <p className="mb-2"><strong>Đánh giá:</strong> {movie.vote_count} lượt vote</p>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Diễn viên</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {movie.casts.slice(0, 8).map((cast, index) => (
              <div key={index} className="text-center">
                <img
                  src={cast.profile_path}
                  alt={cast.name}
                  className="w-24 h-24 object-cover rounded-full mx-auto mb-2 shadow-md"
                  loading="lazy"
                />
                <p className="text-gray-300 text-sm">{cast.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Showtimes Section */}
        {showtimes.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Lịch chiếu</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {showtimes.map((show, index) => (
                <div key={index} className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <p className="text-gray-300">
                    <strong>Ngày:</strong> {new Date(show.time).toLocaleDateString('vi-VN')}
                  </p>
                  <p className="text-gray-300">
                    <strong>Giờ:</strong> {new Date(show.time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <button
                    onClick={() => navigate(`/movies/book/${movie._id}/${show.showId}`)}
                    className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm transition-all duration-300"
                  >
                    Đặt vé
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trailer Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Trailer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {dummyTrailers.map((trailer, index) => (
              <a
                key={index}
                href={trailer.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <img
                  src={trailer.image}
                  alt={`Trailer ${index + 1} cho ${movie.title}`}
                  className="w-full h-48 object-cover rounded-xl shadow-md transition-transform group-hover:scale-105"
                />
                <p className="text-gray-300 text-sm mt-2 text-center">Trailer {index + 1}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;