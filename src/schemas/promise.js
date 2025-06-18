import { z } from 'zod';
import {
  NAME_MAX_LENGTH,
  DESCRIPTION_MAX_LENGTH,
  MEMBER_CNT_MIN,
  MEMBER_CNT_MAX,
} from '@/constants/promise';

export const PromiseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: '약속 이름은 필수에요' })
    .max(NAME_MAX_LENGTH, {
      message: `약속 이름은 ${NAME_MAX_LENGTH}자 이하로 입력해주세요`,
    }),
  description: z
    .string()
    .trim()
    .min(1, { message: '약속 설명은 필수에요' })
    .max(DESCRIPTION_MAX_LENGTH, {
      message: `비밀번호는 ${DESCRIPTION_MAX_LENGTH}자 이하로 입력해주세요`,
    }),
  memberCnt: z
    .number()
    .min(1, { message: `${MEMBER_CNT_MIN}명 이하의 약속만 잡을 수 있어요` })
    .max(MEMBER_CNT_MAX, {
      message: `${MEMBER_CNT_MAX}명 이하의 약속만 잡을 수 있어요`,
    }),
});
