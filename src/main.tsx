import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddExpense from './components/AddExpense';
import ShowExpense from './components/ShowExpense';
import { Provider } from 'react-redux';
import store from './redux/store';
import Footer from './components/Footer';

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar /><App /><Footer/></>
  },
  {
    path: "/add",
    element: <><Navbar /><AddExpense /><Footer/></>
  },
  {
    path: "/show",
    element: <><Navbar /><ShowExpense /><Footer/></>
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
