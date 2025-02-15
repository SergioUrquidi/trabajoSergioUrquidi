import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Router from './router';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/dictionary-translator">
        <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;