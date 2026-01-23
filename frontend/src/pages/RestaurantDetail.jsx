import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Header from '../components/common/Header';

function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('main');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    loadRestaurant();
    loadMenuItems();
  }, [id, selectedCategory]);

  const loadRestaurant = async () => {
    try {
      const response = await api.get(`/restaurants/${id}`);
      setRestaurant(response.data.data);
    } catch (err) {
      setError('Failed to load restaurant');
      console.error(err);
    }
  };

  const loadMenuItems = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/restaurants/${id}/menu`, {
        params: { category: selectedCategory, limit: 50 },
      });
      setMenuItems(response.data.data);
    } catch (err) {
      setError('Failed to load menu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    setSelectedItem(item);
    setQuantity(1);
  };

  const handleConfirmAdd = () => {
    // Load cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find((i) => i._id === selectedItem._id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...selectedItem, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartRestaurant', JSON.stringify(restaurant));
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    setSelectedItem(null);
  };

  const categories = ['appetizer', 'main', 'dessert', 'beverage', 'combo'];

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl text-red-600 mb-4">{error}</p>
            <button onClick={() => navigate('/restaurants')} className="btn btn-primary">
              Back to Restaurants
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Restaurant Hero */}
        {restaurant && (
          <div className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-8">
              {restaurant.image && (
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
                  <p className="text-gray-600 mb-4">{restaurant.description}</p>
                  <div className="flex gap-6 text-sm text-gray-600">
                    <span>⭐ Rating: {restaurant.rating}/5</span>
                    <span>⏰ Delivery: {restaurant.deliveryTime} mins</span>
                    <span>💵 Fee: ₹{restaurant.deliveryFee}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/cart')}
                  className="btn btn-primary relative"
                >
                  🛒 Cart ({cartCount})
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {restaurant.cuisines?.map((cuisine) => (
                  <span key={cuisine} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {cuisine}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Menu */}
        <div className="container mx-auto px-4 py-8">
          {/* Category Filter */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Menu</h2>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin h-12 w-12 border-4 border-blue-300 border-t-blue-600 rounded-full"></div>
            </div>
          )}

          {/* Menu Items Grid */}
          {!loading && menuItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>

                    {/* Item Details */}
                    <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
                      {item.vegetarian && <span>🌱 Vegetarian</span>}
                      {item.spicyLevel > 0 && <span>🌶️ {'🌶️'.repeat(item.spicyLevel)}</span>}
                    </div>

                    {/* Price and Button */}
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">₹{item.price}</span>
                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={!item.available}
                        className="btn btn-primary"
                      >
                        {item.available ? 'Add' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Items */}
          {!loading && menuItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-xl">No items in this category</p>
            </div>
          )}
        </div>
      </div>

      {/* Item Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            {selectedItem.image && (
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="text-2xl font-bold mb-2">{selectedItem.name}</h3>
            <p className="text-gray-600 mb-4">{selectedItem.description}</p>
            <p className="text-3xl font-bold text-blue-600 mb-4">₹{selectedItem.price}</p>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 bg-gray-200 rounded"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-16 text-center border rounded"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleConfirmAdd}
                className="btn btn-primary flex-1"
              >
                Add to Cart
              </button>
              <button
                onClick={() => setSelectedItem(null)}
                className="btn btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RestaurantDetail;
