import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';


type Props = {
  cashFlowStatement: any;
}

const CashFlow = (props: Props) => {
  return (
    <>
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Operating Activities</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Net Profit Before Tax</TableCell>
              <TableCell>{props.cashFlowStatement.data.operatingActivities.netProfitBeforeTax}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Depreciation</TableCell>
              <TableCell>{props.cashFlowStatement.data.operatingActivities.adjustments.depreciation}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Profit on Sale of Investments</TableCell>
              <TableCell>{props.cashFlowStatement.data.operatingActivities.adjustments.profitOnSaleOfInvestments}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Interest Received</TableCell>
              <TableCell>{props.cashFlowStatement.data.operatingActivities.adjustments.interestReceived}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Interest Paid</TableCell>
              <TableCell>{props.cashFlowStatement.data.operatingActivities.adjustments.interestPaid}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Operating Profit Before Working Capital Changes</TableCell>
              <TableCell>{props.cashFlowStatement.data.operatingActivities.operatingProfitBeforeWorkingCapitalChanges}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Adjusted for Working Capital Changes - Trade and Other Receivable</TableCell>
              <TableCell>{props.cashFlowStatement.data.operatingActivities.adjustedForWorkingCapitalChanges.tradeAndOtherReceivable}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cash Generated from Operations</TableCell>
              <TableCell>{props.cashFlowStatement.data.operatingActivities.cashGeneratedFromOperations}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Extraordinary Items</TableCell>
              <TableCell>{props.cashFlowStatement.data.operatingActivities.extraOrdinaryItems}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Net Cash from Operating Activities Before Taxes Paid</TableCell>
              <TableCell>{props.cashFlowStatement.data.operatingActivities.netCashFromOperatingActivitiesBeforeTaxesPaid}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Taxes Paid During the Year</TableCell>
              <TableCell>{props.cashFlowStatement.data.operatingActivities.taxesPaidDuringTheYear}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Income Tax Refund</TableCell>
              <TableCell>{props.cashFlowStatement.data.operatingActivities.incomeTaxRefund}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Net Cash from Operating Activities</TableCell>
              <TableCell>{props.cashFlowStatement.data.operatingActivities.netCashFromOperatingActivities}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Investing Activities Table */}
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Investing Activities</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Purchase of Fixed Assets</TableCell>
              <TableCell>{props.cashFlowStatement.data.investingActivities.purchaseOfFixedAssets}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sale of Fixed Assets</TableCell>
              <TableCell>{props.cashFlowStatement.data.investingActivities.saleOfFixedAssets}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sale of Investment</TableCell>
              <TableCell>{props.cashFlowStatement.data.investingActivities.saleOfInvestment}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Acquisition of Non-Current Investment</TableCell>
              <TableCell>{props.cashFlowStatement.data.investingActivities.acquisitionOfNonCurrentInvestment}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Interest Received (Investing)</TableCell>
              <TableCell>{props.cashFlowStatement.data.investingActivities.interestReceived}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Net Cash Used in Investing Activities</TableCell>
              <TableCell>{props.cashFlowStatement.data.investingActivities.netCashUsedInInvestingActivities}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Financing Activities Table */}
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Financing Activities</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Proceeds from Repayment of Short-Term Borrowings</TableCell>
              <TableCell>{props.cashFlowStatement.data.financingActivities.proceedsFromRepaymentOfShortTermBorrowings}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Interest Paid (Financing)</TableCell>
              <TableCell>{props.cashFlowStatement.data.financingActivities.interestPaid}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Dividend Paid</TableCell>
              <TableCell>{props.cashFlowStatement.data.financingActivities.dividendPaid}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Net Cash Used in Financing Activities</TableCell>
              <TableCell>{props.cashFlowStatement.data.financingActivities.netCashUsedInFinancingActivities}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Cash and Cash Equivalents Table */}
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Cash and Cash Equivalents</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>As at Start of Period</TableCell>
              <TableCell>{`${props.cashFlowStatement.cashAndCashEquivalents.asAtStartOfPeriod.date} - ${props.cashFlowStatement.cashAndCashEquivalents.asAtStartOfPeriod.amount}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>As at End of Period</TableCell>
              <TableCell>{`${props.cashFlowStatement.cashAndCashEquivalents.asAtEndOfPeriod.date} - ${props.cashFlowStatement.cashAndCashEquivalents.asAtEndOfPeriod.amount}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Net Increase/Decrease</TableCell>
              <TableCell>{props.cashFlowStatement.cashAndCashEquivalents.netIncreaseDecrease}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Notes Table */}
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Notes</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Content</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.cashFlowStatement.notes.map((note: any) => (
              <TableRow key={note.noteNumber}>
                <TableCell>{`Note ${note.noteNumber}`}</TableCell>
                <TableCell>{note.content}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CashFlow