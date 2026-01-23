import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/common/Header';

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/restaurants`);
        setRestaurants(response.data.data || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching restaurants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🚴 FastFoodBike</h1>
          <p className="text-xl text-gray-600 mb-8">
            Order delicious food delivered by bike - Fast, Fresh, Eco-Friendly
          </p>

          {/* Search and Filter */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search restaurants..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </section>

        {/* Restaurants Grid */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Restaurants</h2>
          
          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading restaurants...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">Error loading restaurants: {error}</p>
            </div>
          )}

          {!loading && !error && restaurants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No restaurants available yet</p>
            </div>
          )}

          {!loading && !error && restaurants.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant._id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="h-48 bg-gray-200">
                    {restaurant.image && (
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {restaurant.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {restaurant.description}
                    </p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-yellow-500 font-semibold">
                        ⭐ {restaurant.rating || 'N/A'}
                      </span>
                      <span className="text-gray-600 text-sm">
                        {restaurant.estimatedDelivery?.min}-{restaurant.estimatedDelivery?.max} min
                      </span>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      View Menu
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;
