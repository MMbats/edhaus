import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  useEffect(() => {
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      delay: 200,
      easing: 'ease',
      reset: true,
    });

    sr.reveal('.hero-content', {
      interval: 200,
    });
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Parallax effect */}
      <div 
        className="absolute inset-0 w-full h-full transform scale-110 transition-transform duration-1000"
        style={{
          backgroundImage: 'url(/images/hero.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'brightness(1.2) contrast(1.1) saturate(1.1)',
        }}
      />

      {/* Very light gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/20 to-transparent"></div>

      {/* Hero content */}
      <div className="relative h-screen flex items-center">
        <div className="hero-content w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Logo at the top */}
            <div className="flex justify-center mb-16">
              <img
                src="/images/products/logo.png"
                alt="EdHaus Logo"
                className="h-60 w-auto transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="text-center space-y-12">
              <h1 className="text-6xl lg:text-8xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500 leading-tight drop-shadow-lg">
                  Building Dreams
                </span>
              </h1>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link
                  to="/products"
                  className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Shop Now
                    <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  to="/about"
                  className="group px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-white/20 border border-white/10"
                >
                  Learn More
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 max-w-xl mx-auto">
                <div>
                  <div className="text-3xl font-bold text-orange-400 drop-shadow-lg">300+</div>
                  <div className="text-sm text-white">Products</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400 drop-shadow-lg">24/7</div>
                  <div className="text-sm text-white">Support</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400 drop-shadow-lg">100%</div>
                  <div className="text-sm text-white">Quality</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020617] to-transparent"></div>
    </div>
  );
};

export default Hero;