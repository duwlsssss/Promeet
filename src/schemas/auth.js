import { z } from 'zod';
import { NICKNAME_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from '@/constants/auth';

export const signInSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: '이름을 입력해주세요' })
    .max(NICKNAME_MAX_LENGTH, {
      message: `이름은 ${NICKNAME_MAX_LENGTH}자 이하로 입력해주세요`,
    })
    .refine((value) => /^[a-zA-Z0-9가-힣._-]+$/.test(value), {
      message: '영문, 한글 단어, 숫자, . _ - 만 사용 가능해요',
    }),
  password: z
    .string()
    .trim()
    .min(1, { message: '비밀번호를 입력해주세요' })
    .min(PASSWORD_MIN_LENGTH, `비밀번호는 ${PASSWORD_MIN_LENGTH}자리 이상 입력해주세요`)
    .max(PASSWORD_MAX_LENGTH, {
      message: `비밀번호는 ${PASSWORD_MAX_LENGTH}자 이하로 입력해주세요`,
    })
    .refine((value) => /^[a-zA-Z0-9]+$/.test(value), {
      message: '영문과 숫자만 사용 가능해요',
    }),
});
