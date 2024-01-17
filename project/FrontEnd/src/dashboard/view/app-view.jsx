import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import AppCurrentVisits from "../app-current-visits";
import AppWebsiteVisits from "../app-website-visits";
import AppWidgetSummary from "../app-widget-summary";
import { withRouter } from "../../common/with-router";
import { Component } from "react";

// ----------------------------------------------------------------------

class AppView extends Component {
  render() {
    return (
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Demandes"
              total={20}
              color="success"
              icon={
                <img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />
              }
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Utilisateurs"
              total={10}
              color="info"
              icon={
                <img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />
              }
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Demandes Actuelle"
              total={5}
              color="warning"
              icon={
                <img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />
              }
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Demande types"
              total={4}
              color="error"
              icon={
                <img
                  alt="icon"
                  src="/assets/icons/glass/ic_glass_message.png"
                />
              }
            />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              chart={{
                labels: [
                  "01/01/2003",
                  "02/01/2003",
                  "03/01/2003",
                  "04/01/2003",
                  "05/01/2003",
                  "06/01/2003",
                  "07/01/2003",
                  "08/01/2003",
                  "09/01/2003",
                  "10/01/2003",
                  "11/01/2003",
                ],
                series: [
                  {
                    name: "Demandes Acceptées",
                    type: "area",
                    fill: "gradient",
                    data: [4, 5, 1, 7, 2, 4, 1, 1, 6, 7, 3],
                  },
                  {
                    name: "Demandes Rejetées",
                    type: "line",
                    fill: "solid",
                    data: [3, 2, 6, 0, 5, 5, 6, 2, 5, 3, 9],
                  },
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Demande types"
              chart={{
                series: [
                  { label: "PC", value: 4 },
                  { label: "IMPRIMANTE", value: 5 },
                  { label: "SMARTPHONE", value: 1 },
                  { label: "PHOTOCOPIEUR", value: 3 },
                ],
              }}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }
}
export default withRouter(AppView);
