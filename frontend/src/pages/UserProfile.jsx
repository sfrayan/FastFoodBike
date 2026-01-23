import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Header from '../components/common/Header';
import { useAuth } from '../hooks/useAuth';

function UserProfile() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadProfile();
    loadOrders();
  }, [isAuthenticated, navigate]);

  const loadProfile = () => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  };

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/orders', {
        params: { page, limit: 10 },
      });
      setOrders(response.data.data);
      setTotalPages(response.data.pagination.pages);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'orders') {
      loadOrders();
    }
  }, [page, activeTab]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const response = await api.put('/users/profile', formData);
      if (response.data.status === 'success') {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update profile',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await api.delete('/users/account');
        logout();
        navigate('/');
      } catch (err) {
        setMessage({
          type: 'error',
          text: err.response?.data?.message || 'Failed to delete account',
        });
      }
    }
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      out_for_delivery: 'bg-orange-100 text-orange-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>

          {message && (
            <div
              className={`mb-8 px-4 py-3 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </div>
                  <h2 className="text-xl font-bold">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-gray-600 text-sm">{user?.email}</p>
                </div>

                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      activeTab === 'profile'
                        ? 'bg-blue-100 text-blue-600 font-bold'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    👤 Profile
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      activeTab === 'orders'
                        ? 'bg-blue-100 text-blue-600 font-bold'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    📋 Order History
                  </button>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                  >
                    🚪 Logout
                  </button>
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                    <form onSubmit={handleSaveProfile}>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="form-control"
                        />
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control mb-4"
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control mb-4"
                      />
                      <textarea
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-control mb-4"
                        rows="3"
                      />
                      <button
                        type="submit"
                        disabled={saving}
                        className="btn btn-primary"
                      >
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                    </form>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-red-600">⚠️ Danger Zone</h2>
                    <p className="text-gray-600 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      className="btn bg-red-600 text-white hover:bg-red-700"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-6">Order History</h2>

                  {loading ? (
                    <div className="flex justify-center items-center py-12">
                      <div className="animate-spin h-12 w-12 border-4 border-blue-300 border-t-blue-600 rounded-full"></div>
                    </div>
                  ) : orders.length > 0 ? (
                    <>
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div
                            key={order._id}
                            onClick={() => navigate(`/orders/${order._id}`)}
                            className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-bold text-lg">{order.restaurantId?.name}</h3>
                                <p className="text-gray-600 text-sm">Order #{order._id?.slice(-8)}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold">₹{order.totalPrice?.toFixed(2)}</p>
                                <span
                                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                    getStatusBadgeColor(order.status)
                                  }`}
                                >
                                  {order.status?.toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm">
                              {new Date(order.createdAt).toLocaleDateString()} -{' '}
                              {order.items?.length} item{order.items?.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-8">
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
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">No orders yet</p>
                      <button
                        onClick={() => navigate('/restaurants')}
                        className="btn btn-primary"
                      >
                        Start Ordering
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
