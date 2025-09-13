// src/api/axiosConfig.ts
// 기능: 공용 Axios 인스턴스 설정 (env 기반), 401/419/440 발생 시 전역 로그아웃 트리거

// import { requestUserLogout } from '@/features/user/logout/logic/service';
import axios, {
    type AxiosError,
    type AxiosInstance,
    type InternalAxiosRequestConfig,
    type AxiosRequestConfig,
} from 'axios';

/* ----------------------------- 환경 변수 ----------------------------- */
const mode = import.meta.env.MODE as 'development' | 'staging' | 'production' | string;
const BASE_URL = import.meta.env.VITE_API_URL as string | undefined;

if (!BASE_URL) {
    console.warn(`[axiosConfig] VITE_BASE_URL is not set (mode=${mode})`);
}

/* ----------------------------- 로그아웃 트리거 ----------------------------- */
// 역할: 세션 만료 시 전역 로그아웃 브로드캐스트 + 서버 로그아웃 + /login 이동
let isLoggingOut = false;

const triggerGlobalLogout = async (): Promise<void> => {
    if (isLoggingOut) return;
    isLoggingOut = true;

    try {
        // 1) 서버 세션/쿠키 정리 (개발 환경에서도 실 서버로 호출)
        // await requestUserLogout();
    } catch {
        // ignore
    }

    try {
        // 2) 멀티탭 동기화
        const bc = new BroadcastChannel('auth');
        bc.postMessage({ type: 'FORCE_LOGOUT' });
        bc.close();
    } catch {
        // ignore
    }

    try {
        // 3) 라우팅 정리: 라우터 없이도 안전하게 이동
        if (typeof window !== 'undefined') {
            window.location.replace('/login');
        }
    } catch {
        // ignore
    } finally {
        isLoggingOut = false;
    }
};

/* ------------------------------ Axios 인스턴스 ----------------------------- */
const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

/* --------------------------- 요청 인터셉터 --------------------------- */
// 기능: 헤더/베이스URL 정규화
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const c = config as InternalAxiosRequestConfig & AxiosRequestConfig;
        c.headers = c.headers ?? {};
        c.baseURL = BASE_URL; // 항상 실서버 사용
        return c;
    },
    (error) => Promise.reject(error)
);

/* --------------------------- 응답 인터셉터 --------------------------- */
// 기능: 401/419/440 → 전역 로그아웃
axiosInstance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
        const status = error.response?.status;

        const isSessionExpired = status === 401 || status === 419 || status === 440;
        if (isSessionExpired) {
            // 같은 에러로 무한 루프 방지: /logout 자체의 실패도 고려
            await triggerGlobalLogout();
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
