import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedLabelProps {
  label: string;
  className?: string;
  style?: React.CSSProperties;
}

const variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: { y: -20, opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
};

const AnimatedLabel = (props: AnimatedLabelProps) => {
  const { label, style = {}, className = '' } = props;
  return (
    <div className="relative h-12 overflow-hidden flex items-center justify-center  ">
      <AnimatePresence mode="wait">
        <motion.span
          key={label}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`absolute ${className}`}
          style={style}
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedLabel;
