import React, { useEffect, useRef } from 'react';

interface PulseGridProps {
    gridColor?: string;
    beamColors?: string[];
    backgroundColor?: string;
    beamWidth?: number;
    beamLength?: number;
    beamSpeed?: number;
    gridSize?: number;
    pulseFrequency?: number;
}

const PulseGrid: React.FC<PulseGridProps> = ({
    gridColor = 'rgba(200, 200, 200, 0.3)',
    beamColors = [
        '#FF7A00', // Brand Orange
        '#FFC300', // Brand Yellow
        '#FF2D95', // Brand Pink
        '#B8F135', // Brand Lime
        '#2ED9C3'  // Brand Turquoise
    ],
    backgroundColor = 'transparent',
    beamWidth = 2,
    beamLength = 100,
    beamSpeed = 3,
    gridSize = 50,
    pulseFrequency = 0.02
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let beams: Beam[] = [];
        let w = canvas.width;
        let h = canvas.height;

        class Beam {
            x: number;
            y: number;
            isHorizontal: boolean;
            color: string;
            progress: number;
            speed: number;
            length: number;

            constructor(w: number, h: number) {
                this.isHorizontal = Math.random() > 0.5;
                this.color = beamColors[Math.floor(Math.random() * beamColors.length)];
                this.speed = beamSpeed + Math.random() * 2;
                this.length = beamLength + Math.random() * 50;

                if (this.isHorizontal) {
                    this.x = -this.length;
                    // Snap to grid Y
                    this.y = Math.floor(Math.random() * (h / gridSize)) * gridSize;
                } else {
                    this.y = -this.length;
                    // Snap to grid X
                    this.x = Math.floor(Math.random() * (w / gridSize)) * gridSize;
                }
                this.progress = 0;
            }

            update() {
                if (this.isHorizontal) {
                    this.x += this.speed;
                } else {
                    this.y += this.speed;
                }
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                // Create gradient for trailing effect
                const grad = this.isHorizontal
                    ? ctx.createLinearGradient(this.x, this.y, this.x + this.length, this.y)
                    : ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.length);

                // Tail (fade out) -> Head (bright)
                // Note: Coordinates depend on direction. 
                // Using simple solid color with alpha for simplicity or gradient:

                grad.addColorStop(0, 'rgba(255,255,255,0)');
                grad.addColorStop(0.5, this.color);
                grad.addColorStop(1, 'rgba(255,255,255,0)');

                ctx.strokeStyle = grad;
                ctx.lineWidth = beamWidth;

                // Draw line
                if (this.isHorizontal) {
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(this.x + this.length, this.y);
                } else {
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(this.x, this.y + this.length);
                }
                ctx.stroke();
            }

            isOutOfBounds(w: number, h: number) {
                if (this.isHorizontal) return this.x > w;
                return this.y > h;
            }
        }

        const resize = () => {
            if (!canvas) return;
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
                w = canvas.width;
                h = canvas.height;
            }
        };

        window.addEventListener('resize', resize);
        resize();

        const drawGrid = () => {
            ctx.strokeStyle = gridColor;
            ctx.lineWidth = 1;
            ctx.beginPath();

            // Vertical lines
            for (let x = 0; x <= w; x += gridSize) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
            }

            // Horizontal lines
            for (let y = 0; y <= h; y += gridSize) {
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
            }
            ctx.stroke();
        };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            ctx.clearRect(0, 0, w, h);

            // Draw Background
            if (backgroundColor !== 'transparent') {
                ctx.fillStyle = backgroundColor;
                ctx.fillRect(0, 0, w, h);
            }

            drawGrid();

            // Spawn new beams randomly
            if (Math.random() < pulseFrequency) {
                beams.push(new Beam(w, h));
            }

            // Update and Draw Beams
            for (let i = beams.length - 1; i >= 0; i--) {
                const beam = beams[i];
                beam.update();
                beam.draw(ctx);

                if (beam.isOutOfBounds(w, h)) {
                    beams.splice(i, 1);
                }
            }
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
        };
    }, [gridColor, beamColors, backgroundColor, beamWidth, beamLength, beamSpeed, gridSize, pulseFrequency]);

    return <canvas ref={canvasRef} className="w-full h-full block" />;
};

export default PulseGrid;
