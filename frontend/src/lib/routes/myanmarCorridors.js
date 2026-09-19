/**
 * Myanmar Logistics Corridors, Waypoints, and Checkpoints
 * Northern Corridor: Yangon -> Mandalay -> Lashio -> Muse (China Border)
 * Eastern Corridor: Yangon -> Bago -> Hpa-An -> Kawkareik -> Myawaddy (Thailand Border)
 */

export const CORRIDORS = {
  NORTHERN: {
    id: 'corridor-northern',
    name: 'Northern Corridor (China Trade)',
    origin: 'Yangon (Hlaing Tharyar Logistics Hub)',
    destination: 'Muse (Ruili / China Border Gate)',
    distanceKm: 1040,
    estimatedHours: 24,
    color: '#4f46e5', // Brand Indigo
  },
  EASTERN: {
    id: 'corridor-eastern',
    name: 'Eastern Corridor (Thailand Trade)',
    origin: 'Yangon (Dagon Seikkan Terminal)',
    destination: 'Myawaddy (Mae Sot / Thailand Border Gate)',
    distanceKm: 420,
    estimatedHours: 9,
    color: '#0f766e', // Trader Teal
  },
}

export const GATES = [
  {
    id: 'GATE-NORTH-01',
    name: 'Muse 105-Mile Trade Zone',
    corridorId: 'corridor-northern',
    latitude: 23.9300,
    longitude: 97.8800,
    type: 'PERMANENT',
    status: 'CONGESTED',
    isVerified: true,
    description: 'Main customs inspection terminal for Myanmar-China border freight.',
  },
  {
    id: 'GATE-NORTH-02',
    name: 'Lashio Toll & Security Checkpoint',
    corridorId: 'corridor-northern',
    latitude: 22.9358,
    longitude: 97.7497,
    type: 'PERMANENT',
    status: 'OPEN',
    isVerified: true,
    description: 'Northern Shan state entry checkpoint and weighbridge.',
  },
  {
    id: 'GATE-NORTH-03',
    name: 'Nawnghkio Gorge Checkpoint',
    corridorId: 'corridor-northern',
    latitude: 22.3300,
    longitude: 96.8000,
    type: 'TEMPORARY',
    status: 'PENDING',
    isVerified: false,
    description: 'Driver-reported unverified inspection stop near Gokteik valley.',
  },
  {
    id: 'GATE-EAST-01',
    name: 'Kawkareik Asia Highway Checkpoint',
    corridorId: 'corridor-eastern',
    latitude: 16.5542,
    longitude: 98.2433,
    type: 'PERMANENT',
    status: 'BLOCKED',
    isVerified: true,
    description: 'Dawna Mountain Range pass. Road closure reported due to mudslide.',
  },
  {
    id: 'GATE-EAST-02',
    name: 'Myawaddy Friendship Bridge 1 & 2',
    corridorId: 'corridor-eastern',
    latitude: 16.6908,
    longitude: 98.5133,
    type: 'PERMANENT',
    status: 'OPEN',
    isVerified: true,
    description: 'Official customs crossing into Mae Sot, Thailand.',
  },
  {
    id: 'GATE-EAST-03',
    name: 'Thanlwin Bridge Checkpoint (Hpa-An)',
    corridorId: 'corridor-eastern',
    latitude: 16.8906,
    longitude: 97.6333,
    type: 'PERMANENT',
    status: 'OPEN',
    isVerified: true,
    description: 'Kayin State major transit inspection and manifest verification.',
  },
]

export const NORTHERN_PRIMARY_WAYPOINTS = [
  { name: 'Yangon Hub', latitude: 16.8661, longitude: 96.1951 },
  { name: 'Bago Junction', latitude: 17.3221, longitude: 96.4660 },
  { name: 'Naypyidaw Express', latitude: 19.7633, longitude: 96.0785 },
  { name: 'Meiktila Crossing', latitude: 20.8787, longitude: 95.8617 },
  { name: 'Mandalay Depot', latitude: 21.9588, longitude: 96.0891 },
  { name: 'Pyin Oo Lwin Switchback', latitude: 22.0350, longitude: 96.4560 },
  { name: 'Kyaukme Valley', latitude: 22.5200, longitude: 97.0300 },
  { name: 'Hsipaw Bridge', latitude: 22.6200, longitude: 97.3000 },
  { name: 'Lashio Checkpoint', latitude: 22.9358, longitude: 97.7497, checkpointId: 'GATE-NORTH-02' },
  { name: 'Kutkai Ridge', latitude: 23.4500, longitude: 97.9400 },
  { name: '105-Mile Zone', latitude: 23.9300, longitude: 97.8800, checkpointId: 'GATE-NORTH-01' },
  { name: 'Muse Border Gate', latitude: 23.9917, longitude: 97.9014 },
]

export const NORTHERN_OBSERVED_DETOUR_WAYPOINTS = [
  { name: 'Kyaukme Valley', latitude: 22.5200, longitude: 97.0300 },
  { name: 'Namtu Bypass Road', latitude: 22.9800, longitude: 97.4000 },
  { name: 'Tangyan Feeder Track', latitude: 23.2000, longitude: 97.6500 },
  { name: 'Kutkai North Re-entry', latitude: 23.5000, longitude: 97.9200 },
  { name: '105-Mile Zone', latitude: 23.9300, longitude: 97.8800, checkpointId: 'GATE-NORTH-01' },
  { name: 'Muse Border Gate', latitude: 23.9917, longitude: 97.9014 },
]

export const EASTERN_PRIMARY_WAYPOINTS = [
  { name: 'Yangon Dagon Terminal', latitude: 16.8661, longitude: 96.1951 },
  { name: 'Bago Junction', latitude: 17.3221, longitude: 96.4660 },
  { name: 'Kyaikto Highway', latitude: 17.3000, longitude: 97.0100 },
  { name: 'Thaton Crossing', latitude: 16.9200, longitude: 97.3500 },
  { name: 'Thanlwin Bridge', latitude: 16.8906, longitude: 97.6333, checkpointId: 'GATE-EAST-03' },
  { name: 'Hpa-An East Depot', latitude: 16.8500, longitude: 97.8000 },
  { name: 'Kawkareik Pass Gate', latitude: 16.5542, longitude: 98.2433, checkpointId: 'GATE-EAST-01' },
  { name: 'Dawna Mountain Highway', latitude: 16.6000, longitude: 98.3800 },
  { name: 'Myawaddy 105 Trade Zone', latitude: 16.6800, longitude: 98.5000 },
  { name: 'Myawaddy Friendship Bridge', latitude: 16.6908, longitude: 98.5133, checkpointId: 'GATE-EAST-02' },
]

export const EASTERN_OBSERVED_DETOUR_WAYPOINTS = [
  { name: 'Hpa-An East Depot', latitude: 16.8500, longitude: 97.8000 },
  { name: 'Zathabyin Southern River Road', latitude: 16.7000, longitude: 97.9500 },
  { name: 'Kyondo Bypass Track', latitude: 16.6200, longitude: 98.1500 },
  { name: 'Old Dawna Mountain Pass', latitude: 16.6400, longitude: 98.3500 },
  { name: 'Myawaddy West Approach', latitude: 16.6850, longitude: 98.4900 },
  { name: 'Myawaddy Friendship Bridge', latitude: 16.6908, longitude: 98.5133, checkpointId: 'GATE-EAST-02' },
]

export const SEEDED_ROUTES = [
  {
    id: 'ROUTE-NORTH-PRIMARY',
    corridorId: 'corridor-northern',
    name: 'AH14 National Highway (Muse Route)',
    source: 'ORS',
    trust_status: 'CONFIRMED',
    operational_status: 'CLEAR',
    confidence_score: 95,
    distanceKm: 1040,
    estimatedHours: 24,
    waypoints: NORTHERN_PRIMARY_WAYPOINTS,
    tripCount: 142,
    uniqueDrivers: 38,
  },
  {
    id: 'ROUTE-NORTH-OBSERVED',
    corridorId: 'corridor-northern',
    name: 'Namtu Valley Bypass (Driver Observed)',
    source: 'DRIVER_OBSERVED',
    trust_status: 'UNCONFIRMED',
    operational_status: 'CLEAR',
    confidence_score: 30,
    distanceKm: 1110,
    estimatedHours: 28,
    waypoints: NORTHERN_OBSERVED_DETOUR_WAYPOINTS,
    tripCount: 3,
    uniqueDrivers: 2,
    note: 'Unpaved gravel section between Namtu and Kutkai; passable during dry conditions.',
  },
  {
    id: 'ROUTE-EAST-PRIMARY',
    corridorId: 'corridor-eastern',
    name: 'AH1 Asia Highway (Myawaddy Route)',
    source: 'ORS',
    trust_status: 'CONFIRMED',
    operational_status: 'DISRUPTED',
    confidence_score: 80,
    distanceKm: 420,
    estimatedHours: 9,
    waypoints: EASTERN_PRIMARY_WAYPOINTS,
    tripCount: 210,
    uniqueDrivers: 64,
  },
  {
    id: 'ROUTE-EAST-DETOUR',
    corridorId: 'corridor-eastern',
    name: 'Old Dawna Mountain Pass (Driver Reroute)',
    source: 'DRIVER_OBSERVED',
    trust_status: 'CONFIRMED',
    operational_status: 'CLEAR',
    confidence_score: 65,
    distanceKm: 445,
    estimatedHours: 12,
    waypoints: EASTERN_OBSERVED_DETOUR_WAYPOINTS,
    tripCount: 18,
    uniqueDrivers: 7,
    note: 'Alternate single-lane route avoiding Kawkareik road blockage.',
  },
]
