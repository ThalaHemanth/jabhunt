import 'tailwindcss/tailwind.css';
import MainContextProvider from '../context/MainContext';

function MyApp({ Component, pageProps }) {
  return (
    <MainContextProvider>
      <Component {...pageProps} />
    </MainContextProvider>
  );
}

export default MyApp;
