import React from "react";
import { 
  Layers, 
  Github, 
  ExternalLink, 
  Code2,
  Rocket,
  Sparkles,
  ArrowRight
} from "lucide-react";
import project from "./../assets/image/projectbanner.jpg";

const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      title: "AI-Powered Dashboard",
      description: "Modern analytics dashboard with real-time data visualization and AI-driven insights using React and D3.js.",
      tags: ["React", "D3.js", "Node.js", "TensorFlow.js"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 2,
      title: "EcoTrack Mobile App",
      description: "Sustainability tracking mobile application helping users reduce their carbon footprint with gamification.",
      tags: ["React Native", "Firebase", "Redux", "Expo"],
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 3,
      title: "Cloud Portfolio Platform",
      description: "Serverless portfolio platform for creatives with automatic image optimization and CDN integration.",
      tags: ["Next.js", "AWS", "TailwindCSS", "Vercel"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 4,
      title: "Blockchain Voting System",
      description: "Secure and transparent voting platform built on Ethereum smart contracts with real-time tallying.",
      tags: ["Solidity", "Web3.js", "React", "Hardhat"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      title: "HealthAI Assistant",
      description: "AI-powered health monitoring system with symptom checker and personalized wellness recommendations.",
      tags: ["Python", "FastAPI", "React", "MongoDB"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      title: "Smart City IoT Platform",
      description: "IoT platform for smart city management with real-time sensor data and predictive analytics.",
      tags: ["Node.js", "MQTT", "React", "InfluxDB"],
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Banner */}
      <div className="relative w-full h-[500px] overflow-hidden group">
        <div className="absolute inset-0">
          <img
            src={project}
            alt="Project Showcase"
            className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
            loading="eager"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-purple-900/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent" />
          
          {/* Animated Particles Effect */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 w-full">
            <div className="max-w-2xl space-y-6 animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                Creating Digital
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">
                  Masterpieces
                </span>
              </h1>
              <p className="text-lg text-white/80 leading-relaxed">
                Explore my portfolio of innovative web applications, from AI-powered dashboards to blockchain solutions. 
                Each project represents a unique challenge solved with cutting-edge technology.
              </p>
              <div className="flex gap-4 pt-4">
                <button className="group bg-gradient-to-r from-indigo-500 to-cyan-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex items-center gap-2">
                  View All Projects
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                  GitHub Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-scroll" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-50 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-700">My Work</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600">
            A collection of projects that showcase my expertise in modern web development,
            from concept to deployment.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Featured
                  </div>
                )}

                {/* Overlay Actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-100 scale-90">
                  <a
                    href="#"
                    className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 hover:scale-110 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 hover:scale-110 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-indigo-600" />
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                      <Code2 className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2 border-t border-gray-100">
                  <a
                    href="#"
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    Code
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Have a project in mind?</h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Let's collaborate and bring your ideas to life with cutting-edge technology and creative solutions.
            </p>
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-white/20 transition-all duration-300 hover:scale-105">
              Start a Conversation
            </button>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(15px);
            opacity: 0;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-scroll {
          animation: scroll 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default ProjectsPage;