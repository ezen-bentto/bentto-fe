export const formatDate = (
    d?: Date,
    format: string = 'yy.mm.dd (dow)' // 기본 포맷
): string => {
    if (!d) return '';

    const WEEKDAY_KO = ['일', '월', '화', '수', '목', '금', '토'];

    const yyyy = String(d.getFullYear());
    const yy = yyyy.slice(-2);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const dow = WEEKDAY_KO[d.getDay()];

    // 치환 규칙
    return format.replace(/yyyy/g, yyyy).replace(/yy/g, yy).replace(/mm/g, mm).replace(/dd/g, dd).replace(/dow/g, dow);
};

// 요일 출력
export const getDayOfWeek = (dateString: string | undefined) => {
    if (dateString === undefined) return;
    const date = new Date(dateString);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[date.getDay()];
};

// dday
export const getDDay = (dateString: string | undefined) => {
    if (dateString === undefined) return;
    const target = new Date(dateString);
    const today = new Date();
    target.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diff = target.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days; // 양수 = 남은 날, 0 = 오늘, 음수 = 지난 날
};
