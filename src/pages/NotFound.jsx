import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow">
            <ApperIcon name="Code2" className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
          </div>
          <h1 className="text-6xl sm:text-8xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 mb-4">Page Not Found</h2>
          <p className="text-surface-600 mb-8 leading-relaxed">
            Looks like this page doesn't exist. Let's get you back to coding!
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link 
            to="/"
            className="btn-primary inline-flex items-center space-x-2 hover-lift"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            <span>Back to HelloCraft</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound