import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useErrorHandler from '../useHandleError';
import { useUserActions } from '../stores/auth/useUserStore';
import { ROUTES } from '@/constants/routes';
import { postLogout } from '@/apis/post/auth';

const useLogout = () => {
  const handleError = useErrorHandler();
  const navigate = useNavigate();
  const { clearUser } = useUserActions();

  return useMutation({
    mutationFn: ({ userId }) => postLogout(userId),
    onSuccess: () => {
      clearUser();
      navigate(ROUTES.SIGN_IN, { replace: true });
    },
    onError: (error) => {
      handleError(error);
    },
  });
};

export default useLogout;
