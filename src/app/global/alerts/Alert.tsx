import Alert from 'react-bootstrap/Alert';

function AlertDismissible({ heading, children, show, onClose }: { heading: any, children: React.ReactNode, show: boolean, onClose: () => void }) {
  return (
    <>
      {show && (
        <Alert variant="success" onClose={onClose} dismissible>
          <Alert.Heading>{heading}</Alert.Heading>
          {children}
        </Alert>
      )}
    </>
  );
}

export default AlertDismissible;
