import  { useState } from 'react';
import PasswordResetPage from './PasswordResetPage';
import LoginPage from './LoginPage';


const AuthContainer = () => {
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const handleSwitchToPasswordReset = () => {
    setIsPasswordReset(true);
  };

  const handleSwitchToLogin = () => {
    setIsPasswordReset(false);
  };

  return (
    <div className="auth-container">
      {isPasswordReset ? (
        <PasswordResetPage onSwitchToLogin={handleSwitchToLogin} />
      ) : (
        <LoginPage onForgotPassword={handleSwitchToPasswordReset} />
      )}
    </div>
  );
};

export default AuthContainer;
