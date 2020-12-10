import { Button as MuiButton } from "@material-ui/core";
import { useButtonStyles } from "./ButtonStyle";

interface ButtonProps {
  children?: React.ReactNode;
  variant?: "contained" | "outlined" | "text";
  disabled?: boolean;
  startIcon?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  children,
  variant = "outlined",
  disabled,
  startIcon,
  className,
  onClick,
}: ButtonProps) => {
  const classes = useButtonStyles();

  return (
    <MuiButton
      variant={variant}
      disabled={disabled}
      startIcon={startIcon}
      classes={{
        root: classes.root,
        outlined: classes.outlined,
        text: classes.text,
        contained: classes.contained,
      }}
      className={className}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
