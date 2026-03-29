export interface BuildPhase {
  id: string;
  name: string;
  description: string;
  estCost: string;
  rating: number;
  image: string;
  tags: string[];
}

export const buildPhases: BuildPhase[] = [
  {
    id: 'foundation',
    name: 'Foundation & Groundwork',
    description: 'Precision excavation, concrete pouring, and structural grounding for a build that meets every engineering spec.',
    estCost: '$15k - $25k',
    rating: 4.9,
    image: '/build/foundation.jpg',
    tags: ['Concrete', 'Excavation', 'Structural']
  },
  {
    id: 'framing',
    name: 'Structural Framing',
    description: 'The skeleton of your home. High-grade steel and timber frameworks precision-engineered to local codes.',
    estCost: '$30k - $50k',
    rating: 5.0,
    image: '/build/framing.jpg',
    tags: ['Steel', 'Timber', 'Engineering']
  },
  {
    id: 'interiors',
    name: 'Interiors & Woodwork',
    description: 'Custom cabinetry, premium flooring, and finishing details by verified master craftsmen.',
    estCost: '$20k - $40k',
    rating: 4.8,
    image: '/build/interiors.jpg',
    tags: ['Carpentry', 'Finishes', 'Design']
  }
];

export interface FeatureHighlight {
  title: string;
  description: string;
  position: 'left' | 'right';
}

export const features: FeatureHighlight[] = [
  {
    title: 'Verified Contractors',
    description: 'Every vendor is strictly vetted for licensing, insurance, and past project quality. Zero guesswork.',
    position: 'left'
  },
  {
    title: 'Transparent Bidding',
    description: 'Compare itemized quotes side-by-side. Choose the best value without hidden fees.',
    position: 'right'
  },
  {
    title: 'Phase Tracking',
    description: 'Monitor progress from blueprints to final walkthrough with real-time timeline updates.',
    position: 'left'
  },
  {
    title: 'Centralized Vault',
    description: 'Keep permits, blueprints, and contracts securely stored and accessible to your entire team.',
    position: 'right'
  }
];
