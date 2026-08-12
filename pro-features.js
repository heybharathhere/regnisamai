// pro-features.js
// Placeholder for future paid-tier gating. Nothing is locked yet —
// this just defines the shape so features can be flipped on later
// without restructuring the app. Everything behaves as the free
// experience today because IS_PRO is false and no flags are enabled.

const IS_PRO = false; // toggle manually for now; real entitlement check comes later

const PRO_FEATURES = {
  unlimitedHistory: { enabled: false, label: "Unlimited saved takes (beyond 5)" },
  extraThemes:      { enabled: false, label: "Additional theme packs" },
  exportAudio:      { enabled: false, label: "Export recordings as downloadable files" },
  advancedPitch:    { enabled: false, label: "Finer pitch control / true pitch-independent speed" }
  // add more candidate pro features here as they're decided
};

function isProFeatureEnabled(key){
  return IS_PRO && !!(PRO_FEATURES[key] && PRO_FEATURES[key].enabled);
}
