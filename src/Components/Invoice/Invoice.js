import * as React from "react";
import {useState} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import {Box, Button, ButtonGroup, Tab, Tabs} from "@material-ui/core";
import {useInvoiceContext} from "../../Utils/InvoiceContext";

const Wrapper = styled.div`
  margin: 0 auto;
  overflow-x: hidden !important;
  height: 100vh;
  .button {
    width: 50%;
  }
  .title {
    padding: 50px 0;
    text-align: center;
  }
  .text {
    font-size: 16px;
    margin: 0;
    font-weight: 700 !important;
  }
  .list {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .Mui-selected {
    background: #3f51b5;
    color: #fff;
    font-weight: 700 !important;
    border-radius: 8px;
  }
  .my-tabs {
    height: 224px;
  }
  .customer-info {
    display: flex !important;
    justify-content: center !important;
    flex-direction: column !important;
    align-items: flex-end !important;
    padding-top: 30px;
  }

  .tabPanel {
    border: 1px solid #3f51b5;
    border-radius: 8px;
    margin-left: 15px;
    padding: 0 20px;
    width: 500px;
  }
  .date {
    text-align: center;
  }
  .list {
    list-style-type: none;
  }

  .status {
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
  }
  .what-status {
    font-weight: 400;
  }
  .MuiSelect-select {
    padding: 5px 12px;
  }
  @media only screen and (max-width: 991px) {
    .tabPanel {
      width: 400px;
    }
  }
  @media only screen and (max-width: 767px) {
    .tabPanel {
      width: 370px;
    }
  }

  @media only screen and (max-width: 600px) {
    .my-box {
      flex-direction: row !important;
    }

    .tabPanel {
      border: 1px solid #3f51b5;
      border-radius: 8px;

      padding: 0 0px;
    }
    .text {
      font-size: 16px;
      font-weight: 500;
    }
    .customer-info {
      padding-left: 20px;
      font-size: 14px;
    }
    .MuiTab-wrapper {
      font-size: 10px;
    }
    .button {
      font-size: 12px;
    }
  }
  @media only screen and (max-width: 575px) {
    .tabPanel {
      width: 350px;
      margin-left: 6px;
    }
    .MuiBox-root-12 {
      padding: 15px;
    }
  }
  @media only screen and (max-width: 520px) {
    .tabPanel {
      width: auto;

      margin-left: 4px;
    }
  }`;

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <h2>{children}</h2>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

export default function Invoice() {
    const {invoicesDataArray} = useInvoiceContext();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [age, setAge] = React.useState("");

    const handleStatus = (e) => {
        setAge(e.target.value);
    };

    const [, setStatus] = useState("Pending....");
    const [pending, setPending] = useState(true);
    const [, setApproved] = useState(false);
    const showPending = () => {
        setPending(true);
        setApproved(false);
        setStatus("Pending....");
    };

    return (
        <Wrapper>
            <ButtonGroup
                style={{display: "flex", justifyContent: "center", margin: "25px 0"}}
            >
                <Button
                    color="primary"
                    variant={pending && "contained"}
                    onClick={showPending}
                    className="button"
                >
                    Pending Invoices
                </Button>
            </ButtonGroup>

            <Box
                sx={{
                    flexGrow: 1,
                    bgcolor: "background.paper",
                    display: "flex",
                    justifyContent: "center",
                }}
                className="my-box"
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical force tabs example"
                    sx={{borderRight: 1, borderColor: "divider"}}
                    TabIndicatorProps={{style: {display: "none"}}}
                    className="my-tabs"
                >
                    {invoicesDataArray.map((el, i) => (
                        <Tab label={el.id} {...a11yProps(i)} key={i}/>
                    ))}
                </Tabs>

                {(invoicesDataArray).map((el, i) => (
                    <TabPanel value={value} index={i} className="tabPanel" key={i}>
                        <div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    flexDirection: "column",
                                }}
                            >
                                <p className="date text">Date:{el.date}</p>

                                <p className="invoice-number text">
                                    Invoice number:{el.id}
                                </p>
                                <p className="customer text"> customer:{el.customer}</p>
                            </div>
                            <div className="customer-info">
                                <div>
                                    {" "}
                                    <li className="gross-amount list">
                                        <span style={{marginRight: "3px"}}> Gross Amount</span>:{" "}
                                        <span style={{marginLeft: "3px"}}>{el.grossAmount}</span>
                                    </li>
                                    <li className="discount list">
                                        <span>Discount</span>: <span>{el.discount}</span>
                                    </li>
                                    <li className="net-amount list">
                                        <span>Net Amount</span>:{" "}
                                        <span>{el.netAmount}</span>
                                    </li>
                                </div>
                            </div>
                            <span className="status text">
                Status:
                <span className="what-status">
                  {" "}
                    <FormControl sx={{m: 1, minWidth: 120}}>
                    <Select
                        value={age}
                        onChange={handleStatus}
                        displayEmpty
                        inputProps={{"aria-label": "Without label"}}>

                      <MenuItem value="">Pending</MenuItem>
                      <MenuItem value="2">Approved</MenuItem>
                    </Select>
                  </FormControl>
                </span>
              </span>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {" "}
                                <Button variant="contained" color="primary">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </TabPanel>
                ))}
            </Box>
        </Wrapper>
    );
}
