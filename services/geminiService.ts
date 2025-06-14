
import { 
  TripDetails, 
  AppTripChecklist, 
  GeneratedTripChecklistAPIResponse, 
  RawCategoryFromAPI, 
  RawChecklistItemFromAPI,
  MovingDetails,
  AppMovingChecklist,
  GeneratedMovingChecklistAPIResponse,
  RawMovingWeekFromAPI,
  RawMovingTaskFromAPI,
  PetDetails,
  AppPetChecklist,
  GeneratedPetChecklistAPIResponse,
  RawPetChecklistSectionFromAPI,
  EventDetails,
  AppEventChecklist,
  GeneratedEventChecklistAPIResponse,
  RawEventSectionFromAPI,
  RawEventTaskFromAPI,
  NewBeginningsDetails,
  AppNewBeginningsChecklist,
  GeneratedNewBeginningsChecklistAPIResponse,
  RawNewBeginningsSectionFromAPI,
  RawNewBeginningsTaskFromAPI,
  ProjectGoalDetails,
  AppProjectGoalChecklist,
  GeneratedProjectGoalChecklistAPIResponse,
  RawProjectGoalPhaseFromAPI,
  RawProjectGoalTaskFromAPI
} from '../types';

// Helper function to call the backend API
async function generateChecklistFromBackend<T>(prompt: string, modelName: string, temperature: number): Promise<T> {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        prompt,
        modelName,
        responseMimeType: "application/json", // Checklists always expect JSON
        temperature
    }),
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      const errorText = await response.text();
      throw new Error(errorData?.error || `API request failed with status ${response.status}: ${errorText || response.statusText}`);
    }
    // Prefer the error message from the backend if available
    const message = errorData?.error || errorData?.message || `API request failed: ${response.statusText}`;
    console.error("Error from backend:", message, "Status:", response.status, "Details:", errorData);
    throw new Error(message);
  }
  
  return response.json() as Promise<T>; // The backend now sends parsed JSON
}


const transformTripApiResponse = (apiResponse: GeneratedTripChecklistAPIResponse): AppTripChecklist => {
  if (!apiResponse || !Array.isArray(apiResponse.categories)) {
    console.warn("Unexpected Trip API response structure from backend:", apiResponse);
    return [];
  }
  return apiResponse.categories.map((category: RawCategoryFromAPI) => ({
    name: category.name || "Unnamed Category",
    items: Array.isArray(category.items) ? category.items.map((item: RawChecklistItemFromAPI) => ({
      id: crypto.randomUUID(),
      itemName: item.itemName || "Unnamed Item",
      quantitySuggestion: item.quantitySuggestion,
      packed: false,
    })) : [],
  })).filter(category => category.name && category.items.length > 0);
};

const transformMovingApiResponse = (apiResponse: GeneratedMovingChecklistAPIResponse): AppMovingChecklist => {
  if (!apiResponse || !Array.isArray(apiResponse.timeline)) {
    console.warn("Unexpected Moving API response structure from backend:", apiResponse);
    return [];
  }
  return apiResponse.timeline.map((week: RawMovingWeekFromAPI) => ({
    week: week.week || "Unnamed Week",
    tasks: Array.isArray(week.tasks) ? week.tasks.map((task: RawMovingTaskFromAPI) => ({
      id: crypto.randomUUID(),
      taskName: task.taskName || "Unnamed Task",
      notes: task.notes,
      deadline: task.deadline,
      completed: false,
    })) : [],
  })).filter(week => week.week && week.tasks.length > 0);
};

const transformPetApiResponse = (apiResponse: GeneratedPetChecklistAPIResponse): AppPetChecklist => {
  if (!apiResponse || !Array.isArray(apiResponse.sections)) {
    console.warn("Unexpected Pet API response structure from backend:", apiResponse);
    return [];
  }
  return apiResponse.sections.map((section: RawPetChecklistSectionFromAPI) => ({
    sectionName: section.sectionName || "Unnamed Section",
    items: Array.isArray(section.items) ? section.items.map((item: RawChecklistItemFromAPI) => ({ 
      id: crypto.randomUUID(),
      itemName: item.itemName || "Unnamed Item",
      notes: item.notes,
      quantitySuggestion: item.quantitySuggestion,
      acquired: false,
    })) : [],
  })).filter(section => section.sectionName && section.items.length > 0);
};

const transformEventApiResponse = (apiResponse: GeneratedEventChecklistAPIResponse): AppEventChecklist => {
  if (!apiResponse || !Array.isArray(apiResponse.eventPlanSections)) {
    console.warn("Unexpected Event API response structure from backend:", apiResponse);
    return [];
  }
  return apiResponse.eventPlanSections.map((section: RawEventSectionFromAPI) => ({
    sectionName: section.sectionName || "Unnamed Section",
    tasks: Array.isArray(section.tasks) ? section.tasks.map((task: RawEventTaskFromAPI) => ({
      id: crypto.randomUUID(),
      taskName: task.taskName || "Unnamed Task",
      notes: task.notes,
      suggestedTimeline: task.suggestedTimeline,
      completed: false,
    })) : [],
  })).filter(section => section.sectionName && section.tasks.length > 0);
};

const transformNewBeginningsApiResponse = (apiResponse: GeneratedNewBeginningsChecklistAPIResponse): AppNewBeginningsChecklist => {
  if (!apiResponse || !Array.isArray(apiResponse.actionPlanSections)) {
    console.warn("Unexpected New Beginnings API response structure from backend:", apiResponse);
    return [];
  }
  return apiResponse.actionPlanSections.map((section: RawNewBeginningsSectionFromAPI) => ({
    sectionName: section.sectionName || "Unnamed Section",
    tasks: Array.isArray(section.tasks) ? section.tasks.map((task: RawNewBeginningsTaskFromAPI) => ({
      id: crypto.randomUUID(),
      taskName: task.taskName || "Unnamed Task",
      notes: task.notes,
      suggestedTimeline: task.suggestedTimeline,
      importance: task.importance,
      completed: false,
    })) : [],
  })).filter(section => section.sectionName && section.tasks.length > 0);
};

const transformProjectGoalApiResponse = (apiResponse: GeneratedProjectGoalChecklistAPIResponse): AppProjectGoalChecklist => {
  if (!apiResponse || !Array.isArray(apiResponse.projectPhases)) {
    console.warn("Unexpected Project/Goal API response structure from backend:", apiResponse);
    return [];
  }
  return apiResponse.projectPhases.map((phase: RawProjectGoalPhaseFromAPI) => ({
    phaseName: phase.phaseName || "Unnamed Phase",
    tasks: Array.isArray(phase.tasks) ? phase.tasks.map((task: RawProjectGoalTaskFromAPI) => ({
      id: crypto.randomUUID(),
      taskName: task.taskName || "Unnamed Task",
      details: task.details,
      suggestedTimelineOrEffort: task.suggestedTimelineOrEffort,
      priority: task.priority,
      completed: false,
    })) : [],
  })).filter(phase => phase.phaseName && phase.tasks.length > 0);
};

// --- Service Functions calling the backend ---

export const generatePackingList = async (details: TripDetails): Promise<AppTripChecklist> => {
  const model = "gemini-2.5-flash-preview-04-17";
  const temperature = 0.5;
  const prompt = `
You are an expert trip packing assistant. Based on the following trip details, generate a comprehensive, categorized packing checklist.

Trip Details:
- Destination Type: ${details.destinationType}
- Trip Duration: ${details.durationInDays} days
- Planned Activities: ${details.activities || "General tourism and leisure"}

Provide the checklist in JSON format. The JSON must have a root key "categories", which is an array of objects. Each category object must have a "name" (string) and an "items" (array) property. Each item in the "items" array must be an object with an "itemName" (string) property, and an optional "quantitySuggestion" (string) property.
Ensure categories are distinct (e.g., "Clothing", "Toiletries", "Electronics", "Documents", "Health & Safety", "Miscellaneous").
Do not include empty categories or categories with no items.
The response MUST be EXCLUSIVELY a single, valid JSON object as described. 
ABSOLUTELY NO conversational text, summaries of the request, comments, explanations, or any other non-JSON content should be present in the output, neither before, after, nor embedded within the JSON structure.
The output must be parsable as JSON without any modification. Only include "categories" at the root.

Example of STRICTLY JSON output:
{
  "categories": [
    { "name": "Clothing", "items": [{ "itemName": "T-shirts", "quantitySuggestion": "${details.durationInDays}" }, { "itemName": "Pants" }] },
    { "name": "Toiletries", "items": [{ "itemName": "Toothbrush" }, { "itemName": "Toothpaste" }] }
  ]
}
Be practical and tailor the list to the details provided.
`;
  const rawApiResponse = await generateChecklistFromBackend<GeneratedTripChecklistAPIResponse>(prompt, model, temperature);
  return transformTripApiResponse(rawApiResponse);
};

export const generateMovingChecklist = async (details: MovingDetails): Promise<AppMovingChecklist> => {
  const model = "gemini-2.5-flash-preview-04-17";
  const temperature = 0.6;
  const prompt = `
You are an expert moving coordinator. Based on the following moving details, generate a comprehensive, week-by-week moving checklist/timeline.

Moving Details:
- Type of Move: ${details.moveType}
- Moving with Pets: ${details.hasPets ? "Yes" : "No"}
- Moving with Kids: ${details.hasKids ? "Yes" : "No"}
- Additional Information: ${details.additionalInfo || "None"}

Provide the checklist in JSON format. The JSON must have a root key "timeline", which is an array of objects. Each object in the "timeline" array represents a period and must have a "week" (string) property indicating the time frame (e.g., "8 Weeks Before Move", "4 Weeks Before Move", "1 Week Before Move", "Moving Day", "First Week After Move"), and a "tasks" (array) property. Each task in the "tasks" array must be an object with a "taskName" (string) property, an optional "notes" (string) property for extra details or tips, and an optional "deadline" (string) property.
Ensure the timeline is practical, detailed, and tailored. If pets or kids are involved, include specific tasks for them. Start from ~8 weeks before the move and continue through the moving day and the first week after the move.
The response MUST be EXCLUSIVELY a single, valid JSON object as described. 
ABSOLUTELY NO conversational text, summaries of the request, comments, explanations, or any other non-JSON content should be present in the output, neither before, after, nor embedded within the JSON structure.
The output must be parsable as JSON without any modification. Only include "timeline" at the root.

Example of STRICTLY JSON output:
{
  "timeline": [
    {
      "week": "8 Weeks Before Move",
      "tasks": [
        { "taskName": "Create detailed moving budget", "notes": "Factor in all potential costs like movers, supplies, insurance." },
        { "taskName": "Research and get quotes from moving companies", "deadline": "End of 7th week before move" }
      ]
    },
    { "week": "Moving Day", "tasks": [{ "taskName": "Final walkthrough of old home" }, {"taskName": "Supervise movers or loading"}] }
  ]
}
Be specific and actionable.
`;
  const rawApiResponse = await generateChecklistFromBackend<GeneratedMovingChecklistAPIResponse>(prompt, model, temperature);
  return transformMovingApiResponse(rawApiResponse);
};


export const generatePetStarterKit = async (details: PetDetails): Promise<AppPetChecklist> => {
  const model = "gemini-2.5-flash-preview-04-17";
  const temperature = 0.65;
  const petSpecifics = `
Pet Details:
- Type of Pet: ${details.petType}
${details.petName ? `- Pet's Name (if known): ${details.petName}` : ''}
- Is the pet a rescue?: ${details.isRescue ? "Yes" : "No"}
- Additional Needs/Considerations: ${details.additionalNeeds || "None specified"}
`;

  const prompt = `
You are an expert advisor for new pet owners. Based on the following pet details, generate a comprehensive starter kit checklist.

${petSpecifics}

Provide the checklist in JSON format. The JSON must have a root key "sections", which is an array of objects. Each section object must have a "sectionName" (string) (e.g., "Essential Supplies", "Initial Veterinary Care", "Home Preparation", "Feeding Plan", "Basic Training & Socialization", "Safety & Emergency") and an "items" (array) property. Each item in the "items" array must be an object with an "itemName" (string) property, and optional "notes" (string) and "quantitySuggestion" (string) properties.

Tailor the checklist specifically for the given pet type. For example:
- For a ${details.petType}, list appropriate food, housing, toys, and care items.
- If it's a rescue, include notes about patience, adjustment period, and consulting with the rescue organization for history.
- Address any "Additional Needs" provided.
- Include categories for vet check-ups, vaccinations, and legal requirements (like microchipping or registration if applicable for the pet type).
- Suggest initial training steps relevant to the pet type.
The response MUST be EXCLUSIVELY a single, valid JSON object as described. 
ABSOLUTELY NO conversational text, summaries of the request, comments, explanations, or any other non-JSON content should be present in the output, neither before, after, nor embedded within the JSON structure.
The output must be parsable as JSON without any modification. Only include "sections" at the root.

Example of STRICTLY JSON output:
{
  "sections": [
    {
      "sectionName": "Essential Supplies",
      "items": [
        { "itemName": "Appropriate food for ${details.petType}", "notes": "Consult vet for recommendations, consider age and breed if relevant.", "quantitySuggestion": "1 small bag to start" },
        { "itemName": "Food and water bowls", "notes": "Choose material like stainless steel or ceramic." }
      ]
    },
    {
      "sectionName": "Initial Veterinary Care",
      "items": [
        { "itemName": "Schedule first vet check-up", "notes": "Within the first week if possible." },
        { "itemName": "Discuss vaccination schedule" }
      ]
    }
  ]
}
Be thorough, practical, and empathetic to a new pet owner.
`;
  const rawApiResponse = await generateChecklistFromBackend<GeneratedPetChecklistAPIResponse>(prompt, model, temperature);
  return transformPetApiResponse(rawApiResponse);
};


export const generateEventChecklist = async (details: EventDetails): Promise<AppEventChecklist> => {
  const model = "gemini-2.5-flash-preview-04-17";
  const temperature = 0.5;
  const eventPromptDetails = `
Event Details:
- Type of Event: ${details.eventType}
- Estimated Guest Count: ${details.guestCount}
- Budget Description: ${details.budgetDescription}
- Venue Type: ${details.venueType}
- Primary Audience: ${details.audience}
${details.eventDateOrTimeline ? `- Event Date/Timeline: ${details.eventDateOrTimeline}` : ''}
- Additional Information: ${details.additionalInfo || "None specified"}
`;

  const prompt = `
You are an expert event planning assistant. Based on the following event details, generate a comprehensive, categorized event planning checklist.

${eventPromptDetails}

Provide the checklist in JSON format. The JSON must have a root key "eventPlanSections", which is an array of objects. Each section object must have a "sectionName" (string) (e.g., "Initial Planning & Budgeting", "Guest List & Invitations", "Venue Selection & Logistics", "Food & Beverage Planning", "Decorations & Ambiance", "Entertainment & Activities", "Day-Of Coordination", "Post-Event Tasks") and a "tasks" (array) property. Each task in the "tasks" array must be an object with a "taskName" (string) property, and optional "notes" (string) for extra details or tips, and an optional "suggestedTimeline" (string) property (e.g., "ASAP", "6-8 Weeks Out", "1 Week Before", "Event Day").

Tailor the checklist specifically for the given event type, audience, and other details. For example:
- For a "${details.eventType}", include relevant planning steps, vendor considerations, and activity ideas.
- If the audience is "${details.audience}", suggest age-appropriate tasks.
- Consider the "${details.budgetDescription}" when suggesting options.
- Address any "Additional Information" provided.
- Tasks should be actionable and cover the full lifecycle of event planning from initial thoughts to post-event wrap-up.
The response MUST be EXCLUSIVELY a single, valid JSON object as described. 
ABSOLUTELY NO conversational text, summaries of the request, comments, explanations, or any other non-JSON content should be present in the output, neither before, after, nor embedded within the JSON structure.
The output must be parsable as JSON without any modification. Only include "eventPlanSections" at the root.

Example of STRICTLY JSON output:
{
  "eventPlanSections": [
    {
      "sectionName": "Initial Planning & Budgeting",
      "tasks": [
        { "taskName": "Define event goals and objectives", "notes": "What is the purpose of this ${details.eventType}?", "suggestedTimeline": "ASAP" },
        { "taskName": "Set a preliminary budget based on description: ${details.budgetDescription}", "notes": "Allocate funds to different categories like venue, food, decor." }
      ]
    },
    {
      "sectionName": "Guest List & Invitations",
      "tasks": [
        { "taskName": "Compile guest list (approx ${details.guestCount} guests)", "suggestedTimeline": "Soon after initial planning" },
        { "taskName": "Design and send invitations" }
      ]
    }
  ]
}
Be thorough, practical, and provide a clear, organized plan.
`;
  const rawApiResponse = await generateChecklistFromBackend<GeneratedEventChecklistAPIResponse>(prompt, model, temperature);
  return transformEventApiResponse(rawApiResponse);
};

export const generateNewBeginningsChecklist = async (details: NewBeginningsDetails): Promise<AppNewBeginningsChecklist> => {
  const model = "gemini-2.5-flash-preview-04-17";
  const temperature = 0.6;
  const beginningsPromptDetails = `
Life Event Details:
- Type of Event: ${details.eventType}
- Additional Context: ${details.additionalContext || "General guidance requested."}
`;

  const prompt = `
You are an empathetic and practical life coach, specializing in helping people navigate significant life transitions. Based on the following "New Beginnings" event details, generate a comprehensive, categorized action plan.

${beginningsPromptDetails}

Provide the action plan in JSON format. The JSON must have a root key "actionPlanSections", which is an array of objects. Each section object must have a "sectionName" (string) (e.g., "Preparatory Steps", "First 30 Days", "Emotional & Mental Well-being", "Financial Adjustments", "Building Support Systems", "Long-Term Integration") and a "tasks" (array) property. Each task in the "tasks" array must be an object with a "taskName" (string) property, and optional "notes" (string) for extra details or tips, an optional "suggestedTimeline" (string) property (e.g., "ASAP", "Month 1", "Ongoing", "Before X date"), and an optional "importance" (string, values: "High", "Medium", "Low").

Tailor the action plan specifically for the given life event ("${details.eventType}") and any "additionalContext" provided.
- For "${details.eventType}", include relevant practical tasks, considerations for emotional adjustment, and resources if applicable.
- If the context is "${details.additionalContext}", incorporate advice related to those specifics.
- Tasks should be actionable and cover various aspects of the transition: logistical, emotional, social, and financial.
- Emphasize self-care and resilience-building where appropriate.
The response MUST be EXCLUSIVELY a single, valid JSON object as described. 
ABSOLUTELY NO conversational text, summaries of the request, comments, explanations, or any other non-JSON content should be present in the output, neither before, after, nor embedded within the JSON structure.
The output must be parsable as JSON without any modification. Only include "actionPlanSections" at the root.

Example of STRICTLY JSON output for "Starting College":
{
  "actionPlanSections": [
    {
      "sectionName": "Academic & Logistical Preparation (Pre-Arrival)",
      "tasks": [
        { "taskName": "Finalize course registration", "suggestedTimeline": "1-2 months before", "importance": "High" },
        { "taskName": "Arrange housing and meal plan", "notes": "Confirm move-in dates and procedures." },
        { "taskName": "Purchase textbooks and supplies" }
      ]
    },
    {
      "sectionName": "First Month on Campus",
      "tasks": [
        { "taskName": "Attend orientation sessions", "importance": "High" },
        { "taskName": "Explore campus and locate key buildings (library, student health, etc.)" },
        { "taskName": "Introduce yourself to RAs/dorm mates and professors" }
      ]
    }
  ]
}
Be thorough, supportive, and provide a clear, organized action plan to help the user feel prepared and empowered.
`;
  const rawApiResponse = await generateChecklistFromBackend<GeneratedNewBeginningsChecklistAPIResponse>(prompt, model, temperature);
  return transformNewBeginningsApiResponse(rawApiResponse);
};


export const generateProjectGoalChecklist = async (details: ProjectGoalDetails): Promise<AppProjectGoalChecklist> => {
  const model = "gemini-2.5-flash-preview-04-17";
  const temperature = 0.6;
  const goalPromptDetails = `
Project/Goal Details:
- Goal Type: ${details.goalType}
- Goal Statement: ${details.goalStatement}
${details.targetTimeline ? `- Target Timeline: ${details.targetTimeline}` : ''}
- Key Considerations/Specifics: ${details.keyConsiderations || "None specified, general guidance requested."}
`;

  const prompt = `
You are an expert project manager and productivity coach. Based on the following project or goal details, generate a comprehensive, phased action plan.

${goalPromptDetails}

Provide the action plan in JSON format. The JSON must have a root key "projectPhases", which is an array of objects. Each phase object must have a "phaseName" (string) (e.g., "Phase 1: Planning & Research", "Phase 2: Development & Creation", "Milestone: MVP Launch") and a "tasks" (array) property. Each task in the "tasks" array must be an object with:
- "taskName" (string): A clear, actionable task.
- "details" (string, optional): Further explanation, tips, or sub-steps for the task.
- "suggestedTimelineOrEffort" (string, optional): Estimated time (e.g., "Approx. 3 hours", "Due by end of Week 2").
- "priority" (string, optional, values: "High", "Medium", "Low"): The importance of the task.

Tailor the action plan specifically for the given "${details.goalType}" and "${details.goalStatement}".
- Break down the goal into logical, manageable phases.
- Within each phase, list specific, actionable tasks.
- Consider the "${details.keyConsiderations}" provided by the user (e.g., budget, resources, specific sub-goals) and incorporate them into the plan.
- For example, if Goal Type is "Start a Podcast", phases might include: Concept & Niche Definition, Equipment Setup, Content Planning, Recording & Editing, Publishing & Distribution, Marketing & Growth.
- If Goal Type is "Train for a Fitness Event", phases might be: Baseline Assessment & Goal Setting, Training Block 1, Training Block 2, Tapering & Race Prep, Post-Event Recovery.
- Ensure tasks are practical and help the user make tangible progress.
The response MUST be EXCLUSIVELY a single, valid JSON object as described. 
ABSOLUTELY NO conversational text, summaries of the request, comments, explanations, or any other non-JSON content should be present in the output, neither before, after, nor embedded within the JSON structure.
The output must be parsable as JSON without any modification. Only include "projectPhases" at the root.

Example of STRICTLY JSON output for "Start a Podcast":
{
  "projectPhases": [
    {
      "phaseName": "Phase 1: Concept & Planning",
      "tasks": [
        { "taskName": "Define podcast niche and target audience", "details": "Research existing podcasts in your area of interest. Identify unique angles.", "priority": "High", "suggestedTimelineOrEffort": "Week 1" },
        { "taskName": "Choose podcast name and branding elements", "details": "Check for name availability (domain, social media). Sketch logo ideas." },
        { "taskName": "Outline first 5-10 episode ideas", "priority": "Medium" }
      ]
    },
    {
      "phaseName": "Phase 2: Equipment & Software Setup",
      "tasks": [
        { "taskName": "Research and purchase microphone", "details": "Consider budget from key considerations. USB mics are good for beginners.", "priority": "High" },
        { "taskName": "Select and learn recording/editing software", "details": "Audacity (free), GarageBand (free on Mac), or Descript/Adobe Audition (paid)." }
      ]
    }
  ]
}
Be thorough, motivating, and provide a clear roadmap to achievement.
`;
  const rawApiResponse = await generateChecklistFromBackend<GeneratedProjectGoalChecklistAPIResponse>(prompt, model, temperature);
  return transformProjectGoalApiResponse(rawApiResponse);
};
