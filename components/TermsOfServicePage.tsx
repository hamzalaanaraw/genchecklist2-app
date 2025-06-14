import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="bg-slate-800 shadow-2xl rounded-xl p-6 sm:p-8 mb-10 text-slate-300">
      <h2 className="text-3xl sm:text-4xl font-bold text-fuchsia-500 mb-4 text-center">Terms of Service</h2>
      <p className="text-sm text-slate-400 mb-6 text-center">Last Updated: June 14, 2025</p>
      
      <div className="space-y-6 prose prose-slate prose-invert max-w-none 
                      prose-headings:text-fuchsia-400 prose-a:text-purple-400 hover:prose-a:text-purple-300
                      prose-strong:text-slate-100 prose-li:marker:text-fuchsia-400">
        <p>
          Welcome to GenChecklist! These Terms of Service ("Terms") govern your use of our website and services ("Services"). By using our Services, you agree to be bound by these Terms.
        </p>

        <section>
          <h3 className="text-xl font-semibold mt-6 mb-2">1. Use of Our Services</h3>
          <p>
            You must be at least 13 years old to use our Services. You are responsible for your conduct and any data, text, information, and other content ("Content") that you submit to the Services.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mt-6 mb-2">2. User Accounts</h3>
          <p>
            To access certain features of our Services, you may be required to create an account. You are responsible for safeguarding your account and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mt-6 mb-2">3. Content</h3>
          <p>
            You retain ownership of your Content. By submitting Content to our Services, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute your Content in connection with providing the Services.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mt-6 mb-2">4. Prohibited Conduct</h3>
          <p>You agree not to engage in any of the following prohibited activities:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Using the Services for any illegal purpose or in violation of any local, state, national, or international law.</li>
            <li>Posting any Content that is abusive, threatening, obscene, defamatory, or libelous.</li>
            <li>Attempting to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the Service.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mt-6 mb-2">5. Termination</h3>
          <p>
            We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mt-6 mb-2">6. Disclaimers and Limitation of Liability</h3>
          <p>
            Our Services are provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties of any kind, express or implied. In no event shall GenChecklist be liable for any indirect, incidental, special, consequential or punitive damages.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mt-6 mb-2">7. Governing Law</h3>
          <p>
            These Terms shall be governed by the laws of the State of [Your State], without regard to its conflict of law provisions. 
            {/* User should replace [Your State] */}
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mt-6 mb-2">8. Changes to Terms</h3>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice before any new terms taking effect.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mt-6 mb-2">9. Contact Us</h3>
          <p>
            If you have any questions about these Terms, please contact us at <a href="mailto:support@genchecklist.com" className="text-purple-400 hover:text-purple-300">support@genchecklist.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfServicePage;