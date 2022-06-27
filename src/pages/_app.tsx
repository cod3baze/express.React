import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "../contexts/AuthContext";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
      <Toaster />
    </AuthContextProvider>
  );
}

export default MyApp;
