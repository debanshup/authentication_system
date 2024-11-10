import Alert from 'react-bootstrap/Alert';

function AlertDismissible({ type, heading, children, show, onClose }: { type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light', heading: any, children: React.ReactNode, show: boolean, onClose: () => void }) {
  return (
    <>
      {show && (
        <Alert variant={type} onClose={onClose} dismissible>
          <Alert.Heading>{heading}</Alert.Heading>
          {children}
        </Alert>
      )}
    </>
  );
}

export default AlertDismissible;
