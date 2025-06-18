import * as S from './style';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '@/schemas/auth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import useSignIn from '@/hooks/mutations/useSignIn';

const SignInForm = () => {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { isSubmitting, errors, dirtyFields },
    setError,
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      password: '',
    },
  });

  const { promiseId } = useParams();

  const { mutate: signIn, isPending: isSignInPending } = useSignIn(setError);

  // 초기 유효성 검사 트리거
  useEffect(() => {
    trigger();
  }, [trigger]);

  // 폼 제출 핸들러
  const onSubmit = (formData) => {
    if (promiseId) signIn({ ...formData, promiseId });
    else signIn(formData);
  };

  return (
    <S.Container>
      <S.Title>로그인</S.Title>
      <S.SignInForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          id="name"
          name="name"
          height="90px"
          useForm
          control={control}
          placeholder="이름을 입력해주세요"
          showError={dirtyFields.name}
        />
        <Input
          type="password"
          id="password"
          name="password"
          height="90px"
          useForm
          control={control}
          placeholder="비밀번호를 입력해주세요"
          showError={dirtyFields.password}
        />
        <Button
          color="main"
          disabled={isSubmitting || Object.keys(errors).length > 0 || isSignInPending}
        >
          {isSignInPending ? '로그인 중...' : '로그인하기'}
        </Button>
      </S.SignInForm>
    </S.Container>
  );
};

export default SignInForm;
