import _ from "lodash";

// Mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

// Components
import { CardAccount, ErrorMessage } from "../../components";

type QueryData = {
  data: any; // change to explicit type,
  loading: boolean;
  error?: any;
};

type Props = {
  type: string;
  queryData: QueryData;
  notFoundMessage: string;
};

export default function ListAccounts(props: Props) {
  const { type, queryData, notFoundMessage } = props;

  const renderAccountsList = ({ data, loading, error }: QueryData) => {
    if (loading) return <LinearProgress />;
    if (error) return <ErrorMessage text={error?.message} />;
    if (!data) return null;

    return data[type] ? (
      _.orderBy(data[type].list, ["followerCount"], ["desc"]).map((account) => (
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
        <Typography variant="body1">{notFoundMessage}</Typography>
      </Grid>
    );
  };

  return queryData.loading ? (
    <LinearProgress sx={{ width: "100%" }} />
  ) : (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {renderAccountsList(queryData)}
    </Grid>
  );
}
