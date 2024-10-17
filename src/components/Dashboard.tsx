import React from 'react';
import SidePanel from './SidePanel';
import { FaLink, FaChartLine, FaUser, FaQrcode } from 'react-icons/fa';

const Dashboard: React.FC = () => {
    const metrics = {
        shortLinksCount: 42,
        totalVisitsCount: 1234,
        uniqueVisitsCount: 987,
        qrScans: 150,
    };

    return (
        <div className="flex">
            <SidePanel />
            <div className="flex-grow ml-64 p-8">
                <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
                        <FaLink className="text-blue-500 text-3xl mr-4" />
                        <div>
                            <p className="text-gray-600">Short Links Count</p>
                            <p className="text-xl font-bold">{metrics.shortLinksCount}</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
                        <FaChartLine className="text-green-500 text-3xl mr-4" />
                        <div>
                            <p className="text-gray-600">Total Visits Count</p>
                            <p className="text-xl font-bold">{metrics.totalVisitsCount}</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
                        <FaUser className="text-purple-500 text-3xl mr-4" />
                        <div>
                            <p className="text-gray-600">Unique Visits Count</p>
                            <p className="text-xl font-bold">{metrics.uniqueVisitsCount}</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
                        <FaQrcode className="text-orange-500 text-3xl mr-4" />
                        <div>
                            <p className="text-gray-600">QR Scans</p>
                            <p className="text-xl font-bold">{metrics.qrScans}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
