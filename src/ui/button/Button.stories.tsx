import { Button } from "./Button";

export default {
  title: "UI/Button",
};

export const TextButton = () => <Button variant="text">טקסט</Button>;
export const ContainedButton = () => <Button variant="contained">מלא</Button>;
export const OutlinedButton = () => <Button variant="outlined">ממסוגר</Button>;
