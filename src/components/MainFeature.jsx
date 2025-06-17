import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import tutorialService from '@/services/api/tutorialService'

const MainFeature = () => {
  const [code, setCode] = useState('console.log("Hello, World!");')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [currentTutorial, setCurrentTutorial] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [tutorials, setTutorials] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const outputRef = useRef(null)

  // Load tutorials from database on component mount
  useEffect(() => {
    const loadTutorials = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const tutorialData = await tutorialService.getAll()
        
        if (tutorialData && tutorialData.length > 0) {
          setTutorials(tutorialData)
          // Set default code from first tutorial
          setCode(tutorialData[0].code || 'console.log("Hello, World!");')
        } else {
          // Fallback to default tutorial if no data from database
          const defaultTutorials = [
            {
              Id: 1,
              title: "Hello World",
              description: "Learn how to display text with console.log()",
              code: 'console.log("Hello, World!");',
              expected_output: "Hello, World!",
              hint: "Use console.log() to display text in the console. Don't forget the quotes around your text!"
            }
          ]
          setTutorials(defaultTutorials)
          setCode(defaultTutorials[0].code)
        }
      } catch (err) {
        console.error("Failed to load tutorials:", err)
        setError("Failed to load tutorials. Please try again.")
        toast.error("Failed to load tutorials")
      } finally {
        setIsLoading(false)
      }
    }
    
    loadTutorials()
  }, [])

  const currentTut = tutorials[currentTutorial] || {}
  const executeCode = () => {
    setIsRunning(true)
    setOutput('')
    
    try {
      // Create a custom console.log function to capture output
      const logs = []
      const customConsole = {
        log: (...args) => {
          logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
          ).join(' '))
        }
      }
      
      // Create a function with custom console
      const func = new Function('console', code)
      func(customConsole)
      
const result = logs.join('\n') || 'Code executed successfully (no output)'
      setOutput(result)
      
      // Check if output matches expected (for tutorials)
      if (currentTut && currentTut.expected_output && result.trim() === currentTut.expected_output.trim()) {
        toast.success('Perfect! You got the expected output! 🎉', {
          className: 'rounded-xl'
        })
      }
      
    } catch (error) {
      const errorMessage = `Error: ${error.message}`
      setOutput(errorMessage)
      toast.error('There was an error in your code. Check the output panel for details.', {
        className: 'rounded-xl'
      })
    }
    
    setTimeout(() => setIsRunning(false), 500)
  }

const loadTutorial = (index) => {
    if (tutorials[index]) {
      setCurrentTutorial(index)
      setCode(tutorials[index].code || '')
      setOutput('')
      setShowHint(false)
      toast.info(`Loaded: ${tutorials[index].title}`, {
        className: 'rounded-xl'
      })
    }
  }

  const resetCode = () => {
    setCode(currentTut.code || '')
    setOutput('')
    setShowHint(false)
    toast.info('Code reset to tutorial example', {
      className: 'rounded-xl'
    })
  }

  const highlightSyntax = (text) => {
    return text
      .replace(/\b(let|const|var|function|return|if|else|for|while)\b/g, '<span class="code-keyword">$1</span>')
      .replace(/"([^"]*)"/g, '<span class="code-string">"$1"</span>')
      .replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>')
      .replace(/\/\/.*$/gm, '<span class="code-comment">$&</span>')
  }

// Show loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-surface-600">Loading tutorials...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <ApperIcon name="AlertCircle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-surface-900 mb-2">Failed to Load Tutorials</h3>
            <p className="text-surface-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Tutorial Navigation - Mobile: Top, Desktop: Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3 order-1 lg:order-1"
        >
          <div className="card p-4 sm:p-6 sticky top-4">
            <h3 className="text-lg sm:text-xl font-bold text-surface-900 mb-4 flex items-center">
              <ApperIcon name="BookOpen" className="w-5 h-5 mr-2 text-primary" />
              Tutorials
            </h3>
            
            <div className="space-y-2 sm:space-y-3">
              {tutorials.map((tutorial, index) => (
                <motion.button
                  key={tutorial.Id || index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => loadTutorial(index)}
                  className={`w-full text-left p-3 sm:p-4 rounded-xl transition-all duration-200 ${
                    currentTutorial === index
                      ? 'bg-primary text-white shadow-glow'
                      : 'bg-surface-50 hover:bg-surface-100 text-surface-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm sm:text-base">{tutorial.title}</span>
                    {currentTutorial === index && (
                      <ApperIcon name="Play" className="w-4 h-4" />
                    )}
                  </div>
                  <p className={`text-xs sm:text-sm ${
                    currentTutorial === index ? 'text-primary-100' : 'text-surface-600'
                  }`}>
                    {tutorial.description}
                  </p>
                </motion.button>
              ))}
            </div>
            
            {/* Hint Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-4 bg-gradient-to-r from-secondary-50 to-accent-50 rounded-xl border border-secondary-200"
            >
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="font-medium text-secondary-800">Need a hint?</span>
                <ApperIcon 
                  name={showHint ? "ChevronUp" : "ChevronDown"} 
                  className="w-4 h-4 text-secondary-600" 
                />
              </button>
              
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
className="mt-3 text-sm text-secondary-700"
                >
                  {currentTut.hint || "No hint available for this tutorial."}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          </div>
        </motion.div>

        {/* Code Editor and Output */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-9 order-2 lg:order-2"
        >
          <div className="card overflow-hidden">
            {/* Editor Header */}
            <div className="bg-surface-900 text-white px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
<div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <h4 className="font-medium text-sm sm:text-base">
                  {currentTut.title || "JavaScript Tutorial"} - JavaScript Editor
                </h4>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetCode}
                  className="px-3 py-1.5 bg-surface-700 hover:bg-surface-600 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center space-x-1"
                >
                  <ApperIcon name="RotateCcw" className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Reset</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={executeCode}
                  disabled={isRunning}
                  className="btn-primary flex items-center space-x-2 px-4 py-1.5 text-xs sm:text-sm disabled:opacity-50"
                >
                  {isRunning ? (
                    <ApperIcon name="Loader2" className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                  ) : (
                    <ApperIcon name="Play" className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                  <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2">
              {/* Code Editor */}
              <div className="relative">
                <div className="bg-surface-100 px-4 py-2 border-b border-surface-200 xl:border-r xl:border-b-0">
                  <span className="text-xs sm:text-sm font-medium text-surface-600 flex items-center">
                    <ApperIcon name="FileText" className="w-4 h-4 mr-2" />
                    Editor
                  </span>
                </div>
                <div className="relative">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-64 sm:h-80 xl:h-96 code-editor resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 xl:rounded-none xl:rounded-bl-2xl"
                    placeholder="Write your JavaScript code here..."
                    spellCheck={false}
                  />
                  
                  {/* Line numbers */}
                  <div className="absolute left-0 top-0 p-4 text-code-comment text-xs pointer-events-none font-mono">
                    {code.split('\n').map((_, index) => (
                      <div key={index} className="leading-5 sm:leading-6">
                        {index + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Output Panel */}
              <div className="bg-white xl:rounded-br-2xl">
                <div className="bg-surface-100 px-4 py-2 border-t border-surface-200 xl:border-t-0 xl:border-b">
                  <span className="text-xs sm:text-sm font-medium text-surface-600 flex items-center">
                    <ApperIcon name="Terminal" className="w-4 h-4 mr-2" />
                    Output
                  </span>
                </div>
                <div 
                  ref={outputRef}
                  className="h-64 sm:h-80 xl:h-96 p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-auto bg-surface-50"
                >
                  {output ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`whitespace-pre-wrap ${
                        output.startsWith('Error:') 
                          ? 'text-red-600' 
                          : 'text-surface-800'
                      }`}
                    >
                      {output}
                    </motion.div>
                  ) : (
                    <div className="text-surface-500 italic flex items-center justify-center h-full">
                      <div className="text-center">
                        <ApperIcon name="Play" className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 text-surface-400" />
                        <p className="text-sm sm:text-base">Click "Run Code" to see the output</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tutorial Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 sm:mt-8 card p-4 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
<h4 className="font-semibold text-surface-900 mb-1">
                  Progress: {currentTutorial + 1} of {tutorials.length}
                </h4>
                <p className="text-sm text-surface-600">{currentTut.description || "Interactive JavaScript tutorial"}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => currentTutorial > 0 && loadTutorial(currentTutorial - 1)}
                  disabled={currentTutorial === 0}
                  className="p-2 rounded-lg bg-surface-100 hover:bg-surface-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ApperIcon name="ChevronLeft" className="w-5 h-5" />
                </button>
                
                <div className="flex space-x-1 px-3">
                  {tutorials.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentTutorial ? 'bg-primary' : 'bg-surface-300'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={() => currentTutorial < tutorials.length - 1 && loadTutorial(currentTutorial + 1)}
                  disabled={currentTutorial === tutorials.length - 1}
                  className="p-2 rounded-lg bg-surface-100 hover:bg-surface-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ApperIcon name="ChevronRight" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default MainFeature