import { createContext, useContext, useEffect, useState } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";

export type User = {
  id: string;
  name: string;
  username: string;
  document: string;
};

type AuthenticationState = {
  user: User;
  token: string;
};

type SignInCredentials = {
  username: string;
  password: string;
};

type IAuthContextDataType = {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
};

interface IAuthProvider {
  children: React.ReactNode;
}

const AuthContext = createContext({} as IAuthContextDataType);

export function signOut() {
  try {
    destroyCookie(undefined, "@genesis_express.token");
    destroyCookie(undefined, "@genesis_express.user_data");

    Router.push("/");
  } catch (error) {
    throw new Error(error);
  }
}

export const AuthContextProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<User>();

  const cookies = parseCookies(undefined);

  async function signIn({
    username,
    password,
  }: SignInCredentials): Promise<void> {
    try {
      console.log({ username, password });
      const data: AuthenticationState = {
        token: "2093yhf38y4t8y249t",
        user: {
          id: "1",
          name: "elias alexandre",
          username: "eliasallex",
          document: "238-472-3xx-xx",
        },
      };

      setCookie(undefined, "@genesis_express.token", data.token, {
        maxAge: 60 * 60 * 24 * 2, // 2 days
        path: "/",
      });
      setCookie(
        undefined,
        "@genesis_express.user_data",
        JSON.stringify(data.user, null, 2)
      );

      setUser(data.user);
      Router.push("/welcome");
    } catch (error: any) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const token = cookies["@genesis_express.token"];
      const userData = cookies["@genesis_express.user_data"];

      if (token && userData) {
        const user = JSON.parse(userData) as User;

        setUser(user);
      }
    }

    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
