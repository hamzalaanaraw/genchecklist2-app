
import React from 'react';
import { AppNewBeginningsChecklist, DisplayNewBeginningsTask } from '../types';

interface NewBeginningsChecklistDisplayProps {
  checklist: AppNewBeginningsChecklist;
  onToggleTaskCompleted: (sectionName: string, taskId: string) => void;
  onDownloadPdf: () => void;
}

const ImportanceIndicator: React.FC<{ importance?: "High" | "Medium" | "Low" }> = ({ importance }) => {
  if (!importance) return null;
  return (
    <span className={`text-xs font-semibold ml-2 px-2 py-0.5 rounded-full ${
        importance === "High" ? "bg-red-500/30 text-red-300" 
      : importance === "Medium" ? "bg-yellow-500/30 text-yellow-300" 
      : "bg-sky-500/30 text-sky-300"
    }`}>
      {importance}
    </span>
  );
};

const NewBeginningsChecklistDisplay: React.FC<NewBeginningsChecklistDisplayProps> = ({ checklist, onToggleTaskCompleted, onDownloadPdf }) => {
  return (
    <div className="space-y-8">
      {(!checklist || checklist.length === 0) ? (
         <p className="text-center text-slate-400 text-lg">No action plan items to display. Try generating a new plan!</p>
      ) : (
        checklist.map((section) => (
          <div key={section.sectionName} className="bg-slate-800 shadow-xl rounded-lg p-6" role="region" aria-labelledby={`section-title-${section.sectionName.replace(/\s+/g, '-').toLowerCase()}`}>
            <h3 
              id={`section-title-${section.sectionName.replace(/\s+/g, '-').toLowerCase()}`}
              className="text-2xl font-semibold text-fuchsia-500 mb-5 border-b-2 border-slate-700 pb-2"
            >
              {section.sectionName}
            </h3>
            {section.tasks.length > 0 ? (
              <ul className="space-y-3" role="list">
                {section.tasks.map((task: DisplayNewBeginningsTask) => (
                  <li
                    key={task.id}
                    className={`flex items-start p-3 rounded-md transition-all duration-200 ease-in-out ${
                      task.completed ? 'bg-fuchsia-800/30 text-slate-500' : 'bg-slate-700/70 hover:bg-slate-600/70'
                    }`}
                    role="listitem"
                  >
                    <input
                      type="checkbox"
                      id={`nb-task-${task.id}`}
                      checked={task.completed}
                      onChange={() => onToggleTaskCompleted(section.sectionName, task.id)}
                      className="h-5 w-5 rounded border-slate-500 text-fuchsia-500 focus:ring-fuchsia-400 focus:ring-offset-slate-800 mr-4 mt-1 flex-shrink-0 accent-fuchsia-500 cursor-pointer"
                      aria-labelledby={`nb-task-label-${task.id}`}
                    />
                    <label htmlFor={`nb-task-${task.id}`} className="flex-grow cursor-pointer">
                      <div className="flex items-center">
                        <span 
                          id={`nb-task-label-${task.id}`}
                          className={`font-medium ${task.completed ? 'line-through' : 'text-slate-100'}`}
                        >
                          {task.taskName}
                        </span>
                        <ImportanceIndicator importance={task.importance} />
                      </div>
                      {task.suggestedTimeline && (
                        <p className={`text-xs mt-1 font-semibold ${task.completed ? 'text-slate-600' : 'text-purple-400'}`}>
                          Timeline: {task.suggestedTimeline}
                        </p>
                      )}
                      {task.notes && (
                        <p className={`text-xs mt-1 ${task.completed ? 'text-slate-600' : 'text-slate-400'}`}>
                          <strong>Notes:</strong> {task.notes}
                        </p>
                      )}
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 italic">No tasks currently in this section for your specified life event.</p>
            )}
          </div>
        ))
      )}
      <div className="mt-10 text-center">
        <button
          onClick={onDownloadPdf}
          aria-label="Download checklist as PDF"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2 -ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default NewBeginningsChecklistDisplay;
