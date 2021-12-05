// Mui
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PeopleIcon from "@mui/icons-material/People";

export type Props = {
  address: string;
  ens: string;
  followerCount: number;
};

export default function CardAccount(props: Props) {
  const { address, ens, followerCount } = props;

  return (
    <Card sx={{ maxWidth: 300 }} elevation={10}>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography variant="h5" color="primary" noWrap>
          <a href={`https://etherscan.io/address/${address}`} target="__blank">
            {address}
          </a>
        </Typography>
        <Typography variant="body1" gutterBottom>
          {ens}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <PeopleIcon sx={{ marginRight: 1 }} /> {followerCount} followers
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button color="primary" variant="outlined" size="small">
          Follow
        </Button>
      </CardActions>
    </Card>
  );
}
