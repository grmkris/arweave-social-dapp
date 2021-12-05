import Typography from "@mui/material/Typography";

type Props = {
  text: string;
};

export default function ErrorMessage(props: Props) {
  const { text } = props;

  return (
    <Typography variant="body1" align="center" color="error">
      {text}
    </Typography>
  );
}
