import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Header from '../components/common/Header';

function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    loadOrder();
    const interval = setInterval(loadOrder, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, [id]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/orders/${id}`);
      setOrder(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load order');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setCancelling(true);
      try {
        await api.post(`/orders/${id}/cancel`);
        loadOrder();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to cancel order');
      } finally {
        setCancelling(false);
      }
    }
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: '⏳',
      confirmed: '✅',
      preparing: '👨‍🍳',
      out_for_delivery: '🚴',
      delivered: '🎉',
      cancelled: '❌',
    };
    return icons[status] || '📦';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'text-yellow-600',
      confirmed: 'text-blue-600',
      preparing: 'text-purple-600',
      out_for_delivery: 'text-orange-600',
      delivered: 'text-green-600',
      cancelled: 'text-red-600',
    };
    return colors[status] || 'text-gray-600';
  };

  const statusTimeline = [
    { status: 'pending', label: 'Order Placed', icon: '📦' },
    { status: 'confirmed', label: 'Confirmed', icon: '✅' },
    { status: 'preparing', label: 'Preparing', icon: '👨‍🍳' },
    { status: 'out_for_delivery', label: 'Out for Delivery', icon: '🚴' },
    { status: 'delivered', label: 'Delivered', icon: '🎉' },
  ];

  const getStatusIndex = (status) => {
    return statusTimeline.findIndex((s) => s.status === status);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-300 border-t-blue-600 rounded-full"></div>
        </div>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl text-gray-600 mb-4">Order not found</p>
            <button onClick={() => navigate('/profile')} className="btn btn-primary">
              Back to Orders
            </button>
          </div>
        </div>
      </>
    );
  }

  const statusIndex = getStatusIndex(order.status);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <button onClick={() => navigate('/profile')} className="text-blue-600 hover:underline mb-8">
            ← Back to Orders
          </button>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
              {error}
            </div>
          )}

          {/* Order Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Order #{order._id?.slice(-8)}</h1>
                <p className="text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className={`text-3xl font-bold ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)} {order.status?.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          {order.status !== 'cancelled' && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-6">Order Status</h2>
              <div className="relative">
                {/* Timeline Line */}
                <div
                  className="absolute top-8 left-0 right-0 h-1 bg-gray-300"
                  style={{
                    width: `${(statusIndex / (statusTimeline.length - 1)) * 100}%`,
                    backgroundColor: '#3b82f6',
                  }}
                ></div>

                {/* Timeline Points */}
                <div className="flex justify-between relative">
                  {statusTimeline.map((item, index) => (
                    <div key={item.status} className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 relative z-10 ${
                          index <= statusIndex
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}
                      >
                        {item.icon}
                      </div>
                      <p className="text-sm text-center">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Order Items</h2>
                <div className="space-y-4">
                  {order.items?.map((item, index) => (
                    <div key={index} className="flex justify-between items-center pb-4 border-b last:border-b-0">
                      <div>
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                      </div>
                      <span className="text-lg font-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Restaurant Info */}
              <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                <h2 className="text-xl font-bold mb-4">Restaurant</h2>
                {order.restaurantId && (
                  <div>
                    <h3 className="font-bold text-lg">{order.restaurantId.name}</h3>
                    <p className="text-gray-600 mb-2">{order.restaurantId.address}</p>
                    <p className="text-gray-600">{order.restaurantId.phone}</p>
                  </div>
                )}
              </div>

              {/* Delivery Info */}
              <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
                <p className="text-gray-700">{order.deliveryAddress}</p>
                <p className="text-gray-600 mt-2">📞 {order.phoneNumber}</p>
                {order.notes && (
                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm"><span className="font-bold">Special Instructions:</span> {order.notes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{(order.totalPrice * 0.9).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee:</span>
                    <span>₹{(order.restaurantId?.deliveryFee || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>₹{(order.totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">₹{order.totalPrice?.toFixed(2)}</span>
                </div>

                {/* Cancel Button */}
                {(order.status === 'pending' || order.status === 'confirmed') && (
                  <button
                    onClick={handleCancelOrder}
                    disabled={cancelling}
                    className="btn bg-red-600 text-white hover:bg-red-700 w-full"
                  >
                    {cancelling ? 'Cancelling...' : 'Cancel Order'}
                  </button>
                )}

                {/* Continue Shopping Button */}
                <button
                  onClick={() => navigate('/restaurants')}
                  className="btn btn-secondary w-full mt-2"
                >
                  Order Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetail;
