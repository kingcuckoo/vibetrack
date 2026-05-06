export type Category = 'food' | 'body' | 'exercise' | 'scale' | 'other';

export const CATEGORY_COLORS: Record<Category, string> = {
  food: '#F4A261',
  exercise: '#2A9D8F',
  body: '#E9C46A',
  scale: '#6D6875',
  other: '#9B5DE5',
};

export const CATEGORY_LABELS: Record<Category, string> = {
  food: 'Food',
  exercise: 'Exercise',
  body: 'Body',
  scale: 'Scale',
  other: 'Other',
};

export interface GalleryEntry {
  id: string;
  timestamp: number;
  color: string;
  category: Category;
  aiLabel: string;
  aiAnnotation: string;
}

// data is pre-batched into rows of 3 for SectionList (which has no numColumns)
export interface GallerySection {
  title: string;
  data: GalleryEntry[][];
}

function batchRows(entries: GalleryEntry[]): GalleryEntry[][] {
  const rows: GalleryEntry[][] = [];
  for (let i = 0; i < entries.length; i += 3) {
    rows.push(entries.slice(i, i + 3));
  }
  return rows;
}

const todayEntries: GalleryEntry[] = [
  { id: '1', timestamp: Date.now() - 1000 * 60 * 30, color: '#F4A261', category: 'food', aiLabel: 'Lunch — salad bowl', aiAnnotation: '~520 kcal · high protein' },
  { id: '2', timestamp: Date.now() - 1000 * 60 * 90, color: '#E63946', category: 'food', aiLabel: 'Breakfast — oatmeal', aiAnnotation: '~380 kcal · high fiber' },
  { id: '3', timestamp: Date.now() - 1000 * 60 * 150, color: '#E9C46A', category: 'body', aiLabel: 'Morning check-in', aiAnnotation: 'Good lighting · front-facing' },
  { id: '4', timestamp: Date.now() - 1000 * 60 * 210, color: '#2A9D8F', category: 'exercise', aiLabel: 'Strength training', aiAnnotation: '~45 min · upper body' },
  { id: '5', timestamp: Date.now() - 1000 * 60 * 300, color: '#9B5DE5', category: 'other', aiLabel: 'Supplement stack', aiAnnotation: 'Morning routine' },
  { id: '6', timestamp: Date.now() - 1000 * 60 * 420, color: '#6D6875', category: 'scale', aiLabel: 'Weight log', aiAnnotation: '172 lbs detected' },
];

const yesterdayBase = Date.now() - 1000 * 60 * 60 * 24;
const yesterdayEntries: GalleryEntry[] = [
  { id: '7', timestamp: yesterdayBase - 1000 * 60 * 60, color: '#F4A261', category: 'food', aiLabel: 'Dinner — chicken + rice', aiAnnotation: '~650 kcal · high protein' },
  { id: '8', timestamp: yesterdayBase - 1000 * 60 * 120, color: '#2A9D8F', category: 'exercise', aiLabel: 'Running', aiAnnotation: '~30 min · cardio' },
  { id: '9', timestamp: yesterdayBase - 1000 * 60 * 300, color: '#E9C46A', category: 'body', aiLabel: 'Evening check-in', aiAnnotation: 'Post-workout · hydrated' },
  { id: '10', timestamp: yesterdayBase - 1000 * 60 * 480, color: '#F4A261', category: 'food', aiLabel: 'Snack — fruit bowl', aiAnnotation: '~180 kcal · high fiber' },
  { id: '11', timestamp: yesterdayBase - 1000 * 60 * 540, color: '#6D6875', category: 'scale', aiLabel: 'Weight log', aiAnnotation: '171.5 lbs detected' },
  { id: '12', timestamp: yesterdayBase - 1000 * 60 * 600, color: '#F4A261', category: 'food', aiLabel: 'Breakfast — eggs', aiAnnotation: '~420 kcal · high protein' },
];

const day3Base = Date.now() - 1000 * 60 * 60 * 24 * 3;
const day3Entries: GalleryEntry[] = [
  { id: '13', timestamp: day3Base - 1000 * 60 * 60, color: '#2A9D8F', category: 'exercise', aiLabel: 'Leg day', aiAnnotation: '~60 min · lower body' },
  { id: '14', timestamp: day3Base - 1000 * 60 * 180, color: '#F4A261', category: 'food', aiLabel: 'Post-workout shake', aiAnnotation: '~310 kcal · high protein' },
  { id: '15', timestamp: day3Base - 1000 * 60 * 360, color: '#E9C46A', category: 'body', aiLabel: 'Morning check-in', aiAnnotation: 'Rested · clear skin' },
];

const day5Base = Date.now() - 1000 * 60 * 60 * 24 * 5;
const day5Entries: GalleryEntry[] = [
  { id: '16', timestamp: day5Base - 1000 * 60 * 60, color: '#9B5DE5', category: 'other', aiLabel: 'Skincare routine', aiAnnotation: 'AM routine · SPF applied' },
  { id: '17', timestamp: day5Base - 1000 * 60 * 120, color: '#F4A261', category: 'food', aiLabel: 'Lunch — burrito bowl', aiAnnotation: '~720 kcal · balanced macros' },
  { id: '18', timestamp: day5Base - 1000 * 60 * 300, color: '#6D6875', category: 'scale', aiLabel: 'Weight log', aiAnnotation: '172.5 lbs detected' },
];

function formatSectionTitle(base: number): string {
  const date = new Date(base);
  const now = new Date();
  const diffDays = Math.round((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export const GALLERY_SECTIONS: GallerySection[] = [
  { title: formatSectionTitle(Date.now()), data: batchRows(todayEntries) },
  { title: formatSectionTitle(yesterdayBase), data: batchRows(yesterdayEntries) },
  { title: formatSectionTitle(day3Base), data: batchRows(day3Entries) },
  { title: formatSectionTitle(day5Base), data: batchRows(day5Entries) },
];

export const MOCK_SUGGESTIONS: Array<{
  color: string;
  category: Category;
  aiLabel: string;
  aiAnnotation: string;
}> = [
  { color: '#F4A261', category: 'food', aiLabel: 'Lunch — salad bowl', aiAnnotation: '~520 kcal · high protein' },
  { color: '#E63946', category: 'food', aiLabel: 'Breakfast — oatmeal', aiAnnotation: '~380 kcal · high fiber' },
  { color: '#2A9D8F', category: 'exercise', aiLabel: 'Strength training', aiAnnotation: '~45 min · upper body' },
  { color: '#E9C46A', category: 'body', aiLabel: 'Morning check-in', aiAnnotation: 'Good lighting · front-facing' },
  { color: '#6D6875', category: 'scale', aiLabel: 'Weight log', aiAnnotation: '172 lbs detected' },
];
