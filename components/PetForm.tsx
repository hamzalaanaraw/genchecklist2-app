
import React, { useState } from 'react';
import { PetDetails, PetType } from '../types';

interface PetFormProps {
  onSubmit: (details: PetDetails) => void;
  isLoading: boolean;
}

const PetForm: React.FC<PetFormProps> = ({ onSubmit, isLoading }) => {
  const [petType, setPetType] = useState<PetType>(PetType.DOG);
  const [petName, setPetName] = useState<string>('');
  const [isRescue, setIsRescue] = useState<boolean>(false);
  const [additionalNeeds, setAdditionalNeeds] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ petType, petName, isRescue, additionalNeeds });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="petType" className="block text-sm font-medium text-slate-300 mb-1">
          Type of Pet
        </label>
        <select
          id="petType"
          name="petType"
          value={petType}
          onChange={(e) => setPetType(e.target.value as PetType)}
          className="w-full bg-slate-700 border-slate-600 text-slate-100 rounded-lg shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 p-3"
          disabled={isLoading}
          required
        >
          {Object.values(PetType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="petName" className="block text-sm font-medium text-slate-300 mb-1">
          Pet's Name (Optional)
        </label>
        <input
          type="text"
          id="petName"
          name="petName"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          className="w-full bg-slate-700 border-slate-600 text-slate-100 rounded-lg shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 p-3"
          placeholder="E.g., Buddy, Luna, Whiskers"
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <span className="block text-sm font-medium text-slate-300">Is this pet a rescue?</span>
        <div className="flex items-center space-x-4">
          <label htmlFor="isRescueYes" className="flex items-center text-slate-300 cursor-pointer">
            <input
              type="radio"
              id="isRescueYes"
              name="isRescue"
              checked={isRescue === true}
              onChange={() => setIsRescue(true)}
              disabled={isLoading}
              className="h-4 w-4 text-fuchsia-500 border-slate-500 focus:ring-fuchsia-400 accent-fuchsia-500"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label htmlFor="isRescueNo" className="flex items-center text-slate-300 cursor-pointer">
            <input
              type="radio"
              id="isRescueNo"
              name="isRescue"
              checked={isRescue === false}
              onChange={() => setIsRescue(false)}
              disabled={isLoading}
              className="h-4 w-4 text-fuchsia-500 border-slate-500 focus:ring-fuchsia-400 accent-fuchsia-500"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="additionalNeeds" className="block text-sm font-medium text-slate-300 mb-1">
          Additional Needs or Information (Optional)
        </label>
        <textarea
          id="additionalNeeds"
          name="additionalNeeds"
          value={additionalNeeds}
          onChange={(e) => setAdditionalNeeds(e.target.value)}
          rows={3}
          className="w-full bg-slate-700 border-slate-600 text-slate-100 rounded-lg shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 p-3"
          placeholder="E.g., Known allergies, young animal, senior pet, specific behavioral traits..."
          disabled={isLoading}
        />
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
              Generating Kit...
            </>
          ) : (
            'Generate Pet Starter Kit'
          )}
        </button>
      </div>
    </form>
  );
};

export default PetForm;
