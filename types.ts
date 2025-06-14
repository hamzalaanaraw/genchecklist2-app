export enum DestinationType {
  BEACH = "Beach",
  CITY = "City",
  HIKING = "Hiking",
  BUSINESS = "Business Trip",
  FAMILY_VISIT = "Family Visit",
}

export interface TripDetails {
  destinationType: DestinationType;
  durationInDays: number;
  activities: string;
}

// Structure expected from Gemini API for Trip Packing
export interface RawChecklistItemFromAPI {
  itemName: string;
  quantitySuggestion?: string;
  notes?: string; // Added for Pet Starter Kit, can be optional for trip
}

export interface RawCategoryFromAPI {
  name: string;
  items: RawChecklistItemFromAPI[];
}

export interface GeneratedTripChecklistAPIResponse {
  categories: RawCategoryFromAPI[];
}

// Structure used for UI display and state management for Trip Packing
export interface DisplayListItem {
  id: string; // unique client-side ID
  itemName: string;
  quantitySuggestion?: string;
  packed: boolean;
}

export interface DisplayCategory {
  name: string;
  items: DisplayListItem[];
}

export type AppTripChecklist = DisplayCategory[];

// ----- Types for Moving Checklist -----

export enum ChecklistType {
  TRIP = "trip",
  MOVING = "moving",
  PET = "pet",
  EVENT = "event",
  NEW_BEGINNINGS = "new_beginnings",
  PROJECT_GOAL = "project_goal",
}

export enum StaticPageType {
  ABOUT = "about",
  TERMS = "terms",
  PRIVACY = "privacy",
  CONTACT = "contact",
}

export enum MoveType {
  LOCAL = "Local",
  LONG_DISTANCE = "Long-Distance",
}

export interface MovingDetails {
  moveType: MoveType;
  hasPets: boolean;
  hasKids: boolean;
  additionalInfo?: string;
}

// Structure expected from Gemini API for Moving Checklist
export interface RawMovingTaskFromAPI {
  taskName: string;
  notes?: string;
  deadline?: string;
}

export interface RawMovingWeekFromAPI {
  week: string; // e.g., "8 Weeks Before Move", "1 Week Before Move", "Moving Day"
  tasks: RawMovingTaskFromAPI[];
}

export interface GeneratedMovingChecklistAPIResponse {
  timeline: RawMovingWeekFromAPI[];
}

// Structure used for UI display and state management for Moving Checklist
export interface DisplayMovingTask {
  id: string; // unique client-side ID
  taskName: string;
  notes?: string;
  deadline?: string;
  completed: boolean;
}

export interface DisplayMovingWeek {
  week: string;
  tasks: DisplayMovingTask[];
}

export type AppMovingChecklist = DisplayMovingWeek[];

// ----- Types for Pet Starter Kit -----

export enum PetType {
  DOG = "Dog",
  CAT = "Cat",
  HAMSTER = "Hamster",
  BIRD = "Bird",
  FISH = "Fish",
  REPTILE = "Reptile",
  OTHER = "Other",
}

export interface PetDetails {
  petType: PetType;
  petName?: string;
  isRescue: boolean;
  additionalNeeds?: string;
}

// Structure expected from Gemini API for Pet Starter Kit
export interface RawPetChecklistItemFromAPI {
  itemName: string;
  notes?: string;
  quantitySuggestion?: string; 
}

export interface RawPetChecklistSectionFromAPI {
  sectionName: string; 
  items: RawPetChecklistItemFromAPI[];
}

export interface GeneratedPetChecklistAPIResponse {
  sections: RawPetChecklistSectionFromAPI[];
}

// Structure used for UI display and state management for Pet Starter Kit
export interface DisplayPetChecklistItem {
  id: string; 
  itemName: string;
  notes?: string;
  quantitySuggestion?: string;
  acquired: boolean;
}

export interface DisplayPetChecklistSection {
  sectionName: string;
  items: DisplayPetChecklistItem[];
}

export type AppPetChecklist = DisplayPetChecklistSection[];

// ----- Types for Event & Party Planner -----

export enum EventType {
  BIRTHDAY_PARTY = "Birthday Party",
  WEDDING = "Wedding",
  BABY_SHOWER = "Baby Shower",
  HOLIDAY_DINNER = "Holiday Dinner (e.g., Thanksgiving, Christmas)",
  BBQ_GATHERING = "BBQ / Casual Gathering",
  CORPORATE_EVENT = "Corporate Event",
  ANNIVERSARY = "Anniversary Celebration",
  GRADUATION_PARTY = "Graduation Party",
  OTHER = "Other (Specify in details)",
}

export enum EventVenueType {
  INDOOR = "Indoor",
  OUTDOOR = "Outdoor",
  MIXED_INDOOR_OUTDOOR = "Mixed (Indoor & Outdoor)",
}

export enum EventAudience {
  CHILDREN = "Primarily Children",
  ADULTS = "Primarily Adults",
  MIXED_AGES = "Mixed Ages (Children & Adults)",
  TEENAGERS = "Primarily Teenagers",
}

export interface EventDetails {
  eventType: EventType;
  guestCount: number;
  budgetDescription: string; // e.g., "Low / Shoestring", "Moderate", "Generous / High-End", "Approx. $500"
  venueType: EventVenueType;
  audience: EventAudience;
  eventDateOrTimeline?: string; // Optional: e.g., "Next month", "Specific date YYYY-MM-DD", "Within 3 months"
  additionalInfo?: string;
}

// Structure expected from Gemini API for Event Checklist
export interface RawEventTaskFromAPI {
  taskName: string;
  notes?: string;
  suggestedTimeline?: string; // e.g., "4 weeks before", "Day of event"
  categoryHint?: string; // Optional hint for client-side categorization if AI doesn't group well.
}

export interface RawEventSectionFromAPI {
  sectionName: string; // e.g., "Initial Planning & Budgeting", "Guest Management", "Venue & Decor", "Food & Beverage"
  tasks: RawEventTaskFromAPI[];
}

export interface GeneratedEventChecklistAPIResponse {
  eventPlanSections: RawEventSectionFromAPI[];
}

// Structure used for UI display and state management for Event Checklist
export interface DisplayEventTask {
  id: string; // unique client-side ID
  taskName: string;
  notes?: string;
  suggestedTimeline?: string;
  completed: boolean;
}

export interface DisplayEventSection {
  sectionName: string;
  tasks: DisplayEventTask[];
}

export type AppEventChecklist = DisplayEventSection[];

// ----- Types for New Beginnings Checklist -----

export enum NewBeginningsEventType {
  STARTING_COLLEGE = "Starting College",
  PREPARING_FOR_NEW_BABY = "Preparing for a New Baby",
  STARTING_NEW_JOB = "Starting a New Job",
  MOVING_TO_NEW_CITY = "Moving to a New City (Not just a local move)",
  RECOVERING_FROM_ILLNESS_SURGERY = "Recovering from a Major Illness or Surgery",
  POST_BREAKUP_DIVORCE = "Navigating Life Post-Breakup/Divorce",
  CAREER_CHANGE = "Making a Significant Career Change",
  EMPTY_NEST_SYNDROME = "Adjusting to an Empty Nest",
  OTHER = "Other Significant Life Change",
}

export interface NewBeginningsDetails {
  eventType: NewBeginningsEventType;
  additionalContext?: string; // User can provide specifics like "starting college out of state", "first baby", "new job requires relocation"
}

// Structure expected from Gemini API for New Beginnings Checklist
export interface RawNewBeginningsTaskFromAPI {
  taskName: string;
  notes?: string;
  suggestedTimeline?: string; // e.g., "3 Months Before", "First Week", "Ongoing"
  importance?: "High" | "Medium" | "Low"; // Optional
}

export interface RawNewBeginningsSectionFromAPI {
  sectionName: string; // e.g., "Financial Preparations", "Emotional Well-being", "Logistics & Practical Steps"
  tasks: RawNewBeginningsTaskFromAPI[];
}

export interface GeneratedNewBeginningsChecklistAPIResponse {
  actionPlanSections: RawNewBeginningsSectionFromAPI[];
}

// Structure used for UI display and state management for New Beginnings Checklist
export interface DisplayNewBeginningsTask {
  id: string; // unique client-side ID
  taskName: string;
  notes?: string;
  suggestedTimeline?: string;
  importance?: "High" | "Medium" | "Low";
  completed: boolean;
}

export interface DisplayNewBeginningsSection {
  sectionName: string;
  tasks: DisplayNewBeginningsTask[];
}

export type AppNewBeginningsChecklist = DisplayNewBeginningsSection[];

// ----- Types for Project & Goal Achievement Checklist -----

export enum GoalType {
  START_PODCAST = "Start a Podcast",
  LAUNCH_BLOG_WEBSITE = "Launch a Blog/Website",
  TRAIN_FOR_FITNESS_EVENT = "Train for a Fitness Event (e.g., 5k, Marathon)",
  DEEP_CLEAN_HOUSE = "Deep Clean and Organize House (e.g., Spring Cleaning)",
  LEARN_NEW_SKILL = "Learn a New Skill (e.g., Coding, Language, Instrument)",
  WRITE_BOOK_NOVEL = "Write a Book/Novel",
  PLAN_LARGE_TRIP = "Plan a Large or Complex Trip",
  PERSONAL_FINANCE_GOAL = "Achieve a Personal Finance Goal (e.g., Save for Downpayment)",
  OTHER_PROJECT = "Other Custom Project/Goal",
}

export interface ProjectGoalDetails {
  goalType: GoalType;
  goalStatement: string; // User's main goal, e.g., "Launch a weekly podcast about historical mysteries"
  targetTimeline?: string; // Optional, e.g., "3 months", "By end of Q4 2024"
  keyConsiderations?: string; // User's specific details, constraints, resources.
}

// Structure expected from Gemini API for Project/Goal Checklist
export interface RawProjectGoalTaskFromAPI {
  taskName: string;
  details?: string; // More explanation for the task
  suggestedTimelineOrEffort?: string; // e.g., "Complete by Week 2", "Approx. 4 hours"
  priority?: "High" | "Medium" | "Low"; // Optional
}

export interface RawProjectGoalPhaseFromAPI {
  phaseName: string; // e.g., "Phase 1: Planning & Conceptualization", "Milestone 1: MVP Launch"
  tasks: RawProjectGoalTaskFromAPI[];
}

export interface GeneratedProjectGoalChecklistAPIResponse {
  projectPhases: RawProjectGoalPhaseFromAPI[];
}

// Structure used for UI display and state management for Project/Goal Checklist
export interface DisplayProjectGoalTask {
  id: string; // unique client-side ID
  taskName: string;
  details?: string;
  suggestedTimelineOrEffort?: string;
  priority?: "High" | "Medium" | "Low";
  completed: boolean;
}

export interface DisplayProjectGoalPhase {
  phaseName: string;
  tasks: DisplayProjectGoalTask[];
}

export type AppProjectGoalChecklist = DisplayProjectGoalPhase[];