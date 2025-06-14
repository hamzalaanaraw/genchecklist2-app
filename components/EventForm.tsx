
import React, { useState } from 'react';
import { EventDetails, EventType, EventVenueType, EventAudience } from '../types';

interface EventFormProps {
  onSubmit: (details: EventDetails) => void;
  isLoading: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit, isLoading }) => {
  const [eventType, setEventType] = useState<EventType>(EventType.BIRTHDAY_PARTY);
  const [guestCount, setGuestCount] = useState<number>(20);
  const [budgetDescription, setBudgetDescription] = useState<string>('Moderate');
  const [venueType, setVenueType] = useState<EventVenueType>(EventVenueType.INDOOR);
  const [audience, setAudience] = useState<EventAudience>(EventAudience.MIXED_AGES);
  const [eventDateOrTimeline, setEventDateOrTimeline] = useState<string>('');
  const [additionalInfo, setAdditionalInfo] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestCount <= 0) {
        alert("Guest count must be greater than 0.");
        return;
    }
    onSubmit({ 
      eventType, 
      guestCount, 
      budgetDescription, 
      venueType, 
      audience, 
      eventDateOrTimeline, 
      additionalInfo 
    });
  };

  const commonInputClass = "w-full bg-slate-700 border-slate-600 text-slate-100 rounded-lg shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 p-3";
  const commonLabelClass = "block text-sm font-medium text-slate-300 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="eventType" className={commonLabelClass}>Event Type</label>
        <select id="eventType" name="eventType" value={eventType} onChange={(e) => setEventType(e.target.value as EventType)} className={commonInputClass} disabled={isLoading} required>
          {Object.values(EventType).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="guestCount" className={commonLabelClass}>Estimated Guest Count</label>
        <input type="number" id="guestCount" name="guestCount" value={guestCount} onChange={(e) => setGuestCount(parseInt(e.target.value, 10))} min="1" className={commonInputClass} disabled={isLoading} required />
      </div>

      <div>
        <label htmlFor="budgetDescription" className={commonLabelClass}>Budget Description</label>
        <input type="text" id="budgetDescription" name="budgetDescription" value={budgetDescription} onChange={(e) => setBudgetDescription(e.target.value)} className={commonInputClass} placeholder="E.g., Shoestring, Moderate, Approx. $1000, Generous" disabled={isLoading} required />
      </div>

      <div>
        <label htmlFor="venueType" className={commonLabelClass}>Venue Type</label>
        <select id="venueType" name="venueType" value={venueType} onChange={(e) => setVenueType(e.target.value as EventVenueType)} className={commonInputClass} disabled={isLoading} required>
          {Object.values(EventVenueType).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="audience" className={commonLabelClass}>Primary Audience</label>
        <select id="audience" name="audience" value={audience} onChange={(e) => setAudience(e.target.value as EventAudience)} className={commonInputClass} disabled={isLoading} required>
          {Object.values(EventAudience).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="eventDateOrTimeline" className={commonLabelClass}>Event Date or Timeline (Optional)</label>
        <input type="text" id="eventDateOrTimeline" name="eventDateOrTimeline" value={eventDateOrTimeline} onChange={(e) => setEventDateOrTimeline(e.target.value)} className={commonInputClass} placeholder="E.g., Next Saturday, 2024-12-31, Within 2 months" disabled={isLoading} />
      </div>

      <div>
        <label htmlFor="additionalInfo" className={commonLabelClass}>Additional Information / Specific Requests (Optional)</label>
        <textarea id="additionalInfo" name="additionalInfo" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} rows={3} className={commonInputClass} placeholder="E.g., Specific theme, dietary restrictions, must-have activities..." disabled={isLoading} />
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
              Generating Plan...
            </>
          ) : (
            'Generate Event Plan'
          )}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
