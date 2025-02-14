// src/components/layout/service/CTA.tsx
'use client';

const CTA = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-3xl" />
      <div className="relative text-center py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Ready to Transform Your Digital Presence?
        </h2>
        <p className="text-xl text-black-400 mb-8">
          Join the digital revolution and elevate your brand to new heights
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:opacity-90 transition-opacity">
            Start Your Journey
          </button>
          <button className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition-colors">
            Talk to an Expert
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;