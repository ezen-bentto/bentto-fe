import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5분 동안 fresh로 간주
      gcTime: 10 * 60 * 1000, // 10분 뒤 캐시 정리
      refetchOnMount: false, // 마운트 시 자동 재요청 금지
      refetchOnWindowFocus: false, // 포커스 시 자동 재요청 금지
      refetchOnReconnect: false, // 네트워크 재연결 시 자동 재요청 금지
      // keepPreviousData: true, // 키 변경 시 이전 데이터 유지
      retry: 1, // 재시도 1회
    },
  },
});

export default queryClient;
