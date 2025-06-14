
import React, { useState } from 'react';
import { TripDetails, DestinationType } from '../types';

interface TripFormProps {
  onSubmit: (details: TripDetails) => void;
  isLoading: boolean;
}

const TripForm: React.FC<TripFormProps> = ({ onSubmit, isLoading }) => {
  const [destinationType, setDestinationType] = useState<DestinationType>(DestinationType.CITY);
  const [durationInDays, setDurationInDays] = useState<number>(7);
  const [activities, setActivities] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (durationInDays <= 0) {
        alert("Duration must be greater than 0 days.");
        return;
    }
    onSubmit({ destinationType, durationInDays, activities });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="destinationType" className="block text-sm font-medium text-slate-300 mb-1">
          Destination Type
        </label>
        <select
          id="destinationType"
          value={destinationType}
          onChange={(e) => setDestinationType(e.target.value as DestinationType)}
          className="w-full bg-slate-700 border-slate-600 text-slate-100 rounded-lg shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 p-3"
          disabled={isLoading}
        >
          {Object.values(DestinationType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="durationInDays" className="block text-sm font-medium text-slate-300 mb-1">
          Trip Duration (days)
        </label>
        <input
          type="number"
          id="durationInDays"
          value={durationInDays}
          onChange={(e) => setDurationInDays(parseInt(e.target.value, 10))}
          min="1"
          className="w-full bg-slate-700 border-slate-600 text-slate-100 rounded-lg shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 p-3"
          disabled={isLoading}
          required
        />
      </div>

      <div>
        <label htmlFor="activities" className="block text-sm font-medium text-slate-300 mb-1">
          Planned Activities (e.g., swimming, sightseeing, business meetings)
        </label>
        <textarea
          id="activities"
          value={activities}
          onChange={(e) => setActivities(e.target.value)}
          rows={3}
          className="w-full bg-slate-700 border-slate-600 text-slate-100 rounded-lg shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 p-3"
          placeholder="Describe your main activities..."
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
            'Generate Packing List'
          )}
        </button>
      </div>
    </form>
  );
};

export default TripForm;
