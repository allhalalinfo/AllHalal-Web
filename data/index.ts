/**
 * allhalal.info.info - Data Index
 * Central export for all seed data
 */

// Types
export * from './types';

// Seed Data
export * from './countries';
export * from './cities';
export * from './ingredients';
export * from './e-codes';
export * from './dubai-areas';
export * from './developers';

// Re-exports for convenience
import { countries } from './countries';
import { cities } from './cities';
import { ingredients } from './ingredients';
import { eCodes } from './e-codes';
import { dubaiAreas } from './dubai-areas';
import { developers } from './developers';

export const data = {
  countries,
  cities,
  ingredients,
  eCodes,
  dubaiAreas,
  developers
};

// Stats
export const stats = {
  countriesCount: countries.length,
  citiesCount: cities.length,
  ingredientsCount: ingredients.length,
  eCodesCount: eCodes.length,
  dubaiAreasCount: dubaiAreas.length,
  developersCount: developers.length,
  totalRecords: countries.length + cities.length + ingredients.length + eCodes.length + dubaiAreas.length + developers.length
};
