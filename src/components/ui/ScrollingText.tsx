import React from 'react';

interface ScrollingTextProps {
    text?: string;
    buttonText?: string;
    buttonLink?: string;
    className?: string;
}

const ScrollingText: React.FC<ScrollingTextProps> = ({
    text = "ready to plug in?",
    className = "",
    buttonLink = "/",
    buttonText = "Signup",
}) => {
    return (
        <section className={`w-full py-14 bg-brandpink flex flex-col md:flex-row items-center justify-between px-6 md:px-20 gap-10 ${className}`}>
            <div className="text-center md:text-center">
                <h2 className="text-5xl md:text-8xl lg:text-[6.25rem] font-maus font-black tracking-tighter leading-none text-black">
                    {text}
                </h2>
            </div>

            <div className="flex-shrink-0">
                <a
                    href={buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#1a1a1a] text-white text-3xl md:text-6xl lg:text-[3.5rem] font-maus px-10 md:px-14 py-4 md:py-6 lg:py-8 lg:px-20 rounded-full hover:scale-105 transition-transform duration-300"
                >
                    {buttonText}
                </a>
            </div>
        </section>
    );
};

export default ScrollingText;
