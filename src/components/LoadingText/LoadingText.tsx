import { delay, motion } from 'framer-motion'

const loadingDotVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const LoadingText = () => {
  return (
    <p style={{fontSize: "24px"}}>
      Loading
      <motion.span
        initial="hidden"
        animate="visible"
        variants={loadingDotVariant}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 0.6 }}
      >.</motion.span>
      <motion.span
        initial="hidden"
        animate="visible"
        variants={loadingDotVariant}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 0.6, delay: 0.2 }}
      >.</motion.span>
      <motion.span
        initial="hidden"
        animate="visible"
        variants={loadingDotVariant}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 0.6, delay: 0.4 }}
      >.</motion.span>
    </p>
  )
}
export default LoadingText
