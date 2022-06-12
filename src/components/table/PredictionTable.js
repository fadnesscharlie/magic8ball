import {useContext} from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import "./Table.css";

import { DataContext } from "../../context/questionData";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#EDF7FC",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function PredictionTable() {
  let { predictionData } = useContext(DataContext);

  return (
    <TableContainer component={Paper}>
      <Table  aria-label="customized table" className="table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Magic 8 ball Questions!</StyledTableCell>
            <StyledTableCell align="right">Prediction</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {predictionData.data.map((row) => (
            <StyledTableRow hover key={row.value}>
              <StyledTableCell component="th" scope="row">
                {row.value}
              </StyledTableCell>
              <StyledTableCell align="right">
                
                {row.prediction.value}{" "}{'('}{row.prediction.score}{'%)'}
                
                </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
