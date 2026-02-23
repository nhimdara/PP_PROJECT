import React from "react";
import {
  BookOpen,
  Clock,
  PlayCircle,
  Star,
  Users,
  TrendingUp,
  Filter,
  Search,
} from "lucide-react";
import lesson from "./../assets/image/lessonpage.jpeg";

const LessonsPage = () => {
  const lessons = [
    {
      id: 1,
      title: "Introduction to React",
      description:
        "Master the fundamentals of React including components, props, and state management.",
      duration: "45 min",
      level: "Beginner",
      students: 1234,
      rating: 4.8,
      category: "Frontend",
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      description:
        "Deep dive into closures, prototypes, async programming, and modern ES6+ features.",
      duration: "60 min",
      level: "Advanced",
      students: 892,
      rating: 4.9,
      category: "JavaScript",
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      description:
        "Learn the core principles of creating beautiful and user-friendly interfaces.",
      duration: "50 min",
      level: "Intermediate",
      students: 2156,
      rating: 4.7,
      category: "Design",
    },
    {
      id: 4,
      title: "Backend Development with Node.js",
      description:
        "Build scalable server-side applications using Express and MongoDB.",
      duration: "75 min",
      level: "Intermediate",
      students: 1567,
      rating: 4.8,
      category: "Backend",
    },
    {
      id: 5,
      title: "Responsive Web Design",
      description:
        "Create websites that work perfectly on all devices using modern CSS techniques.",
      duration: "55 min",
      level: "Beginner",
      students: 3421,
      rating: 4.9,
      category: "CSS",
    },
    {
      id: 6,
      title: "State Management with Redux",
      description:
        "Master complex state management patterns for large-scale applications.",
      duration: "65 min",
      level: "Advanced",
      students: 743,
      rating: 4.6,
      category: "Frontend",
    },
  ];

  const categories = [
    "All",
    "Frontend",
    "Backend",
    "JavaScript",
    "Design",
    "CSS",
  ];
  const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Parallax Effect */}
      <div className="relative w-full h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={lesson}
            alt="Lesson Banner"
            className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-700"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-purple-900/70 to-pink-900/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="max-w-3xl animate-fade-in-up">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  🎓 50+ Lessons Available
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  ⭐ 4.8 Average Rating
                </span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 leading-tight">
                Expand Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                  Knowledge Horizon
                </span>
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl mb-8">
                Discover comprehensive lessons crafted by industry experts to
                accelerate your learning journey
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-scroll" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-16">
        {/* Search Bar */}
        <div className="flex max-w-md bg-white/10 backdrop-blur-md rounded-xl p-1 border border-gray-200 mb-12">
          <input
            type="text"
            placeholder="Search lessons..."
            className="flex-1 bg-transparent border border-none text-black placeholder-gray-600 px-4 py-3 focus:outline-none"
          />
          <button className="bg-gray-200 text-indigo-600 px-6 py-3 rounded-md font-semibold hover:bg-indigo-50 transition-colors flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search
          </button>
        </div>
        {/* Filters Section */}
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  index === 0
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-gray-400" />
            <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {levels.map((level, index) => (
                <option key={index}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Popular Lessons</h2>
          <button className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-100 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 bg-gradient-to-br from-indigo-500 to-purple-600">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                    {lesson.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">
                    {lesson.title}
                  </h3>
                  <div className="flex items-center gap-4 text-white/90 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{lesson.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{lesson.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="h-16 w-16 text-white/90" />
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      lesson.level === "Beginner"
                        ? "bg-green-100 text-green-700"
                        : lesson.level === "Intermediate"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {lesson.level}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{lesson.students.toLocaleString()}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {lesson.description}
                </p>

                <button className="w-full bg-gray-50 group-hover:bg-indigo-600 text-gray-700 group-hover:text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2">
                  Start Learning
                  <PlayCircle className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-white border-2 border-indigo-600 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-200">
            Load More Lessons
          </button>
        </div>
      </div>
    </div>
  );
};

// Add this CSS to your global styles or as a style tag
const styles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }
`;

// You can add this style tag in your component or include in your global CSS
const StyleTag = () => <style>{styles}</style>;

export default LessonsPage;
