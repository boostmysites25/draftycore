import React, { useEffect, useRef } from 'react';

interface CyberCircuitProps {
    className?: string;
    color?: string; // Fallback color
}

const BRAND_COLORS = ["#FF7A00", "#FFC300", "#FF2D95", "#B8F135", "#2ED9C3"];

const CyberCircuit: React.FC<CyberCircuitProps> = ({ className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;

        interface Signal {
            x: number;
            y: number;
            vx: number;
            vy: number;
            life: number;
            color: string;
            changeDirTimer: number;
            path: { x: number, y: number }[];
        }

        let signals: Signal[] = [];
        const GRID_SIZE = 30; // Grid snapping size for circuit look

        const createSignal = (): Signal => {
            const startX = Math.floor(Math.random() * (width / GRID_SIZE)) * GRID_SIZE;
            const startY = Math.floor(Math.random() * (height / GRID_SIZE)) * GRID_SIZE;

            // Initial velocity 
            const dir = Math.floor(Math.random() * 4);
            let vx = 0, vy = 0;
            const speed = 2;
            if (dir === 0) vx = speed;
            else if (dir === 1) vx = -speed;
            else if (dir === 2) vy = speed;
            else vy = -speed;

            return {
                x: startX,
                y: startY,
                vx,
                vy,
                life: 400 + Math.random() * 200,
                color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
                changeDirTimer: Math.floor(Math.random() * 20) + 10,
                path: [{ x: startX, y: startY }]
            };
        };

        // Initialize pool with just 1 or 2
        for (let i = 0; i < 2; i++) {
            signals.push(createSignal());
        }

        const resize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
            signals = [];
        };
        window.addEventListener('resize', resize);

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Spawn logic: randomly add new signal
            // But strict limit of 5. The limit is enforced by removal.
            // We want to keep adding new ones to keep it "alive".
            if (Math.random() < 0.01) {
                signals.push(createSignal());
                if (signals.length > 5) {
                    signals.shift(); // Remove the oldest
                }
            }

            // Iterate through all signals
            for (let i = signals.length - 1; i >= 0; i--) {
                const s = signals[i];

                if (s.life > 0) {
                    // Move
                    s.x += s.vx;
                    s.y += s.vy;
                    s.life--;
                    s.changeDirTimer--;

                    // Store path
                    // Optimization: only store if position changed meaningfully or just every frame? 
                    // storing every frame is simplest for lines.
                    s.path.push({ x: s.x, y: s.y });

                    // Logic to turn
                    if (s.changeDirTimer <= 0 && s.x % GRID_SIZE === 0 && s.y % GRID_SIZE === 0) {
                        if (Math.random() < 0.5) {
                            if (s.vx !== 0) { s.vx = 0; s.vy = Math.random() > 0.5 ? 2 : -2; }
                            else { s.vy = 0; s.vx = Math.random() > 0.5 ? 2 : -2; }
                            s.changeDirTimer = Math.floor(Math.random() * 30) + 10;
                        } else {
                            s.changeDirTimer = 10;
                        }
                    }

                    // Bounce off edges? Or just stop? 
                    // If it goes out of bounds, we can stop it (life = 0) to stop drawing "invisible" points
                    if (s.x < 0 || s.x > width || s.y < 0 || s.y > height) {
                        s.life = 0;
                    }
                }

                // Draw FULL Path
                if (s.path.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(s.path[0].x, s.path[0].y);
                    for (let p = 1; p < s.path.length; p++) {
                        ctx.lineTo(s.path[p].x, s.path[p].y);
                    }
                    ctx.strokeStyle = s.color;
                    ctx.lineWidth = 1.5;
                    ctx.lineCap = "square";
                    ctx.lineJoin = "round";
                    ctx.stroke();

                    // Optional: Draw head
                    if (s.life > 0) {
                        ctx.beginPath();
                        ctx.fillStyle = s.color;
                        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full pointer-events-none opacity-60 ${className}`}
        />
    );
};

export default CyberCircuit;
