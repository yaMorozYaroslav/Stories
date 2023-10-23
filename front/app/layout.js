import { Lora } from 'next/font/google'
//import {UserState} from '../context/user/UserState'
import {AllStates} from '../context/AllStates'
import {Header} from '../comps/Header/Header'
import {GlobalStyle} from './extra.styled'
import StyledComponentsRegistry from './registry';

const lora = Lora({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
  <html lang="en">
    <body className={lora.className}>
     <StyledComponentsRegistry>
      <GlobalStyle/>
       <AllStates>
        <Header/>
        {children}
      </AllStates>
     </StyledComponentsRegistry>
    </body>
   </html>
  )
}
