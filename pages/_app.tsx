import ErrorBoundary from "@/Components/ErrBoundry/ErrBoundry";
import store from "./../Store/index";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
 
  return (
    <Provider store={store}>
      <ErrorBoundary>
      <Component {...pageProps} />
      </ErrorBoundary>
    </Provider>
  );
}
