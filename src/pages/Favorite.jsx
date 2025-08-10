import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import MovieCard from '../components/MovieCard';
import { 
  Heart,
  Search, 
  Grid3X3, 
  List, 
  Trash2,
  Download,
  Share2,
  Filter,
  Calendar,
  Star,
  Clock,
  Loader2,
  SlidersHorizontal,
  X,
  ChevronDown,
  HeartOff,
  Plus,
  BookmarkPlus,
  Eye,
  PlayCircle
} from 'lucide-react';
import BlurCircle from '../components/BlurCircle';

const Favorites = () => {
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('dateAdded');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Mock loading effect và load favorites
  useEffect(() => {
    const timer = setTimeout(() => {
      // Mock data - trong thực tế sẽ fetch từ API
      const mockFavorites = [
        {
          _id: '1',
          title: 'Spider-Man: No Way Home',
          genre: 'Action',
          rating: 8.2,
          releaseDate: '2021-12-17',
          dateAdded: '2024-01-15',
          poster: '/path/to/poster1.jpg',
          watchStatus: 'watched', // watched, planning, watching
          personalRating: 9,
          notes: 'Phim hay nhất năm!'
        },
        {
          _id: '2', 
          title: 'Avengers: Endgame',
          genre: 'Action',
          rating: 8.4,
          releaseDate: '2019-04-26',
          dateAdded: '2024-01-10',
          poster: '/path/to/poster2.jpg',
          watchStatus: 'planning',
          personalRating: null,
          notes: ''
        },
      ];
      
      setFavorites(mockFavorites);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [user]);

  // Filter and search favorites
  useEffect(() => {
    let result = [...favorites];

    // Search filter
    if (searchQuery) {
      result = result.filter(movie => 
        movie.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.notes?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Genre filter
    if (selectedGenre !== 'all') {
      result = result.filter(movie => 
        movie.genre?.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    }

    // Sort favorites
    switch (sortBy) {
      case 'title':
        result.sort((a, b) => a.title?.localeCompare(b.title));
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'personalRating':
        result.sort((a, b) => (b.personalRating || 0) - (a.personalRating || 0));
        break;
      case 'releaseDate':
        result.sort((a, b) => new Date(b.releaseDate || 0) - new Date(a.releaseDate || 0));
        break;
      case 'dateAdded':
      default:
        result.sort((a, b) => new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0));
        break;
    }

    setFilteredFavorites(result);
  }, [favorites, searchQuery, selectedGenre, sortBy]);

  // Get unique genres from favorites
  const genres = ['all', ...new Set(favorites.map(movie => movie.genre).filter(Boolean))];

  const sortOptions = [
    { value: 'dateAdded', label: 'Mới thêm gần đây' },
    { value: 'title', label: 'Tên phim A-Z' },
    { value: 'rating', label: 'Đánh giá IMDb' },
    { value: 'personalRating', label: 'Đánh giá của tôi' },
    { value: 'releaseDate', label: 'Năm phát hành' }
  ];

  const watchStatusOptions = [
    { value: 'all', label: 'Tất cả', icon: Eye, color: 'text-gray-400' },
    { value: 'watched', label: 'Đã xem', icon: PlayCircle, color: 'text-green-500' },
    { value: 'watching', label: 'Đang xem', icon: Clock, color: 'text-blue-500' },
    { value: 'planning', label: 'Sẽ xem', icon: BookmarkPlus, color: 'text-yellow-500' }
  ];

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedGenre('all');
    setSortBy('dateAdded');
  };

  const handleRemoveFromFavorites = (movieId) => {
    setFavorites(prev => prev.filter(movie => movie._id !== movieId));
    setSelectedMovies(prev => prev.filter(id => id !== movieId));
  };

  const handleBulkRemove = () => {
    setFavorites(prev => prev.filter(movie => !selectedMovies.includes(movie._id)));
    setSelectedMovies([]);
    setShowBulkActions(false);
  };

  const handleSelectMovie = (movieId) => {
    setSelectedMovies(prev => 
      prev.includes(movieId) 
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMovies.length === filteredFavorites.length) {
      setSelectedMovies([]);
    } else {
      setSelectedMovies(filteredFavorites.map(movie => movie._id));
    }
  };

  // Stats calculations
  const stats = {
    total: favorites.length,
    watched: favorites.filter(m => m.watchStatus === 'watched').length,
    planning: favorites.filter(m => m.watchStatus === 'planning').length,
    watching: favorites.filter(m => m.watchStatus === 'watching').length,
    avgRating: favorites.reduce((acc, m) => acc + (m.personalRating || 0), 0) / favorites.filter(m => m.personalRating).length || 0
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-red-500 animate-spin mx-auto mb-4" />
              <h2 className="text-white text-xl font-semibold mb-2">Đang tải danh sách yêu thích...</h2>
              <p className="text-gray-400">Vui lòng chờ trong giây lát</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state for no favorites
  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-24 pb-12">
        <BlurCircle top="150px" left="0px" color="pink" animate={true} animationType="pulse" />
        <BlurCircle bottom="50px" right="50px" color="purple" animate={true} animationType="float" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <HeartOff className="w-16 h-16 text-red-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Chưa có phim yêu thích
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Hãy khám phá và thêm những bộ phim bạn yêu thích vào danh sách để dễ dàng theo dõi và xem lại sau.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                <Plus className="w-5 h-5 inline mr-2" />
                Khám phá phim mới
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-semibold transition-all duration-300">
                Xem phim đang chiếu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-24 pb-12">
      <BlurCircle top="150px" left="0px" color="pink" animate={true} animationType="pulse" />
      <BlurCircle bottom="50px" right="50px" color="purple" animate={true} animationType="float" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white fill-current" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Phim Yêu Thích
            </h1>
          </div>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Bộ sưu tập những bộ phim yêu thích của {user?.firstName || 'bạn'}
          </p>
          
          {/* Stats Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
            <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-gray-400 text-sm">Tổng số</span>
              </div>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <PlayCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-400 text-sm">Đã xem</span>
              </div>
              <p className="text-2xl font-bold text-white">{stats.watched}</p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <BookmarkPlus className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-400 text-sm">Sẽ xem</span>
              </div>
              <p className="text-2xl font-bold text-white">{stats.planning}</p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-400 text-sm">Đánh giá TB</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {stats.avgRating > 0 ? stats.avgRating.toFixed(1) : '--'}
              </p>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedMovies.length > 0 && (
          <div className="bg-red-500/20 backdrop-blur-sm rounded-xl border border-red-500/30 p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-white font-medium">
                  Đã chọn {selectedMovies.length} phim
                </span>
                <button
                  onClick={handleSelectAll}
                  className="text-sm text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {selectedMovies.length === filteredFavorites.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-300">
                  <Download className="w-4 h-4" />
                  Xuất danh sách
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-300">
                  <Share2 className="w-4 h-4" />
                  Chia sẻ
                </button>
                <button
                  onClick={handleBulkRemove}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa đã chọn
                </button>
                <button
                  onClick={() => setSelectedMovies([])}
                  className="p-2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters & Search */}
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8">
          
          {/* Top Row */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm trong danh sách yêu thích..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors duration-300"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Bộ lọc
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filter Row */}
          <div className={`lg:flex items-center gap-4 ${showFilters ? 'flex flex-col lg:flex-row' : 'hidden lg:flex'}`}>
            
            {/* Genre Filter */}
            <div className="flex-1">
              <label className="block text-gray-300 text-sm font-medium mb-2">Thể loại</label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors duration-300"
              >
                <option value="all" className="bg-gray-800">Tất cả thể loại</option>
                {genres.filter(genre => genre !== 'all').map(genre => (
                  <option key={genre} value={genre} className="bg-gray-800 capitalize">
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex-1">
              <label className="block text-gray-300 text-sm font-medium mb-2">Sắp xếp theo</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors duration-300"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value} className="bg-gray-800">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode & Bulk Select */}
            <div className="flex items-center gap-3">
              {/* Bulk Select Toggle */}
              <button
                onClick={() => setShowBulkActions(!showBulkActions)}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  showBulkActions || selectedMovies.length > 0
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
                title="Chế độ chọn nhiều"
              >
                <Filter className="w-5 h-5" />
              </button>

              {/* View Mode */}
              <div className="flex bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-red-500 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-red-500 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Clear Filters */}
            {(searchQuery || selectedGenre !== 'all' || sortBy !== 'dateAdded') && (
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <X className="w-4 h-4" />
                Xóa bộ lọc
              </button>
            )}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-1">
              {searchQuery ? `Kết quả tìm kiếm: "${searchQuery}"` : 'Danh sách yêu thích'}
            </h2>
            <p className="text-gray-400">
              {filteredFavorites.length} / {favorites.length} bộ phim
              {selectedGenre !== 'all' && ` • Thể loại: ${selectedGenre}`}
            </p>
          </div>
        </div>

        {/* Movies Grid/List */}
        {filteredFavorites.length > 0 ? (
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
              : 'flex flex-col gap-4'
          } mb-12`}>
            {filteredFavorites.map((movie) => (
              <div 
                key={movie._id}
                className={`relative group ${
                  viewMode === 'list' 
                    ? 'transform transition-all duration-300 hover:scale-[1.02]' 
                    : ''
                }`}
              >
                {/* Selection checkbox */}
                {(showBulkActions || selectedMovies.length > 0) && (
                  <div className="absolute top-2 left-2 z-10">
                    <input
                      type="checkbox"
                      checked={selectedMovies.includes(movie._id)}
                      onChange={() => handleSelectMovie(movie._id)}
                      className="w-5 h-5 rounded border-2 border-white/20 bg-black/50 checked:bg-red-500 checked:border-red-500 transition-colors duration-300"
                    />
                  </div>
                )}

                <MovieCard 
                  movie={movie} 
                  viewMode={viewMode}
                  isFavorite={true}
                  onRemoveFromFavorites={handleRemoveFromFavorites}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="text-white text-2xl font-bold mb-4">Không tìm thấy phim nào</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Không có phim nào phù hợp với tiêu chí tìm kiếm của bạn trong danh sách yêu thích.
            </p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-300"
            >
              Xóa tất cả bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;