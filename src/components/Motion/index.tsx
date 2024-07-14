import { ReactNode, forwardRef } from 'react';

import { HTMLMotionProps, motion } from 'framer-motion';

/**
 * div
 */
interface MotionDivProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
}

const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>(({ children, ...props }, ref) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      ref={ref}
      {...props}
    >
      {children}
    </motion.div>
  );
});

export { MotionDiv };
