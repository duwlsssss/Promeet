import { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import './styles/fonts.css';
// 비동기 통신
import { QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import queryClient from './lib/tanstack-query/queryClient';
// import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'; // 디버깅용
// 에러 처리
import { ErrorBoundary } from 'react-error-boundary';
// 라우팅
import Router from './routes/Router.jsx';
// 컴포넌트
import DeferredLoader from './components/ui/DeferredLoader';
import ErrorFallback from './components/ui/ErrorFallback';
import Toast from './components/ui/Toast';

function App() {
  // const [isOpen, setIsOpen] = useState(false); // ReactQueryDevtoolsPanel 열고닫기

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
              <Suspense fallback={<DeferredLoader />}>
                <Router />
                <Toast />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
        {/* <button
          onClick={() => setIsOpen(!isOpen)}
        >{`${isOpen ? 'Close' : 'Open'} the devtools panel`}</button>
        {isOpen && (
          <ReactQueryDevtoolsPanel style={{ height: '200px' }} onClose={() => setIsOpen(false)} />
        )} */}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
