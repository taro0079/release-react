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
        >
            <div className="card">{props.children}</div>
            <img className='selfimage' src="/self.png" width={'100px'} />
        </motion.div>
    )
}

export default Card
