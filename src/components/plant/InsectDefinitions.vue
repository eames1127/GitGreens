<template>
  <defs>
    <!-- BEE: ~14px wide, chunky and visible -->
    <g id="bee">
      <!-- Abdomen (striped) -->
      <ellipse cx="0" cy="2" rx="7" ry="4.5" fill="#FFD700"/>
      <rect x="-7" y="0.5" width="4" height="2.5" fill="#222" rx="1"/>
      <rect x="-1" y="0.5" width="4" height="2.5" fill="#222" rx="1"/>
      <rect x="4" y="0.5" width="3" height="2.5" fill="#222" rx="1"/>
      <!-- Head -->
      <circle cx="0" cy="-3" r="3.5" fill="#FFD700"/>
      <circle cx="-1.2" cy="-3.5" r="0.8" fill="#222"/>
      <circle cx="1.2" cy="-3.5" r="0.8" fill="#222"/>
      <!-- Antennae -->
      <line x1="-1.5" y1="-6" x2="-3.5" y2="-9" stroke="#222" stroke-width="0.8"/>
      <circle cx="-3.5" cy="-9.5" r="1" fill="#FFD700"/>
      <line x1="1.5" y1="-6" x2="3.5" y2="-9" stroke="#222" stroke-width="0.8"/>
      <circle cx="3.5" cy="-9.5" r="1" fill="#FFD700"/>
      <!-- Wings -->
      <ellipse cx="-8" cy="-2" rx="6" ry="3" fill="#E0F0FF" opacity="0.85" stroke="#aad" stroke-width="0.4"/>
      <ellipse cx="8" cy="-2" rx="6" ry="3" fill="#E0F0FF" opacity="0.85" stroke="#aad" stroke-width="0.4"/>
      <ellipse cx="-6" cy="1" rx="4" ry="2" fill="#E0F0FF" opacity="0.7" stroke="#aad" stroke-width="0.4"/>
      <ellipse cx="6" cy="1" rx="4" ry="2" fill="#E0F0FF" opacity="0.7" stroke="#aad" stroke-width="0.4"/>
      <!-- Stinger -->
      <polygon points="7,3 10,2 7,5" fill="#c8a000"/>
    </g>

    <!-- FLY: ~12px wide, dark metallic body -->
    <g id="fly">
      <!-- Abdomen -->
      <ellipse cx="0" cy="2" rx="5" ry="3.5" fill="#444"/>
      <ellipse cx="0" cy="1" rx="4" ry="2" fill="#666"/>
      <!-- Thorax sheen -->
      <ellipse cx="0" cy="-1" rx="3.5" ry="2.5" fill="#556655"/>
      <!-- Head -->
      <circle cx="0" cy="-4.5" r="3" fill="#333"/>
      <!-- Compound eyes -->
      <ellipse cx="-2" cy="-5" rx="1.8" ry="1.5" fill="#8B0000" opacity="0.9"/>
      <ellipse cx="2" cy="-5" rx="1.8" ry="1.5" fill="#8B0000" opacity="0.9"/>
      <!-- Eye shine -->
      <circle cx="-1.5" cy="-5.5" r="0.5" fill="#FF4444" opacity="0.7"/>
      <circle cx="2.5" cy="-5.5" r="0.5" fill="#FF4444" opacity="0.7"/>
      <!-- Wings (iridescent) -->
      <ellipse cx="-7" cy="-1" rx="6" ry="2.5" fill="#B0C8D0" opacity="0.75" stroke="#89a" stroke-width="0.3"/>
      <ellipse cx="7" cy="-1" rx="6" ry="2.5" fill="#B0C8D0" opacity="0.75" stroke="#89a" stroke-width="0.3"/>
      <!-- Legs -->
      <line x1="-3" y1="1" x2="-8" y2="5" stroke="#222" stroke-width="0.7"/>
      <line x1="-2" y1="2" x2="-7" y2="7" stroke="#222" stroke-width="0.7"/>
      <line x1="3" y1="1" x2="8" y2="5" stroke="#222" stroke-width="0.7"/>
      <line x1="2" y1="2" x2="7" y2="7" stroke="#222" stroke-width="0.7"/>
    </g>

    <!-- BUTTERFLY: ~18px wide, vivid wings -->
    <g id="butterfly">
      <!-- Upper wings -->
      <path d="M0,-2 Q-14,-14 -16,-4 Q-14,2 0,2" fill="#FF6B35" stroke="#c04010" stroke-width="0.5"/>
      <path d="M0,-2 Q14,-14 16,-4 Q14,2 0,2" fill="#FF6B35" stroke="#c04010" stroke-width="0.5"/>
      <!-- Lower wings -->
      <path d="M0,2 Q-10,8 -8,14 Q-3,12 0,6" fill="#FF8C42" stroke="#c04010" stroke-width="0.5"/>
      <path d="M0,2 Q10,8 8,14 Q3,12 0,6" fill="#FF8C42" stroke="#c04010" stroke-width="0.5"/>
      <!-- Wing markings (white spots) -->
      <circle cx="-9" cy="-6" r="2" fill="#FFF" opacity="0.8"/>
      <circle cx="9" cy="-6" r="2" fill="#FFF" opacity="0.8"/>
      <circle cx="-11" cy="-1" r="1.2" fill="#FFE" opacity="0.7"/>
      <circle cx="11" cy="-1" r="1.2" fill="#FFE" opacity="0.7"/>
      <!-- Black wing border -->
      <path d="M0,-2 Q-14,-14 -16,-4" fill="none" stroke="#111" stroke-width="1.2" opacity="0.4"/>
      <path d="M0,-2 Q14,-14 16,-4" fill="none" stroke="#111" stroke-width="1.2" opacity="0.4"/>
      <!-- Body -->
      <ellipse cx="0" cy="2" rx="1.5" ry="7" fill="#3A1A00"/>
      <!-- Head -->
      <circle cx="0" cy="-4" r="1.8" fill="#3A1A00"/>
      <!-- Antennae -->
      <line x1="-0.5" y1="-5.5" x2="-4" y2="-12" stroke="#3A1A00" stroke-width="0.8"/>
      <circle cx="-4" cy="-12.5" r="1.2" fill="#FF6B35"/>
      <line x1="0.5" y1="-5.5" x2="4" y2="-12" stroke="#3A1A00" stroke-width="0.8"/>
      <circle cx="4" cy="-12.5" r="1.2" fill="#FF6B35"/>
    </g>
  </defs>
</template>