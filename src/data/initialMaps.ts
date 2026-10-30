import { CraftlandMap } from '../types';

export const INITIAL_MAPS: CraftlandMap[] = [
  {
    id: 'map-1v1-desert-colosseum',
    title: '1v1 God Mode Colosseum (Fast Gloo & Unlimited Ammo)',
    tagline: 'The official esports 1v1 training arena designed for lightning-fast weapon switching and instant wall placement.',
    description: 'Custom-tailored duel arena built with symmetrical ramps, elevated spectator platforms, and reinforced barriers. Features zero fall damage, infinite ammo, infinite gloo walls with auto-break after 4 seconds to prevent wall camping, and custom headshot sound indicators. Perfect for Desert Eagle, M1014, and Woodpecker practice.',
    category: '1v1 Clash',
    imageUrl: '/src/assets/images/map_1v1_desert_1793334372269.jpg',
    creator: 'Crafter Sajjad',
    createdAt: '2026-10-24T14:30:00Z',
    likes: 4920,
    views: 38400,
    copies: 14850,
    featured: true,
    maxPlayers: '1 vs 1 (or 2 vs 2)',
    recommendedWeapon: 'Desert Eagle / M1014 / Shotgun',
    difficulty: 'Hard',
    tags: ['1v1', 'UnlimitedGloo', 'DesertEagle', 'FastSwitch', 'EsportsDuel'],
    features: [
      'Infinite Gloo Walls & Ammo',
      'Auto-clearing Gloo Walls (4s decay)',
      'Symmetric balanced spawn positions',
      'Zero fall damage penalty',
      'Headshot boost visual feedback'
    ],
    rules: [
      'Round time: 120 seconds',
      'No rooftop camping',
      'Spawn protection active for 3 seconds'
    ],
    serverCodes: [
      {
        id: 'sc-1-bd',
        serverName: 'Bangladesh',
        serverCode: 'BD',
        flag: '🇧🇩',
        code: '#FREEFIRE98214BD9102',
        notes: 'Highest popularity in BD server (Ping < 25ms recommended)'
      },
      {
        id: 'sc-1-ind',
        serverName: 'India',
        serverCode: 'IND',
        flag: '🇮🇳',
        code: '#FREEFIRE83214IND983',
        notes: 'Updated for OB50 patch compatibility'
      },
      {
        id: 'sc-1-id',
        serverName: 'Indonesia',
        serverCode: 'ID',
        flag: '🇮🇩',
        code: '#FREEFIRE44910ID820',
        notes: 'Server ID verified with auto-aim calibration'
      },
      {
        id: 'sc-1-pk',
        serverName: 'Pakistan',
        serverCode: 'PK',
        flag: '🇵🇰',
        code: '#FREEFIRE77291PK003',
        notes: 'Active tournament room code'
      },
      {
        id: 'sc-1-gl',
        serverName: 'Global / MENA / EU',
        serverCode: 'GLOBAL',
        flag: '🌍',
        code: '#FREEFIRE55102GL491',
        notes: 'Universal global server code'
      }
    ],
    comments: [
      {
        id: 'c-1',
        author: 'BD_ProShooter',
        avatarSeed: 'shooter1',
        rating: 5,
        text: 'Best 1v1 map for Bangladesh server! Wall speed is insane and zero lag.',
        createdAt: '2026-10-25T10:14:00Z',
        server: 'Bangladesh'
      },
      {
        id: 'c-2',
        author: 'Aryan_FF_King',
        avatarSeed: 'aryan99',
        rating: 5,
        text: 'The Desert Eagle headshots hit so crisp here. Thanks Crafter Sajjad bhai!',
        createdAt: '2026-10-26T18:22:00Z',
        server: 'India'
      }
    ]
  },
  {
    id: 'map-sky-parkour-only-up',
    title: 'Cyber Sky Parkour: Only Up 500M Summit',
    tagline: 'High-altitude vertical parkour challenge above the clouds with checkpoint rings and moving speed pads.',
    description: 'An adrenaline-filled vertical obstacle course suspended high above the island clouds. Test your precision movement, wall bouncing, and timing across neon launch pads, holographic rotating beams, and narrow spiral scaffolding. Features safe checkpoint teleports every 100 meters and a summit fireworks podium.',
    category: 'Parkour / Only Up',
    imageUrl: '/src/assets/images/map_parkour_sky_1793334372387.jpg',
    creator: 'Crafter Sajjad',
    createdAt: '2026-10-20T09:15:00Z',
    likes: 6410,
    views: 45200,
    copies: 18920,
    featured: true,
    maxPlayers: '1 to 12 Players',
    recommendedWeapon: 'Melee / Katana / Fists Only',
    difficulty: 'Extreme',
    tags: ['Parkour', 'OnlyUp', 'HighAltitude', 'NeonCyber', 'Speedrun'],
    features: [
      '500-meter vertical altitude ascent',
      '5 Checkpoint rings with auto-save',
      'Cyber jump launch pads (+150% jump force)',
      'Built-in speedrun lap timer',
      'Fireworks podium at the summit'
    ],
    rules: [
      'Weapons disabled',
      'Step on yellow pads for super boost',
      'Respawn teleports back to your last ring'
    ],
    serverCodes: [
      {
        id: 'sc-2-bd',
        serverName: 'Bangladesh',
        serverCode: 'BD',
        flag: '🇧🇩',
        code: '#FREEFIREBD7739201948',
        notes: 'Leaderboard fastest time: 3m 42s'
      },
      {
        id: 'sc-2-ind',
        serverName: 'India',
        serverCode: 'IND',
        flag: '🇮🇳',
        code: '#FREEFIREIND882910492',
        notes: 'Full checkpoint script active'
      },
      {
        id: 'sc-2-id',
        serverName: 'Indonesia',
        serverCode: 'ID',
        flag: '🇮🇩',
        code: '#FREEFIREID554920194',
        notes: 'Indonesian parkour community choice'
      },
      {
        id: 'sc-2-pk',
        serverName: 'Pakistan',
        serverCode: 'PK',
        flag: '🇵🇰',
        code: '#FREEFIREPK338291049',
        notes: 'High stability room configuration'
      },
      {
        id: 'sc-2-gl',
        serverName: 'Global / Other',
        serverCode: 'GLOBAL',
        flag: '🌍',
        code: '#FREEFIREGL994820194',
        notes: 'Universal global server code'
      }
    ],
    comments: [
      {
        id: 'c-3',
        author: 'SpeedyKazi',
        avatarSeed: 'kazi22',
        rating: 5,
        text: 'Finally finished without falling on level 4! Hardest and most rewarding map ever.',
        createdAt: '2026-10-22T16:40:00Z',
        server: 'Bangladesh'
      }
    ]
  },
  {
    id: 'map-zombie-survival-bunker',
    title: 'Biohazard Bunker: 4-Player Co-Op Zombie Defense',
    tagline: 'Defend your fortified bunker against 15 waves of mutant infected with weapon upgrade mystery crates.',
    description: 'Cooperative survival horror map. 4 players start with basic pistols inside an underground command bunker. Build barricades, activate automated laser traps, and spend score points at weapon upgrade stations to survive against 15 escalating waves of mutant runners, brute tank zombies, and the final mutated boss.',
    category: 'Zombie Survival',
    imageUrl: '/src/assets/images/map_zombie_bunker_1793334372134.jpg',
    creator: 'Crafter Sajjad',
    createdAt: '2026-10-14T11:00:00Z',
    likes: 3950,
    views: 29700,
    copies: 11200,
    featured: false,
    maxPlayers: '1 to 4 Players (Co-Op)',
    recommendedWeapon: 'M4A1 / MP40 / Shotgun & Grenades',
    difficulty: 'Hard',
    tags: ['ZombieDefense', 'CoOpSurvival', 'WaveDefense', 'MysteryBox', 'Bunker'],
    features: [
      '15 progressive infected waves',
      'Dynamic barricade repair mechanics',
      'Mystery weapon unlock crates',
      'Laser defense traps with energy recharge',
      'Boss fight encounter at wave 15'
    ],
    rules: [
      'Stick together; reviving fallen teammates takes 4s',
      'Collect dropped supply energy cells',
      'Do not let infected breach generator core'
    ],
    serverCodes: [
      {
        id: 'sc-3-bd',
        serverName: 'Bangladesh',
        serverCode: 'BD',
        flag: '🇧🇩',
        code: '#FREEFIREBD4492019481',
        notes: 'Full Bengali UI text prompts'
      },
      {
        id: 'sc-3-ind',
        serverName: 'India',
        serverCode: 'IND',
        flag: '🇮🇳',
        code: '#FREEFIREIND663920194',
        notes: 'High difficulty wave balancing'
      },
      {
        id: 'sc-3-id',
        serverName: 'Indonesia',
        serverCode: 'ID',
        flag: '🇮🇩',
        code: '#FREEFIREID229384019',
        notes: 'Optimized for smooth 4-player ping'
      },
      {
        id: 'sc-3-pk',
        serverName: 'Pakistan',
        serverCode: 'PK',
        flag: '🇵🇰',
        code: '#FREEFIREPK773920194',
        notes: 'Updated weapon spawn rates'
      },
      {
        id: 'sc-3-gl',
        serverName: 'Global / Other',
        serverCode: 'GLOBAL',
        flag: '🌍',
        code: '#FREEFIREGL883920194',
        notes: 'Universal global server code'
      }
    ],
    comments: [
      {
        id: 'c-4',
        author: 'Tanvir_Z_Hunter',
        avatarSeed: 'tanvir01',
        rating: 5,
        text: 'Wave 15 boss is insane! We beat it on 3rd try. Amazing scripting Sajjad!',
        createdAt: '2026-10-18T19:50:00Z',
        server: 'Bangladesh'
      }
    ]
  },
  {
    id: 'map-cyber-neon-clash',
    title: 'Cyber Neon Central Arena (4v4 Clash Squad Pro Cup)',
    tagline: 'High-octane tournament esports Clash Squad arena with custom buy stations and tiered cover geometry.',
    description: 'Designed exclusively for competitive squad scrims and guild wars. Features 3 balanced lanes, mirrored cover placements, elevated sniper catwalks, and instant coin earning system. Includes customized buy stores with all competitive assault rifles and SMGs pre-unlocked with infinite gloo walls.',
    category: 'Unlimited Gloo',
    imageUrl: '/src/assets/images/hero_craftland_arena_1793334371324.jpg',
    creator: 'Crafter Sajjad',
    createdAt: '2026-10-27T18:00:00Z',
    likes: 8350,
    views: 61200,
    copies: 22400,
    featured: true,
    maxPlayers: '4 vs 4 Squads',
    recommendedWeapon: 'SCAR / MP5-III / Thompson / Gloo Wall',
    difficulty: 'Medium',
    tags: ['ClashSquad', '4v4', 'GuildWar', 'TournamentMap', 'NeonEsports'],
    features: [
      'Balanced 3-lane competitive geometry',
      'Infinite Gloo Walls & maximum speed',
      'Anti-nade spawn boundary barriers',
      'Custom economy store system (9999 coins)',
      'Spectator free-cam booth for tournament casters'
    ],
    rules: [
      'Best of 13 rounds (First to 7 wins)',
      'Smoke grenades limited to 1 per round',
      'No delay between rounds'
    ],
    serverCodes: [
      {
        id: 'sc-4-bd',
        serverName: 'Bangladesh',
        serverCode: 'BD',
        flag: '🇧🇩',
        code: '#FREEFIREBD1102948291',
        notes: 'Used in BD Guild Tournament Season 8'
      },
      {
        id: 'sc-4-ind',
        serverName: 'India',
        serverCode: 'IND',
        flag: '🇮🇳',
        code: '#FREEFIREIND330294829',
        notes: 'Verified competitive scrim server'
      },
      {
        id: 'sc-4-id',
        serverName: 'Indonesia',
        serverCode: 'ID',
        flag: '🇮🇩',
        code: '#FREEFIREID440294829',
        notes: 'Ranked matchmaking enabled'
      },
      {
        id: 'sc-4-pk',
        serverName: 'Pakistan',
        serverCode: 'PK',
        flag: '🇵🇰',
        code: '#FREEFIREPK550294829',
        notes: 'Official PK Scrim league edition'
      },
      {
        id: 'sc-4-gl',
        serverName: 'Global / Other',
        serverCode: 'GLOBAL',
        flag: '🌍',
        code: '#FREEFIREGL660294829',
        notes: 'Universal global server code'
      }
    ],
    comments: [
      {
        id: 'c-5',
        author: 'Guild_Leader_Rony',
        avatarSeed: 'rony77',
        rating: 5,
        text: 'Our whole guild uses this map everyday for training. Perfect FPS and zero stutter!',
        createdAt: '2026-10-28T12:10:00Z',
        server: 'Bangladesh'
      }
    ]
  },
  {
    id: 'map-sniper-tower-duel',
    title: 'One-Shot Sniper Tower Duel (AWM & M82B Only)',
    tagline: 'High-stakes long-range sniper shootout between twin skyscrapers with moving jump pads and wind barriers.',
    description: 'Face off across twin sniper towers separated by a 150-meter chasm. Precision is everything: quick-scoping, double-sniper switching, and ducking behind destructible glass barriers. All players have increased movement speed, low gravity, and instant 1-shot headshot multiplier.',
    category: 'Sniper Arena',
    imageUrl: '/src/assets/images/map_1v1_desert_1793334372269.jpg',
    creator: 'Crafter Sajjad',
    createdAt: '2026-10-08T15:20:00Z',
    likes: 5210,
    views: 33100,
    copies: 13400,
    featured: false,
    maxPlayers: '1v1 or 4v4',
    recommendedWeapon: 'AWM / Barrett M82B / Kar98k',
    difficulty: 'Extreme',
    tags: ['Sniper', 'OneShot', 'AWM', 'QuickScope', 'LongRange'],
    features: [
      'Twin skyscraper mirrored duel layout',
      'Low gravity float jumps (50% gravity)',
      'Double sniper switch with zero reload delay',
      'Destructible shield partitions',
      'One-hit headshot elimination rule'
    ],
    rules: [
      'Assault rifles and SMGs strictly locked',
      'Quick switch timing practice',
      'Falling off tower causes instant elimination'
    ],
    serverCodes: [
      {
        id: 'sc-5-bd',
        serverName: 'Bangladesh',
        serverCode: 'BD',
        flag: '🇧🇩',
        code: '#FREEFIREBD9928371625',
        notes: 'AWM Quick-scope mode active'
      },
      {
        id: 'sc-5-ind',
        serverName: 'India',
        serverCode: 'IND',
        flag: '🇮🇳',
        code: '#FREEFIREIND882736152',
        notes: 'Low ping server cluster'
      },
      {
        id: 'sc-5-id',
        serverName: 'Indonesia',
        serverCode: 'ID',
        flag: '🇮🇩',
        code: '#FREEFIREID772635142',
        notes: 'M82B wall penetration enabled'
      },
      {
        id: 'sc-5-gl',
        serverName: 'Global / Other',
        serverCode: 'GLOBAL',
        flag: '🌍',
        code: '#FREEFIREGL662534132',
        notes: 'Universal global server code'
      }
    ]
  },
  {
    id: 'map-hide-seek-mall',
    title: 'Neon Megamall: Prop Hunt & Hide and Seek',
    tagline: 'Transform into vending machines, weapon crates, or potted plants in a 3-floor futuristic shopping center.',
    description: 'Fun social party mode for Free Fire friends. Hiders can morph into 30+ varied environment props, whistle to taunt hunters, and use smoke decoys to escape. Hunters are equipped with short-range shotguns and must scan every corner before the 5-minute timer expires.',
    category: 'Hide & Seek',
    imageUrl: '/src/assets/images/hero_craftland_arena_1793334371324.jpg',
    creator: 'Crafter Sajjad',
    createdAt: '2026-10-02T12:00:00Z',
    likes: 3120,
    views: 24500,
    copies: 8750,
    featured: false,
    maxPlayers: '6 to 12 Players',
    recommendedWeapon: 'Shotgun (Hunters) / Prop Wand (Hiders)',
    difficulty: 'Easy',
    tags: ['HideAndSeek', 'PropHunt', 'MiniGame', 'PartyFun', 'FriendsOnly'],
    features: [
      '3-story shopping mall with escalator shortcuts',
      '35+ selectable prop disguise shapes',
      'Taunt whistle generator (+50 score bonus)',
      'Blinding flashbang smoke traps for hiders',
      'Custom victory dance podium'
    ],
    rules: [
      'Hunters blindfolded for the first 30 seconds',
      'Shooting wrong props deals 10 HP self-damage to hunters',
      'Hiders must whistle at least once every 45s'
    ],
    serverCodes: [
      {
        id: 'sc-6-bd',
        serverName: 'Bangladesh',
        serverCode: 'BD',
        flag: '🇧🇩',
        code: '#FREEFIREBD3392847102',
        notes: 'Best played with 8+ friends in custom room'
      },
      {
        id: 'sc-6-ind',
        serverName: 'India',
        serverCode: 'IND',
        flag: '🇮🇳',
        code: '#FREEFIREIND229183740',
        notes: 'Auto-prop cycle enabled'
      },
      {
        id: 'sc-6-id',
        serverName: 'Indonesia',
        serverCode: 'ID',
        flag: '🇮🇩',
        code: '#FREEFIREID119283746',
        notes: 'Party room favorite'
      },
      {
        id: 'sc-6-gl',
        serverName: 'Global / Other',
        serverCode: 'GLOBAL',
        flag: '🌍',
        code: '#FREEFIREGL559283741',
        notes: 'Universal global server code'
      }
    ]
  }
];

export const PRESET_IMAGES = [
  {
    name: '1v1 Desert Arena',
    url: '/src/assets/images/map_1v1_desert_1793334372269.jpg'
  },
  {
    name: 'Cyber Sky Parkour',
    url: '/src/assets/images/map_parkour_sky_1793334372387.jpg'
  },
  {
    name: 'Biohazard Zombie Bunker',
    url: '/src/assets/images/map_zombie_bunker_1793334372134.jpg'
  },
  {
    name: 'Cyber Neon Arena',
    url: '/src/assets/images/hero_craftland_arena_1793334371324.jpg'
  }
];

export const SERVER_PRESETS = [
  { name: 'Bangladesh', code: 'BD' as const, flag: '🇧🇩' },
  { name: 'India', code: 'IND' as const, flag: '🇮🇳' },
  { name: 'Indonesia', code: 'ID' as const, flag: '🇮🇩' },
  { name: 'Pakistan', code: 'PK' as const, flag: '🇵🇰' },
  { name: 'Brazil', code: 'BR' as const, flag: '🇧🇷' },
  { name: 'Europe', code: 'EU' as const, flag: '🇪🇺' },
  { name: 'Global', code: 'GLOBAL' as const, flag: '🌍' }
];
