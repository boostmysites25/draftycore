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
        if (email.length > 0 && password.length > 0) {
            setError('');
            onLoginSuccess();
        } else {
            setError('Please enter both email and password');
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] min-h-screen flex flex-col overflow-hidden bg-[#fafaf9]">
            {/* Elegant background: soft gradient base */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f8f7f5] via-[#fafaf9] to-[#f5f4f2] pointer-events-none z-0" />
            {/* Subtle gradient orbs — soft and layered */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[20%] -right-[15%] w-[70vmax] h-[70vmax] rounded-full bg-brandturquoise/12 blur-[120px]" />
                <div className="absolute top-1/2 -left-[10%] w-[50vmax] h-[50vmax] rounded-full bg-brandpink/8 blur-[100px]" />
                <div className="absolute -bottom-[15%] right-1/4 w-[45vmax] h-[45vmax] rounded-full bg-brandyellow/10 blur-[100px]" />
                <div className="absolute top-1/3 right-1/3 w-[30vmax] h-[30vmax] rounded-full bg-brandorange/5 blur-[80px]" />
            </div>
            {/* Very subtle grid for depth */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)`,
                    backgroundSize: '48px 48px'
                }}
            />

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-6 pt-20 md:pt-32 pb-16">
                <div className="w-full max-w-lg">
                    <div className="bg-white/80 backdrop-blur-lg border border-black/5 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden group">

                        {/* Decorative border gradient on hover */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-brandyellow/50 rounded-3xl transition-colors duration-500 pointer-events-none" />

                        <div className="text-center mb-10">
                            <h1 className="text-5xl md:text-6xl font-maus text-black mb-2 tracking-tighter">
                                DRAFTY<span className="text-brandturquoise">CORE</span>
                            </h1>
                            <p className="text-black/60 font-coolvetica text-lg tracking-wide">
                                Marketing Preview Access
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="marketing-email" className="block text-sm font-coolvetica tracking-wider text-black/70 uppercase">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="marketing-email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/5 border-b-2 border-black/10 focus:border-brandorange text-black px-4 py-3 outline-none transition-colors duration-300 font-coolvetica placeholder:text-black/30"
                                    placeholder="name@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="marketing-password" className="block text-sm font-coolvetica tracking-wider text-black/70 uppercase">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="marketing-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/5 border-b-2 border-black/10 focus:border-brandorange text-black px-4 py-3 outline-none transition-colors duration-300 font-coolvetica placeholder:text-black/30"
                                    placeholder="••••••••"
                                />
                            </div>

                            {error && (
                                <p className="text-brandpink text-sm font-coolvetica">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-black hover:bg-brandorange text-white font-maus text-2xl py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider mt-8"
                            >
                                Enter Site
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-xs font-coolvetica text-black/40 uppercase tracking-widest">
                                Protected Content &copy; {new Date().getFullYear()}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MarketingLogin;
