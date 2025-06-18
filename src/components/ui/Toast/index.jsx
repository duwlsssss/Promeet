import * as S from './style';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { useToastInfo } from '@/hooks/stores/ui/useToastStore';

const Toast = () => {
  const { isOpen, message, isFadingOut } = useToastInfo();

  if (!isOpen) return null;

  const toastRoot = document.getElementById('toast-portal');

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <S.Toast
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isFadingOut ? 0 : 1, y: isFadingOut ? 50 : 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          role="alert"
          aria-live="assertive"
        >
          {message}
        </S.Toast>
      )}
    </AnimatePresence>,
    toastRoot,
  );
};

export default Toast;
