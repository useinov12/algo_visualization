import React, {useState, useEffect} from 'react'

export default function useContainerDimensions(myRef: React.RefObject<any>) {
    const [dimensions, setDimensions] = useState({ width: 300, height: 300 });
  
    useEffect(() => {
      const getDimensions = () => ({
        width: (myRef && myRef.current.offsetWidth) || 300,
        height: (myRef && myRef.current.offsetHeight) || 300,
      });
  
      const handleResize = () => {
        setDimensions(getDimensions());
      };
  
      if (myRef.current) {
        setDimensions(getDimensions());
      }
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [myRef]);
  
    return dimensions;
  }