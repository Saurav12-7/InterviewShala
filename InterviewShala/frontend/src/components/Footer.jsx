import { faDiscord, faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Footer() {
  return (
    
  
    <footer className="mt-8 py-4 -mb-4 bg-gray-800 text-white text-center w-full">
            
            <div className="flex justify-center space-x-4">
              <a href="https://www.facebook.com/" className='transition-all duration-500 hover:translate-y-1' target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a href="https://www.instagram.com/" className='transition-all duration-500 hover:translate-y-1' target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a href="https://www.discord.com/" className='transition-all duration-500 hover:translate-y-1' target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faDiscord} size="2x" />
              </a>
              <a href="https://www.twitter.com/" className='transition-all duration-500 hover:translate-y-1' target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
            </div>

            <p>&copy; 2023 InterviewShala. All rights reserved.</p>
            <p>100 Feet Ring Road, Banashankari Stage III, Dwaraka Nagar, Banashankari, Bengaluru, Karnataka 560085</p>
            <p></p>
          </footer>
         
    
    
  )
}

export default Footer