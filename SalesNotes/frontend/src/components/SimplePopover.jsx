import React, { useState, useRef, useEffect } from 'react';
import IconPlus from '../Icons/IconPlus';


const SimplePopover = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const popoverRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div  >
      <button onClick={() => setVisible(!visible)}>
        <IconPlus color="white" width={"20px"} height={"20px"} />
      </button>
      
      {visible && (
        <div ref={popoverRef} className='popover'>
          {children}
        </div>
      )}
    </div>
  );
};

export default SimplePopover;
