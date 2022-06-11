import { Grid } from "@mui/material";
import magic8Ball from "../../img/magic8Ball.png";
import QuestionForm from "../questionForm/QuestionForm";
import FrequencyTable from "../table/FrequencyTable";
import PredictionTable from "../table/PredictionTable";
import "./Main.css";

export default function Main(props) {
  return (
    <>
      <img src={magic8Ball} alt="Magic 8 ball" />

      <QuestionForm />

      <Grid container className="overAllGrid">
        <Grid item xs={8} className="frequencyTableGrid">
          <FrequencyTable />
        </Grid>
        <Grid item xs={4}>
          <PredictionTable />
        </Grid>
      </Grid>
    </>
  );
}
