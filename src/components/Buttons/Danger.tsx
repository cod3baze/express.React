import { ButtonHTMLAttributes } from "react";

import styles from "./styles.module.scss";

type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  isOutlined?: boolean;
  isLoading?: boolean;
  Icon?: React.ReactElement;
};

const Danger = ({
  isOutlined = false,
  isLoading = false,
  text,
  Icon = null,
  ...rest
}: IButtonProps) => {
  const { type } = rest;

  return (
    <button
      className={`${styles.danger} ${isOutlined ? styles.outlined : ""}`}
      disabled={isLoading}
      {...rest}
      type={type ? "submit" : "button"}
    >
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          {Icon} {text}
        </>
      )}
    </button>
  );
};

export { Danger };
