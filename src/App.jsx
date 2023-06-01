import React from 'react'
import Hero from './components/Hero'
import Demo from './components/Demo'

import './App.css'

const App = () => {
  return (
    <main>
      <div className='main  dark:bg-black'>
          <div className='gradient'/>
      </div>
      
      <div className='app'>
        <Hero />
        <Demo />
      </div>
    </main>
  )
}

export default App