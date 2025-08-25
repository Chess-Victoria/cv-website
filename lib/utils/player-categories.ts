export interface Category {
  id: string;
  name: string;
  description: string;
}

export const CATEGORIES: Record<string, Category> = {
  'all': { id: 'all', name: 'All Players', description: 'All Victorian players' },
  'u8': { id: 'u8', name: 'Under 8', description: 'Players under 8 years old' },
  'u10': { id: 'u10', name: 'Under 10', description: 'Players under 10 years old' },
  'u12': { id: 'u12', name: 'Under 12', description: 'Players under 12 years old' },
  'u14': { id: 'u14', name: 'Under 14', description: 'Players under 14 years old' },
  'u16': { id: 'u16', name: 'Under 16', description: 'Players under 16 years old' },
  'u18': { id: 'u18', name: 'Under 18', description: 'Players under 18 years old' },
  'u20': { id: 'u20', name: 'Under 20', description: 'Players under 20 years old' },
  'girls-u8': { id: 'girls-u8', name: 'Girls Under 8', description: 'Female players under 8 years old' },
  'girls-u10': { id: 'girls-u10', name: 'Girls Under 10', description: 'Female players under 10 years old' },
  'girls-u12': { id: 'girls-u12', name: 'Girls Under 12', description: 'Female players under 12 years old' },
  'girls-u14': { id: 'girls-u14', name: 'Girls Under 14', description: 'Female players under 14 years old' },
  'girls-u16': { id: 'girls-u16', name: 'Girls Under 16', description: 'Female players under 16 years old' },
  'girls-u18': { id: 'girls-u18', name: 'Girls Under 18', description: 'Female players under 18 years old' },
  'girls-u20': { id: 'girls-u20', name: 'Girls Under 20', description: 'Female players under 20 years old' },
  'top-female': { id: 'top-female', name: 'Top Female Players', description: 'All female players in Victoria' }
};
