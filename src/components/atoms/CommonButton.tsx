import { Button, CircularProgress } from "@mui/material";
import classNames from "classnames";
import { ReactElement, ReactNode } from "react";

interface Props {
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}

const CommonButton = (props: Props): ReactElement => {
  return (
    <Button
      disabled={props.disabled}
      onClick={async (): Promise<void> => await props.onClick()}
      size="large"
      sx={{
        flex: 1,
        boxShadow: "none",
        ":hover": { backgroundColor: "#ffc0cb" },
      }}
      variant="contained"
    >
      <span className={classNames(props.disabled && "opacity-0", "text-white")}>
        {props.children}
      </span>
      {props.disabled && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          <CircularProgress color="inherit" size="1.2rem" />
        </div>
      )}
    </Button>
  );
};

export default CommonButton;
