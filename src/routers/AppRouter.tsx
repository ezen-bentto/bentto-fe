import { Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<></>}>
        {/* --- 누구나 접근 가능한 페이지 --- */}
        <Route path="/" element={<></>} />
        <Route path="*" element={<></>} />
        <Route path="/policy" element={<></>} />
        <Route path="/community/content/:communityId" element={<></>} />
        <Route path="/community/list" element={<></>} />
        <Route path="/contest" element={<></>} />

        <Route path="/contest/:id" element={<></>} />
        <Route path="/contest/new" element={<></>} />
        <Route path="/contest/:id/edit" element={<></>} />
        {/* <Route path="/contest/:id/delete" element={<ContestDelete />} /> */}
        <Route path="/login" element={<></>} />
        <Route path="/mypage" element={<></>} />
        <Route path="/signup" element={<></>} />
        <Route path="/signup/personal" element={<></>} />
        <Route path="/signup/company" element={<></>} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
