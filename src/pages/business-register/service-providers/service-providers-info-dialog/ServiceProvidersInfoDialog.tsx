import { Dialog, Grid } from "@material-ui/core";
import InformationIcon from "../../../../assets/icons/information_icon.svg";
import {
  useDialogStyles,
  DialogContinueButton,
  DialogContentText,
} from "../ServiceProvidersStyle";
import { Transition } from "../ServiceProviders";

export const ServiceProvidersInfoDialog = ({
  open,
  setDialogOpen,
}: {
  open: boolean;
  setDialogOpen?: (open: boolean) => void;
}) => {
  const classes = useDialogStyles();

  return (
    <Dialog
      open={open}
      classes={{ paper: classes.paper }}
      TransitionComponent={Transition}
    >
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <img src={InformationIcon} alt="מידע נוסף" />
        </Grid>
      </Grid>

      <Grid container justify="center" alignItems="center">
        <Grid item>
          <DialogContentText style={{ marginTop: "2rem" }}>
            בשלב זה ניתן להגדיר יומן תורים אישי עבור כל אחד מנותני השירות בעסק
            שלך.
          </DialogContentText>
          <DialogContentText>
            תמיד ישנה אפשרות להוסיף ולערוך נותני שירות בשלב מאוחר יותר.
          </DialogContentText>
        </Grid>
      </Grid>

      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ marginTop: "3rem" }}
      >
        <Grid item>
          <DialogContinueButton
            variant="contained"
            onClick={() => setDialogOpen && setDialogOpen(false)}
          >
            המשך
          </DialogContinueButton>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default ServiceProvidersInfoDialog;
