<template>
  <defs>
    <!-- Bee: Yellow and black striped body with wings -->
    <g id="bee">
      <!-- Body -->
      <ellipse cx="0" cy="0" rx="4" ry="2" fill="#FFD700"/>
      <rect x="-2.5" y="-0.7" width="1" height="1.4" fill="#000"/>
      <rect x="-0.5" y="-0.7" width="1" height="1.4" fill="#000"/>
      <rect x="1.5" y="-0.7" width="1" height="1.4" fill="#000"/>
      <!-- Wings -->
      <ellipse cx="-1.3" cy="-1.3" rx="2.5" ry="1" fill="#FFF" opacity="0.7"/>
      <ellipse cx="1.3" cy="-1.3" rx="2.5" ry="1" fill="#FFF" opacity="0.7"/>
    </g>
    
    <!-- Fly: Small dark body -->
    <g id="fly">
      <!-- Body -->
      <ellipse cx="0" cy="0" rx="2.5" ry="1.3" fill="#333"/>
      <!-- Wings -->
      <ellipse cx="-0.7" cy="-1" rx="2" ry="0.7" fill="#666" opacity="0.5"/>
      <ellipse cx="0.7" cy="-1" rx="2" ry="0.7" fill="#666" opacity="0.5"/>
    </g>
    
    <!-- Butterfly: Colorful wings -->
    <g id="butterfly">
      <!-- Body -->
      <line x1="0" y1="-4" x2="0" y2="4" stroke="#8B4513" stroke-width="1"/>
      <!-- Upper wings -->
      <path d="M-1.3 -2.5 Q-5 -5 -2.5 -1.3 Q-1.3 -2.5 0 -1.3" fill="#FF6B6B"/>
      <path d="M1.3 -2.5 Q5 -5 2.5 -1.3 Q1.3 -2.5 0 -1.3" fill="#FF6B6B"/>
      <!-- Lower wings -->
      <path d="M-1.3 1.3 Q-4 4 -1.3 2.5 Q-1.3 1.3 0 1.3" fill="#FF8E8E"/>
      <path d="M1.3 1.3 Q4 4 1.3 2.5 Q1.3 1.3 0 1.3" fill="#FF8E8E"/>
      <!-- Wing spots -->
      <circle cx="-2.5" cy="-2.5" r="0.7" fill="#FFF" opacity="0.8"/>
      <circle cx="2.5" cy="-2.5" r="0.7" fill="#FFF" opacity="0.8"/>
    </g>
  </defs>
</template>