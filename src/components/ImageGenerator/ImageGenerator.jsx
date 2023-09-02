import React, { useRef, useState } from 'react'
import './ImageGenerator.css'

import default_image from '../assets/default.jpg'

function ImageGenerator() {

  const [img_url, setimg_url] = useState("/");
  let inputRef = useRef(null);
  const [loading,setloading] = useState(false);

  const GenerateImage = async () => {
    if (inputRef.current.value === "") {
      return (0);
    }
    setloading(true);
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
          Authorization : 
          "Bearer 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",
          "User-Agent" : "Chrome",
        },
        body:JSON.stringify({
          prompt : `${inputRef.current.value}`,
          n : 1,
          size : "512x512",
        }),
      }
      );
      
      let data = await response.json();
      setimg_url(data.data[0].url);
      setloading(false);
    }
    
    return (
      <div className='ai'>
        <div className="header"><p>AI </p>Image <span>Generator</span></div>
        <div className="img-loading">
          <div className="image">
            <img src={img_url === "/" ? default_image : img_url} alt="" />
            <div className="loading">
              <div className={loading?"loading-bar-full":"loading-bar"}></div>
              <div className={loading?"loading-text":"display-none"}>Loading...</div>
            </div>
          </div>
        </div>
        <div className='search'>
          <input ref={inputRef} type="text" placeholder='Describe what you want to see here...'/>
          <div className="imagine" onClick={() => GenerateImage()}>Imagine</div>
        </div>
    </div>
  )
}

export default ImageGenerator