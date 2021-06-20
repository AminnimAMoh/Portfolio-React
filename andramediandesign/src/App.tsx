import React from 'react'
import MenuButton from './views/MenuButton'

interface Props {
  
}

function App({}: Props): React.ReactElement {
console.clear();
  return (
    <div style={{height: '100vh'}}>
        <MenuButton/>
    </div>
  )
}

export default App

