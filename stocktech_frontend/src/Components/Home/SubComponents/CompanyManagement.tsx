import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Grid, Card, CardContent, Container, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';


type Props = {
  companyOverview: any
}

const CompanyManagement = (props: Props) => {

  return (
    <Box>
      {/* Board Data */}
      {props?.companyOverview?.boardData ?
        <>
          <Typography variant="h4">Board Members</Typography>
          <List>
            {props.companyOverview.boardData.members.map((member: any, index: any) => (
              <ListItem key={index}>
                <ListItemText primary={member.name} secondary={member.position} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ marginBottom: "20px" }} />

          <Typography variant="h4">Notes</Typography>
          <List>
            {props.companyOverview.boardData.notes.map((note: any, index: any) => (
              <ListItem key={index}>
                <ListItemText primary={note.name} secondary={note.note} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ marginBottom: "20px" }} />

          {
            props.companyOverview.boardData?.committees ? <>
              <Typography variant="h4" sx={{ marginBottom: "10px" }} >Committees</Typography>
              <Typography variant="h5">Audit Committee</Typography>
              <List>
                <ListItem>
                  <ListItemText primary={`Chairman: ${props.companyOverview.boardData.committees?.audit?.chairman}`} />
                </ListItem>
                {props.companyOverview.boardData.committees?.audit?.members?.map((member: any, index: any) => (
                  <ListItem key={index}>
                    <ListItemText primary={member} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="h5">Nomination & Remuneration Committee</Typography>
              <List>
                <ListItem>
                  <ListItemText primary={`Chairman: ${props.companyOverview.boardData.committees?.nominationRemuneration?.chairman}`} />
                </ListItem>
                {props.companyOverview.boardData.committees?.nominationRemuneration?.members?.map((member: any, index: any) => (
                  <ListItem key={index}>
                    <ListItemText primary={member} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="h5">Stakeholder Relationship Committee</Typography>
              <List>
                <ListItem>
                  <ListItemText primary={`Chairman: ${props.companyOverview.boardData.committees?.stakeholderRelationship?.chairman}`} />
                </ListItem>
                {props.companyOverview.boardData.committees?.stakeholderRelationship?.members?.map((member: any, index: any) => (
                  <ListItem key={index}>
                    <ListItemText primary={member} />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ marginBottom: "20px" }} />
            </> : <></>
          }

          <Typography variant="h4">Management Team</Typography>
          <Typography variant="h5">Chief Financial Officer</Typography>
          <List>
            <ListItem>
              <ListItemText primary={props.companyOverview.boardData.managementTeam.CFO.name} secondary={props.companyOverview.boardData.managementTeam.CFO.position} />
            </ListItem>
          </List>

          <Typography variant="h5">Chief Technology Officer</Typography>
          <List>
            <ListItem>
              <ListItemText primary={props.companyOverview.boardData.managementTeam.CTO.name} secondary={props.companyOverview.boardData.managementTeam.CTO.position} />
            </ListItem>
          </List>

          <Typography variant="h5">Chief Supply Chain Officer</Typography>
          <List>
            <ListItem>
              <ListItemText primary={props.companyOverview.boardData.managementTeam.CSCO.name} secondary={props.companyOverview.boardData.managementTeam.CSCO.position} />
            </ListItem>
          </List>

          <Divider sx={{ marginBottom: "20px" }} />

          <Typography variant="h4">Bankers</Typography>
          <List>
            {props.companyOverview.boardData.bankers.map((bank: any, index: any) => (
              <ListItem key={index}>
                <ListItemText primary={bank} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ marginBottom: "50px" }} />
        </>
        : <></>}


      {/* Auditors  */}
      {props?.companyOverview?.auditors ?
        <>
          <Typography variant="h4" sx={{ marginBottom: '20px' }}>Auditors Information</Typography>
          <Grid container spacing={3}>
            {Object.keys(props.companyOverview.auditors).map((auditorKey) => (
              <Grid key={auditorKey} item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{props.companyOverview.auditors[auditorKey].name}</Typography>
                    <Typography>Email: {props.companyOverview.auditors[auditorKey].email}</Typography>
                    <Typography>Phone: {props.companyOverview.auditors[auditorKey].phone}</Typography>
                    <Typography>Website: {props.companyOverview.auditors[auditorKey].website}</Typography>
                    <Typography>Address: {props.companyOverview.auditors[auditorKey].address}</Typography>
                    <Typography>CIN Number: {props.companyOverview.auditors[auditorKey].cinNumber}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ marginBottom: "50px" }} />
        </>
        : <></>}

      {/* Board Overview */}
      {props?.companyOverview?.boardOverview ?
        <>
          <Typography variant="h4" sx={{ marginBottom: '20px' }}>Board Overview</Typography>
          <Grid container spacing={3}>
            <Typography variant="h5" gutterBottom>
              Whole Time Directors
            </Typography>
            <List>
              {props.companyOverview.boardOverview.wholeTimeDirector.map((director: any, index: any) => (
                <Paper key={index} elevation={3} style={{ margin: '10px', padding: '10px' }}>
                  <ListItem>
                    <ListItemText
                      primary={director.name}
                      secondary={`DIN: ${director.din}, DOB: ${director.dateOfBirth}`}
                    />
                  </ListItem>
                  <ListItemText
                    primary={`Qualification: ${director.qualification}`}
                    secondary={`Expertise: ${director.expertiseInFunctionalArea}`}
                  />
                  <ListItemText
                    primary={`Appointment: ${director.natureOfAppointment}`}
                    secondary={`Relationship: ${director.interseRelationshipWithOther}`}
                  />
                  <ListItemText
                    primary="List of Other Companies:"
                    secondary={Array.isArray(director.listOfOtherCompaniesInWhichDirectorship)
                      ? director.listOfOtherCompaniesInWhichDirectorship.join(', ')
                      : 'NA'}
                  />
                  <ListItemText
                    primary={`Committee Membership: ${director.chairmanMemberOfTheCommitteesOfBoardOfOtherCompanies}`}
                    secondary={`Shareholding as of March 31st: ${director.shareholdingAsOn31stMarch}`}
                  />
                </Paper>
              ))}
            </List>

            <Typography variant="h5" gutterBottom>
              Independent Directors
            </Typography>
            <List>
              {props.companyOverview.boardOverview.independentDirector.map((director: any, index: any) => (
                <Paper key={index} elevation={3} style={{ margin: '10px', padding: '10px' }}>
                  <ListItem>
                    <ListItemText
                      primary={director.name}
                      secondary={`DIN: ${director.din}, DOB: ${director.dateOfBirth}`}
                    />
                  </ListItem>
                  <ListItemText
                    primary={`Qualification: ${director.qualification}`}
                    secondary={`Expertise: ${director.expertiseInFunctionalArea}`}
                  />
                  <ListItemText
                    primary={`Appointment: ${director.natureOfAppointment}`}
                    secondary={`Relationship: ${director.interseRelationshipWithOther}`}
                  />
                  <ListItemText
                    primary="List of Other Companies:"
                    secondary={Array.isArray(director.listOfOtherCompaniesInWhichDirectorship)
                      ? director.listOfOtherCompaniesInWhichDirectorship.join(', ')
                      : 'NA'}
                  />
                  <ListItemText
                    primary={`Committee Membership: ${director.chairmanMemberOfTheCommitteesOfBoardOfOtherCompanies}`}
                    secondary={`Shareholding as of March 31st: ${director.shareholdingAsOn31stMarch}`}
                  />
                </Paper>
              ))}
            </List>
          </Grid>
          <Divider sx={{ marginBottom: "50px" }} />
        </>
        : <></>}



      {/* Board of Directors Data */}
      {props?.companyOverview?.boardOfDirectors ?
        <>
          <Typography variant="h4" sx={{ marginBottom: '20px' }}>Board of Directors</Typography>
          <Grid container spacing={3}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="body1">Date: {props.companyOverview.boardOfDirectors.board.date}</Typography>
              <Typography variant="body1">Total Directors: {props.companyOverview.boardOfDirectors.board.totalDirectors}</Typography>
              <Typography variant="body1">
                Total Executive Directors: {props.companyOverview.boardOfDirectors.board.totalExecutiveDirectors}
              </Typography>
              <Typography variant="body1">
                Total Independent Directors: {props.companyOverview.boardOfDirectors.board.totalIndependentDirectors}
              </Typography>

              <Typography variant="h5">Directors</Typography>
              <ul>
                {props.companyOverview.boardOfDirectors.directors.map((director: any) => (
                  <li key={director.srNo}>
                    {director.srNo}. {director.name} - {director.designation} ({director.category})
                  </li>
                ))}
              </ul>

              <Typography variant="body1">Number of Board Meetings: {props.companyOverview.boardOfDirectors.noBoardMeetings}</Typography>
              {
                props.companyOverview.boardOfDirectors?.notes ? <>
                  <Typography variant="h5">Notes</Typography>
              <ul>
                {props.companyOverview.boardOfDirectors.notes.map((note: any) => (
                  <li key={note.name}>
                    {note.name} - {note.note}
                  </li>
                ))}
                  </ul></> : <></>
              }

            </Paper>
          </Grid>
          <Divider sx={{ marginBottom: "50px" }} />
        </>
        : <></>}


      {/* Remuneration of All Directors */}
      {props?.companyOverview?.remunerationOfAllDirectors ?
        <>
          <Typography variant="h4" sx={{ marginBottom: '20px' }}>Remuneration of All Directors</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Sitting Fees</TableCell>
                  <TableCell>Salary</TableCell>
                  <TableCell>Bonus</TableCell>
                  <TableCell>Remuneration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.companyOverview.remunerationOfAllDirectors.map((director: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>{director.name}</TableCell>
                    <TableCell>{director.position}</TableCell>
                    <TableCell>{director.sittingFees}</TableCell>
                    <TableCell>{director.salary}</TableCell>
                    <TableCell>{director.bonus}</TableCell>
                    <TableCell>{director.remuneration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider sx={{ marginBottom: "50px" }} />
        </>
        : <></>}

    </Box>

  )
}

export default CompanyManagement
