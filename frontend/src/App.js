import { useEffect, useRef, useState } from "react";
import "@/App.css";
import axios from "axios";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Lenis from '@studio-freight/lenis';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  ChevronRight,
  Star,
  Award,
  Heart
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Floating Navigation
const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'menu', 'visit', 'testimonials', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 bg-steamedWhite/80 backdrop-blur-md border border-white/20 rounded-full px-8 py-3 shadow-lg z-50 hidden md:flex gap-8 items-center"
      data-testid="floating-nav"
    >
      {[
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'Story' },
        { id: 'menu', label: 'Menu' },
        { id: 'visit', label: 'Visit' },
        { id: 'contact', label: 'Contact' }
      ].map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className={`font-manrope text-sm font-medium transition-colors duration-300 ${activeSection === id ? 'text-lacquerRed' : 'text-oolongTea hover:text-lacquerRed'
            }`}
          data-testid={`nav-${id}`}
        >
          {label}
        </button>
      ))}
    </motion.nav>
  );
};

// Hero Section
const HeroSection = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-oolongTea" data-testid="hero-section">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(44,36,32,0.5), rgba(44,36,32,0.3)), url('https://images.unsplash.com/photo-1757332914512-ffaf5b521ba8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwxfHxlZ2clMjB0YXJ0cyUyMGdvbGRlbiUyMGNydXN0fGVufDB8fHx8MTc3MDUxMDg2MHww&ixlib=rb-4.1.0&q=85')`
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32 z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
          >
            <span className="font-dancing text-pastryGold text-2xl md:text-3xl">
              San Francisco's Finest Since 1948
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-playfair font-bold text-5xl md:text-7xl lg:text-8xl text-steamedWhite mb-6 leading-tight"
            data-testid="hero-title"
          >
            The Legend of<br />
            <span className="italic">Golden Gate</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-manrope text-steamedWhite/90 text-lg md:text-xl mb-8 max-w-2xl"
          >
            Hand-crafted egg tarts, moon cakes, and traditional Chinese pastries
            that have delighted generations in the heart of Chinatown.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => scrollToSection('menu')}
              className="bg-lacquerRed text-steamedWhite rounded-full px-8 py-4 hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 font-manrope font-semibold tracking-wide flex items-center gap-2"
              data-testid="view-menu-btn"
            >
              View Our Menu
              <ChevronRight size={20} />
            </button>
            <button
              onClick={() => scrollToSection('visit')}
              className="border-2 border-steamedWhite text-steamedWhite bg-transparent rounded-full px-8 py-4 hover:bg-steamedWhite hover:text-oolongTea transition-all duration-300 font-manrope font-semibold"
              data-testid="visit-us-btn"
            >
              Visit Us
            </button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronRight className="text-steamedWhite rotate-90" size={32} />
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-20 md:py-32 bg-steamedWhite relative overflow-hidden" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="font-dancing text-pastryGold text-3xl mb-4 block">Our Story</span>
            <h2 className="font-playfair font-bold text-4xl md:text-6xl text-oolongTea mb-6">
              A <span className="italic">Heritage</span> of Taste
            </h2>
            <p className="text-textMuted text-lg mb-6 leading-relaxed">
              Nestled in the vibrant heart of San Francisco's Chinatown, Golden Gate Bakery
              has been a beloved landmark since 1948. For over 75 years, we've perfected
              the art of traditional Chinese pastries, bringing authentic flavors and
              time-honored recipes to our community.
            </p>
            <p className="text-textMuted text-lg mb-8 leading-relaxed">
              Our legendary egg tarts, with their flaky golden crusts and silky custard
              filling, have become a San Francisco icon. Each pastry is handcrafted daily
              using traditional techniques passed down through generations.
            </p>
            <div className="flex gap-8 flex-wrap">
              <div className="flex items-center gap-3">
                <Award className="text-pastryGold" size={32} />
                <div>
                  <div className="font-playfair font-bold text-2xl text-oolongTea">75+</div>
                  <div className="text-textMuted text-sm">Years of Excellence</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="text-lacquerRed" size={32} />
                <div>
                  <div className="font-playfair font-bold text-2xl text-oolongTea">1000s</div>
                  <div className="text-textMuted text-sm">Happy Customers Daily</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1646812969262-33c1afe4ee37?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDR8MHwxfHNlYXJjaHwyfHxzYW4lMjBmcmFuY2lzY28lMjBjaGluYXRvd24lMjBzdHJlZXQlMjBhZXN0aGV0aWN8ZW58MHx8fHwxNzcwNTEwODcwfDA&ixlib=rb-4.1.0&q=85"
                alt="Chinatown atmosphere"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-pastryGold text-oolongTea p-8 rounded-xl shadow-xl max-w-xs">
              <p className="font-playfair italic text-lg">
                "The best egg tarts in San Francisco!"
              </p>
              <p className="text-sm mt-2 font-manrope">- San Francisco Chronicle</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Menu Section with Bento Grid
const MenuSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const products = [
    {
      name: "Legendary Egg Tarts",
      description: "Our signature pastry with flaky golden crust and silky custard filling",
      image: "https://images.unsplash.com/photo-1757332914512-ffaf5b521ba8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwxfHxlZ2clMjB0YXJ0cyUyMGdvbGRlbiUyMGNydXN0fGVufDB8fHx8MTc3MDUxMDg2MHww&ixlib=rb-4.1.0&q=85",
      featured: false
    },
    {
      name: "Traditional Moon Cakes",
      description: "Seasonal delicacy with lotus seed paste and salted egg yolk",
      image: "https://images.unsplash.com/photo-1640274251909-aff175d87ff6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwYmFrZXJ5JTIwcGFzdHJpZXMlMjBlbGVnYW50fGVufDB8fHx8MTc3MDUxMDg2NXww&ixlib=rb-4.1.0&q=85",
      featured: false
    },
    {
      name: "BBQ Pork Buns",
      description: "Fluffy steamed buns filled with savory BBQ pork",
      image: "https://images.unsplash.com/photo-1596548739280-53724bdf0992?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwzfHxjaGluZXNlJTIwYmFrZXJ5JTIwcGFzdHJpZXMlMjBlbGVnYW50fGVufDB8fHx8MTc3MDUxMDg2NXww&ixlib=rb-4.1.0&q=85",
      featured: false
    },
    {
      name: "Almond Cookies",
      description: "Crispy, buttery cookies with whole almonds",
      image: "https://images.unsplash.com/photo-1599061012488-2106d5ff51a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwyfHxjaGluZXNlJTIwYmFrZXJ5JTIwcGFzdHJpZXMlMjBlbGVnYW50fGVufDB8fHx8MTc3MDUxMDg2NXww&ixlib=rb-4.1.0&q=85",
      featured: false
    },
    {
      name: "Custard Buns",
      description: "Soft buns with creamy, sweet custard filling",
      image: "https://images.unsplash.com/photo-1761695939616-1c03087c1ce4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwyfHxiYWtlcnklMjBpbnRlcmlvciUyMHdhcm0lMjBsaWdodGluZ3xlbnwwfHx8fDE3NzA1MTA4Nzd8MA&ixlib=rb-4.1.0&q=85",
      featured: false
    },
    {
      name: "Cocktail Buns",
      description: "Sweet coconut buns with a hint of vanilla",
      image: "https://images.unsplash.com/photo-1640274251909-aff175d87ff6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwYmFrZXJ5JTIwcGFzdHJpZXMlMjBlbGVnYW50fGVufDB8fHx8MTc3MDUxMDg2NXww&ixlib=rb-4.1.0&q=85",
      featured: false
    }
  ];

  return (
    <section id="menu" ref={ref} className="py-20 md:py-32 bg-warmBeige" data-testid="menu-section">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-dancing text-pastryGold text-3xl mb-4 block">Signature Bakes</span>
          <h2 className="font-playfair font-bold text-4xl md:text-6xl text-oolongTea mb-6">
            Our <span className="italic">Masterpieces</span>
          </h2>
          <p className="text-textMuted text-lg max-w-2xl mx-auto">
            Every pastry is handcrafted daily using time-honored techniques and the finest ingredients
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${product.featured ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              data-testid={`product-card-${index}`}
            >
              <div className="relative overflow-hidden h-64 md:h-80">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-oolongTea/80 via-oolongTea/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-playfair font-bold text-2xl text-oolongTea mb-2">
                  {product.name}
                </h3>
                <p className="text-textMuted leading-relaxed">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Local Food Blogger",
      text: "The egg tarts here are absolutely divine! Crispy, flaky crust with the perfect custard filling. Worth the wait every single time.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Tourist from LA",
      text: "Discovered this gem while exploring Chinatown. The moon cakes are authentic and delicious. Will definitely come back!",
      rating: 5
    },
    {
      name: "Emily Wong",
      role: "Regular Customer",
      text: "Been coming here since I was a kid. The quality has never changed - always fresh, always delicious. A true SF treasure!",
      rating: 5
    },
    {
      name: "David Kim",
      role: "Food Critic",
      text: "Golden Gate Bakery maintains the highest standards of traditional Chinese baking. Their BBQ pork buns are phenomenal.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-steamedWhite overflow-hidden" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-dancing text-pastryGold text-3xl mb-4 block">Customer Love</span>
          <h2 className="font-playfair font-bold text-4xl md:text-6xl text-oolongTea mb-6">
            What <span className="italic">People Say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-sm border border-pastryGold/20"
              data-testid={`testimonial-${index}`}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-pastryGold fill-pastryGold" size={20} />
                ))}
              </div>
              <p className="text-textMuted mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              <div>
                <div className="font-playfair font-bold text-oolongTea">
                  {testimonial.name}
                </div>
                <div className="text-textMuted text-sm">
                  {testimonial.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Visit Section with Hours and Map
const VisitSection = () => {
  const hours = [
    { day: "Sunday", time: "08:00 AM - 08:00 PM" },
    { day: "Monday", time: "08:00 AM - 08:00 PM" },
    { day: "Tuesday", time: "08:00 AM - 08:00 PM" },
    { day: "Wednesday", time: "08:00 AM - 08:00 PM" },
    { day: "Thursday", time: "08:00 AM - 08:00 PM" },
    { day: "Friday", time: "08:00 AM - 08:00 PM" },
    { day: "Saturday", time: "08:00 AM - 08:00 PM" }
  ];

  return (
    <section id="visit" className="py-20 md:py-32 bg-oolongTea text-steamedWhite" data-testid="visit-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-dancing text-pastryGold text-3xl mb-4 block">Location & Hours</span>
          <h2 className="font-playfair font-bold text-4xl md:text-6xl mb-6">
            Come <span className="italic">Visit Us</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Address & Contact */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-warmBeige/10 backdrop-blur-sm p-8 rounded-2xl border border-pastryGold/20">
              <h3 className="font-playfair font-bold text-2xl mb-6 text-pastryGold">Find Us</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="text-pastryGold mt-1 flex-shrink-0" size={24} />
                  <div>
                    <div className="font-semibold mb-1">Address</div>
                    <div className="text-steamedWhite/80">
                      1029 Grant Ave<br />
                      (between Jackson St & Pacific Ave)<br />
                      San Francisco, CA 94133
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="text-pastryGold mt-1 flex-shrink-0" size={24} />
                  <div>
                    <div className="font-semibold mb-1">Phone</div>
                    <a href="tel:4157812627" className="text-steamedWhite/80 hover:text-pastryGold transition-colors">
                      (415) 781-2627
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-pastryGold mt-1 flex-shrink-0" size={24} />
                  <div>
                    <div className="font-semibold mb-1">Status</div>
                    <div className="text-pastryGold font-semibold flex items-center gap-2">
                      <span className="w-2 h-2 bg-pastryGold rounded-full animate-pulse"></span>
                      Open Daily
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-warmBeige/10 backdrop-blur-sm p-8 rounded-2xl border border-pastryGold/20"
          >
            <h3 className="font-playfair font-bold text-2xl mb-6 text-pastryGold">Business Hours</h3>

            <div className="space-y-3">
              {hours.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-steamedWhite/10"
                  data-testid={`hours-${item.day.toLowerCase()}`}
                >
                  <span className="font-semibold">{item.day}</span>
                  <span className="text-steamedWhite/80">{item.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-2xl"
          data-testid="map-container"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.8929577147496!2d-122.40794!3d37.795147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580f3c4c1a9e5%3A0x5c6b5b5b5b5b5b5b!2s1029%20Grant%20Ave%2C%20San%20Francisco%2C%20CA%2094133!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Golden Gate Bakery Location"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      await axios.post(`${API}/contact`, formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-steamedWhite" data-testid="contact-section">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="font-dancing text-pastryGold text-3xl mb-4 block">Get in Touch</span>
          <h2 className="font-playfair font-bold text-4xl md:text-6xl text-oolongTea mb-6">
            Contact <span className="italic">Us</span>
          </h2>
          <p className="text-textMuted text-lg">
            Have questions about catering, reservations, or our products? We'd love to hear from you!
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          // onSubmit={handleSubmit}
          className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-pastryGold/20"
          data-testid="contact-form"
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-manrope font-semibold text-oolongTea mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-warmBeige focus:border-lacquerRed focus:outline-none focus:ring-2 focus:ring-lacquerRed/20 transition-all"
                placeholder="Your name"
                data-testid="contact-name-input"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-manrope font-semibold text-oolongTea mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-warmBeige focus:border-lacquerRed focus:outline-none focus:ring-2 focus:ring-lacquerRed/20 transition-all"
                placeholder="your@email.com"
                data-testid="contact-email-input"
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-manrope font-semibold text-oolongTea mb-2">
                Message
              </label>
              <textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows="6"
                className="w-full px-4 py-3 rounded-lg border border-warmBeige focus:border-lacquerRed focus:outline-none focus:ring-2 focus:ring-lacquerRed/20 transition-all resize-none"
                placeholder="Tell us about your inquiry..."
                data-testid="contact-message-input"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-lacquerRed text-steamedWhite rounded-full px-8 py-4 hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 font-manrope font-semibold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              data-testid="contact-submit-btn"
            >
              {isSubmitting ? 'Sending...' : (
                <>
                  <Mail size={20} />
                  Send Message
                </>
              )}
            </button>

            {status === 'success' && (
              <div className="bg-jadeGreen/10 border border-jadeGreen text-jadeGreen px-4 py-3 rounded-lg text-center" data-testid="contact-success">
                Thank you! We'll get back to you soon.
              </div>
            )}

            {status === 'error' && (
              <div className="bg-lacquerRed/10 border border-lacquerRed text-lacquerRed px-4 py-3 rounded-lg text-center" data-testid="contact-error">
                Something went wrong. Please try again or call us directly.
              </div>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-oolongTea text-steamedWhite py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-playfair font-bold text-2xl text-pastryGold mb-4">
              Golden Gate Bakery
            </h3>
            <p className="text-steamedWhite/70">
              San Francisco's legendary bakery since 1948, serving authentic Chinese pastries in the heart of Chinatown.
            </p>
          </div>

          <div>
            <h4 className="font-manrope font-semibold mb-4 text-pastryGold">Quick Links</h4>
            <div className="space-y-2">
              {['Home', 'About', 'Menu', 'Visit', 'Contact'].map((link) => (
                <button
                  key={link}
                  onClick={() => scrollToSection(link.toLowerCase())}
                  className="block text-steamedWhite/70 hover:text-pastryGold transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-manrope font-semibold mb-4 text-pastryGold">Contact</h4>
            <div className="space-y-2 text-steamedWhite/70">
              <p>1029 Grant Ave</p>
              <p>San Francisco, CA 94133</p>
              <p>(415) 781-2627</p>
              <p>Open Daily: 8AM - 8PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-steamedWhite/20 pt-8 text-center text-steamedWhite/60">
          <p className="font-manrope">
            © {new Date().getFullYear()} Golden Gate Bakery. All rights reserved.
          </p>
          <p className="text-sm mt-2">
            Handcrafted with <Heart className="inline text-lacquerRed" size={16} /> in San Francisco
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll with optimized settings
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Add CSS for smooth scrolling
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: auto;
      }
      body {
        overflow-x: hidden;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="App">
      <FloatingNav />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <TestimonialsSection />
      <VisitSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;