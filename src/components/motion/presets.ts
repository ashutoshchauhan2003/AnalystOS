export const premiumEase = [0.22, 1, 0.36, 1] as const;

export const premiumHover = {
  y: -4,
  scale: 1.006,
  transition: {
    duration: 0.32,
    ease: premiumEase,
  },
};

export const premiumTap = {
  scale: 0.992,
};
