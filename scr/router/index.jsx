import { Routes, Route } from 'react-router-dom';
import Dictionary from '../screens/Dictionary/Dictionary';



const Router = () => {
  return (
    <Routes>
     
      <Route path="/dictionary" element={<Dictionary />} />
    </Routes>
  );
};

export default Router;