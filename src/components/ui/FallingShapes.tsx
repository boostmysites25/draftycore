import { useRef, useEffect, useState } from 'react';
import Matter from 'matter-js';

// Simple shapes for the physics dropping
const images = [
    '/images/marketing/built to be/1.png',
    '/images/marketing/built to be/2.png',
    '/images/marketing/built to be/3.png'
];

export type ShapeConfig = {
    id: string;
    type: string;
    width?: number;
    height?: number;
    radius?: number;
    offsetX?: number;
    offsetY?: number;
    angle?: number;
    render: () => JSX.Element;
};

const getShapesConfig = (size: number): ShapeConfig[] => Array.from({ length: 3 }).map((_, i) => {
    const imgIndex = i % 3;

    let text = "";
    if (imgIndex === 0) text = "SCALABLE"; // 1.png (Circle)
    else if (imgIndex === 1) text = "COST EFFECTIVE"; // 2.png (Rectangle)
    else if (imgIndex === 2) text = "EFFICIENT"; // 3.png (Triangle)

    const isMobile = size <= 120;

    // We make them rectangular cards to host the image
    return {
        id: `image-${i}`,
        type: 'rectangle',
        width: size,
        height: size,
        offsetX: Math.random() * 50 - 25,
        offsetY: -300 - (i * 100) - Math.random() * 100,
        angle: (Math.random() - 0.5) * 0.2,
        render: () => (
            <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
                <img
                    src={images[imgIndex]}
                    className="absolute inset-0 w-full h-full object-contain"
                    alt={text}
                />
            </div>
        )
    };
});

interface FallingShapesProps {
    triggerDropIn?: boolean;
}

export const FallingShapes = ({ triggerDropIn = false }: FallingShapesProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);
    const bodiesRef = useRef<{ body: Matter.Body }[]>([]);
    const [shapes, setShapes] = useState<ShapeConfig[]>([]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const width = window.innerWidth;
        const size = width < 640 ? 110 : width < 1024 ? 150 : 220;
        setShapes(getShapesConfig(size));
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;
        if (!triggerDropIn) return;
        if (shapes.length === 0) return;

        const { Engine, World, Bodies, Runner } = Matter;

        const containerRect = containerRef.current.getBoundingClientRect();
        // Since we are applying to an absolute inset-0 div, the width/height are the container size
        const width = containerRect.width;
        const height = containerRect.height;

        if (width <= 0 || height <= 0) return;

        const engine = Engine.create();
        engine.world.gravity.y = 1;
        engineRef.current = engine;

        // Create boundary walls
        const boundaryOptions = {
            isStatic: true,
            render: { fillStyle: 'transparent' }
        };
        // Floor is a massive block to prevent tunnel glitching
        const floorY = height + 25;
        const floor = Bodies.rectangle(width / 2, floorY, width, 50, boundaryOptions);
        const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
        const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
        const ceiling = Bodies.rectangle(width / 2, -1500, width * 5, 500, boundaryOptions); // ensure they don't fly infinitely up

        World.add(engine.world, [floor, leftWall, rightWall, ceiling]);

        // Create bodies mapped to our SHAPES
        const shapeBodies = shapes.map((shape) => {
            const startX = width / 2 + (shape.offsetX || 0);
            const startY = height / 2 + (shape.offsetY || 0);

            const commonOptions = {
                render: { fillStyle: 'transparent' },
                restitution: 0.8,
                frictionAir: 0.01,
                friction: 0.2,
                angle: shape.angle || 0
            };

            let body;
            if (shape.type === 'circle') {
                body = Bodies.circle(startX, startY, shape.radius!, commonOptions);
            } else if (shape.type === 'polygon') {
                body = Bodies.polygon(startX, startY, 3, shape.width! / 2, commonOptions);
            } else {
                body = Bodies.rectangle(startX, startY, shape.width!, shape.height!, commonOptions);
            }

            Matter.Body.setVelocity(body, {
                x: (Math.random() - 0.5) * 5,
                y: 0
            });
            Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

            return { id: shape.id, body };
        });

        const bodies = shapeBodies.map(sb => sb.body);
        World.add(engine.world, bodies);

        bodiesRef.current = shapeBodies.map(sb => ({
            body: sb.body
        }));

        const runner = Runner.create();
        Runner.run(runner, engine);
        runnerRef.current = runner;

        // Custom update loop mapping physics bodies to React refs
        const updateLoop = () => {
            shapeBodies.forEach((sb) => {
                const el = document.getElementById(`shape-${sb.id}`);
                if (el) {
                    const { x, y } = sb.body.position;
                    el.style.left = `${x}px`;
                    el.style.top = `${y}px`;
                    el.style.transform = `translate(-50%, -50%) rotate(${sb.body.angle}rad)`;
                }
            });
            requestAnimationFrame(updateLoop);
        };
        updateLoop();

        const handleResize = () => {
            if (!containerRef.current) return;
            const newRect = containerRef.current.getBoundingClientRect();
            // Update floor position
            Matter.Body.setPosition(floor, { x: newRect.width / 2, y: newRect.height + 25 });
            Matter.Body.setPosition(rightWall, { x: newRect.width + 100, y: newRect.height / 2 });
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            Runner.stop(runner);
            World.clear(engine.world, false);
            Engine.clear(engine);
        };
    }, [triggerDropIn]);


    return (
        <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full z-10 overflow-hidden pointer-events-none"
        >
            {shapes.map((shape) => (
                <div
                    key={shape.id}
                    id={`shape-${shape.id}`}
                    className="absolute top-[-1000px] left-0 pointer-events-none"
                    style={{
                        width: shape.type === 'circle' ? shape.radius! * 2 : shape.width,
                        height: shape.type === 'circle' ? shape.radius! * 2 : shape.height,
                    }}
                >
                    <div className="w-full h-full flex items-center justify-center pointer-events-none">
                        {shape.render()}
                    </div>
                </div>
            ))}
        </div>
    );
};
