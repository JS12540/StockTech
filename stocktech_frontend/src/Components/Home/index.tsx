import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Container,
    CssBaseline,
    Tab,
    Tabs,
    Toolbar,
    Typography,
    Paper,
    Grid,
    Box,
    Stack,
    Button
} from '@mui/material';
import ManagementAnalysis from './SubComponents/ManagementAnalysis';
import BalanceSheet from './SubComponents/BalanceSheet';
import ProfitNLoss from './SubComponents/ProfitNLoss';
import { Params, useParams } from 'react-router-dom';
import Header from './SubComponents/Header';
import CashFlow from './SubComponents/CashFlow';
import FinancialNotes from './SubComponents/FinancialNotes';
import CompanyManagement from './SubComponents/CompanyManagement';
import { getCompanyDetails } from '../../API';
import { getReportKeys, getReportSegment, getReportYears } from '../../API';


/**
 * Renders the Home component.
 *
 * @return {JSX.Element} The rendered Home component.
 */
function Home(): JSX.Element {
    const { year, isin }: any = useParams();
    const [currentTab, setCurrentTab] = useState(0);
    const [companyDetails, setCompanyDetails]: any = useState({});
    const [companyYears, setCompanyYears]: any = useState([]);
    const [currentYear, setCurrentYear]: any = useState(year);
    const [crieteria, setCrieteria]: any = useState('standalone');

    const [managementDiscussionAnalysis, setManagementDiscussionAnalysis]: Array<any> = useState([]);
    const [cashFlowStatement, setCashFlowStatement]: any = useState({});
    const [balanceSheet, setBalanceSheet]: any = useState({});
    const [profitAndLoss, setProfitAndLoss]: any = useState({});
    const [financialNotes, setFinancialNotes]: any = useState({});
    const [companyOverview, setCompanyOverview]: any = useState({});

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    useEffect(() => {
        getCompanyDetails(isin).then((res: any) => {
            setCompanyDetails(res.data);
        }).catch((err) => console.log(err));

        getReportYears(isin).then((res: any) => {
            setCompanyYears(res.data);
        }).catch((err) => console.log(err));

        getReportSegment('managementDiscussionAnalysis', year, isin).then((res: any) => {
            setManagementDiscussionAnalysis(res.data['managementDiscussionAnalysis']);
        }).catch((err) => console.log(err));

        if (crieteria == 'standalone') {

            getReportSegment('standaloneCashFlowStatement', year, isin).then((res: any) => {
                setCashFlowStatement(res.data['standaloneCashFlowStatement']);
            }).catch((err) => console.log(err));

            getReportSegment('standaloneBalanceSheet', year, isin).then((res: any) => {
                setBalanceSheet(res.data['standaloneBalanceSheet']);
            }).catch((err) => console.log(err));

            getReportSegment('standaloneProfitAndLoss', year, isin).then((res: any) => {
                setProfitAndLoss(res.data['standaloneProfitAndLoss']);
            }).catch((err) => console.log(err));

            getReportSegment('standaloneFinancialNotes', year, isin).then((res: any) => {
                setFinancialNotes(res.data['standaloneFinancialNotes']);
            }).catch((err) => console.log(err));
        }
        else {

            getReportSegment('consolidateCashFlowStatement', year, isin).then((res: any) => {
                setCashFlowStatement(res.data['consolidateCashFlowStatement']);
            }).catch((err) => console.log(err));

            getReportSegment('consolidateBalanceSheet', year, isin).then((res: any) => {
                setBalanceSheet(res.data['consolidateBalanceSheet']);
            }).catch((err) => console.log(err));

            getReportSegment('consolidateProfitAndLoss', year, isin).then((res: any) => {
                setProfitAndLoss(res.data['consolidateProfitAndLoss']);
            }).catch((err) => console.log(err));

            getReportSegment('consolidateFinancialNotes', year, isin).then((res: any) => {
                setFinancialNotes(res.data['consolidateFinancialNotes']);
            }).catch((err) => console.log(err));
        }

        getReportSegment('companyOverview', year, isin).then((res: any) => {
            setCompanyOverview(res.data);
        }).catch((err) => console.log(err));

    }, [currentYear, crieteria]);


    return (
        <>
            <CssBaseline />
            <Header />
            <Container maxWidth="xl" style={{ marginTop: '2rem' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            variant="h5"
                            noWrap
                        >
                            {companyDetails?.name} ({companyDetails?.symbol})
                            {companyYears.length ?
                                <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
                                    {companyYears.map((dataYear: any, index: any) => (
                                        <Button key={index} variant={dataYear === currentYear ? "contained" : "outlined"} color="primary" onClick={() => currentYear(dataYear)}>
                                            {year}
                                        </Button>
                                    ))}
                                </Stack> : <></>
                            }
                        </Typography>
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{ marginTop: 3 }}
                        >
                            <Stack direction="row" spacing={2}>
                                <Button key={'standalone'} variant={crieteria === 'standalone' ? "contained" : "outlined"} color="primary" onClick={() => setCrieteria('standalone')}>
                                    Standalone
                                </Button>
                                <Button key={'consolidate'} variant={crieteria === 'consolidate' ? "contained" : "outlined"} color="primary" onClick={() => setCrieteria('consolidate')}>
                                    Consolidate
                                </Button>
                            </Stack>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3}>
                            <Tabs
                                value={currentTab}
                                onChange={handleTabChange}
                                scrollButtons="auto"
                                indicatorColor="primary"
                                textColor="primary"
                            >
                                <Tab label="Company Management" />
                                <Tab label="Management Discussion and Analysis" />
                                <Tab label="Balance Sheet" />
                                <Tab label="Profit and Loss" />
                                <Tab label="Cash Flow" />
                                <Tab label="Financial Notes" />
                            </Tabs>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth="xl" style={{ marginTop: '2rem' }}>
                {currentTab === 0 && <CompanyManagement companyOverview={companyOverview} />}
                {currentTab === 1 && <ManagementAnalysis managementDiscussionAnalysis={managementDiscussionAnalysis} />}
                {currentTab === 2 && <BalanceSheet balanceSheet={balanceSheet} />}
                {currentTab === 3 && <ProfitNLoss profitAndLoss={profitAndLoss} />}
                {currentTab === 4 && <CashFlow cashFlowStatement={cashFlowStatement} />}
                {currentTab === 5 && <FinancialNotes financialNotes={financialNotes} />}
            </Container>
        </>
    );
}

export default Home;
