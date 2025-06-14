
import React, { useState } from 'react';
import { MovingDetails, MoveType } from '../types';

interface MovingFormProps {
  onSubmit: (details: MovingDetails) => void;
  isLoading: boolean;
}

const MovingForm: React.FC<MovingFormProps> = ({ onSubmit, isLoading }) => {
  const [moveType, setMoveType] = useState<MoveType>(MoveType.LOCAL);
  const [hasPets, setHasPets] = useState<boolean>(false);
  const [hasKids, setHasKids] = useState<boolean>(false);
  const [additionalInfo, setAdditionalInfo] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ moveType, hasPets, hasKids, additionalInfo });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="moveType" className="block text-sm font-medium text-slate-300 mb-1">
          Type of Move
        </label>
        <select
          id="moveType"
          value={moveType}
          onChange={(e) => setMoveType(e.target.value as MoveType)}
          className="w-full bg-slate-700 border-slate-600 text-slate-100 rounded-lg shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 p-3"
          disabled={isLoading}
        >
          {Object.values(MoveType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <span className="block text-sm font-medium text-slate-300">Are you moving with pets?</span>
        <div className="flex items-center space-x-4">
          <label htmlFor="petsYes" className="flex items-center text-slate-300 cursor-pointer">
            <input
              type="radio"
              id="petsYes"
              name="hasPets"
              checked={hasPets === true}
              onChange={() => setHasPets(true)}
              disabled={isLoading}
              className="h-4 w-4 text-fuchsia-500 border-slate-500 focus:ring-fuchsia-400 accent-fuchsia-500"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label htmlFor="petsNo" className="flex items-center text-slate-300 cursor-pointer">
            <input
              type="radio"
              id="petsNo"
              name="hasPets"
              checked={hasPets === false}
              onChange={() => setHasPets(false)}
              disabled={isLoading}
              className="h-4 w-4 text-fuchsia-500 border-slate-500 focus:ring-fuchsia-400 accent-fuchsia-500"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>
      
      <div className="space-y-2">
        <span className="block text-sm font-medium text-slate-300">Are you moving with kids?</span>
         <div className="flex items-center space-x-4">
          <label htmlFor="kidsYes" className="flex items-center text-slate-300 cursor-pointer">
            <input
              type="radio"
              id="kidsYes"
              name="hasKids"
              checked={hasKids === true}
              onChange={() => setHasKids(true)}
              disabled={isLoading}
              className="h-4 w-4 text-fuchsia-500 border-slate-500 focus:ring-fuchsia-400 accent-fuchsia-500"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label htmlFor="kidsNo" className="flex items-center text-slate-300 cursor-pointer">
            <input
              type="radio"
              id="kidsNo"
              name="hasKids"
              checked={hasKids === false}
              onChange={() => setHasKids(false)}
              disabled={isLoading}
              className="h-4 w-4 text-fuchsia-500 border-slate-500 focus:ring-fuchsia-400 accent-fuchsia-500"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="additionalInfo" className="block text-sm font-medium text-slate-300 mb-1">
          Additional Information / Specific Concerns (optional)
        </label>
        <textarea
          id="additionalInfo"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          rows={3}
          className="w-full bg-slate-700 border-slate-600 text-slate-100 rounded-lg shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 p-3"
          placeholder="E.g., moving a piano, specific packing needs, storage requirements..."
          disabled={isLoading}
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-md font-semibold text-white bg-gradient-to-r from-fuchsia-500 to-purple-500 hover:from-fuchsia-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-fuchsia-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate Moving Checklist'
          )}
        </button>
      </div>
    </form>
  );
};

export default MovingForm;
