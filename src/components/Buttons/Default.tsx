import { ButtonHTMLAttributes } from "react";

import styles from "./styles.module.scss";

type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  isOutlined?: boolean;
  isLoading?: boolean;
};

const Button = ({
  isOutlined = false,
  isLoading = false,
  text,
  ...rest
}: IButtonProps) => {
  const { type } = rest;

  return (
    <button
      className={`${styles.button} ${isOutlined ? styles.outlined : ""}`}
      disabled={isLoading}
      {...rest}
      type={type ? "submit" : "button"}
    >
      {isLoading ? "Loading..." : text}
    </button>
  );
};

export { Button };
