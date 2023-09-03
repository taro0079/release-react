import { motion } from 'framer-motion'

type Props = {
    children: React.ReactNode
}
const variant = {
    visible: {
        opacity: [0, 1, 1, 0],
    },
    // hidden: { opacity: 0 },
}

const Card: React.FC<Props> = (props: Props) => {
    return (
        <motion.div
            transition={{
                times: [0, 0.1, 0.9, 1],

                ease: ['easeIn', 'easeOut', 'easeIn', 'easeOut'],
                duration: 2,
            }}
            animate="visible"
            variants={variant}
            className="card"
        >
            {props.children}
        </motion.div>
    )
}

export default Card
