import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Header from '../components/common/Header';

function Restaurants() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchRestaurants();
  }, [search, cuisine, minRating, page]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/restaurants', {
        params: {
          search,
          cuisine: cuisine || undefined,
          minRating: minRating || undefined,
          page,
          limit: 12,
        },
      });
      setRestaurants(response.data.data);
      setTotalPages(response.data.pagination.pages);
    } catch (err) {
      setError('Failed to load restaurants');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCuisineChange = (e) => {
    setCuisine(e.target.value);
    setPage(1);
  };

  const handleRatingChange = (e) => {
    setMinRating(parseFloat(e.target.value));
    setPage(1);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">🍽️ Find Your Favorite Restaurant</h1>
            <p className="text-gray-600">Browse and order from the best restaurants near you</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <input
                type="text"
                placeholder="Search restaurants..."
                value={search}
                onChange={handleSearch}
                className="form-control"
              />

              {/* Cuisine Filter */}
              <select value={cuisine} onChange={handleCuisineChange} className="form-control">
                <option value="">All Cuisines</option>
                <option value="italian">Italian</option>
                <option value="chinese">Chinese</option>
                <option value="mexican">Mexican</option>
                <option value="indian">Indian</option>
                <option value="japanese">Japanese</option>
                <option value="french">French</option>
              </select>

              {/* Rating Filter */}
              <select value={minRating} onChange={handleRatingChange} className="form-control">
                <option value={0}>All Ratings</option>
                <option value={3.5}>⭐ 3.5+</option>
                <option value={4}>⭐⭐ 4+</option>
                <option value={4.5}>⭐⭐⭐ 4.5+</option>
              </select>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setSearch('');
                  setCuisine('');
                  setMinRating(0);
                  setPage(1);
                }}
                className="btn btn-secondary"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin h-12 w-12 border-4 border-blue-300 border-t-blue-600 rounded-full"></div>
            </div>
          )}

          {/* Restaurants Grid */}
          {!loading && restaurants.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {restaurants.map((restaurant) => (
                  <div
                    key={restaurant._id}
                    onClick={() => navigate(`/restaurants/${restaurant._id}`)}
                    className="card cursor-pointer transform transition-transform hover:scale-105"
                  >
                    {restaurant.image && (
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2">{restaurant.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{restaurant.description}</p>

                      {/* Rating and Info */}
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                        <span>⭐ {restaurant.rating}/5</span>
                        <span>⏱️ {restaurant.deliveryTime} min</span>
                      </div>

                      {/* Cuisines */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {restaurant.cuisines.slice(0, 2).map((c) => (
                          <span key={c} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {c}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex justify-between items-center pt-3 border-t">
                        <span className="text-sm font-semibold">₹{restaurant.deliveryFee} delivery</span>
                        <button className="btn btn-primary btn-sm">View Menu</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mb-8">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="btn btn-secondary"
                  >
                    Previous
                  </button>
                  <span className="flex items-center px-4 py-2 text-gray-700">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="btn btn-secondary"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}

          {/* No Results */}
          {!loading && restaurants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-2xl text-gray-500 mb-4">😢 No restaurants found</p>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
              <button onClick={() => navigate('/')} className="btn btn-primary">
                Back to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Restaurants;
