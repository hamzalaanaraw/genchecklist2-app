
// The new, complete App.tsx file

import React, { useState, useCallback } from 'react';
import { 
  TripDetails, AppTripChecklist, ChecklistType, MovingDetails, AppMovingChecklist,
  PetDetails, AppPetChecklist, EventDetails, AppEventChecklist,
  NewBeginningsDetails, AppNewBeginningsChecklist, ProjectGoalDetails, AppProjectGoalChecklist,
  StaticPageType
} from './types';
import TripForm from './components/TripForm';
import ChecklistDisplay from './components/ChecklistDisplay';
import MovingForm from './components/MovingForm';
import MovingChecklistDisplay from './components/MovingChecklistDisplay';
import PetForm from './components/PetForm';
import PetChecklistDisplay from './components/PetChecklistDisplay';
import EventForm from './components/EventForm';
import EventChecklistDisplay from './components/EventChecklistDisplay';
import NewBeginningsForm from './components/NewBeginningsForm';
import NewBeginningsChecklistDisplay from './components/NewBeginningsChecklistDisplay';
import ProjectGoalForm from './components/ProjectGoalForm';
import ProjectGoalChecklistDisplay from './components/ProjectGoalChecklistDisplay';
import AboutUsPage from './components/AboutUsPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import ContactUsPage from './components/ContactUsPage';
import { downloadChecklistPdf } from './services/pdfService'; // Import PDF Service
import { Analytics } from '@vercel/analytics/react';

// Helper function to call our new secure API endpoint.
async function generateChecklistFromApi(prompt: string) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to generate checklist.');
  }
  return response.json();
}

// New Service Functions that create prompts
const generatePackingList = (details: TripDetails) => {
  const prompt = `Create a packing list. Details: Destination Type is ${details.destinationType}, duration is ${details.durationInDays} days, activities are "${details.activities}". Respond in JSON with a "categories" array. Each category must have a "name" and an "items" array. Each item must have an "itemName".`;
  return generateChecklistFromApi(prompt);
};
const generateMovingChecklist = (details: MovingDetails) => {
  const prompt = `Create a moving checklist for a ${details.moveType} move. The user ${details.hasPets ? 'has pets' : 'does not have pets'} and ${details.hasKids ? 'has kids' : 'does not have kids'}. Additional info: "${details.additionalInfo}". Respond in JSON with a "timeline" array. Each object must have a "week" (e.g., "8 Weeks Before Move") and a "tasks" array. Each task must have a "taskName".`;
  return generateChecklistFromApi(prompt);
};
const generatePetStarterKit = (details: PetDetails) => {
  const prompt = `Create a new pet starter kit for a ${details.petType} named ${details.petName || 'unnamed'}. The pet is ${details.isRescue ? 'a rescue' : 'not a rescue'}. Needs: "${details.additionalNeeds}". Respond in JSON with a "sections" array. Each section must have a "sectionName" and an "items" array. Each item must have an "itemName".`;
  return generateChecklistFromApi(prompt);
};
const generateEventChecklist = (details: EventDetails) => {
  const prompt = `Create an event plan for an ${details.eventType} with ${details.guestCount} guests. Budget is ${details.budgetDescription}, venue is ${details.venueType}, audience is ${details.audience}. Info: "${details.additionalInfo}". Respond in JSON with an "eventPlanSections" array. Each section must have a "sectionName" and a "tasks" array. Each task must have a "taskName".`;
  return generateChecklistFromApi(prompt);
};
const generateNewBeginningsChecklist = (details: NewBeginningsDetails) => {
  const prompt = `Create a 'New Beginnings' plan for someone who is ${details.eventType}. Context: "${details.additionalContext}". Respond in JSON with an "actionPlanSections" array. Each section must have a "sectionName" and a "tasks" array. Each task must have a "taskName".`;
  return generateChecklistFromApi(prompt);
};
const generateProjectGoalChecklist = (details: ProjectGoalDetails) => {
  const prompt = `Create a project plan for the goal: "${details.goalStatement}". Type is ${details.goalType}, timeline is ${details.targetTimeline || 'not specified'}. Considerations: "${details.keyConsiderations}". Respond in JSON with a "projectPhases" array. Each phase must have a "phaseName" and a "tasks" array. Each task must have a "taskName".`;
  return generateChecklistFromApi(prompt);
};

const checklistTitles: Record<ChecklistType, string> = {
  [ChecklistType.TRIP]: "Craft Your Perfect Trip Packing List",
  [ChecklistType.MOVING]: "Plan Your Smoothest Move Yet",
  [ChecklistType.PET]: "Assemble Your New Pet's Welcome Kit",
  [ChecklistType.EVENT]: "Design Your Unforgettable Event",
  [ChecklistType.NEW_BEGINNINGS]: "Navigate Your New Beginning with Confidence",
  [ChecklistType.PROJECT_GOAL]: "Chart Your Path to Project Success",
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ChecklistType | StaticPageType | null>(ChecklistType.TRIP);
  
  const [tripChecklist, setTripChecklist] = useState<AppTripChecklist | null>(null);
  const [movingChecklist, setMovingChecklist] = useState<AppMovingChecklist | null>(null);
  const [petChecklist, setPetChecklist] = useState<AppPetChecklist | null>(null);
  const [eventChecklist, setEventChecklist] = useState<AppEventChecklist | null>(null);
  const [newBeginningsChecklist, setNewBeginningsChecklist] = useState<AppNewBeginningsChecklist | null>(null);
  const [projectGoalChecklist, setProjectGoalChecklist] = useState<AppProjectGoalChecklist | null>(null);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const clearAllChecklistData = () => {
    setTripChecklist(null);
    setMovingChecklist(null);
    setPetChecklist(null);
    setEventChecklist(null);
    setNewBeginningsChecklist(null);
    setProjectGoalChecklist(null);
  };

  const handleGenerateTripChecklist = useCallback(async (details: TripDetails) => {
    setIsLoading(true); setError(null); setTripChecklist(null);
    try {
      // For App.tsx, we expect the backend to return the final transformed structure.
      // The generatePackingList function in geminiService.ts calls the backend and then transforms.
      // So, the data received here should already be AppTripChecklist.
      const transformedList = await generatePackingList(details);
      setTripChecklist(transformedList);
    } catch (err) { setError(err instanceof Error ? err.message : 'An error occurred.'); } finally { setIsLoading(false); }
  }, []);
  const handleGenerateMovingChecklist = useCallback(async (details: MovingDetails) => {
    setIsLoading(true); setError(null); setMovingChecklist(null);
    try {
      const transformedList = await generateMovingChecklist(details);
      setMovingChecklist(transformedList);
    } catch (err) { setError(err instanceof Error ? err.message : 'An error occurred.'); } finally { setIsLoading(false); }
  }, []);
  const handleGeneratePetChecklist = useCallback(async (details: PetDetails) => {
    setIsLoading(true); setError(null); setPetChecklist(null);
    try {
      const transformedList = await generatePetStarterKit(details);
      setPetChecklist(transformedList);
    } catch (err) { setError(err instanceof Error ? err.message : 'An error occurred.'); } finally { setIsLoading(false); }
  }, []);
  const handleGenerateEventChecklist = useCallback(async (details: EventDetails) => {
    setIsLoading(true); setError(null); setEventChecklist(null);
    try {
      const transformedList = await generateEventChecklist(details);
      setEventChecklist(transformedList);
    } catch (err) { setError(err instanceof Error ? err.message : 'An error occurred.'); } finally { setIsLoading(false); }
  }, []);
  const handleGenerateNewBeginningsChecklist = useCallback(async (details: NewBeginningsDetails) => {
    setIsLoading(true); setError(null); setNewBeginningsChecklist(null);
    try {
      const transformedList = await generateNewBeginningsChecklist(details);
      setNewBeginningsChecklist(transformedList);
    } catch (err) { setError(err instanceof Error ? err.message : 'An error occurred.'); } finally { setIsLoading(false); }
  }, []);
  const handleGenerateProjectGoalChecklist = useCallback(async (details: ProjectGoalDetails) => {
    setIsLoading(true); setError(null); setProjectGoalChecklist(null);
    try {
      const transformedList = await generateProjectGoalChecklist(details);
      setProjectGoalChecklist(transformedList);
    } catch (err) { setError(err instanceof Error ? err.message : 'An error occurred.'); } finally { setIsLoading(false); }
  }, []);
  
  const handleTogglePacked = useCallback((categoryId: string, itemId: string) => { setTripChecklist(prev => prev?.map(c => c.name === categoryId ? {...c, items: c.items.map(i => i.id === itemId ? {...i, packed: !i.packed} : i)} : c)); }, []);
  const handleToggleTaskCompleted = useCallback((weekId: string, taskId: string) => { setMovingChecklist(prev => prev?.map(w => w.week === weekId ? {...w, tasks: w.tasks.map(t => t.id === taskId ? {...t, completed: !t.completed} : t)} : w)); }, []);
  const handleTogglePetItemAcquired = useCallback((sectionName: string, itemId: string) => { setPetChecklist(prev => prev?.map(s => s.sectionName === sectionName ? {...s, items: s.items.map(i => i.id === itemId ? {...i, acquired: !i.acquired} : i)} : s)); }, []);
  const handleToggleEventTaskCompleted = useCallback((sectionName: string, taskId: string) => { setEventChecklist(prev => prev?.map(s => s.sectionName === sectionName ? {...s, tasks: s.tasks.map(t => t.id === taskId ? {...t, completed: !t.completed} : t)} : s)); }, []);
  const handleToggleNewBeginningsTaskCompleted = useCallback((sectionName: string, taskId: string) => { setNewBeginningsChecklist(prev => prev?.map(s => s.sectionName === sectionName ? {...s, tasks: s.tasks.map(t => t.id === taskId ? {...t, completed: !t.completed} : t)} : s)); }, []);
  const handleToggleProjectGoalTaskCompleted = useCallback((phaseName: string, taskId:string) => { setProjectGoalChecklist(prev => prev?.map(p => p.phaseName === phaseName ? {...p, tasks: p.tasks.map(t => t.id === taskId ? {...t, completed: !t.completed} : t)} : p)); }, []);
  
  const switchView = (type: ChecklistType | StaticPageType) => { 
    setActiveView(type); 
    setError(null); 
    clearAllChecklistData();
  };
  
  const getButtonClass = (type: ChecklistType) => `px-3 py-2 sm:px-4 sm:py-3 rounded-lg font-semibold transition-all duration-200 ease-in-out text-xs sm:text-sm ${activeView === type ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg scale-105' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`;

  const isChecklistTypeActive = (view: ChecklistType | StaticPageType | null): view is ChecklistType => {
    return Object.values(ChecklistType).includes(view as ChecklistType);
  }

  const isStaticPageTypeActive = (view: ChecklistType | StaticPageType | null): view is StaticPageType => {
    return Object.values(StaticPageType).includes(view as StaticPageType);
  }

  const currentActiveChecklistData = useCallback(() => {
    if (!isChecklistTypeActive(activeView)) return null;
    switch (activeView) {
      case ChecklistType.TRIP: return tripChecklist;
      case ChecklistType.MOVING: return movingChecklist;
      case ChecklistType.PET: return petChecklist;
      case ChecklistType.EVENT: return eventChecklist;
      case ChecklistType.NEW_BEGINNINGS: return newBeginningsChecklist;
      case ChecklistType.PROJECT_GOAL: return projectGoalChecklist;
      default: return null;
    }
  }, [activeView, tripChecklist, movingChecklist, petChecklist, eventChecklist, newBeginningsChecklist, projectGoalChecklist]);

  const handleDownloadPdf = useCallback(() => {
    const data = currentActiveChecklistData();
    if (data && activeView && isChecklistTypeActive(activeView)) {
      const title = checklistTitles[activeView as ChecklistType];
      downloadChecklistPdf(data, activeView as ChecklistType, title);
    } else {
      console.warn("No active checklist data to download or view is not a checklist type.");
      alert("No checklist available to download.");
    }
  }, [activeView, currentActiveChecklistData]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 py-8 px-2 sm:px-4 lg:px-8 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-grow">
        <header className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-500 mb-3">GenChecklist</h1>
            <p className="text-lg sm:text-xl text-slate-400">Your Personal Checklist Generator</p>
        </header>
        <nav className="mb-10 flex flex-wrap justify-center gap-1 sm:gap-2">
            <button onClick={() => switchView(ChecklistType.TRIP)} className={getButtonClass(ChecklistType.TRIP)} aria-pressed={activeView === ChecklistType.TRIP}>Trip Packer</button>
            <button onClick={() => switchView(ChecklistType.MOVING)} className={getButtonClass(ChecklistType.MOVING)} aria-pressed={activeView === ChecklistType.MOVING}>Moving Plan</button>
            <button onClick={() => switchView(ChecklistType.PET)} className={getButtonClass(ChecklistType.PET)} aria-pressed={activeView === ChecklistType.PET}>New Pet Kit</button>
            <button onClick={() => switchView(ChecklistType.EVENT)} className={getButtonClass(ChecklistType.EVENT)} aria-pressed={activeView === ChecklistType.EVENT}>Event Planner</button>
            <button onClick={() => switchView(ChecklistType.NEW_BEGINNINGS)} className={getButtonClass(ChecklistType.NEW_BEGINNINGS)} aria-pressed={activeView === ChecklistType.NEW_BEGINNINGS}>New Beginnings</button>
            <button onClick={() => switchView(ChecklistType.PROJECT_GOAL)} className={getButtonClass(ChecklistType.PROJECT_GOAL)} aria-pressed={activeView === ChecklistType.PROJECT_GOAL}>Project/Goal Plan</button>
        </nav>
        
        {isChecklistTypeActive(activeView) && (
          <h2 className="text-2xl sm:text-3xl font-bold text-fuchsia-500 mb-6 text-center">
            {checklistTitles[activeView as ChecklistType]}
          </h2>
        )}
        
        {isChecklistTypeActive(activeView) && (
          <section className="bg-slate-800 shadow-2xl rounded-xl p-6 sm:p-8 mb-10">
              {activeView === ChecklistType.TRIP && <TripForm onSubmit={handleGenerateTripChecklist} isLoading={isLoading} />}
              {activeView === ChecklistType.MOVING && <MovingForm onSubmit={handleGenerateMovingChecklist} isLoading={isLoading} />}
              {activeView === ChecklistType.PET && <PetForm onSubmit={handleGeneratePetChecklist} isLoading={isLoading} />}
              {activeView === ChecklistType.EVENT && <EventForm onSubmit={handleGenerateEventChecklist} isLoading={isLoading} />}
              {activeView === ChecklistType.NEW_BEGINNINGS && <NewBeginningsForm onSubmit={handleGenerateNewBeginningsChecklist} isLoading={isLoading} />}
              {activeView === ChecklistType.PROJECT_GOAL && <ProjectGoalForm onSubmit={handleGenerateProjectGoalChecklist} isLoading={isLoading} />}
          </section>
        )}

        {isLoading && <div className="flex justify-center items-center my-10" aria-live="polite"><div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-fuchsia-500"></div><p className="ml-4 text-lg text-slate-300">Generating...</p></div>}
        {error && <div className="bg-red-700/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg my-10 shadow-lg" role="alert"><strong className="font-bold text-red-100">Oops! </strong><span className="block sm:inline ml-2">{error}</span></div>}
        
        {/* Render Checklist Displays */}
        {activeView === ChecklistType.TRIP && tripChecklist && !isLoading && !error && <ChecklistDisplay checklist={tripChecklist} onTogglePacked={handleTogglePacked} onDownloadPdf={handleDownloadPdf} />}
        {activeView === ChecklistType.MOVING && movingChecklist && !isLoading && !error && <MovingChecklistDisplay checklist={movingChecklist} onToggleTaskCompleted={handleToggleTaskCompleted} onDownloadPdf={handleDownloadPdf} />}
        {activeView === ChecklistType.PET && petChecklist && !isLoading && !error && <PetChecklistDisplay checklist={petChecklist} onToggleAcquired={handleTogglePetItemAcquired} onDownloadPdf={handleDownloadPdf} />}
        {activeView === ChecklistType.EVENT && eventChecklist && !isLoading && !error && <EventChecklistDisplay checklist={eventChecklist} onToggleTaskCompleted={handleToggleEventTaskCompleted} onDownloadPdf={handleDownloadPdf} />}
        {activeView === ChecklistType.NEW_BEGINNINGS && newBeginningsChecklist && !isLoading && !error && <NewBeginningsChecklistDisplay checklist={newBeginningsChecklist} onToggleTaskCompleted={handleToggleNewBeginningsTaskCompleted} onDownloadPdf={handleDownloadPdf} />}
        {activeView === ChecklistType.PROJECT_GOAL && projectGoalChecklist && !isLoading && !error && <ProjectGoalChecklistDisplay checklist={projectGoalChecklist} onToggleTaskCompleted={handleToggleProjectGoalTaskCompleted} onDownloadPdf={handleDownloadPdf} />}
      
        {/* Render Static Pages */}
        {activeView === StaticPageType.ABOUT && <AboutUsPage />}
        {activeView === StaticPageType.TERMS && <TermsOfServicePage />}
        {activeView === StaticPageType.PRIVACY && <PrivacyPolicyPage />}
        {activeView === StaticPageType.CONTACT && <ContactUsPage />}

        {!isLoading && !error && !currentActiveChecklistData() && !isStaticPageTypeActive(activeView) && (
          <div className="text-center text-slate-500 py-10">
            <p className="text-lg">
              Welcome to GenChecklist! Select a checklist type above to get started or choose an option from the footer.
            </p>
          </div>
        )}
      </div>
      <footer className="text-center mt-auto pt-12 pb-6 text-slate-500 text-sm">
        <div className="flex justify-center flex-wrap space-x-4 sm:space-x-6">
            <button onClick={() => switchView(StaticPageType.PRIVACY)} className="hover:text-fuchsia-500 transition-colors">Privacy Policy</button>
            <button onClick={() => switchView(StaticPageType.TERMS)} className="hover:text-fuchsia-500 transition-colors">Terms of Service</button>
            <button onClick={() => switchView(StaticPageType.CONTACT)} className="hover:text-fuchsia-500 transition-colors">Contact Us</button>
            <button onClick={() => switchView(StaticPageType.ABOUT)} className="hover:text-fuchsia-500 transition-colors">About Us</button>
        </div>
        <p className="mt-4">GenChecklist &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default App;
