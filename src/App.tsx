import * as React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './App.css';
// import schema from './schema.json';
import uischema from './uischema.json';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import RatingControl from './RatingControl';
import ratingControlTester from './ratingControlTester';
import { makeStyles } from '@material-ui/core/styles';
import {
  vanillaCells,
  vanillaRenderers,
  JsonFormsStyleContext,
  vanillaStyles,
} from '@jsonforms/vanilla-renderers';
var GenerateSchema = require('generate-schema');

const useStyles = makeStyles((_theme) => ({
  container: {
    padding: '1em',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
  },
  resetButton: {
    margin: 'auto',
    display: 'block',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
}));

const initialData = {
  label: 'TAXONOMY',
  icon: {
    name: 'Hierarchy',
  },
  subSections: [
    {
      label: 'Global Product Types',
      icon: {
        name: 'TaxonomyNode',
      },
      href: '/taxonomy/gpt',
    },
    {
      label: 'Product Types',
      icon: {
        name: 'Hierarchy',
        category: 'basic',
      },
      href: '/taxonomy/pt',
    },
    {
      label: 'Attributes',
      icon: {
        name: 'Assortment',
      },
      href: '/taxonomy/attributes',
    },
    {
      label: 'List View',
      icon: {
        name: 'MultipleSpreadsheet',
      },
      href: '/taxonomy/list-view',
    },
    {
      label: 'Bulk Import Export',
      icon: {
        name: 'BulkEditIcon',
      },
      href: '/taxonomy/bulk-import-export',
    },
  ],
};

var schema = GenerateSchema.json('Product', initialData)

const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: ratingControlTester, renderer: RatingControl },
];

const App = () => {
  const classes = useStyles();
  const [displayDataAsString, setDisplayDataAsString] = useState('');
  const [jsonformsData, setJsonformsData] = useState<any>(initialData);

  useEffect(() => {
    setDisplayDataAsString(JSON.stringify(jsonformsData, null, 2));
  }, [jsonformsData]);

  const clearData = () => {
    setJsonformsData({});
  };

  return (
    <Fragment>

      <Grid
        container
        justify={'center'}
        spacing={1}
        className={classes.container}
      >
        <Grid item sm={6}>
          <Typography variant={'h3'} className={classes.title}>
            Json
          </Typography>
          <div className={classes.dataContent}>
            <pre id='boundData'>{displayDataAsString}</pre>
          </div>
          <Button
            className={classes.resetButton}
            onClick={clearData}
            color='primary'
            variant='contained'
          >
            Clear data
          </Button>
        </Grid>
        <Grid item sm={6}>
          <Typography variant={'h3'} className={classes.title}>
            Form Builder
          </Typography>
          <div className={classes.demoform}>
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={jsonformsData}
              renderers={renderers}
              cells={vanillaCells}
              onChange={({ errors, data }) => setJsonformsData(data)}
            />
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default App;
