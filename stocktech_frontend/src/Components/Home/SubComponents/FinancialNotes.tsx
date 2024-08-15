import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid, Divider } from '@mui/material';

type Props = {
  financialNotes: any
};

const FinancialNotes = (props: Props) => {

  return (
    <>
      <div>
        <Typography variant="h4" gutterBottom>
          Balance Sheet ({props.financialNotes.yearEnded})
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Currency: {props.financialNotes.currency}
        </Typography>
        <Grid container spacing={2}>
          {props.financialNotes.BalanceSheetNotes.map((note: any) => (
            <Grid item xs={12} key={note.noteNo}>
              <Paper elevation={3} style={{ padding: '16px' }}>
                <Typography variant="h6" gutterBottom>
                  Note {note.noteNo}: {note.title}
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(note.asOfDates.currentYear).map(
                    ([key, value]: any) => (
                      <Grid item xs={4} key={key}>
                        <Typography variant="body2" color="textSecondary">
                          {key.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()}
                        </Typography>
                        <Typography variant="body1">{value}</Typography>
                      </Grid>
                    )
                  )}
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Divider />

        {props.financialNotes.ProfitAndLossNotes && props.financialNotes.ProfitAndLossNotes.length > 0 ?
          (<><Typography variant="h4" gutterBottom>
            Profit and Loss ({props.financialNotes.yearEnded})
          </Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Note No</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>As of Dates</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.financialNotes.ProfitAndLossNotes.map((item: any) => (
                    <TableRow key={item.noteNo}>
                      <TableCell style={{ fontWeight: 'bold' }} >{item.noteNo}</TableCell>
                      <TableCell style={{ fontWeight: 'bold' }} >{item.title}</TableCell>
                  <TableCell>
                        <Typography variant="subtitle1">Prior Year:</Typography>
                        {item.asOfDates?.priorYear && (
                          <ul>
                            {Object.entries(item.asOfDates.priorYear).map(([key, value]: any) => (
                              <li key={key}>
                                <strong>{key.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()}:</strong> {value}
                              </li>
                            ))}
                          </ul>
                        )}
                        <Typography variant="subtitle1">Current Year:</Typography>
                        {item.asOfDates?.currentYear && (
                          <ul>
                            {Object.entries(item.asOfDates.currentYear).map(([key, value]: any) => (
                              <li key={key}>
                                <strong>{key.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()}:</strong> {value}
                              </li>
                            ))}
                          </ul>
                        )}
                  </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer></>) : <></>}
      </div>
    </>
  )
}

export default FinancialNotes