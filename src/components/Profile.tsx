import { parseCookies } from "nookies";
import { useAuthContext } from "../contexts/AuthContext";

import { SignOut } from "phosphor-react";
import { Danger } from "./Buttons/Danger";

import styles from "../styles/components/Profile.module.scss";

type User = {
  id: string;
  name: string;
  username: string;
  document: string;
};

export const Profile = () => {
  const cookies = parseCookies(undefined);

  const { signOut } = useAuthContext();

  const user_data = {
    id: "1",
    name: "Elias Garcia Alexandre",
    username: "eliasallex",
    document: "45756y",
  } as User;

  return (
    <div id={styles.profileElement}>
      <div>
        <strong>{user_data?.name}</strong>
        <p>{user_data?.username}</p>
      </div>

      <Danger
        Icon={<SignOut size={24} />}
        onClick={signOut}
        text="Encerrar sessão"
      />
    </div>
  );
};
