import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-slate-800 shadow-2xl rounded-xl p-6 sm:p-8 mb-10 text-slate-300">
      <h2 className="text-3xl sm:text-4xl font-bold text-fuchsia-500 mb-6 text-center">About Us</h2>
      
      <div className="space-y-4 prose prose-slate prose-invert max-w-none 
                      prose-headings:text-fuchsia-400 prose-a:text-purple-400 hover:prose-a:text-purple-300
                      prose-strong:text-slate-100">
        <p className="text-lg leading-relaxed">
          Welcome to GenChecklist!
        </p>
        <p>
          We believe that a well-structured checklist is the secret to productivity and peace of mind. Whether you're planning a complex project, managing daily tasks, or preparing for a big life event, GenChecklist is here to help you stay organized and on track.
        </p>
        <p>
          Our mission is simple: to provide an intuitive and powerful platform for creating, managing, and sharing checklists. We understand that everyone's needs are different, which is why we've designed GenChecklist to be flexible and customizable. From simple to-do lists to detailed, multi-step protocols, our tool adapts to your workflow.
        </p>
        <p>
          At GenChecklist, we are passionate about turning chaos into clarity. We are a small team of developers and designers dedicated to building a tool that is both easy to use and robust in its features. We are constantly working to improve our platform and welcome feedback from our community of users.
        </p>
        <p>
          Thank you for choosing GenChecklist. We're excited to be a part of your journey to a more organized life.
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;