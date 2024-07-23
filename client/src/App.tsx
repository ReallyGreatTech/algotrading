import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { Provider } from 'react-redux';
import store from './redux/store';
import { useEffect } from 'react';
import { martketsData } from './constants/localStorage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  useEffect(() => {
    const marketsData = localStorage.getItem('marketsData');
    if (!marketsData) {
      localStorage.setItem('marketsData', JSON.stringify(martketsData));
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
};

export default App;
