import React from 'react';
import { useNavigate } from 'react-router-dom';
import SidePanel from './SidePanel';
import { 
    FaLink, 
    FaChartLine, 
    FaUser, 
    FaQrcode, 
    FaPlus, 
    FaEye, 
    FaArrowUp, 
    FaArrowDown,
    FaClock
} from 'react-icons/fa';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    
    const metrics = {
        shortLinksCount: 42,
        totalVisitsCount: 1234,
        uniqueVisitsCount: 987,
        qrScans: 150,
    };

    const metricsData = [
        {
            title: 'Short Links',
            value: metrics.shortLinksCount,
            icon: FaLink,
            color: 'blue',
            bgColor: 'bg-blue-50',
            iconBg: 'bg-blue-100',
            textColor: 'text-blue-600',
            change: '+12%',
            isPositive: true
        },
        {
            title: 'Total Visits',
            value: metrics.totalVisitsCount.toLocaleString(),
            icon: FaChartLine,
            color: 'green',
            bgColor: 'bg-green-50',
            iconBg: 'bg-green-100',
            textColor: 'text-green-600',
            change: '+8.2%',
            isPositive: true
        },
        {
            title: 'Unique Visitors',
            value: metrics.uniqueVisitsCount.toLocaleString(),
            icon: FaUser,
            color: 'purple',
            bgColor: 'bg-purple-50',
            iconBg: 'bg-purple-100',
            textColor: 'text-purple-600',
            change: '+5.1%',
            isPositive: true
        },
        {
            title: 'QR Scans',
            value: metrics.qrScans,
            icon: FaQrcode,
            color: 'orange',
            bgColor: 'bg-orange-50',
            iconBg: 'bg-orange-100',
            textColor: 'text-orange-600',
            change: '-2.3%',
            isPositive: false
        }
    ];

    const quickActions = [
        {
            title: 'Create Short URL',
            description: 'Shorten a new URL',
            icon: FaPlus,
            color: 'bg-blue-600 hover:bg-blue-700',
            action: () => navigate('/')
        },
        {
            title: 'View All URLs',
            description: 'Manage your links',
            icon: FaEye,
            color: 'bg-green-600 hover:bg-green-700',
            action: () => navigate('/account/url-mappings')
        }
    ];

    const getCurrentTime = () => {
        return new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <SidePanel />
            <div className="flex-grow md:ml-72 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Welcome Header */}
                    <div className="mb-8">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
                                    <p className="text-blue-100 mb-4 md:mb-0">Here's what's happening with your URLs today</p>
                                    <div className="flex items-center text-blue-100 text-sm">
                                        <FaClock className="mr-2" />
                                        {getCurrentTime()}
                                    </div>
                                </div>
                                <div className="flex space-x-3 mt-4 md:mt-0">
                                    {quickActions.map((action, index) => (
                                        <button
                                            key={index}
                                            onClick={action.action}
                                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 border border-white/30 hover:border-white/50"
                                        >
                                            <action.icon className="w-4 h-4" />
                                            <span className="hidden sm:inline">{action.title}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {metricsData.map((metric, index) => {
                            const Icon = metric.icon;
                            return (
                                <div
                                    key={index}
                                    className={`${metric.bgColor} rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 ${metric.iconBg} rounded-xl flex items-center justify-center`}>
                                            <Icon className={`w-5 h-5 ${metric.textColor}`} />
                                        </div>
                                        <div className={`flex items-center space-x-1 text-sm ${
                                            metric.isPositive ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {metric.isPositive ? (
                                                <FaArrowUp className="w-3 h-3" />
                                            ) : (
                                                <FaArrowDown className="w-3 h-3" />
                                            )}
                                            <span className="font-medium">{metric.change}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 text-sm font-medium mb-1">{metric.title}</p>
                                        <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Quick Actions Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                {quickActions.map((action, index) => {
                                    const Icon = action.icon;
                                    return (
                                        <button
                                            key={index}
                                            onClick={action.action}
                                            className={`w-full ${action.color} text-white p-4 rounded-xl transition-all duration-200 flex items-center space-x-3 hover:shadow-lg transform hover:scale-105`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <div className="text-left">
                                                <p className="font-semibold">{action.title}</p>
                                                <p className="text-sm opacity-90">{action.description}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <FaLink className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">New short URL created</p>
                                        <p className="text-xs text-gray-500">2 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                        <FaChartLine className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">25 new clicks recorded</p>
                                        <p className="text-xs text-gray-500">5 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <FaQrcode className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">QR code generated</p>
                                        <p className="text-xs text-gray-500">1 day ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
