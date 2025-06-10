// components/Modal.tsx
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: var(--color-ui-primary);
  border-radius: var(--radius-sm);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ModalBody = styled.div`
  padding: var(--padding-md);
  overflow-y: auto;
  flex: 1; /* Allow the body to grow and shrink within the modal */
`;

const ModalHeader = styled.div`
  padding: var(--padding-md);
  border-bottom: 1px solid var(--color-ui-border);
  border-top-left-radius: var(--radius-sm);
  border-top-right-radius: var(--radius-sm);
  background-color: var(--color-canvas);
  display: flex;
  justify-content: center;
  margin-bottom: var(--margin-sm);
  position: relative;
`;

const ModalTitle = styled.div`
  padding: 0px var(--padding-sm);
  margin-right: auto;
  color: var(--color-text-primary);
  font-weight: 500;
  font-size: var(--font-xl);
`;

const CloseButton = styled.button`
  padding: 0 var(--padding-md);
  background: var(--color-ui-primary);
  color: var(--color-ui-border);
  border: 1px solid var(--color-ui-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-lg);
  cursor: pointer;
  &:hover {
    background: var(--hilite-ui-primary);
  }
`;

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ title, isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay data-testid='modal-overlay'>
      {/* <ModalContent onClick={(e) => e.stopPropagation()}> */}
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose} role='button' aria-label='Close'>
            &times;
          </CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
