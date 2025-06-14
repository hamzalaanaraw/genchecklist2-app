
import React from 'react';
import { AppProjectGoalChecklist, DisplayProjectGoalTask } from '../types';

interface ProjectGoalChecklistDisplayProps {
  checklist: AppProjectGoalChecklist;
  onToggleTaskCompleted: (phaseName: string, taskId: string) => void;
  onDownloadPdf: () => void;
}

const PriorityIndicator: React.FC<{ priority?: "High" | "Medium" | "Low" }> = ({ priority }) => {
  if (!priority) return null;
  let colorClass = '';
  switch (priority) {
    case 'High': colorClass = 'bg-red-500/30 text-red-300'; break;
    case 'Medium': colorClass = 'bg-yellow-500/30 text-yellow-300'; break;
    case 'Low': colorClass = 'bg-sky-500/30 text-sky-300'; break;
    default: return null;
  }
  return (
    <span className={`text-xs font-semibold ml-2 px-2 py-0.5 rounded-full ${colorClass}`}>
      {priority} Priority
    </span>
  );
};

const ProjectGoalChecklistDisplay: React.FC<ProjectGoalChecklistDisplayProps> = ({ checklist, onToggleTaskCompleted, onDownloadPdf }) => {
  return (
    <div className="space-y-8">
      {(!checklist || checklist.length === 0) ? (
        <p className="text-center text-slate-400 text-lg">No project/goal plan items to display. Define your goal and generate a plan!</p>
      ) : (
        checklist.map((phase) => (
          <div key={phase.phaseName} className="bg-slate-800 shadow-xl rounded-lg p-6" role="region" aria-labelledby={`phase-title-${phase.phaseName.replace(/\s+/g, '-').toLowerCase()}`}>
            <h3 
              id={`phase-title-${phase.phaseName.replace(/\s+/g, '-').toLowerCase()}`}
              className="text-2xl font-semibold text-fuchsia-500 mb-5 border-b-2 border-slate-700 pb-2"
            >
              {phase.phaseName}
            </h3>
            {phase.tasks.length > 0 ? (
              <ul className="space-y-4" role="list">
                {phase.tasks.map((task: DisplayProjectGoalTask) => (
                  <li
                    key={task.id}
                    className={`flex items-start p-4 rounded-md transition-all duration-200 ease-in-out shadow-md ${
                      task.completed ? 'bg-fuchsia-800/20 text-slate-500' : 'bg-slate-700/60 hover:bg-slate-600/60'
                    }`}
                    role="listitem"
                  >
                    <input
                      type="checkbox"
                      id={`pg-task-${task.id}`}
                      checked={task.completed}
                      onChange={() => onToggleTaskCompleted(phase.phaseName, task.id)}
                      className="h-5 w-5 rounded border-slate-500 text-fuchsia-500 focus:ring-fuchsia-400 focus:ring-offset-slate-800 mr-4 mt-1 flex-shrink-0 accent-fuchsia-500 cursor-pointer"
                      aria-labelledby={`pg-task-label-${task.id}`}
                    />
                    <label htmlFor={`pg-task-${task.id}`} className="flex-grow cursor-pointer">
                      <div className="flex flex-wrap items-center justify-between">
                        <span 
                          id={`pg-task-label-${task.id}`}
                          className={`font-medium text-lg ${task.completed ? 'line-through' : 'text-slate-100'}`}
                        >
                          {task.taskName}
                        </span>
                        <PriorityIndicator priority={task.priority} />
                      </div>
                      {task.suggestedTimelineOrEffort && (
                        <p className={`text-sm mt-1 font-semibold ${task.completed ? 'text-slate-600' : 'text-purple-400'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {task.suggestedTimelineOrEffort}
                        </p>
                      )}
                      {task.details && (
                        <p className={`text-sm mt-2 ${task.completed ? 'text-slate-600' : 'text-slate-300'}`}>
                          {task.details}
                        </p>
                      )}
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 italic">No tasks currently in this phase/milestone.</p>
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

export default ProjectGoalChecklistDisplay;
