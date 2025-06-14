import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-slate-800 shadow-2xl rounded-xl p-6 sm:p-8 mb-10 text-slate-300">
      <h2 className="text-3xl sm:text-4xl font-bold text-fuchsia-500 mb-4 text-center">Privacy Policy</h2>
      <p className="text-sm text-slate-400 mb-6 text-center">Last Updated: June 14, 2025</p>
      
      <div className="space-y-6 prose prose-slate prose-invert max-w-none 
                      prose-headings:text-fuchsia-400 prose-a:text-purple-400 hover:prose-a:text-purple-300
                      prose-strong:text-slate-100 prose-li:marker:text-fuchsia-400">
        <p>
          This Privacy Policy describes how GenChecklist ("we," "us," or "our") collects, uses, and discloses your information.
        </p>

        <section>
          <h3 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Information You Provide:</strong> We collect information you provide directly to us, such as when you create an account, create checklists, and communicate with us. This may include your name, email address, and the content of your checklists.
            </li>
            <li>
              <strong>Usage Information:</strong> We collect information about your use of our Services, such as the checklists you create, the features you use, and the time, frequency, and duration of your activities.
            </li>
            <li>
              <strong>Log Information:</strong> We collect log information when you use our website, including your IP address, browser type, and operating system.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h3>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide, maintain, and improve our Services.</li>
            <li>Personalize your experience.</li>
            <li>Communicate with you about our Services.</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our Services.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mt-6 mb-2">3. How We Share Your Information</h3>
          <p>We do not share your personal information with third parties except in the following circumstances:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>With your consent.</li>
            <li>With third-party vendors and service providers that perform services on our behalf.</li>
            <li>If we believe that disclosure is reasonably necessary to comply with a law, regulation, legal process, or governmental request.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mt-6 mb-2">4. Your Choices</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Account Information:</strong> You may update, correct, or delete your account information at any time by logging into your account.
            </li>
            <li>
              <strong>Cookies:</strong> Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove or reject browser cookies.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mt-6 mb-2">5. Data Security</h3>
          <p>
            We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mt-6 mb-2">6. Children's Privacy</h3>
          <p>
            Our Services are not directed to individuals under 13. We do not knowingly collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mt-6 mb-2">7. Changes to This Privacy Policy</h3>
          <p>
            We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mt-6 mb-2">8. Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@genchecklist.com" className="text-purple-400 hover:text-purple-300">privacy@genchecklist.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;