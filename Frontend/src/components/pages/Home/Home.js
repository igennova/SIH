import React from 'react'
import Convert from '../../../secondfeature/pages/LearnSign'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>

   
    <div>Features</div>
    <li>
    <Link to="/model">Use the translator</Link></li>
   <li> <Link to="/convertor">Use the Convertor</Link>
    </li>
    </>
  )
}
export default Home