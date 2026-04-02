// Helps format time like 03:45
export const formatTime = (seconds) => {
  if (seconds == null) return '--:--';
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

// Check if two cells interact (same row, col, or 3x3 box)
export const isRelatedCell = (r1, c1, r2, c2) => {
  if (r1 === null || c1 === null || r2 === null || c2 === null) return false;
  if (r1 === r2 || c1 === c2) return true;
  
  const boxR1 = Math.floor(r1 / 3);
  const boxC1 = Math.floor(c1 / 3);
  const boxR2 = Math.floor(r2 / 3);
  const boxC2 = Math.floor(c2 / 3);
  
  return boxR1 === boxR2 && boxC1 === boxC2;
};
