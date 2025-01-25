export const formStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  p: 4,
  borderRadius: 6,
  boxShadow: 2,
  // minHeight: "100vh",
};

export const boxStyles = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  py: 4,
};

export const authBtnStyles = {
  ml: 2,
  cursor: "pointer",
  color: "white",
  fontSize: 14,
  borderColor: "white",
  letterSpacing: 4,
  "&:hover": {
    borderColor: "#99cccc",
    color: "#99cccc",
  },
};
