import React from "react";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-2xl font-bold tracking-wide">WeMatch</h1>
        <div className="space-x-6 text-sm text-gray-300">
          <a href="#features" className="hover:text-white">
            Features
          </a>
          <a href="#how" className="hover:text-white">
            How it works
          </a>
          <a href="#cta" className="hover:text-white">
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 pt-20 pb-28 text-center">
        <h2 className="text-5xl font-extrabold leading-tight max-w-4xl mx-auto">
          Match with people by <span className="text-purple-500">skills</span>,
          not just swipes.
        </h2>
        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
          WeMatch connects developers, founders, designers, and learners based
          on skills, goals, and intent — not looks.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition font-semibold">
            Join WeMatch
          </button>
          <button className="px-8 py-3 rounded-xl border border-gray-600 hover:bg-gray-900 transition">
            Learn More 
          </button>
        </div>
      </section>

      {/* Why Section */}
      <section
        id="features"
        className="px-8 py-24 bg-gradient-to-b from-black to-gray-900"
      >
        <h3 className="text-4xl font-bold text-center mb-16">Why WeMatch?</h3>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="p-6 rounded-2xl bg-gray-800">
            <h4 className="text-xl font-semibold mb-3">Skill-first matching</h4>
            <p className="text-gray-400">
              Are you a solo developer, student, or job-seeker struggling to
              find the right people to learn, build, or grow with? WeMatch helps
              you connect with people just like you — based on skills, goals,
              and intent.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-800">
            <h4 className="text-xl font-semibold mb-3">Clear intent</h4>
            <p className="text-gray-400">
              Looking for a startup co-founder, mentor, collaborator, or
              teammate? WeMatch connects you with the right intent.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-800">
            <h4 className="text-xl font-semibold mb-3">AI-powered matches</h4>
            <p className="text-gray-400">
              Smart matching powered by skill similarity and goal alignment —
              explained, not random.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how" className="px-8 py-24">
        <h3 className="text-4xl font-bold text-center mb-16">How it works</h3>

        <div className="max-w-4xl mx-auto space-y-10">
          <div className="flex gap-6">
            <div className="text-purple-500 text-2xl font-bold">01</div>
            <div>
              <h4 className="text-xl font-semibold">
                Create your skill profile
              </h4>
              <p className="text-gray-400">
                Add your skills, experience level, and what you’re looking for.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="text-purple-500 text-2xl font-bold">02</div>
            <div>
              <h4 className="text-xl font-semibold">
                Discover meaningful matches
              </h4>
              <p className="text-gray-400">
                See people who actually complement your skills and goals.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="text-purple-500 text-2xl font-bold">03</div>
            <div>
              <h4 className="text-xl font-semibold">
                Connect & build together
              </h4>
              <p className="text-gray-400">
                Match, chat, and collaborate on real ideas and projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="cta"
        className="px-8 py-28 bg-gradient-to-r from-purple-600 to-indigo-600 text-center"
      >
        <h3 className="text-4xl font-extrabold">
          Build with the right people.
        </h3>
        <p className="mt-4 text-lg opacity-90">
          Stop wasting time. Start matching with purpose.
        </p>

        <button className="mt-8 px-10 py-4 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition">
          Get Early Access
        </button>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 text-center text-gray-500 text-sm bg-black">
        © {new Date().getFullYear()} WeMatch. Built for creators.
      </footer>
    </div>
  );
};

export default Homepage;
