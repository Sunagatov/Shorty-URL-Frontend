import React from 'react';
import { useNavigate } from 'react-router-dom';
import SidePanel from './SidePanel';
import { Button } from './ui';
import { 
    FaLink, 
    FaChartLine, 
    FaUser, 
    FaQrcode, 
    FaPlus, 
    FaEye, 
    FaArrowUp, 
    FaArrowDown
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



    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <SidePanel />
            <div className="flex-grow md:ml-72 p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Clean Header */}
                    <div className="mb-12">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div className="flex-1">
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
                                <p className="text-xl text-gray-600">Overview of your URL shortening activity</p>
                            </div>
                            <div className="flex space-x-3 flex-shrink-0">
                                {quickActions.map((action, index) => (
                                    <Button
                                        key={index}
                                        onClick={action.action}
                                        variant={index === 0 ? 'primary' : 'secondary'}
                                    >
                                        <action.icon className="w-4 h-4" />
                                        <span>{action.title}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {metricsData.map((metric, index) => {
                            const Icon = metric.icon;
                            return (
                                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className={`flex items-center space-x-1 text-sm font-semibold px-2 py-1 rounded-full ${
                                            metric.isPositive 
                                                ? 'text-green-700 bg-green-100' 
                                                : 'text-red-700 bg-red-100'
                                        }`}>
                                            {metric.isPositive ? (
                                                <FaArrowUp className="w-3 h-3" />
                                            ) : (
                                                <FaArrowDown className="w-3 h-3" />
                                            )}
                                            <span>{metric.change}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium mb-2">{metric.title}</p>
                                        <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Recent URLs */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold text-gray-900">Recent URLs</h3>
                                    <Button 
                                        onClick={() => navigate('/account/url-mappings')}
                                        variant="secondary"
                                        size="sm"
                                    >
                                        View All
                                    </Button>
                                </div>
                                <div className="space-y-4">
                                    {[1, 2, 3, 4].map((item) => (
                                        <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <FaLink className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">short.ly/abc{item}23</p>
                                                    <p className="text-sm text-gray-500">example-long-url-{item}.com</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-gray-900">{12 + item * 5} clicks</p>
                                                <p className="text-xs text-gray-500">{item} day{item > 1 ? 's' : ''} ago</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Activity Feed */}
                        <div>
                            <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">Activity</h3>
                                <div className="space-y-6">
                                    {[1, 2, 3, 4, 5].map((item) => (
                                        <div key={item} className="flex items-start space-x-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                                                item === 1 ? 'bg-green-100' : item === 2 ? 'bg-blue-100' : 'bg-purple-100'
                                            }`}>
                                                {item === 1 ? (
                                                    <FaArrowUp className="w-3 h-3 text-green-600" />
                                                ) : item === 2 ? (
                                                    <FaLink className="w-3 h-3 text-blue-600" />
                                                ) : (
                                                    <FaQrcode className="w-3 h-3 text-purple-600" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {item === 1 ? 'URL Performance' : item === 2 ? 'New URL Created' : 'QR Code Generated'}
                                                </p>
                                                <p className="text-xs text-gray-500 mb-1">
                                                    {item === 1 ? '+15% clicks this week' : item === 2 ? 'Marketing campaign link' : 'For social media post'}
                                                </p>
                                                <p className="text-xs text-gray-400">{item} hour{item > 1 ? 's' : ''} ago</p>
                                            </div>
                                        </div>
                                    ))}
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
