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
  border: 1px solid var(--color-border);
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
  overflow-y: auto;
  flex: 1; /* Allow the body to grow and shrink within the modal */
`;

const ModalHeader = styled.div`
  /* background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);
  background-image: linear-gradient(
    45deg,
    var(--bg-gradient-start) 0%,
    var(--bg-gradient-end) 100%
  ); */
  padding: var(--padding-md);
  border-bottom: 1px solid var(--color-border);
  background-color: var(--bg-medium);
  border-top-left-radius: var(--radius-sm);
  border-top-right-radius: var(--radius-sm);
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const ModalTitle = styled.div`
  padding: 0px var(--padding-sm);
  color: var(--color-text-primary);
  font-weight: 500;
  font-size: var(--font-xl);
`;

const CloseButton = styled.button`
  padding: 0 var(--padding-md);
  background: var(--bg-medium);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-lg);
  cursor: pointer;
  &:hover {
    background: var(--bg-light);
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
