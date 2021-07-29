import { Avatar, Box, Chip, makeStyles, TextField } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { Autocomplete } from "@material-ui/lab";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const transformDataMapToTable = (data) => {
  if (data.length) {
    console.log({ data });
    const tableData = [];
    for (let i = 0; i < data.length; ++i) {
      tableData.push(
        _.set(
          _.pick(data[i], ["country", "cases", "deaths", "recovered", "countryInfo"]),
          ["id"],
          data[i].country
        )
      );
    }
    return tableData;
  }
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(0.5, 0.5, 0),
      justifyContent: "space-between",
      display: "flex",
      alignItems: "flex-start",
      flexWrap: "wrap",
      margin: "1rem",
    },
    textField: {
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
      margin: theme.spacing(1, 0.5, 1.5),
      "& .MuiSvgIcon-root": {
        marginRight: theme.spacing(0.5),
      },
      "& .MuiInput-underline:before": {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
  })
  //   { defaultTheme }
);

function QuickSearchToolbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        autoHighlight
        autoSelect
        fullWidth
        filterSelectedOptions
        noOptionsText="No country match"
        limitTags={5}
        size="small"
        multiple
        id="tags-filled"
        options={props.options}
        getOptionLabel={(option) => option.country}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option.country} {...getTagProps({ index })} />
          ))
        }
        onChange={(e, value) => props.onSelect(value)}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Search country" />
        )}
      />
    </div>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default function TableCountriesCovid({ countriesData }) {
  const [data, setData] = useState();
  const [searchResult, setSearchResult] = useState();
  const [t] = useTranslation();

  const dataTable = useMemo(
    () => transformDataMapToTable(countriesData),
    [countriesData]
  );
  useEffect(() => {
    if (searchResult) {
      setData(searchResult);
      console.log({ dataTable });
    }
    if (!searchResult.length) {
      setData("");
    }
  }, [searchResult]);

  const debounce = _.debounce((value) => requestSearch(value), 200);
  const handleSearch = useCallback((value) => debounce(value), []);

  const requestSearch = (value) => {
    console.log("ref", value);
    setSearchResult(value);
  };

  const handleDeleteSearchResultArray = (value, idx) => {
    console.log("delete search");
  };

  return (
    <div style={{ height: "50vh", width: "100%" }}>
      <DataGrid
        components={{
          Toolbar: QuickSearchToolbar,
        }}
        componentsProps={{
          toolbar: {
            onSelect: (value) => handleSearch(value),
            onDelete: (value, idx) => handleDeleteSearchResultArray(value, idx),
            options: dataTable,
          },
        }}
        columns={[
          {
            field: "country",
            headerName: `${t("common.country")}`,
            minWidth: 50,
            flex: 1,
            renderCell: (params) => (
              <Box display="flex" flexFlow="row nowrap" alignItems="center">
                <Avatar alt={params.value} src={params.row.countryInfo.flag}>
                  `${console.log({ params })}`
                </Avatar>
                <Box marginLeft="16px">{params.value}</Box>
              </Box>
            ),
          },
          { field: "cases", headerName: `${t("common.cases")}`, flex: 0.5 },
          { field: "deaths", headerName: `${t("common.deaths")}`, flex: 0.5 },
          { field: "recovered", headerName: `${t("common.recovered")}`, flex: 0.5 },
        ]}
        rows={data || dataTable}
      />
    </div>
  );
}
