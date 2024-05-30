import Navbar from './Navbar/Navbar'
import Panels from './Panels/Panels'
import FooterMenu from './FooterMenu/FooterMenu'
import Toolbox from './Toolbox/Toolbox'
import CanvasArea from './CanvasArea/CanvasArea'
import './Editor.scss'
import React from 'react';


function Editor() {
  return (
    <div className="editor">
      <Navbar />
      <div className="section-two">
        <Panels />
        <div className="section-three">
          <Toolbox />
          <CanvasArea />
          <FooterMenu />
        </div>
      </div>
    </div>
  )
}

export default Editor
