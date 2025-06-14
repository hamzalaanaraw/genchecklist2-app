
import React from 'react';
import { AppPetChecklist } from '../types';

interface PetChecklistDisplayProps {
  checklist: AppPetChecklist;
  onToggleAcquired: (sectionName: string, itemId: string) => void;
  onDownloadPdf: () => void;
}

const PetChecklistDisplay: React.FC<PetChecklistDisplayProps> = ({ checklist, onToggleAcquired, onDownloadPdf }) => {
  return (
    <div className="space-y-8">
      {(!checklist || checklist.length === 0) ? (
        <p className="text-center text-slate-400 text-lg">No pet starter kit items to display.</p>
      ) : (
        checklist.map((section) => (
          <div key={section.sectionName} className="bg-slate-800 shadow-xl rounded-lg p-6" role="region" aria-labelledby={`section-title-${section.sectionName.replace(/\s+/g, '-')}`}>
            <h3 
              id={`section-title-${section.sectionName.replace(/\s+/g, '-')}`}
              className="text-2xl font-semibold text-fuchsia-500 mb-5 border-b-2 border-slate-700 pb-2"
            >
              {section.sectionName}
            </h3>
            {section.items.length > 0 ? (
              <ul className="space-y-3" role="list">
                {section.items.map((item) => (
                  <li
                    key={item.id}
                    className={`flex items-start p-3 rounded-md transition-all duration-200 ease-in-out ${
                      item.acquired ? 'bg-fuchsia-800/30 text-slate-500' : 'bg-slate-700/70 hover:bg-slate-600/70'
                    }`}
                    role="listitem"
                  >
                    <input
                      type="checkbox"
                      id={`pet-item-${item.id}`}
                      checked={item.acquired}
                      onChange={() => onToggleAcquired(section.sectionName, item.id)}
                      className="h-5 w-5 rounded border-slate-500 text-fuchsia-500 focus:ring-fuchsia-400 focus:ring-offset-slate-800 mr-4 mt-1 flex-shrink-0 accent-fuchsia-500 cursor-pointer"
                      aria-labelledby={`pet-item-label-${item.id}`}
                    />
                    <label htmlFor={`pet-item-${item.id}`} className="flex-grow cursor-pointer">
                      <span 
                        id={`pet-item-label-${item.id}`}
                        className={`font-medium ${item.acquired ? 'line-through' : 'text-slate-100'}`}
                      >
                        {item.itemName}
                      </span>
                      {item.quantitySuggestion && (
                        <p className={`text-xs mt-1 ${item.acquired ? 'text-slate-600' : 'text-slate-400'}`}>
                          <strong>Suggested Quantity:</strong> {item.quantitySuggestion}
                        </p>
                      )}
                      {item.notes && (
                        <p className={`text-xs mt-1 ${item.acquired ? 'text-slate-600' : 'text-slate-400'}`}>
                          <strong>Notes:</strong> {item.notes}
                        </p>
                      )}
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 italic">No items recommended for this section based on your input.</p>
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

export default PetChecklistDisplay;
