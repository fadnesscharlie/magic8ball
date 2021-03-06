import { useContext } from "react";
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

export default function FrequencyTable() {
  let { frequencyData, counter } = useContext(DataContext);

  return (
    <>
      {frequencyData.data.length ? (
        <TableContainer component={Paper}>
          <Table aria-label="customized table" className="table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Magic 8 ball Answers!</StyledTableCell>
                <StyledTableCell align="right">Frequency</StyledTableCell>
                <StyledTableCell align="right">Percentage</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {frequencyData.data.map((row) => (
                <StyledTableRow hover key={row.value}>
                  <StyledTableCell component="th" scope="row">
                    {row.value}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.frequency}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    % {((row.frequency / counter) * 100).toFixed(2)}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        ""
      )}
    </>
  );
}
