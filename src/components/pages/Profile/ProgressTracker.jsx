import React, { useState } from "react";
import {
  TrendingUp,
  BookOpen,
  Clock,
  Award,
  Target,
  Calendar,
  ChevronRight,
  Star,
  Zap,
  CheckCircle,
  BarChart3,
  LineChart,
  PieChart,
  Download,
  Filter
} from "lucide-react";

const ProgressTracker = ({ user }) => {
  const [timeRange, setTimeRange] = useState("week");
  const [selectedMetric, setSelectedMetric] = useState("all");

  const stats = [
    {
      label: "Learning Hours",
      value: "47.5",
      change: "+12%",
      icon: Clock,
      color: "indigo",
      subtext: "This week"
    },
    {
      label: "Courses Completed",
      value: "2",
      change: "+1",
      icon: BookOpen,
      color: "green",
      subtext: "This month"
    },
    {
      label: "Certificates Earned",
      value: "2",
      change: "0",
      icon: Award,
      color: "purple",
      subtext: "Total"
    },
    {
      label: "Skills Mastered",
      value: "8",
      change: "+3",
      icon: Star,
      color: "amber",
      subtext: "This month"
    }
  ];

  const weeklyProgress = [
    { day: "Mon", hours: 2.5, courses: 1, completed: false },
    { day: "Tue", hours: 3, courses: 2, completed: false },
    { day: "Wed", hours: 1.5, courses: 1, completed: false },
    { day: "Thu", hours: 4, courses: 2, completed: false },
    { day: "Fri", hours: 2, courses: 1, completed: false },
    { day: "Sat", hours: 3.5, courses: 2, completed: true },
    { day: "Sun", hours: 2, courses: 1, completed: true }
  ];

  const courses = [
    {
      id: 1,
      name: "Advanced React Development",
      progress: 75,
      timeSpent: "28 hours",
      lessonsCompleted: 36,
      totalLessons: 48,
      quizzesPassed: 8,
      totalQuizzes: 10,
      nextMilestone: "Complete Redux Module"
    },
    {
      id: 2,
      name: "Full Stack JavaScript",
      progress: 30,
      timeSpent: "12 hours",
      lessonsCompleted: 24,
      totalLessons: 80,
      quizzesPassed: 4,
      totalQuizzes: 15,
      nextMilestone: "Finish Express.js Section"
    },
    {
      id: 3,
      name: "UI/UX Design Masterclass",
      progress: 100,
      timeSpent: "35 hours",
      lessonsCompleted: 32,
      totalLessons: 32,
      quizzesPassed: 12,
      totalQuizzes: 12,
      completed: true
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "Quick Learner",
      description: "Complete 5 lessons in one day",
      date: "Feb 25, 2026",
      icon: Zap,
      color: "amber"
    },
    {
      id: 2,
      title: "Consistency King",
      description: "Study 7 days in a row",
      date: "Feb 24, 2026",
      icon: Calendar,
      color: "green"
    },
    {
      id: 3,
      title: "Quiz Master",
      description: "Score 100% on 5 quizzes",
      date: "Feb 20, 2026",
      icon: Award,
      color: "purple"
    },
    {
      id: 4,
      title: "Early Bird",
      description: "Complete a lesson before 8 AM",
      date: "Feb 18, 2026",
      icon: Star,
      color: "indigo"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      indigo: "bg-indigo-50 text-indigo-600",
      green: "bg-green-50 text-green-600",
      purple: "bg-purple-50 text-purple-600",
      amber: "bg-amber-50 text-amber-600",
      blue: "bg-blue-50 text-blue-600"
    };
    return colors[color] || colors.indigo;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Progress Tracker</h1>
            <p className="text-gray-500 mt-1">Monitor your learning journey and achievements</p>
          </div>
          
          <div className="flex gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="all">All Time</option>
            </select>
            
            <button className="p-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
              <Download className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${getColorClasses(stat.color)}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className={`text-sm font-medium ${
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-xs text-gray-400 mt-1">{stat.subtext}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Weekly Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Activity Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Weekly Activity</h3>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <BarChart3 className="h-4 w-4 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <LineChart className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-end justify-between h-40">
                {weeklyProgress.map((day, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 w-10">
                    <div className="relative group">
                      <div 
                        className="w-8 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg transition-all group-hover:from-indigo-600 group-hover:to-purple-600"
                        style={{ height: `${(day.hours / 4) * 100}px` }}
                      />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                        {day.hours} hours • {day.courses} courses
                      </div>
                    </div>
                    <span className="text-xs font-medium text-gray-500">{day.day}</span>
                    {day.completed && (
                      <CheckCircle className="h-3 w-3 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full" />
                    <span className="text-xs text-gray-500">Study Hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-gray-500">Goal Achieved</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Total: <span className="font-semibold text-indigo-600">18.5 hours</span>
                </p>
              </div>
            </div>

            {/* Course Progress */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Progress</h3>
              
              <div className="space-y-6">
                {courses.map(course => (
                  <div key={course.id} className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{course.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {course.timeSpent} • {course.lessonsCompleted}/{course.totalLessons} lessons
                        </p>
                      </div>
                      <span className={`text-sm font-semibold ${
                        course.progress === 100 ? 'text-green-600' : 'text-indigo-600'
                      }`}>
                        {course.progress}%
                      </span>
                    </div>
                    
                    <div className="relative">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      
                      {/* Milestone Markers */}
                      {[25, 50, 75].map(milestone => (
                        <div
                          key={milestone}
                          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white border-2 border-gray-300 rounded-full"
                          style={{ left: `${milestone}%` }}
                        />
                      ))}
                    </div>
                    
                    {course.nextMilestone && (
                      <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                        <Target className="h-3 w-3 text-indigo-500" />
                        <span>Next: {course.nextMilestone}</span>
                        <ChevronRight className="h-3 w-3 ml-auto" />
                      </div>
                    )}
                    
                    {course.quizzesPassed !== undefined && (
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-gray-500">
                          Quizzes: {course.quizzesPassed}/{course.totalQuizzes} passed
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-green-600">
                          {Math.round((course.quizzesPassed / course.totalQuizzes) * 100)}% accuracy
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Achievements & Insights */}
          <div className="space-y-6">
            {/* Overall Progress */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h3>
              
              <div className="text-center">
                <div className="relative inline-block">
                  <svg className="w-32 h-32">
                    <circle
                      className="text-gray-200"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="56"
                      cx="64"
                      cy="64"
                    />
                    <circle
                      className="text-indigo-600"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="56"
                      cx="64"
                      cy="64"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.45)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">45%</p>
                      <p className="text-xs text-gray-500">Complete</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Courses Left</p>
                    <p className="text-lg font-bold text-gray-900">4</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Hours to Go</p>
                    <p className="text-lg font-bold text-gray-900">62</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
              
              <div className="space-y-4">
                {achievements.map(achievement => {
                  const Icon = achievement.icon;
                  return (
                    <div key={achievement.id} className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getColorClasses(achievement.color)}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{achievement.title}</p>
                        <p className="text-xs text-gray-500">{achievement.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{achievement.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <button className="w-full mt-4 text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                View All Achievements
              </button>
            </div>

            {/* Learning Insights */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Learning Insights</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-white/80">Best Learning Time</p>
                  <p className="text-xl font-bold">Morning (8-11 AM)</p>
                  <p className="text-xs text-white/60 mt-1">You're 30% more productive</p>
                </div>
                
                <div>
                  <p className="text-sm text-white/80">Average Session</p>
                  <p className="text-xl font-bold">47 minutes</p>
                  <p className="text-xs text-white/60 mt-1">+12% vs last week</p>
                </div>
                
                <div>
                  <p className="text-sm text-white/80">Streak</p>
                  <p className="text-xl font-bold">7 days 🔥</p>
                  <p className="text-xs text-white/60 mt-1">Keep it up!</p>
                </div>
              </div>
              
              <button className="w-full mt-4 px-4 py-2 bg-white/20 rounded-xl text-sm font-medium hover:bg-white/30 transition-colors">
                View Detailed Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;