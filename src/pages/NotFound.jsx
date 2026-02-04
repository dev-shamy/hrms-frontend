import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <div className="text-center space-y-8 animate-in zoom-in duration-500">
                <div className="relative inline-block">
                    <h1 className="text-[120px] font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500 leading-none">
                        404
                    </h1>
                </div>

                <div className="space-y-4 max-w-md mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900">Oops! Page not found</h2>
                    <p className="text-gray-500 text-lg">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>

                <div className="pt-4">
                    <Link
                        to="/"
                        className="btn-primary"
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Link>
                </div>

                <div className="mt-12 grid grid-cols-3 gap-1 opacity-20 pointer-events-none select-none">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-12 h-12 rounded-lg bg-indigo-200" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotFound;
