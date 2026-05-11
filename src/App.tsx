/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  BedDouble, 
  Bath, 
  Maximize, 
  ChevronRight, 
  Phone, 
  Mail, 
  Facebook, 
  Linkedin, 
  Menu, 
  X,
  ArrowRight,
  Star,
  TrendingUp,
  ShieldCheck,
  Wallet,
  ChevronDown,
  Quote,
  MessageCircle,
  Instagram,
  Twitter
} from 'lucide-react';

// --- Data ---

const properties = [
  {
    id: 1,
    name: "Beverly Hills Mansion",
    location: "Los Angeles, US",
    price: "$7,500,000",
    beds: 6,
    baths: 7,
    sqft: "8,500",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 2,
    name: "Palm Jumeirah Villa",
    location: "Dubai, UAE",
    price: "$5,200,000",
    beds: 5,
    baths: 6,
    sqft: "6,200",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 3,
    name: "Vancouver Waterfront",
    location: "Vancouver, Canada",
    price: "$4,800,000",
    beds: 4,
    baths: 4,
    sqft: "4,500",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 4,
    name: "Modern Desert Oasis",
    location: "Abu Dhabi, UAE",
    price: "$3,100,000",
    beds: 4,
    baths: 5,
    sqft: "5,100",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=2071"
  },
  {
    id: 5,
    name: "Hamptons Classic",
    location: "New York, US",
    price: "$6,900,000",
    beds: 7,
    baths: 8,
    sqft: "9,200",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2075"
  },
  {
    id: 6,
    name: "Toronto Sky Mansion",
    location: "Toronto, Canada",
    price: "$2,800,000",
    beds: 3,
    baths: 3,
    sqft: "3,200",
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&q=80&w=2070"
  }
];

const stats = [
  { label: "Properties Sold", value: 500, suffix: "+" },
  { label: "Years Experience", value: 15, suffix: "+" },
  { label: "Happy Clients", value: 1200, suffix: "+" },
  { label: "Countries Served", value: 3, suffix: "" }
];

const services = [
  {
    title: "Property Buying",
    description: "Expert guidance in finding and securing your dream luxury residence.",
    icon: Building2
  },
  {
    title: "Property Selling",
    description: "Strategic marketing and negotiation to maximize your property's value.",
    icon: TrendingUp
  },
  {
    title: "Investment Consulting",
    description: "Data-driven insights for high-yield real estate investment portfolios.",
    icon: Wallet
  },
  {
    title: "Property Management",
    description: "White-glove management services for your premium real estate assets.",
    icon: ShieldCheck
  }
];

const testimonials = [
  {
    name: "James Wilson",
    location: "Beverly Hills, US",
    text: "The level of professionalism and attention to detail at Prestige Properties is unmatched. They found us the perfect home within two weeks.",
    avatar: "https://i.pravatar.cc/150?u=james",
    rating: 5
  },
  {
    name: "Amira Al-Fayed",
    location: "Dubai, UAE",
    text: "Truly exclusive service. They understand the luxury market in Dubai better than anyone. Highly recommended for international investors.",
    avatar: "https://i.pravatar.cc/150?u=amira",
    rating: 5
  },
  {
    name: "Robert Anderson",
    location: "Toronto, Canada",
    text: "Excellent experience from start to finish. Their Canadian team is knowledgeable and provided exceptional white-glove service.",
    avatar: "https://i.pravatar.cc/150?u=robert",
    rating: 5
  }
];

// --- Components ---

const StatCounter = ({ value, label, suffix }: { value: number, label: string, suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          const duration = 2000;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="stat-card">
      <div className="text-2xl font-serif text-gold mb-1">
        {count}{suffix}
      </div>
      <div className="text-[9px] font-bold text-white/40 tracking-[0.2em] uppercase">
        {label}
      </div>
    </div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [mouseMoved, setMouseMoved] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const ringX = useSpring(-100, { damping: 30, stiffness: 200, mass: 0.5 });
  const ringY = useSpring(-100, { damping: 30, stiffness: 200, mass: 0.5 });
  const dotX = useSpring(-100, { damping: 20, stiffness: 450 });
  const dotY = useSpring(-100, { damping: 20, stiffness: 450 });

  useEffect(() => {
    ringX.set(mousePos.x);
    ringY.set(mousePos.y);
    dotX.set(mousePos.x);
    dotY.set(mousePos.y);
  }, [mousePos, ringX, ringY, dotX, dotY]);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!mouseMoved) setMouseMoved(true);
      
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('a, button, input, textarea'));
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const typingVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const particles = useMemo(() => [...Array(40)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 1 + Math.random() * 2,
    duration: 10 + Math.random() * 20,
    delay: Math.random() * 5
  })), []);

  return (
    <div className="min-h-screen selection:bg-gold selection:text-black">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100] bg-luxury-black flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-5xl font-serif font-bold text-gold tracking-[0.3em] mb-4">
                PRESTIGE PROPERTIES
              </div>
              <div className="h-0.5 w-0 bg-gold mx-auto animate-[loading-bar_1.5s_ease-in-out_forwards]"></div>
              <style>{`
                @keyframes loading-bar {
                  0% { width: 0; }
                  100% { width: 100%; }
                }
              `}</style>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 h-20 px-6 md:px-12 flex items-center justify-between ${isScrolled ? 'glass-nav h-16' : 'bg-transparent h-20'}`}>
        <div className="text-xl md:text-2xl font-serif font-bold text-gold tracking-[0.2em]">
          PRESTIGE PROPERTIES
        </div>
        
        <div className="hidden md:flex space-x-10 text-[11px] font-semibold tracking-[0.2em] uppercase">
          {['Home', 'Properties', 'About', 'Services', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="hover:text-gold transition-colors duration-300 relative group"
            >
              {item}
              <span className="nav-underline"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button className="hidden md:block view-button">
            Book Viewing
          </button>
          <button 
            className="md:hidden text-gold"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-luxury-black flex flex-col items-center justify-center space-y-8"
          >
            {['Home', 'Properties', 'About', 'Services', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-serif text-white hover:text-gold transition-colors"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative h-screen overflow-hidden flex items-center">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <div className="hero-gradient z-10"></div>
          {/* Gold Particles */}
          <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0.1, y: p.top + "%", x: p.left + "%" }}
                animate={{ 
                  y: ["-5%", "105%"],
                  opacity: [0.1, 0.4, 0.1],
                  x: [p.left + "%", (p.left + (Math.random() * 10 - 5)) + "%"]
                }}
                transition={{ 
                  duration: p.duration, 
                  repeat: Infinity, 
                  delay: p.delay,
                  ease: "linear"
                }}
                className="absolute bg-gold rounded-full"
                style={{ width: p.size, height: p.size }}
              />
            ))}
          </div>
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070" 
            alt="Luxury Villa" 
            className="w-full h-full object-cover scale-110"
          />
        </motion.div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ opacity }}
            className="max-w-2xl"
          >
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold block mb-6 px-1 border-l-2 border-gold/30"
            >
              Exclusive Global Portfolio
            </motion.span>
            <motion.h1 
              variants={typingVariants}
              initial="hidden"
              animate="visible"
              className="text-6xl md:text-8xl font-serif text-white mb-8 leading-[1.1] tracking-tight italic"
            >
              {"Find Your".split("").map((char, i) => (
                <motion.span key={i} variants={letterVariants}>{char}</motion.span>
              ))}
              <br />
              {"Dream Luxury Home".split("").map((char, i) => (
                <motion.span key={i} variants={letterVariants} className="not-italic">{char}</motion.span>
              ))}
            </motion.h1>
            <div className="gold-line mb-10"></div>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="text-gray-400 text-sm md:text-base mb-10 leading-relaxed font-light max-w-lg"
            >
              Handpicked architectural masterpieces across the United States, UAE, and Canada. Experience living at the intersection of art and elegance.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <button className="gold-button flex items-center gap-4 group">
                Explore Properties <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="outline-button">
                Get Quotation
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Down Arrow */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-1/2 -translate-x-1/2 z-20 text-gold/50 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.3em]">Scroll Down</span>
          <ChevronDown size={20} />
        </motion.div>

        {/* Stats Over Hero Bottom */}
        <div className="absolute bottom-0 left-0 w-full glass h-32 hidden md:flex items-center px-12 z-20 border-x-0 border-b-0">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-16">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl font-serif text-gold">{stat.value}{stat.suffix}</span>
                  <span className="text-[9px] uppercase tracking-widest text-gray-500">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 opacity-40">
              <Facebook size={14} />
              <Instagram size={14} />
              <Twitter size={14} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-serif mb-4">Featured Properties</h2>
              <p className="text-white/50 uppercase tracking-widest text-sm">Our most exclusive listings around the world</p>
            </motion.div>
            <motion.button 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-gold flex items-center gap-2 hover:gap-4 transition-all duration-300 uppercase text-sm tracking-widest font-bold"
            >
              View All Properties <ChevronRight size={18} />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="property-card group"
              >
                <div className="shimmer z-20"></div>
                <div className="gold-badge">
                  {index % 2 === 0 ? "EXCLUSVE" : "NEW LISTING"}
                </div>
                <div className="relative h-[240px] overflow-hidden mb-6">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    src={property.image} 
                    alt={property.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif group-hover:text-gold transition-colors">{property.name}</h3>
                    <span className="price-glow">{property.price}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <MapPin size={12} className="text-gold/50" /> {property.location}
                  </p>
                  
                  <div className="flex gap-6 text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-8 border-t border-white/5 pt-6">
                    <div className="flex items-center gap-2">
                      <BedDouble size={14} className="text-gold/50" />
                      <span>{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath size={14} className="text-gold/50" />
                      <span>{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Maximize size={14} className="text-gold/50" />
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>
                  
                  <button className="w-full py-4 border border-gold/30 text-[10px] uppercase tracking-widest hover:bg-gold hover:text-black transition-all font-bold">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-24 bg-[#111111] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              {/* Main Image with Frame Effect */}
              <div className="relative mb-6">
                <div className="absolute -top-4 -left-4 w-full h-full border border-gold/40 -z-10"></div>
                <div className="relative p-2 bg-luxury-black border border-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800" 
                    alt="Luxury Property Exterior" 
                    className="w-full h-[400px] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
              </div>

              {/* Sub-grid for additional luxury interiors */}
              <div className="grid grid-cols-2 gap-6 p-2">
                <div className="border border-white/10 p-1 bg-luxury-black">
                  <img 
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800" 
                    alt="Luxury Living Room" 
                    className="w-full h-40 object-cover opacity-60 hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
                <div className="border border-white/10 p-1 bg-luxury-black">
                  <img 
                    src="https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800" 
                    alt="Modern Kitchen" 
                    className="w-full h-40 object-cover opacity-60 hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h4 className="text-gold uppercase tracking-[0.4em] font-bold text-[10px] mb-6">Introduction</h4>
              <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight italic">About <span className="not-italic">Prestige Properties</span></h2>
              <p className="text-white/70 text-lg leading-relaxed mb-10 font-light">
                We are a premium real estate agency specializing in luxury properties across the US, UAE, and Canada with over 15 years of unmatched experience in high-end global markets.
              </p>
              
              <div className="grid grid-cols-2 gap-y-12">
                {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-2xl font-serif text-gold">{stat.value}{stat.suffix}</span>
                    <span className="text-[9px] uppercase tracking-widest text-gray-500">{stat.label}</span>
                  </div>
                ))}
              </div>

              <button className="gold-button mt-12 px-12 italic border border-gold/30">
                Our History
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Luxury Video Banner Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 10 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/70 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1600607687940-4e5a99427c5e?auto=format&fit=crop&q=80&w=2070" 
            alt="Luxury Interior" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="relative z-20 text-center px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-serif mb-6 italic"
          >
            Experience True <span className="not-italic text-gold">Luxury Living</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 mb-10 text-sm md:text-lg uppercase tracking-[0.3em]"
          >
            Schedule a private viewing today
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="gold-button pulse-gold"
          >
            Book Private Viewing
          </motion.button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#0a0a0a] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold uppercase tracking-[0.3em] font-bold text-sm mb-4"
            >
              Excellence Defined
            </motion.h4>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-serif text-white transition-all duration-500"
            >
              Our Services
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass p-10 transition-all duration-300 border-white/5 hover:border-gold/50 group"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-8 text-gold border-b border-gold/30">
                  <service.icon size={24} />
                </div>
                <h3 className="text-xl font-serif mb-4 italic">{service.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed font-light">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#111111] overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif mb-4">What Our Clients Say</h2>
            <div className="w-20 h-1 bg-gold mx-auto"></div>
          </div>

          <div className="relative h-[400px] md:h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <Quote className="text-gold/20 mx-auto mb-6" size={60} />
                <div className="flex justify-center gap-1 mb-8">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star size={16} fill="#c9a84c" color="#c9a84c" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-2xl md:text-4xl font-serif italic mb-10 leading-snug">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <img src={testimonials[currentTestimonial].avatar} alt="" className="w-16 h-16 rounded-full border-2 border-gold" />
                  <div className="text-left">
                    <h5 className="text-xl font-serif text-white">{testimonials[currentTestimonial].name}</h5>
                    <p className="text-gold uppercase tracking-widest text-xs">{testimonials[currentTestimonial].location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-3 mt-12">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${i === currentTestimonial ? 'bg-gold w-8' : 'bg-white/20'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#0a0a0a] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-serif mb-8">Get In Touch</h2>
              <p className="text-white/60 text-lg mb-12">
                Ready to find your next luxury masterpiece? Our experts are available 24/7 to guide you through your journey.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h5 className="text-white uppercase tracking-widest text-xs font-bold mb-2">Phone Number</h5>
                    <p className="text-xl font-serif">8678901453</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h5 className="text-white uppercase tracking-widest text-xs font-bold mb-2">Email Address</h5>
                    <p className="text-xl font-serif text-gold">bvchiranjeevi54@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h5 className="text-white uppercase tracking-widest text-xs font-bold mb-2">Our Office</h5>
                    <p className="text-xl font-serif">123 Luxury Lane, Beverly Hills, CA 90210</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass p-10 border-white/5"
            >
              <h3 className="text-xl font-serif italic mb-8">Inquire About Membership</h3>
              <form action="#" method="POST" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <input 
                      type="text" 
                      className="w-full bg-black/40 border border-white/10 px-4 py-4 focus:border-gold outline-none transition-colors text-xs" 
                      placeholder="FULL NAME"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      className="w-full bg-black/40 border border-white/10 px-4 py-4 focus:border-gold outline-none transition-colors text-xs" 
                      placeholder="EMAIL ADDRESS"
                    />
                  </div>
                </div>
                <div>
                  <input 
                    type="tel" 
                    className="w-full bg-black/40 border border-white/10 px-4 py-4 focus:border-gold outline-none transition-colors text-xs" 
                    placeholder="PHONE NUMBER"
                  />
                </div>
                <div>
                  <textarea 
                    rows={3}
                    className="w-full bg-black/40 border border-white/10 px-4 py-4 focus:border-gold outline-none transition-colors resize-none text-xs" 
                    placeholder="HOW CAN WE ASSIST YOU?"
                  ></textarea>
                </div>
                <button className="gold-button w-full">
                  Send Request
                </button>
              </form>

              <div className="mt-10 flex flex-col gap-4 opacity-50">
                <div className="flex items-center gap-3">
                  <div className="stat-line max-w-[24px]"></div>
                  <span className="text-[10px] uppercase tracking-[0.2em]">+1 867 890 1453</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="stat-line max-w-[24px]"></div>
                  <span className="text-[10px] uppercase tracking-[0.2em]">bvchiranjeevi54@gmail.com</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <div className="text-2xl font-serif font-bold text-gold tracking-tighter mb-6">
                PRESTIGE PROPERTIES
              </div>
              <p className="text-white/50 leading-relaxed mb-8 pr-4">
                Redefining luxury real estate across the globe. We provide exclusive access to some of the world's most prestigious residences.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-gold hover:text-black transition-all">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-gold hover:text-black transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-gold hover:text-black transition-all">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-gold hover:text-black transition-all">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            <div>
              <h5 className="text-white font-serif text-xl mb-8">Quick Links</h5>
              <ul className="space-y-4 text-white/50 uppercase tracking-widest text-xs font-bold">
                <li><a href="#home" className="hover:text-gold transition-colors">Home</a></li>
                <li><a href="#properties" className="hover:text-gold transition-colors">Properties</a></li>
                <li><a href="#about" className="hover:text-gold transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-gold transition-colors">Our Services</a></li>
                <li><a href="#contact" className="hover:text-gold transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-serif text-xl mb-8">Global Offices</h5>
              <ul className="space-y-4 text-white/50 text-sm">
                <li><span className="text-gold font-bold">Beverly Hills:</span> 123 Luxury Lane, CA</li>
                <li><span className="text-gold font-bold">Dubai:</span> Palm Tower, Level 52</li>
                <li><span className="text-gold font-bold">Toronto:</span> Waterfront Sq, Suite 100</li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-serif text-xl mb-8">Newsletter</h5>
              <p className="text-white/50 text-sm mb-6">Subscribe to receive exclusive off-market listings and luxury insights.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="bg-[#111111] border border-white/10 px-4 py-3 outline-none focus:border-gold w-full text-sm"
                />
                <button className="bg-gold px-4 text-black">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/10">
            <p className="text-white/30 text-sm mb-4 md:mb-0">
              © 2025 Prestige Properties. All Rights Reserved.
            </p>
            <div className="flex gap-8 text-white/30 text-xs uppercase tracking-widest font-bold">
              <a href="#" className="hover:text-gold">Privacy Policy</a>
              <a href="#" className="hover:text-gold">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <motion.a 
        href="https://wa.me/918678901453"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-10 right-10 z-[60] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl pulse-green"
      >
        <MessageCircle size={32} />
      </motion.a>

      {/* Custom Cursor at the bottom of the DOM to ensure it's on top */}
      {mouseMoved && (
        <>
          <motion.div 
            className="custom-cursor" 
            style={{ 
              left: ringX, 
              top: ringY,
              scale: isHovering ? 1.5 : 1,
              borderColor: isHovering ? '#c9a84c' : 'rgba(201, 168, 76, 0.3)',
              backgroundColor: isHovering ? 'rgba(201, 168, 76, 0.1)' : 'transparent'
            }} 
          />
          <motion.div 
            className="custom-cursor-dot" 
            style={{ 
              left: dotX, 
              top: dotY,
              scale: isHovering ? 0 : 1
            }} 
          />
        </>
      )}
    </div>
  );
}
