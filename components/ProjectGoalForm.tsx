
import React, { useState } from 'react';
import { ProjectGoalDetails, GoalType } from '../types';

interface ProjectGoalFormProps {
  onSubmit: (details: ProjectGoalDetails) => void;
  isLoading: boolean;
}

const ProjectGoalForm: React.FC<ProjectGoalFormProps> = ({ onSubmit, isLoading }) => {
  const [goalType, setGoalType] = useState<GoalType>(GoalType.START_PODCAST);
  const [goalStatement, setGoalStatement] = useState<string>('');
  const [targetTimeline, setTargetTimeline] = useState<string>('');
  const [keyConsiderations, setKeyConsiderations] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalStatement.trim()) {
        alert("Please provide a clear goal statement.");
        return;
    }
    onSubmit({ 
      goalType, 
      goalStatement,
      targetTimeline,
      keyConsiderations
    });
  };

  const commonInputClass = "w-full bg-slate-700 border-slate-600 text-slate-100 rounded-lg shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 p-3";
  const commonLabelClass = "block text-sm font-medium text-slate-300 mb-1";

  const getPlaceholderForKeyConsiderations = (): string => {
    switch(goalType) {
      case GoalType.START_PODCAST:
        return "E.g., Solo or interview format? Target audience? Budget for equipment? Any existing content ideas? Marketing thoughts?";
      case GoalType.LAUNCH_BLOG_WEBSITE:
        return "E.g., Niche/topic? Target audience? Preferred platform (WordPress, Squarespace)? Monetization plans? Content pillars?";
      case GoalType.TRAIN_FOR_FITNESS_EVENT:
        return "E.g., Specific event (5k, marathon, triathlon)? Current fitness level? Time available for training per week? Any past injuries?";
      case GoalType.DEEP_CLEAN_HOUSE:
        return "E.g., Focus areas (whole house, specific rooms)? Any particular problem spots (clutter, grime)? Timeframe for completion?";
      case GoalType.LEARN_NEW_SKILL:
        return "E.g., Specific skill (Python, Spanish, Guitar)? Preferred learning style (online courses, books, tutor)? Time commitment per week?";
      case GoalType.WRITE_BOOK_NOVEL:
        return "E.g., Genre? Target word count? Daily/weekly writing goals? Any existing outline or research?";
      default:
        return "E.g., Budget constraints, available resources, specific sub-goals, deadlines, collaborators, success metrics...";
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="goalType" className={commonLabelClass}>
          Select Goal/Project Type
        </label>
        <select 
          id="goalType" 
          name="goalType" 
          value={goalType} 
          onChange={(e) => setGoalType(e.target.value as GoalType)} 
          className={commonInputClass} 
          disabled={isLoading} 
          required
        >
          {Object.values(GoalType).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="goalStatement" className={commonLabelClass}>
          Your Goal Statement
        </label>
        <input 
          type="text"
          id="goalStatement" 
          name="goalStatement" 
          value={goalStatement} 
          onChange={(e) => setGoalStatement(e.target.value)} 
          className={commonInputClass} 
          placeholder="E.g., Launch a weekly podcast about historical mysteries" 
          disabled={isLoading} 
          required
        />
        <p className="mt-1 text-xs text-slate-400">
          Be specific and clear about what you want to achieve.
        </p>
      </div>
      
      <div>
        <label htmlFor="targetTimeline" className={commonLabelClass}>
          Target Timeline (Optional)
        </label>
        <input 
          type="text"
          id="targetTimeline" 
          name="targetTimeline" 
          value={targetTimeline} 
          onChange={(e) => setTargetTimeline(e.target.value)} 
          className={commonInputClass} 
          placeholder="E.g., 3 months, By December 31st, Ongoing" 
          disabled={isLoading} 
        />
      </div>

      <div>
        <label htmlFor="keyConsiderations" className={commonLabelClass}>
          Key Considerations & Specifics (Optional)
        </label>
        <textarea 
          id="keyConsiderations" 
          name="keyConsiderations" 
          value={keyConsiderations} 
          onChange={(e) => setKeyConsiderations(e.target.value)} 
          rows={4} 
          className={commonInputClass} 
          placeholder={getPlaceholderForKeyConsiderations()}
          disabled={isLoading} 
        />
        <p className="mt-1 text-xs text-slate-400">
          The more details you provide, the more tailored your plan will be.
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
              Generating Achievement Plan...
            </>
          ) : (
            'Generate Achievement Plan'
          )}
        </button>
      </div>
    </form>
  );
};

export default ProjectGoalForm;
