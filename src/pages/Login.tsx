import { useState } from 'react';

interface LoginProps {
    onLoginSuccess?: () => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempt:', { email, password });
        // For now, accept any credentials
        if (onLoginSuccess) {
            onLoginSuccess();
        }
    };

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#fafaf9]">
            {/* Elegant background: soft gradient base */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f8f7f5] via-[#fafaf9] to-[#f5f4f2] pointer-events-none z-0" />
            {/* Subtle gradient orbs — soft and layered */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[20%] -right-[15%] w-[70vmax] h-[70vmax] rounded-full bg-brandturquoise/12 blur-[120px]" />
                <div className="absolute top-1/2 -left-[10%] w-[50vmax] h-[50vmax] rounded-full bg-brandpink/8 blur-[100px]" />
                <div className="absolute -bottom-[15%] right-1/4 w-[45vmax] h-[45vmax] rounded-full bg-brandyellow/10 blur-[100px]" />
                <div className="absolute top-1/3 right-1/3 w-[30vmax] h-[30vmax] rounded-full bg-brandorange/5 blur-[80px]" />
            </div>
            {/* Very subtle grid for depth (optional) */}
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
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-brandyellow/50 rounded-3xl transition-colors duration-500 pointer-events-none"></div>

                        <div className="text-center mb-10">
                            <h1 className="text-5xl md:text-6xl font-maus text-black mb-2 tracking-tighter">
                                WELCOME <span className="text-brandorange">BACK</span>
                            </h1>
                            <p className="text-black/60 font-coolvetica text-lg tracking-wide">
                                ENTER YOUR CREDENTIALS TO ACCESS
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-coolvetica tracking-wider text-black/70 uppercase">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/5 border-b-2 border-black/10 focus:border-brandorange text-black px-4 py-3 outline-none transition-colors duration-300 font-coolvetica placeholder:text-black/30"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-coolvetica tracking-wider text-black/70 uppercase">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/5 border-b-2 border-black/10 focus:border-brandorange text-black px-4 py-3 outline-none transition-colors duration-300 font-coolvetica placeholder:text-black/30"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                {/* <label className="flex items-center gap-2 cursor-pointer group/check">
                                    <input type="checkbox" className="w-4 h-4 rounded border-black/30 bg-transparent text-brandorange focus:ring-brandorange/50" />
                                    <span className="text-black/60 font-coolvetica group-hover/check:text-black transition-colors">Remember me</span>
                                </label> */}
                                <a href="#" className="text-brandturquoise hover:text-black transition-colors font-coolvetica">Forgot Password?</a>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-black hover:bg-brandorange text-white font-maus text-2xl py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider mt-8"
                            >
                                Sign In
                            </button>
                        </form>

                        {/* <div className="mt-8 text-center">
                            <p className="text-black/40 font-coolvetica">
                                Don't have an account?{' '}
                                <Link to="/contact" className="text-brandorange hover:text-black transition-colors ml-1">
                                    Get Access
                                </Link>
                            </p>
                        </div> */}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;
