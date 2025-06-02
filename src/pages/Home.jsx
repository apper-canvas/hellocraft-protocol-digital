import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-soft border-b border-surface-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-glow">
                <ApperIcon name="Code2" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold gradient-text">HelloCraft</h1>
                <p className="text-xs sm:text-sm text-surface-600 hidden sm:block">JavaScript Tutorial Platform</p>
              </div>
            </motion.div>
            
            <nav className="flex items-center space-x-2 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 sm:p-3 text-surface-600 hover:text-primary hover:bg-primary-50 rounded-xl transition-all duration-200"
              >
                <ApperIcon name="BookOpen" className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 sm:p-3 text-surface-600 hover:text-primary hover:bg-primary-50 rounded-xl transition-all duration-200"
              >
                <ApperIcon name="Settings" className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6 sm:mb-8"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 mb-4 sm:mb-6">
              Learn JavaScript
              <span className="block gradient-text">One Line at a Time</span>
            </h2>
            <p className="text-lg sm:text-xl text-surface-600 max-w-3xl mx-auto leading-relaxed">
              Start your coding journey with interactive tutorials and a real-time code editor. 
              Write, run, and learn JavaScript from the very basics.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12"
          >
            <div className="flex items-center space-x-3 text-surface-700">
              <div className="w-8 h-8 bg-accent bg-opacity-20 rounded-lg flex items-center justify-center">
                <ApperIcon name="Play" className="w-4 h-4 text-accent" />
              </div>
              <span className="text-sm sm:text-base font-medium">Interactive Execution</span>
            </div>
            <div className="flex items-center space-x-3 text-surface-700">
              <div className="w-8 h-8 bg-secondary bg-opacity-20 rounded-lg flex items-center justify-center">
                <ApperIcon name="Lightbulb" className="w-4 h-4 text-secondary" />
              </div>
              <span className="text-sm sm:text-base font-medium">Step-by-Step Learning</span>
            </div>
            <div className="flex items-center space-x-3 text-surface-700">
              <div className="w-8 h-8 bg-primary bg-opacity-20 rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm sm:text-base font-medium">Real-time Feedback</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Feature */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <MainFeature />
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="bg-surface-900 text-white mt-16 sm:mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <ApperIcon name="Code2" className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">HelloCraft</h3>
              </div>
              <p className="text-surface-400 text-sm leading-relaxed">
                Your gateway to JavaScript mastery. Learn coding fundamentals through interactive tutorials and hands-on practice.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Learning</h4>
              <ul className="space-y-2 text-sm text-surface-400">
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Examples</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Challenges</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-surface-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 bg-surface-800 rounded-lg flex items-center justify-center hover:bg-surface-700 transition-colors">
                  <ApperIcon name="Github" className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-surface-800 rounded-lg flex items-center justify-center hover:bg-surface-700 transition-colors">
                  <ApperIcon name="Twitter" className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-surface-800 rounded-lg flex items-center justify-center hover:bg-surface-700 transition-colors">
                  <ApperIcon name="MessageCircle" className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-surface-800 mt-8 pt-6 text-center text-sm text-surface-400">
            <p>&copy; 2024 HelloCraft. Made with ❤️ for aspiring developers.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default Home