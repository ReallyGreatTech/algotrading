import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { Provider } from 'react-redux';
import store from './redux/store';
import { useEffect } from 'react';
import { martketsData } from './constants/localStorage';

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
      </BrowserRouter>
    </>
  );
};

export default App;
