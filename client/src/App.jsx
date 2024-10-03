
import RequestOtp from './components/RequestOtp';
import VerifyOtp from './components/VerifyOtp';
import ResetPassword from './components/ResetPassword';

function App() {
    return (
        <div>
            <h1>OTP Authentication System</h1>            
            <RequestOtp />
            <VerifyOtp />
            <ResetPassword />
        </div>
    );
}

export default App;
