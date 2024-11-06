import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function Overlay({children}: any) {
  const renderTooltip = (props: any) => (
    <Tooltip id='button-tooltip' {...props}>
       <strong >Email not verified!</strong>
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
      
    >
        
        {children}
     
        
        
    </OverlayTrigger>
  );
}

export default Overlay