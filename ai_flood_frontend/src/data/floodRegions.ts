// Define types for flood data
interface EscapeRoute {
  id: string;
  name: string;
  description: string;
  estimatedTime: string;
  safetyLevel: 'high' | 'medium' | 'low';
  landmarks: string[];
  type?: 'main' | 'alternative';
}

interface FloodRegion {
  id: string;
  name: string;
  riskLevel: 'high' | 'medium' | 'low';
  coordinates: [number, number];
  waterBodies: string[];
  escapeRoutes: EscapeRoute[];
}

// Sample flood regions data
const floodRegions: FloodRegion[] = [
  {
    id: 'mumbai-1',
    name: 'Mumbai Central',
    riskLevel: 'high',
    coordinates: [19.0760, 72.8777],
    waterBodies: ['Arabian Sea', 'Mithi River'],
    escapeRoutes: [
      {
        id: 'mumbai-route-1',
        name: 'Mumbai Central to Bandra',
        description: 'Primary evacuation route via Western Express Highway',
        estimatedTime: '25 minutes',
        safetyLevel: 'high',
        landmarks: ['Mumbai Central Station', 'Mahalaxmi Temple', 'Bandra Reclamation', 'Bandra Station'],
        type: 'main'
      },
      {
        id: 'mumbai-route-2',
        name: 'Alternative Route via Mahim',
        description: 'Secondary route through Mahim Creek area',
        estimatedTime: '35 minutes',
        safetyLevel: 'medium',
        landmarks: ['Mahim Station', 'Mahim Creek', 'Shivaji Park', 'Dadar Station'],
        type: 'alternative'
      }
    ]
  },
  {
    id: 'chennai-1',
    name: 'Chennai Coastal Area',
    riskLevel: 'high',
    coordinates: [13.0827, 80.2707],
    waterBodies: ['Bay of Bengal', 'Adyar River'],
    escapeRoutes: [
      {
        id: 'chennai-route-1',
        name: 'Marina to Anna Nagar',
        description: 'Evacuation route away from coastal areas',
        estimatedTime: '30 minutes',
        safetyLevel: 'high',
        landmarks: ['Marina Beach', 'Chepauk Stadium', 'Egmore', 'Anna Nagar'],
        type: 'main'
      }
    ]
  },
  {
    id: 'kolkata-1',
    name: 'Kolkata East',
    riskLevel: 'medium',
    coordinates: [22.5726, 88.3639],
    waterBodies: ['Hooghly River', 'Salt Lake'],
    escapeRoutes: [
      {
        id: 'kolkata-route-1',
        name: 'Salt Lake to Rajarhat',
        description: 'Route to higher ground in New Town',
        estimatedTime: '20 minutes',
        safetyLevel: 'high',
        landmarks: ['Salt Lake Stadium', 'Tank No. 5', 'Rajarhat', 'New Town'],
        type: 'main'
      }
    ]
  }
];

// Function to find flood region by address
export function findFloodRegionByAddress(address: string): FloodRegion | null {
  const addressLower = address.toLowerCase();
  
  // Check for city matches
  if (addressLower.includes('mumbai')) {
    return floodRegions.find(region => region.id.includes('mumbai')) || null;
  }
  
  if (addressLower.includes('chennai')) {
    return floodRegions.find(region => region.id.includes('chennai')) || null;
  }
  
  if (addressLower.includes('kolkata')) {
    return floodRegions.find(region => region.id.includes('kolkata')) || null;
  }
  
  if (addressLower.includes('kerala') || addressLower.includes('kochi')) {
    // Return a default flood region for Kerala
    return {
      id: 'kerala-1',
      name: 'Kerala Coastal Region',
      riskLevel: 'high',
      coordinates: [9.9312, 76.2673],
      waterBodies: ['Arabian Sea', 'Periyar River'],
      escapeRoutes: [
        {
          id: 'kerala-route-1',
          name: 'Coastal to Highland Route',
          description: 'Evacuation to higher elevation areas',
          estimatedTime: '40 minutes',
          safetyLevel: 'high',
          landmarks: ['Kochi Port', 'Edappally', 'Kakkanad', 'Hill Station'],
          type: 'main'
        }
      ]
    };
  }
  
  return null;
}

export { type FloodRegion, type EscapeRoute };
export default floodRegions;