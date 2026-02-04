import React from 'react';
import { Inbox } from 'lucide-react';

const EmptyState = ({ title = "No data found", description = "There's nothing to show here at the moment.", icon: Icon = Inbox }) => {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 mb-4 border border-gray-100">
                <Icon size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 max-w-xs mt-1">{description}</p>
        </div>
    );
};

export default EmptyState;
