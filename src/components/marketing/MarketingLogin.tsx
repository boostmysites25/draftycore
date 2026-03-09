import { useState } from 'react';

interface MarketingLoginProps {
    onLoginSuccess: () => void;
}

const MarketingLogin = ({ onLoginSuccess }: MarketingLoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple validation
        if (email.length > 0 && password.length > 0) {
            onLoginSuccess();
        } else {
            setError('Please enter both email and password');
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
            <div className="w-full max-w-md px-6">
                <div className="text-center flex flex-col items-center justify-center mb-12">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-maus font-black tracking-tighter mb-4">
                        DRAFTY<span className="text-brandturquoise">CORE</span>
                    </h1>
                    <p className="text-xl font-coolvetica text-gray-500 tracking-wide">
                        Marketing Preview Access
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ENTER EMAIL"
                            className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-brandturquoise text-center text-xl py-4 outline-none transition-all placeholder:text-gray-300 tracking-widest uppercase mb-4"
                            autoFocus
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="ENTER PASSWORD"
                            className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-brandturquoise text-center text-xl py-4 outline-none transition-all placeholder:text-gray-300 tracking-widest uppercase"
                        />
                    </div>

                    {error && (
                        <p className="text-brandpink text-center font-coolvetica text-sm">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-black hover:bg-brandturquoise text-white font-maus text-2xl py-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 uppercase tracking-widest mt-8"
                    >
                        Enter Site
                    </button>
                </form>

                <div className="mt-12 text-center">
                    <p className="text-xs font-coolvetica text-gray-400 uppercase tracking-widest">
                        Protected Content &copy; {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MarketingLogin;