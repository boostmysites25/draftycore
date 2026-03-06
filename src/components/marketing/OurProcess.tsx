import { CircleCursor } from '../ui/Cursors';

const processes = [
  {
    id: "01",
    title: "Let’s Talk",
    description: "We start with a quick consultation to understand your projects, documentation scope, and studio workflow so we can plug into your process from day one.",
    gradient: "from-purple-600 to-blue-600",
    hoverTextColor: "group-hover:text-white",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Get On Drafty",
    description: "Once you’re ready, we onboard you to the Drafty platform your central hub for communication, file sharing, task tracking, and collaboration.",
    gradient: "from-blue-600 to-cyan-500",
    hoverTextColor: "group-hover:text-white",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Choose Your Setup",
    description: "Weekly, monthly, or yearly engagement. You share project files, reference models, and standards, and we map out the most efficient way to work together.",
    gradient: "from-cyan-500 to-teal-500",
    hoverTextColor: "group-hover:text-black",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Clear Proposal, No Surprises",
    description: "We send a simple, itemized proposal outlining scope, timelines, team structure, and pricing so everything is clear before we begin.",
    gradient: "from-teal-500 to-emerald-400",
    hoverTextColor: "group-hover:text-black",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "05",
    title: "Plug In & Get Moving",
    description: "Once approved, your dedicated team gets to work. We align with your tools, templates, and review process to integrate smoothly into your workflow.",
    gradient: "from-emerald-400 to-yellow-400",
    hoverTextColor: "group-hover:text-black",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "06",
    title: "Review. Refine. Deliver.",
    description: "We stay in sync with your feedback cycles, handle revisions quickly, and deliver clean documentation exactly as you need it.",
    gradient: "from-yellow-400 to-orange-500",
    hoverTextColor: "group-hover:text-black",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
  }
];

const OurProcess = () => {
  return (
    <section className="w-full bg-white relative py-12 md:py-24 text-black overflow-hidden">
      <CircleCursor isActive={true} />

      <div className="w-full max-w-[95rem] mx-auto px-4 md:px-8">
        <h2 className="text-5xl md:text-6xl xl:text-8xl font-maus font-black text-center mb-10 md:mb-16 tracking-tighter bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
          Our Process
        </h2>

        <div className="flex flex-col xl:flex-row w-full h-auto xl:h-[70vh] gap-4 xl:gap-0 border border-gray-200 rounded-3xl overflow-hidden bg-gray-50/50 backdrop-blur-sm">
          {processes.map((process, _index) => (
            <div
              key={process.id}
              className={`
                group relative flex-1 
                min-h-[280px] md:min-h-[320px] xl:min-h-0 
                border-b xl:border-b-0 xl:border-r border-gray-200 last:border-0
                flex flex-col justify-between p-6 md:p-8 transition-all duration-500 ease-out
                hover:flex-[2] overflow-hidden
              `}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src={process.image}
                  alt={process.title}
                  className="w-full h-full object-cover grayscale opacity-20 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-white/80 z-10"></div>
              </div>

              {/* Default Content (Visible initially) */}
              <div className="relative z-20 transform transition-all duration-500 group-hover:-translate-y-4">
                <span className={`text-4xl md:text-6xl xl:text-7xl font-maus font-bold text-gray-400 group-hover:opacity-100 transition-all duration-300 mb-2 md:mb-4 block ${process.hoverTextColor}`}>
                  {process.id}
                </span>
                <h3 className={`text-xl md:text-2xl xl:text-3xl font-coolvetica font-bold leading-tight transition-colors duration-300 text-black ${process.hoverTextColor}`}>
                  {process.title}
                </h3>
              </div>

              {/* Hover Content (Description) */}
              <div className={`
                relative z-20 max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-out
                group-hover:max-h-[200px] group-hover:opacity-100 group-hover:mt-4 md:group-hover:mt-6
              `}>
                <p className={`text-base md:text-lg font-medium leading-relaxed ${process.hoverTextColor} opacity-90`}>
                  {process.description}
                </p>
              </div>

              {/* Background Gradient Overlay for smooth transition */}
              <div className={`absolute inset-0 bg-gradient-to-b ${process.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProcess;