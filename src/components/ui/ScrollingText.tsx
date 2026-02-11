import React from 'react';

interface ScrollingTextProps {
    text?: string;
    buttonText?: string;
    buttonLink?: string;
    className?: string;
}

const ScrollingText: React.FC<ScrollingTextProps> = ({
    text = "Ready to work well?",
    className = "",
}) => {
    return (
        <section className={`w-full py-24 bg-brandorange flex flex-col md:flex-row items-center justify-center px-6 md:px-20 gap-10 ${className}`}>
            <div className="flex-1 text-center md:text-center">
                <h2 className="text-5xl md:text-8xl font-maus font-black tracking-tighter leading-none text-black">
                    {text}
                </h2>
            </div>

            {/* <div className="flex-shrink-0">
                <a
                    href={buttonLink}
                    className="inline-block bg-[#1a1a1a] text-white text-xl md:text-3xl lg:text-5xl font-maus px-10 py-4 rounded-full hover:scale-105 transition-transform duration-300"
                >
                    {buttonText}
                </a>
            </div> */}
        </section>
    );
};

export default ScrollingText;
