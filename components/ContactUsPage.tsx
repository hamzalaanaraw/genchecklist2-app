import React from 'react';

const ContactUsPage: React.FC = () => {
  return (
    <div className="bg-slate-800 shadow-2xl rounded-xl p-6 sm:p-8 mb-10 text-slate-300">
      <h2 className="text-3xl sm:text-4xl font-bold text-fuchsia-500 mb-6 text-center">Contact Us</h2>
      
      <div className="space-y-4 prose prose-slate prose-invert max-w-none
                      prose-headings:text-fuchsia-400 prose-a:text-purple-400 hover:prose-a:text-purple-300
                      prose-strong:text-slate-100">
        <p className="text-lg leading-relaxed text-center">
          We'd love to hear from you! Whether you have a question, a suggestion, or just want to say hello, please don't hesitate to reach out.
        </p>
        
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Email Us:</h3>
          <p>
            For general inquiries, support, or feedback, please email us at:
            <br />
            <a 
              href="mailto:support@genchecklist.com" 
              className="text-purple-400 hover:text-purple-300 font-semibold text-lg"
            >
              support@genchecklist.com
            </a>
          </p>
          <p className="mt-4 text-sm text-slate-400">
            We do our best to respond to all inquiries within 24-48 business hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;