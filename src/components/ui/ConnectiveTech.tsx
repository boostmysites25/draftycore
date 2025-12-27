import { useEffect, useRef } from 'react';

const BRAND_COLORS = ["#FF7A00", "#FFC300", "#FF2D95", "#B8F135", "#2ED9C3"];

const ConnectiveTech = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;

        interface Node {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
            pulseTimer: number;
            isFilled: boolean;
        }

        const nodes: Node[] = [];
        const nodeCount = 40; // Number of nodes
        const connectionDistance = 150;

        const createNode = (): Node => {
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 4 + 2, // 2 to 6px squares
                color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
                pulseTimer: Math.random() * 100,
                isFilled: false
            };
        };

        for (let i = 0; i < nodeCount; i++) {
            nodes.push(createNode());
        }

        const resize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        };
        window.addEventListener('resize', resize);

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Update and Draw Nodes
            nodes.forEach((node, i) => {
                // Movement
                node.x += node.vx;
                node.y += node.vy;

                // Bounce
                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;

                // Random pulse/fill
                node.pulseTimer++;
                if (node.pulseTimer > 200) {
                    node.isFilled = !node.isFilled;
                    node.pulseTimer = 0;
                }

                // Draw Connections
                for (let j = i + 1; j < nodes.length; j++) {
                    const other = nodes[j];
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                        // Opacity based on distance
                        const alpha = 1 - dist / connectionDistance;
                        ctx.strokeStyle = `rgba(0, 0, 0, ${alpha * 0.15})`; // Very faint lines
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }

                // Draw Node (Square)
                ctx.beginPath();
                // box x, y, w, h (centered)
                const s = node.size;
                ctx.rect(node.x - s / 2, node.y - s / 2, s, s);

                if (node.isFilled) {
                    ctx.fillStyle = node.color;
                    ctx.fill();
                } else {
                    ctx.strokeStyle = '#000000'; // Black outline
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });

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
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />
    );
};

export default ConnectiveTech;
