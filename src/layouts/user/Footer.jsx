import React from 'react'

const Footer = () => {
  return (
    <div className="bg-gray-50 py-12 text-center">
      <h2 className="text-3xl font-bold text-black mb-4">
        Simulated Trading on <span className="text-yellow-500">CryptoCoin</span>
      </h2>
      <p className="text-gray-600 mb-6">
        Learn, practice, and experience trading crypto without risk.
      </p>

      {/* Social links */}
      <div className="flex justify-center space-x-12 text-gray-600 font-semibold  ">
        <a
          href="https://github.com/NgnTienDat"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:text-black"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.43 7.86 10.97.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.72 0-1.26.45-2.3 1.2-3.11-.12-.3-.52-1.52.12-3.17 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.49 3.2-1.18 3.2-1.18.64 1.65.24 2.87.12 3.17.75.81 1.2 1.85 1.2 3.11 0 4.46-2.68 5.42-5.23 5.71.42.37.79 1.1.79 2.22 0 1.6-.02 2.89-.02 3.28 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
          </svg>
          <span>GitHub</span>
        </a>

        <a
          href="mailto:tie.dat2004@gmail.com"
          className="flex items-center space-x-2 hover:text-black"
        >
          <svg width="20" height="16" viewBox="0 0 20 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 0h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm16 2H2v.5l8 5 8-5V2zm0 2.5l-8 5-8-5V14h16V4.5z" />
          </svg>
          <span>tie.dat2004@gmail.com</span>
        </a>

        <a
          href="https://www.linkedin.com/in/dat-nguyen-964ntd"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:text-black"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.98 3.5C4.98 5 3.9 6 2.5 6S0 5 0 3.5 1.08 1 2.5 1 4.98 2 4.98 3.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-.95 1.83-1.95 3.77-1.95C20.4 8.1 21 11 21 14.5V23h-4v-7.5c0-1.8-.03-4.1-2.5-4.1-2.5 0-2.9 1.9-2.9 4V23h-4V8z" />
          </svg>
          <span>LinkedIn</span>
        </a>
      </div>
    </div>

  )
}

export default Footer