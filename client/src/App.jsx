
import RequestOtp from './components/RequestOtp';
import VerifyOtp from './components/VerifyOtp';
import ResetPassword from './components/ResetPassword';
import Register from './components/Register';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';

function App() {
    return (
       <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/verify-otp' element={<VerifyOtp/>}/>
        <Route path='/login' element={<Login/>}/>
       </Routes>
    );
}

export default App;
