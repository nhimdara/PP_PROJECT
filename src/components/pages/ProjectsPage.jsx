import React from "react";
import { Layers } from "lucide-react";

const ProjectsPage = () => {
  return (
    <div className="pt-[66px] min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <Layers className="h-8 w-8 text-indigo-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Project {i}</h3>
              <p className="text-gray-600 text-sm">Build a real-world application using React and modern tools.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;