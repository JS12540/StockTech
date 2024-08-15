import React, { useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/system';
import { Grid, Card, CardContent, Typography, Button, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getReportSegment } from '../../../API';
import camelCaseToNormal from '../../../Utility';
import { translateStatement } from '../../../API';

type Props = {
  managementDiscussionAnalysis: Array<any>;
}

type SectionProps = {
  sectionName: string,
  sectionCont: string,
  lang: string
}

const StyledCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
}));


const Section = ({ sectionName, sectionCont, lang }: SectionProps) => {
  const theme = useTheme();

  const [sectionContent, setSectionContent] = useState(sectionCont);

  sectionName = sectionName.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();

  useEffect(() => {
    console.log(lang);
    if (lang != 'English') {
      translateStatement({ target_language: lang, message: sectionCont })
        .then((res: any) => {
          setSectionContent(res.data['translation']);
        })
        .catch((err) => console.log(err));
    }
    else
      setSectionContent(sectionCont);

  }, [lang, sectionCont])

  return (
    <Grid item xs={12}>
      <StyledCard>
        <StyledCardContent>
          <Typography variant="h5" component="div">
            {sectionName}
          </Typography>
          <Typography variant="body2" color="black">
            {sectionContent}
          </Typography>
        </StyledCardContent>
      </StyledCard>
    </Grid>
  );
}

const ManagementAnalysis = (props: Props) => {

  const transLanguages = ['English', 'Hindi', 'Marathi']

  const [currLang, setCurrLang] = useState('English');

  console.log(props.managementDiscussionAnalysis);

  return (
    <>
      <Typography
        variant="h5"
        noWrap
      >
        <Stack direction="row" spacing={2}>
          {transLanguages.map((lang: any, index: any) => (
            <Button key={index} variant={lang === currLang ? "contained" : "outlined"} color="primary" onClick={() => setCurrLang(lang)}>
              {lang}
            </Button>
          ))}
        </Stack>
      </Typography>
    <Grid container spacing={2}>
      {props.managementDiscussionAnalysis?.length ? props.managementDiscussionAnalysis.map((item: any) => (
        <Section key={item.sectionName} sectionName={item.sectionName} sectionCont={item.content} lang={currLang} />
      )) : <>Empty</>}
    </Grid>
    </>
  )
}

export default ManagementAnalysis