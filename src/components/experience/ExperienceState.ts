// Simple lightweight state store for high performance animation frames
export interface ExperienceState {
  currentSection: number; // 0 to 6
  scrollProgress: number; // 0 to 1
  sectionProgresses: number[]; // 0 to 1 for each of the 7 sections
  mouse: { x: number; y: number; targetX: number; targetY: number };
  dragYRotation: number;
  targetDragYRotation: number;
  isDragging: boolean;
  activeProcessStage: number; // 0 to 3 for the process stages
  activeProductCard: number; // 0 to 3 for the rotating product cards
  productScrollProgress: number; // 0 to 3 continuous float for fluid bottle rotation
  loadingProgress: number; // 0 to 100
  isLoaded: boolean;
  reducedMotion: boolean;
}

export const expState: ExperienceState = {
  currentSection: 0,
  scrollProgress: 0,
  sectionProgresses: [0, 0, 0, 0, 0, 0, 0],
  mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
  dragYRotation: 0,
  targetDragYRotation: 0,
  isDragging: false,
  activeProcessStage: 0,
  activeProductCard: 0,
  productScrollProgress: 0,
  loadingProgress: 0,
  isLoaded: false,
  reducedMotion: false,
};

// Event emitter for React components to subscribe to section changes (low-frequency updates)
type Subscriber = (state: ExperienceState) => void;
const subscribers = new Set<Subscriber>();

export const subscribeToState = (fn: Subscriber) => {
  subscribers.add(fn);
  return () => {
    subscribers.delete(fn);
  };
};

export const updateState = (updater: Partial<ExperienceState> | ((prev: ExperienceState) => Partial<ExperienceState>)) => {
  const next = typeof updater === 'function' ? updater(expState) : updater;
  Object.assign(expState, next);
  subscribers.forEach((sub) => sub(expState));
};
