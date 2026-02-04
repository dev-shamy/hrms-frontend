import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 ml-64 flex flex-col min-h-screen">
                <Navbar />
                <div className="p-8 flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
