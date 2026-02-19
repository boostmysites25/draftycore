import { Link } from "react-router-dom";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

const ThankYou = () => {
    return (
        <div className="min-h-screen flex flex-col font-coolvetica bg-[#F5F5F0] relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-brandyellow rounded-full blur-[180px] opacity-15" />
                <div className="absolute bottom-[-15%] left-[-10%] w-[50vw] h-[50vw] bg-brandturquoise rounded-full blur-[150px] opacity-15" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-black/5 rounded-full" />
            </div>

            <main className="flex-1 flex items-center justify-center relative z-10 px-4 sm:px-6 py-24">
                <div className="w-full max-w-2xl text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-brandlimegreen/20 text-brandlimegreen mb-8 animate-fade-in-up">
                        <FaCheckCircle className="w-14 h-14" />
                    </div>
                    <h1 className="font-maus text-4xl sm:text-5xl md:text-6xl text-secondary uppercase tracking-tighter mb-4 animate-fade-in-up animation-delay-100">
                        Thank <span className="text-brandorange">You</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-black/70 font-coolvetica tracking-wide max-w-md mx-auto mb-10 animate-fade-in-up animation-delay-200">
                        We’ve received your details and will get back to you shortly.
                    </p>
                    <div className="w-20 h-1 bg-brandorange mx-auto mb-12 animate-fade-in-up animation-delay-300" />
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-500">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 bg-secondary text-white font-maus text-lg uppercase tracking-wider py-4 px-8 rounded-xl hover:bg-brandorange transition-colors duration-300"
                        >
                            Back to Home
                            <FaArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ThankYou;
