import _ from "lodash";

// Mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

// Components
import { CardAccount, ErrorMessage } from "../../components";

type Props = {
  list: any; // change to explicit type,
  loading: boolean;
  error?: any;
};

export default function ListAccounts(props: Props) {
  const renderAccountsList = ({ list, loading, error }: Props) => {
    if (loading) return <LinearProgress sx={{ width: "100%" }} />;
    if (error) return <ErrorMessage text={error?.message} />;

    return list && list?.length > 0 ? (
      _.orderBy(list, ["followerCount"], ["desc"]).map((account) => (
        <Grid item key={account.address} xs={12} sm={6} md={4} lg={3}>
          <CardAccount
            address={account.address}
            ens={account.ens ? account.ens : "No ENS"}
            followerCount={account.followerCount}
            recommendationReason={account.recommendationReason}
          />
        </Grid>
      ))
    ) : (
      <Grid container spacing={2} flexDirection="column" alignItems="center">
        <Typography variant="h6" mt={4}>
          🤔 Hmm... no accounts found
        </Typography>
      </Grid>
    );
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {renderAccountsList(props)}
    </Grid>
  );
}
