export const defaultVariant = {
  hidden: {
    y: 30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.3,
    },
  },
};

export const cardItemVariant = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

export const cardContainerVariant = {
  hidden: {
    y: 0,
    opacity: 1,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0,
      delay: 0.2,
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
};
