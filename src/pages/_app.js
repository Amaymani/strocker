import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'


export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <ClerkProvider>
        <Component {...pageProps} />
      </ClerkProvider>
    </ThemeProvider>
  );
}
