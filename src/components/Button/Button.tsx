import React from 'react'
import { motion } from 'framer-motion'

type Props = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    children: React.ReactNode
}

const Button: React.FC<Props> = ({ onClick, children }) => {
    return (
        <motion.button
            onClick={onClick}
            initial={{ opacity: 0.6 }}
            whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
            }}
            whileTap={{
                scale: 0.9,
            }}
        >
            {children}
        </motion.button>
    )
}

export default Button

