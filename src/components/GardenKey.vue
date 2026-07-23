<template>
  <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
    <h3 class="text-lg font-semibold mb-3 text-center">🌿 Garden Key</h3>
    
    <!-- Plants -->
    <div class="mb-4">
      <h4 class="font-medium mb-2 text-sm opacity-80">Plant Types (by repo size)</h4>
      <div class="grid grid-cols-2 gap-2 text-xs">
        <div class="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M9 22 L8 22 Q7 16 6 10 Q9 14 12 10 Q13 16 13 22 Z" fill="#32CD32"/>
            <path d="M14 22 L13.5 22 Q13 17 12.5 12 Q14.5 15 16 12 Q16 17 15.5 22 Z" fill="#228B22" opacity="0.8"/>
          </svg>
          <span>Grass (&lt; 100MB)</span>
        </div>
        <div class="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <rect x="10" y="18" width="4" height="6" fill="#228B22" rx="1"/>
            <ellipse cx="12" cy="14" rx="9" ry="7" fill="#32CD32" opacity="0.7"/>
            <ellipse cx="8" cy="13" rx="6" ry="5" fill="#32CD32"/>
            <ellipse cx="16" cy="13" rx="6" ry="5" fill="#32CD32"/>
            <ellipse cx="12" cy="10" rx="7" ry="5" fill="#32CD32"/>
          </svg>
          <span>Shrub (100–500MB)</span>
        </div>
        <div class="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <rect x="10" y="14" width="4" height="10" fill="#228B22" rx="1"/>
            <polygon points="12,1 4,14 20,14" fill="#32CD32" opacity="0.7"/>
            <polygon points="12,4 6,13 18,13" fill="#32CD32" opacity="0.85"/>
            <polygon points="12,7 8,13 16,13" fill="#32CD32"/>
          </svg>
          <span>Tree (500MB–1GB)</span>
        </div>
        <div class="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <rect x="9" y="14" width="6" height="10" fill="#228B22" rx="1"/>
            <ellipse cx="12" cy="10" rx="11" ry="8" fill="#228B22" opacity="0.6"/>
            <ellipse cx="7" cy="11" rx="7" ry="6" fill="#32CD32" opacity="0.85"/>
            <ellipse cx="17" cy="11" rx="7" ry="6" fill="#32CD32" opacity="0.85"/>
            <ellipse cx="12" cy="7" rx="8" ry="6" fill="#32CD32"/>
          </svg>
          <span>Oak (&gt; 1GB)</span>
        </div>
      </div>
    </div>

    <!-- Insects -->
    <div>
      <h4 class="font-medium mb-2 text-sm opacity-80">Ecosystem</h4>
      <div class="space-y-1 text-xs">
        <div class="flex items-center gap-2">
          <svg width="24" height="24" viewBox="-12 -14 24 24">
            <ellipse cx="0" cy="2" rx="7" ry="4.5" fill="#FFD700"/>
            <rect x="-7" y="0.5" width="4" height="2.5" fill="#222" rx="1"/>
            <rect x="-1" y="0.5" width="4" height="2.5" fill="#222" rx="1"/>
            <rect x="4" y="0.5" width="3" height="2.5" fill="#222" rx="1"/>
            <circle cx="0" cy="-3" r="3.5" fill="#FFD700"/>
            <ellipse cx="-8" cy="-2" rx="6" ry="3" fill="#E0F0FF" opacity="0.85"/>
            <ellipse cx="8" cy="-2" rx="6" ry="3" fill="#E0F0FF" opacity="0.85"/>
          </svg>
          <span>Bees = Recent activity (7 days)</span>
        </div>
        <div class="flex items-center gap-2">
          <svg width="24" height="24" viewBox="-12 -12 24 20">
            <ellipse cx="0" cy="2" rx="5" ry="3.5" fill="#444"/>
            <ellipse cx="0" cy="-1" rx="3.5" ry="2.5" fill="#556655"/>
            <circle cx="0" cy="-4.5" r="3" fill="#333"/>
            <ellipse cx="-2" cy="-5" rx="1.8" ry="1.5" fill="#8B0000" opacity="0.9"/>
            <ellipse cx="2" cy="-5" rx="1.8" ry="1.5" fill="#8B0000" opacity="0.9"/>
            <ellipse cx="-7" cy="-1" rx="6" ry="2.5" fill="#B0C8D0" opacity="0.75"/>
            <ellipse cx="7" cy="-1" rx="6" ry="2.5" fill="#B0C8D0" opacity="0.75"/>
          </svg>
          <span>Flies = Open issues</span>
        </div>
        <div class="flex items-center gap-2">
          <svg width="24" height="24" viewBox="-18 -16 36 28">
            <path d="M0,-2 Q-14,-14 -16,-4 Q-14,2 0,2" fill="#FF6B35"/>
            <path d="M0,-2 Q14,-14 16,-4 Q14,2 0,2" fill="#FF6B35"/>
            <path d="M0,2 Q-10,8 -8,14 Q-3,12 0,6" fill="#FF8C42"/>
            <path d="M0,2 Q10,8 8,14 Q3,12 0,6" fill="#FF8C42"/>
            <circle cx="-9" cy="-6" r="2" fill="#FFF" opacity="0.8"/>
            <circle cx="9" cy="-6" r="2" fill="#FFF" opacity="0.8"/>
            <ellipse cx="0" cy="2" rx="1.5" ry="7" fill="#3A1A00"/>
          </svg>
          <span>Butterflies = Popular (10+ ⭐)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Static component — no logic needed
</script>