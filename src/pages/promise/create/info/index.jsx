import * as S from './style';
import Header from '@/components/promise/Header';
import InfoForm from '@/components/promise/forms/InfoForm';
import { PROMISE_CREATE_HEADER_TEXT } from '@/constants/promise';
import { ROUTES } from '@/constants/routes';

const InfoPage = () => {
  return (
    <S.Container>
      <Header text={PROMISE_CREATE_HEADER_TEXT} navigateUrl={ROUTES.HOME} />
      <InfoForm />
    </S.Container>
  );
};
export default InfoPage;
