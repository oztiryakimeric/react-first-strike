import { Box, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { useOverlay } from "context/OverlayContext";

export function SimpleDialogTitle({ children, onClose, ...other }) {
  const { hide } = useOverlay();

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      <IconButton
        aria-label="close"
        onClick={() => {
          hide();
          if (onClose) {
            onClose();
          }
        }}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
}

SimpleDialogTitle.defaultProps = {
  onClose: () => {},
  children: null,
};

SimpleDialogTitle.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default SimpleDialogTitle;
