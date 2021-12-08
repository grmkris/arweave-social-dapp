import Link from "next/link";

// Mui
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PeopleIcon from "@mui/icons-material/People";
import {useCyberConnect} from "../../hooks";

export type Props = {
  address: string;
  ens: string;
  followerCount: number;
  recommendationReason?: string;
};

export default function CardAccount(props: Props) {
  const { address, ens, followerCount, recommendationReason } = props;

  const {cyberConnect, initializing} = useCyberConnect();

  return (
    <Card sx={{ maxWidth: 300 }} elevation={10}>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Link href={`/${address}`} passHref>
          <a>
            <Tooltip title={address}>
              <Typography variant="h5" color="primary" noWrap>
                {address}
              </Typography>
            </Tooltip>
          </a>
        </Link>
        <Typography variant="body1" gutterBottom>
          {ens}
        </Typography>

        {recommendationReason && (
          <Typography variant="body1" gutterBottom>
            <b>Reason:</b> <br></br>
            {recommendationReason}
          </Typography>
        )}

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
      {!initializing && <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button color="primary" variant="outlined" size="small" onClick={() => {
          cyberConnect?.connect(address);
        }}>
          Follow
        </Button>
      </CardActions>}
    </Card>
  );
}
