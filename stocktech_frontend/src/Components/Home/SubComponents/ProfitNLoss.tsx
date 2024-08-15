import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';


type Props = {
  profitAndLoss: any
}

const ProfitNLoss = (props: Props) => {

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {props.profitAndLoss.headers.map((header: any, index: any) => (
                <TableCell key={index} style={{ fontWeight: 'bold' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.profitAndLoss.rows.map((row: any) => (
              <TableRow key={row.noteNo}>
                <TableCell>{row.noteNo}</TableCell>
                <TableCell>{row.particulars.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()}</TableCell>
                {row.values.map((value: any, index: any) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" style={{ marginTop: '20px', fontWeight: 'bold' }}>Other Comprehensive Income</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {props.profitAndLoss.otherComprehensiveIncome.headers.map((header: any, index: any) => (
                <TableCell key={index} style={{ fontWeight: 'bold' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.profitAndLoss.otherComprehensiveIncome.rows.map((row: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{row.item.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()}</TableCell>
                {row.values.map((value: any, index: any) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" style={{ marginTop: '20px', fontWeight: 'bold' }}>Total Comprehensive Income</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              {props.profitAndLoss.totalComprehensiveIncome.values.map((value: any, index: any) => (
                <TableCell key={index}>{value}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" style={{ marginTop: '20px', fontWeight: 'bold' }}>Earnings Per Equity Share Details</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Basic</TableCell>
              {props.profitAndLoss.earningsPerEquityShareDetails.basic.values.map((value: any, index: any) => (
                <TableCell key={index}>{value}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Diluted</TableCell>
              {props.profitAndLoss.earningsPerEquityShareDetails.diluted.values.map((value: any, index: any) => (
                <TableCell key={index}>{value}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ProfitNLoss