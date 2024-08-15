import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';


type Props = {
  balanceSheet: any
}
const BalanceSheet = (props: Props) => {

  return (
    <>
      {props.balanceSheet !== undefined ? (
        (
          <div>
            {props.balanceSheet.years.map((yearData: any) => (
              <Paper key={yearData.year} elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
                <Typography variant="h5">{`Year: ${yearData.year}`}</Typography>
                <Typography variant="subtitle1">{`Date: ${yearData.date}`}</Typography>

                {/* Render Assets */}
                <Typography variant="h6">Assets</Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Asset Type</TableCell>
                        <TableCell>Value ({props.balanceSheet.currency})</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {yearData.assets.nonCurrentAssets.map((asset: any) => (
                        <TableRow key={asset.noteNo}>
                          <TableCell>{asset.assetType.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()}</TableCell>
                          <TableCell>{asset.value !== null ? asset.value : 'N/A'}</TableCell>
                        </TableRow>
                      ))}
                      {yearData.assets.currentAssets.map((asset: any) => (
                        <TableRow key={asset.noteNo}>
                          <TableCell>{asset.assetType.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()}</TableCell>
                          <TableCell>{asset.value !== null ? asset.value : 'N/A'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Render Liabilities */}
                <Typography variant="h6">Liabilities</Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Liability Type</TableCell>
                        <TableCell>Value ({props.balanceSheet.currency})</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* Render non-current liabilities */}
                      {yearData.equityAndLiabilities.liabilities.nonCurrentLiabilities.map((liability: any) => (
                        <TableRow key={liability.noteNo}>
                          <TableCell>{liability.liabilityType.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()}</TableCell>
                          <TableCell>{liability.value !== null ? liability.value : 'N/A'}</TableCell>
                        </TableRow>
                      ))}
                      {/* Render current liabilities */}
                      {yearData.equityAndLiabilities.liabilities.currentLiabilities.map((liability: any) => (
                        <TableRow key={liability.noteNo}>
                          <TableCell>{liability.liabilityType.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()}</TableCell>
                          <TableCell>{liability.value !== null ? liability.value : 'N/A'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Render Equity */}
                <Typography variant="h6">Equity</Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Equity Type</TableCell>
                        <TableCell>Value ({props.balanceSheet.currency})</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {yearData.equityAndLiabilities.equity.map((equityItem: any) => (
                        <TableRow key={equityItem.noteNo}>
                          <TableCell>{equityItem.equityType.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()}</TableCell>
                          <TableCell>{equityItem.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Render Total */}
                <Typography variant="h6">Total</Typography>
                <Typography variant="subtitle1">{`Total Assets: ${yearData.totalAssets} ${props.balanceSheet.currency}`}</Typography>
                <Typography variant="subtitle1">{`Total Equity and Liabilities: ${yearData.totalEquityAndLiabilities} ${props.balanceSheet.currency}`}</Typography>
              </Paper>
            ))}
          </div>)) : (<></>)}
    </>
  );
}

export default BalanceSheet