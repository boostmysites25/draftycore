import { Link, useLocation } from 'react-router-dom';
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    const { pathname } = useLocation();
    return (
        <footer className="bg-black text-white py-20 relative overflow-hidden z-10">
            {/* Decorative Top Border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brandorange via-brandpink to-brandturquoise"></div>

            <div className="wrapper relative z-10">
                <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8">

                    {/* Brand & CTA Column */}
                    <div className="lg:w-1/3 flex flex-col justify-between">
                        <div>
                            <Link to="/" className="text-4xl md:text-5xl font-maus font-bold tracking-tighter uppercase mb-6 inline-block">
                                Drafty
                            </Link>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-sm font-coolvetica tracking-wide">
                                Empowering Architects and Engineers with precision drafting and BIM solutions. We build the foundation of your vision.
                            </p>
                        </div>

                        <div className="pt-10 lg:pt-auto">
                            <Link
                                to="/contact"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 text-2xl font-maus text-brandlimegreen hover:text-white transition-colors duration-300"
                            >
                                Let's Talk Project
                                <span className="text-3xl">→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:w-2/3 flex flex-col md:flex-row gap-10 md:gap-20 justify-end">

                        {/* Services */}
                        {/* <div>
                            <h4 className="font-maus text-xl text-gray-500 mb-6 uppercase tracking-wider">Services</h4>
                            <ul className="flex flex-col gap-4 text-lg">
                                <li><Link to="/services/drafting" className="hover:text-brandorange transition-colors">Drafting Services</Link></li>
                                <li><Link to="/services/bim" className="hover:text-brandpink transition-colors">BIM Modeling</Link></li>
                                <li><Link to="/services/rendering" className="hover:text-brandturquoise transition-colors">3D Rendering</Link></li>
                                <li><Link to="/services/staffing" className="hover:text-brandyellow transition-colors">Staff Augmentation</Link></li>
                            </ul>
                        </div> */}

                        {/* Company */}
                        <div>
                            <h4 className="font-maus text-xl text-white mb-6 uppercase tracking-wider">Company</h4>
                            <ul className="flex flex-col gap-4 text-lg font-coolvetica tracking-wide">
                                <li><Link to="/#about" className="hover:text-brandorange transition-colors"
                                    onClick={(e) => {
                                        if (pathname === '/') {
                                            e.preventDefault();
                                            const element = document.getElementById('about');
                                            if (element) element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}>About Us</Link></li>
                                <li>
                                    <a
                                        href="/contact"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-brandyellow transition-colors"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="font-maus text-xl text-white mb-6 uppercase tracking-wider">Connect</h4>
                            <ul className="flex flex-col gap-4 text-lg text-gray-300 font-coolvetica tracking-wide">
                                <li>
                                    <a href="mailto:hello@draftyco.au" className="hover:text-white transition-colors">hello@draftyco.au</a>
                                </li>
                                <li className="flex gap-4 mt-2">
                                    {/* Social Icons Placeholder */}
                                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brandorange hover:text-black transition-all">
                                        <FaLinkedinIn />
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brandpink hover:text-white transition-all">
                                        <FaInstagram />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-gray-500 text-md font-coolvetica tracking-wide">
                    <p>&copy; {new Date().getFullYear()} Drafty. All rights reserved.</p>
                    {/* <div className="flex gap-8 mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div> */}
                </div>
            </div>

            {/* Big Background Text Effect */}
            <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-[0.03] select-none text-[15vw] leading-none font-maus font-bold uppercase whitespace-nowrap">
                Drafty
            </div>
        </footer>
    );
};

export default Footer;
