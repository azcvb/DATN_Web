import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

function OrderHistory() {
    const statusOptions = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    // State for filters and search
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    // Token
    const [cookies, setCookies] = useCookies();
    const [phoneNumber, setPhoneNumber] = useState('');
    useEffect(() => {
        //         const token = cookies.token;
        //         if(
        // token
        //         ){
        //             setCookies.
        //         }
        //         console.log(token);
    }, []);
    const mockOrders = [
        {
            id: 'order1',
            orderNumber: 'ORD-2025-0519-001',
            date: '2025-05-15',
            status: 'Delivered',
            total: 129.99,
            items: [
                {
                    id: 'item1',
                    name: 'Premium Wireless Headphones',
                    price: 89.99,
                    quantity: 1,
                    image: 'https://readdy.ai/api/search-image?query=Premium%20wireless%20headphones%20with%20noise%20cancellation%20in%20sleek%20black%20design%2C%20high-quality%20product%20photography%20on%20clean%20white%20background%2C%20professional%20lighting%2C%20detailed%20texture%20visible%2C%20ultra%20HD%20quality%2C%20product%20showcased%20from%20angle%20showing%20ear%20cups%20and%20headband&width=100&height=100&seq=3&orientation=squarish',
                },
                {
                    id: 'item2',
                    name: 'USB-C Fast Charging Cable',
                    price: 19.99,
                    quantity: 2,
                    image: 'https://readdy.ai/api/search-image?query=USB-C%20charging%20cable%20in%20black%20color%20coiled%20neatly%2C%20high-quality%20product%20photography%20on%20clean%20white%20background%2C%20professional%20lighting%2C%20detailed%20texture%20visible%2C%20ultra%20HD%20quality%2C%20product%20showcased%20to%20display%20connector%20ends%20clearly&width=100&height=100&seq=4&orientation=squarish',
                },
            ],
            shippingAddress: '123 Main Street, Apt 4B, New York, NY 10001',
            paymentMethod: 'Visa ending in 4242',
            timeline: [
                {
                    status: 'Ordered',
                    date: '2025-05-10',
                    description: 'Order placed and confirmed',
                },
                {
                    status: 'Processing',
                    date: '2025-05-11',
                    description: 'Payment processed and order prepared',
                },
                {
                    status: 'Shipped',
                    date: '2025-05-12',
                    description: 'Package shipped via Express Delivery',
                },
                {
                    status: 'Delivered',
                    date: '2025-05-15',
                    description: 'Package delivered and signed for',
                },
            ],
        },
        {
            id: 'order2',
            orderNumber: 'ORD-2025-0519-002',
            date: '2025-05-01',
            status: 'Pending',
            total: 249.95,
            items: [
                {
                    id: 'item3',
                    name: 'Smart Watch Series 5',
                    price: 249.95,
                    quantity: 1,
                    image: 'https://readdy.ai/api/search-image?query=Modern%20smartwatch%20with%20black%20band%20and%20colorful%20display%20showing%20fitness%20metrics%2C%20high-quality%20product%20photography%20on%20clean%20white%20background%2C%20professional%20lighting%2C%20detailed%20texture%20visible%2C%20ultra%20HD%20quality%2C%20product%20showcased%20from%20angle%20showing%20screen%20and%20band&width=100&height=100&seq=5&orientation=squarish',
                },
            ],
            shippingAddress: '123 Main Street, Apt 4B, New York, NY 10001',
            paymentMethod: 'PayPal',
            timeline: [
                {
                    status: 'Ordered',
                    date: '2025-05-01',
                    description: 'Order placed and confirmed',
                },
                {
                    status: 'Processing',
                    date: '2025-05-01',
                    description: 'Payment verification in progress',
                },
            ],
        },
        {
            id: 'order3',
            orderNumber: 'ORD-2025-0519-003',
            date: '2025-04-28',
            status: 'Cancelled',
            total: 59.99,
            items: [
                {
                    id: 'item4',
                    name: 'Wireless Mouse',
                    price: 29.99,
                    quantity: 1,
                    image: 'https://readdy.ai/api/search-image?query=Ergonomic%20wireless%20computer%20mouse%20in%20black%20with%20subtle%20blue%20accents%2C%20high-quality%20product%20photography%20on%20clean%20white%20background%2C%20professional%20lighting%2C%20detailed%20texture%20visible%2C%20ultra%20HD%20quality%2C%20product%20showcased%20from%20angle%20showing%20buttons%20and%20scroll%20wheel&width=100&height=100&seq=6&orientation=squarish',
                },
                {
                    id: 'item5',
                    name: 'Mouse Pad - Gaming Edition',
                    price: 15.0,
                    quantity: 2,
                    image: 'https://readdy.ai/api/search-image?query=Black%20gaming%20mouse%20pad%20with%20subtle%20geometric%20pattern%20and%20stitched%20edges%2C%20high-quality%20product%20photography%20on%20clean%20white%20background%2C%20professional%20lighting%2C%20detailed%20texture%20visible%2C%20ultra%20HD%20quality%2C%20product%20showcased%20from%20angle%20showing%20surface%20texture%20and%20thickness&width=100&height=100&seq=7&orientation=squarish',
                },
            ],
            shippingAddress: '123 Main Street, Apt 4B, New York, NY 10001',
            paymentMethod: 'Mastercard ending in 5678',
            timeline: [
                {
                    status: 'Ordered',
                    date: '2025-04-28',
                    description: 'Order placed and confirmed',
                },
                {
                    status: 'Processing',
                    date: '2025-04-28',
                    description: 'Payment processed and order prepared',
                },
                {
                    status: 'Cancelled',
                    date: '2025-04-29',
                    description: 'Order cancelled by customer',
                },
            ],
        },
        {
            id: 'order4',
            orderNumber: 'ORD-2025-0519-004',
            date: '2025-04-15',
            status: 'Shipped',
            total: 199.99,
            items: [
                {
                    id: 'item6',
                    name: 'Portable Bluetooth Speaker',
                    price: 79.99,
                    quantity: 1,
                    image: 'https://readdy.ai/api/search-image?query=Compact%20cylindrical%20bluetooth%20speaker%20in%20dark%20blue%20with%20mesh%20exterior%20and%20control%20buttons%20on%20top%2C%20high-quality%20product%20photography%20on%20clean%20white%20background%2C%20professional%20lighting%2C%20detailed%20texture%20visible%2C%20ultra%20HD%20quality%2C%20product%20showcased%20standing%20upright&width=100&height=100&seq=8&orientation=squarish',
                },
                {
                    id: 'item7',
                    name: 'Wireless Earbuds',
                    price: 59.99,
                    quantity: 2,
                    image: 'https://readdy.ai/api/search-image?query=White%20wireless%20earbuds%20with%20charging%20case%20open%20showing%20earbuds%20inside%2C%20high-quality%20product%20photography%20on%20clean%20white%20background%2C%20professional%20lighting%2C%20detailed%20texture%20visible%2C%20ultra%20HD%20quality%2C%20product%20showcased%20to%20display%20both%20earbuds%20and%20case%20clearly&width=100&height=100&seq=9&orientation=squarish',
                },
            ],
            shippingAddress: '123 Main Street, Apt 4B, New York, NY 10001',
            paymentMethod: 'American Express ending in 1234',
            timeline: [
                {
                    status: 'Ordered',
                    date: '2025-04-15',
                    description: 'Order placed and confirmed',
                },
                {
                    status: 'Processing',
                    date: '2025-04-16',
                    description: 'Payment processed and order prepared',
                },
                {
                    status: 'Shipped',
                    date: '2025-04-18',
                    description: 'Package shipped via Standard Delivery',
                },
            ],
        },
    ];

    // Filter orders based on search and filters
    useEffect(() => {
        setIsLoading(true);

        // Simulate API call delay
        const timer = setTimeout(() => {
            let results = [...mockOrders];

            // Filter by search query
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                results = results.filter(
                    (order) =>
                        order.orderNumber.toLowerCase().includes(query) ||
                        order.items.some((item) => item.name.toLowerCase().includes(query)),
                );
            }

            // Filter by date range
            if (startDate) {
                results = results.filter((order) => new Date(order.date) >= new Date(startDate));
            }

            if (endDate) {
                results = results.filter((order) => new Date(order.date) <= new Date(endDate));
            }

            // Filter by status
            if (selectedStatus !== 'All') {
                results = results.filter((order) => order.status === selectedStatus);
            }

            setFilteredOrders(results);
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [searchQuery, startDate, endDate, selectedStatus]);

    // Format date to display
    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Toggle order expansion
    const toggleOrderExpand = (orderId) => {
        if (expandedOrderId === orderId) {
            setExpandedOrderId(null);
        } else {
            setExpandedOrderId(orderId);
        }
    };

    // Reset filters
    const resetFilters = () => {
        setSearchQuery('');
        setStartDate('');
        setEndDate('');
        setSelectedStatus('All');
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered':
                return 'bg-green-100 text-green-800';
            case 'Shipped':
                return 'bg-blue-100 text-blue-800';
            case 'Processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'Pending':
                return 'bg-purple-100 text-purple-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link
                                to="/"
                                data-readdy="true"
                                className="text-gray-500 hover:text-gray-700 cursor-pointer !rounded-button whitespace-nowrap"
                            >
                                <i className="fas fa-arrow-left mr-2"></i>
                                <span className="hidden sm:inline">Trở về trang chủ</span>
                            </Link>
                        </div>
                        <h1 className="text-xl font-semibold text-gray-800">Order History</h1>
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="text-gray-500 hover:text-gray-700 cursor-pointer !rounded-button whitespace-nowrap"
                        >
                            <i className="fas fa-filter"></i>
                            <span className="ml-2 hidden sm:inline">Filter</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filter Section */}
                <div
                    className={`bg-white rounded-lg shadow-sm mb-6 overflow-hidden transition-all duration-300 ${isFilterOpen ? 'max-h-96' : 'max-h-0'}`}
                >
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Search Input */}
                            <div className="col-span-1 md:col-span-3">
                                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tìm kiếm đơn hàng
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-search text-gray-400"></i>
                                    </div>
                                    <input
                                        type="text"
                                        id="search"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="Search by order number or item name"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Date Range Filters */}
                            <div>
                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                                    Từ ngày
                                </label>
                                <input
                                    type="date"
                                    id="startDate"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                                    Đến ngày
                                </label>
                                <input
                                    type="date"
                                    id="endDate"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>

                            {/* Status Filter */}
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                    Trạng thái
                                </label>
                                <div className="relative">
                                    <select
                                        id="status"
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none"
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <i className="fas fa-chevron-down text-gray-400"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Filter Actions */}
                        <div className="mt-4 flex justify-end space-x-3">
                            <button
                                onClick={resetFilters}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer !rounded-button whitespace-nowrap"
                            >
                                Clear Filters
                            </button>
                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer !rounded-button whitespace-nowrap"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {isLoading ? (
                        // Loading skeleton
                        Array(3)
                            .fill(0)
                            .map((_, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                                    <div className="flex justify-between mb-4">
                                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                                    </div>
                                    <div className="flex justify-between mb-4">
                                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                        <div className="h-6 bg-gray-200 rounded w-1/5"></div>
                                    </div>
                                    <div className="flex items-center mt-4">
                                        <div className="h-12 w-12 bg-gray-200 rounded"></div>
                                        <div className="ml-4 flex-1">
                                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                    ) : filteredOrders.length === 0 ? (
                        // Empty state
                        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                            <div className="mx-auto w-24 h-24 mb-4 text-gray-300">
                                <i className="fas fa-shopping-bag text-6xl"></i>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">No Orders Found</h3>
                            <p className="text-gray-500 mb-4">
                                {searchQuery || startDate || endDate || selectedStatus !== 'All'
                                    ? "Try adjusting your filters to find what you're looking for."
                                    : "You haven't placed any orders yet."}
                            </p>
                            {(searchQuery || startDate || endDate || selectedStatus !== 'All') && (
                                <button
                                    onClick={resetFilters}
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer !rounded-button whitespace-nowrap"
                                >
                                    <i className="fas fa-times mr-2"></i>
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    ) : (
                        // Order cards
                        filteredOrders.map((order) => (
                            <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                {/* Order Summary */}
                                <div
                                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                                    onClick={() => toggleOrderExpand(order.id)}
                                >
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">{order.orderNumber}</h3>
                                            <p className="text-sm text-gray-500">Ordered on {formatDate(order.date)}</p>
                                        </div>
                                        <div className="mt-2 md:mt-0 flex items-center">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                                            >
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            {order.items.length > 0 && (
                                                <div className="flex items-center">
                                                    <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                                                        <img
                                                            src={order.items[0].image}
                                                            alt={order.items[0].name}
                                                            className="h-full w-full object-cover object-top"
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {order.items[0].name}
                                                        </p>
                                                        {order.items.length > 1 && (
                                                            <p className="text-sm text-gray-500">
                                                                +{order.items.length - 1} more item(s)
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center">
                                            <p className="text-lg font-medium text-gray-900 mr-3">
                                                ${order.total.toFixed(2)}
                                            </p>
                                            <i
                                                className={`fas fa-chevron-${expandedOrderId === order.id ? 'up' : 'down'} text-gray-400`}
                                            ></i>
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Order Details */}
                                {expandedOrderId === order.id && (
                                    <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                                        {/* Items List */}
                                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                                            Order Items
                                        </h4>
                                        <div className="space-y-3 mb-6">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="h-full w-full object-cover object-top"
                                                            />
                                                        </div>
                                                        <div className="ml-4">
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {item.name}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                Qty: {item.quantity}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        ${item.price.toFixed(2)}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Shipping and Payment */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                                                    Shipping Address
                                                </h4>
                                                <p className="text-sm text-gray-700">{order.shippingAddress}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                                                    Payment Method
                                                </h4>
                                                <p className="text-sm text-gray-700">{order.paymentMethod}</p>
                                            </div>
                                        </div>

                                        {/* Order Timeline */}
                                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                                            Order Timeline
                                        </h4>
                                        <div className="relative pb-2">
                                            {order.timeline.map((event, index) => (
                                                <div key={index} className="relative flex items-start group">
                                                    {index < order.timeline.length - 1 && (
                                                        <div className="h-full w-0.5 bg-gray-200 absolute left-2.5 top-5 -bottom-4"></div>
                                                    )}
                                                    <div
                                                        className={`h-5 w-5 rounded-full flex items-center justify-center mt-1 mr-3 ${
                                                            index === order.timeline.length - 1
                                                                ? 'bg-blue-500 text-white'
                                                                : 'bg-gray-200 text-gray-400'
                                                        }`}
                                                    >
                                                        <i className="fas fa-circle text-xs"></i>
                                                    </div>
                                                    <div className="flex-1 mb-4">
                                                        <div className="flex justify-between">
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {event.status}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                {formatDate(event.date)}
                                                            </p>
                                                        </div>
                                                        <p className="text-sm text-gray-500">{event.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Actions */}
                                        <div className="mt-6 flex justify-end">
                                            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer !rounded-button whitespace-nowrap">
                                                Hủy đơn hàng
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}

export default OrderHistory;
