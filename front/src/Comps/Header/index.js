import React from 'react'
import './styles.scss'
import  Acorn from '../../Tools/imgs/acorn.png'

export const Header =props=> {
	return(
      <header data-test="headerComponent">
         <div className='wrap'>
           <div className='logo'>
               <img data-test='logoIMG' src={Acorn} alt='Acorn' />
            </div>
          </div>
          <div>Header</div>
      </header>
		  )
      }