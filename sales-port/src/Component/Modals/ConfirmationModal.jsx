
import close from '../../assets/icons/close.svg';
import { createPortal } from 'react-dom';

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel, setWidth }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay"
    style={{ zIndex: 9999999, position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="modal-content" style={{ position: 'relative', width: setWidth ? setWidth : '40%', backgroundColor: 'white', zIndex: 10000000 }}>
        <div className="modal-header-content d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-primary">{title || 'Confirm Action'}</h4>
          <button className="close-btn" onClick={onCancel}>
            <img src={close} alt="close" />
          </button>
        </div>
        <div className="modal-body" style={{ overflowY: 'unset' }}>
          <p className='mt-3'>{message}</p>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            <button className="add-btn" onClick={onConfirm}>Confirm</button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmationModal;
