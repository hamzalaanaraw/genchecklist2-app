
import React, { useState } from 'react';
import { NewBeginningsDetails, NewBeginningsEventType } from '../types';

interface NewBeginningsFormProps {
  onSubmit: (details: NewBeginningsDetails) => void;
  isLoading: boolean;
}

const NewBeginningsForm: React.FC<NewBeginningsFormProps> = ({ onSubmit, isLoading }) => {
  const [eventType, setEventType] = useState<NewBeginningsEventType>(NewBeginningsEventType.STARTING_COLLEGE);
  const [additionalContext, setAdditionalContext] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ 
      eventType, 
      additionalContext 
    });
  };

  const commonInputClass = "w-full bg-slate-700 border-slate-600 text-slate-100 rounded-lg shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 p-3";
  const commonLabelClass = "block text-sm font-medium text-slate-300 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="newBeginningsEventType" className={commonLabelClass}>
          Select Life Event
        </label>
        <select 
          id="newBeginningsEventType" 
          name="newBeginningsEventType" 
          value={eventType} 
          onChange={(e) => setEventType(e.target.value as NewBeginningsEventType)} 
          className={commonInputClass} 
          disabled={isLoading} 
          required
        >
          {Object.values(NewBeginningsEventType).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="additionalContext" className={commonLabelClass}>
          Additional Context or Specific Details (Optional)
        </label>
        <textarea 
          id="additionalContext" 
          name="additionalContext" 
          value={additionalContext} 
          onChange={(e) => setAdditionalContext(e.target.value)} 
          rows={4} 
          className={commonInputClass} 
          placeholder="E.g., Moving to a new city for this job, first baby and feeling overwhelmed, starting college as a mature student..." 
          disabled={isLoading} 
        />
        <p className="mt-1 text-xs text-slate-400">
          Providing more details helps generate a more personalized and relevant action plan.
        </p>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-md font-semibold text-white bg-gradient-to-r from-fuchsia-500 to-purple-500 hover:from-fuchsia-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-fuchsia-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
          aria-live="polite"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Action Plan...
            </>
          ) : (
            'Generate New Beginnings Plan'
          )}
        </button>
      </div>
    </form>
  );
};

export default NewBeginningsForm;
