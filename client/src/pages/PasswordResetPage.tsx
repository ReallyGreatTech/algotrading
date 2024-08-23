import { apiClient } from '../redux/api/apiClient';
import { toast } from 'react-toastify';
import FormInput from '../components/Form/FormInput';
import { Formik } from 'formik';
import FormSubmitButton from '../components/Form/FormSubmitButton';
import { useState } from 'react';

interface PasswordResetFormData {
  email:string
}

const PasswordResetPage = ({
  onSwitchToLogin,
}: {
  onSwitchToLogin(): void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordReset = async (data: PasswordResetFormData) => {
    setIsLoading(true);
    try {
      await apiClient.post('/password-reset', { email: data.email });
      toast.success(
        'Password reset instructions have been sent to your email.'
      );
      onSwitchToLogin(); // Switch back to login UI after successful request
    } catch (error) {
      toast.error('Failed to reset password. Please try again later.');
      onSwitchToLogin();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="container max-w-3xl mx-auto text-white/90">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-center">Reset Password</h1>
          <p className="text-sm text-center text-wrap px-52 text-white/30">
            Enter your email address below and we'll send you instructions on
            how to reset your password.
          </p>
        </div>
        <Formik<PasswordResetFormData>
          initialValues={{
            email: '',
          }}
          onSubmit={handlePasswordReset}
        >
          {() => (
            <div className="grid grid-cols-2 gap-5 text-white mb-10 max-w-lg mx-auto">
              <div className="col-span-2 text-lg">
                <FormInput
                  label="Email"
                  name="email"
                  placeholder="Enter email"
                  disabled={isLoading} // Pass isLoading to disable the input field
                />
              </div>

              <div className="col-span-2">
                <FormSubmitButton
                  loading={isLoading}
                  className={`w-full py-3 px-5 ${
                    isLoading ? 'bg-primary animate-pulse' : 'bg-primary'
                  } rounded-lg text-white shadow-primary ml-auto`}
                >
                  {isLoading ? 'Sending...' : 'Reset Password'}
                </FormSubmitButton>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default PasswordResetPage;
