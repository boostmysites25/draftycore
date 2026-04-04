import { useRef, useEffect } from 'react';
import Matter from 'matter-js';

const REM_IN_PX = 16;
const remToPx = (rem: number) => rem * REM_IN_PX;

const images = [
    '/images/marketing/about/icons/10.png',
    '/images/marketing/about/icons/4 (2).png',
    '/images/marketing/about/icons/5 (1).png',
    '/images/marketing/about/icons/6.png',
    '/images/marketing/about/icons/7.png',
    '/images/marketing/about/icons/8.png',
    '/images/marketing/about/icons/9.png',
    '/images/marketing/about/icons/icon1.png',
];

export type IconConfig = {
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

const ICONS: IconConfig[] = Array.from({ length: images.length }).map((_, i) => {
    const imgIndex = i;
    const iconSizeRem = 7.5;
    return {
        id: `icon-${i}`,
        type: 'rectangle',
        width: remToPx(iconSizeRem),
        height: remToPx(iconSizeRem),
        offsetX: Math.random() * 800 - 400, // Spread across the width
        offsetY: -300 - (i * 100) - Math.random() * 200,
        angle: (Math.random() - 0.5) * 0.2,
        render: () => (
            <div className="w-[5rem] h-[5rem] lg:w-[7.5rem] lg:h-[7.5rem] overflow-hidden">
                <img
                    src={images[imgIndex]}
                    className="w-full h-full object-contain drop-shadow-md"
                    alt="Falling Icon"
                />
            </div>
        )
    };
});

interface FallingIconsProps {
    triggerDropIn?: boolean;
}

export const FallingIcons = ({ triggerDropIn = false }: FallingIconsProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        if (!triggerDropIn) return;

        const { Engine, World, Bodies, Runner } = Matter;

        const containerRect = containerRef.current.getBoundingClientRect();
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
        const floorY = height + 25;
        const floor = Bodies.rectangle(width / 2, floorY, width + 500, 50, boundaryOptions);
        const leftWall = Bodies.rectangle(-25, height / 2, 50, height * 2, boundaryOptions);
        const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height * 2, boundaryOptions);
        const ceiling = Bodies.rectangle(width / 2, -1500, width * 5, 500, boundaryOptions);

        World.add(engine.world, [floor, leftWall, rightWall, ceiling]);

        const shapeBodies = ICONS.map((shape) => {
            const startX = width / 2 + (shape.offsetX || 0);
            const startY = height / 2 + (shape.offsetY || 0);

            const commonOptions = {
                render: { fillStyle: 'transparent' },
                restitution: 0.6,
                frictionAir: 0.02,
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

        const runner = Runner.create();
        Runner.run(runner, engine);
        runnerRef.current = runner;

        const updateLoop = () => {
            shapeBodies.forEach((sb) => {
                const el = document.getElementById(`icon-shape-${sb.id}`);
                if (el) {
                    const { x, y } = sb.body.position;
                    el.style.left = `${x}px`;
                    el.style.top = `${y}px`;
                    el.style.transform = `translate(-50%, -50%) rotate(${sb.body.angle}rad)`;
                }
            });
            if (runnerRef.current) {
                requestAnimationFrame(updateLoop);
            }
        };
        updateLoop();

        const handleResize = () => {
            if (!containerRef.current) return;
            const newRect = containerRef.current.getBoundingClientRect();
            Matter.Body.setPosition(floor, { x: newRect.width / 2, y: newRect.height + 25 });
            Matter.Body.setPosition(rightWall, { x: newRect.width + 100, y: newRect.height / 2 });
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (runnerRef.current) {
                Runner.stop(runnerRef.current);
            }
            runnerRef.current = null;
            World.clear(engine.world, false);
            Engine.clear(engine);
        };
    }, [triggerDropIn]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none"
            style={{ touchAction: 'none' }}
        >
            {ICONS.map((shape) => (
                <div
                    key={shape.id}
                    id={`icon-shape-${shape.id}`}
                    className="absolute top-[-62.5rem] left-0 pointer-events-none"
                    style={{
                        width: shape.width,
                        height: shape.height,
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
