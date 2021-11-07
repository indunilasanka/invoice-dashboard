import * as React from "react";
import {useContext} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import {Box, Button, ButtonGroup, Tab, Tabs} from "@material-ui/core";
import {InvoiceContext} from "../InvoiceContext";
import {getBackEndUrl} from "../../utils/Configs";
import {DEFAULT_REQUEST_HEADER} from "../../common/Constants";

const Wrapper = styled.div`
  margin: 0 auto;
  overflow-x: hidden !important;
  height: 100vh;
  .button {
    width: 50%;
  }
  
  .Mui-selected {
    background: #3f51b5;
    color: #fff;
    font-weight: 700;
    border-radius: 8px;
  }
  }`;

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            hidden={value !== index}
            id={`vertical-viewPanel-${index}`}
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
    const invoiceData = useContext(InvoiceContext);
    const [index, setValue] = React.useState(0);

    const handleChange = (event, index) => {
        setValue(index);
    };

    const approveInvoice = () => {
        const invoiceId = invoiceData.invoicesDataArray[index].id;
        const requestBody = JSON.stringify({
            status: "APPROVED"
        });

        fetch(getBackEndUrl().invoiceUpdateEndpoint + invoiceId, {
            method: 'PUT',
            body: requestBody,
            headers: DEFAULT_REQUEST_HEADER
        }).then((resp) => {
            if (resp.ok) {
                invoiceData.updateInvoiceData(index);
                setValue(0);
            }
            return null;
        }).catch((e) => {
            invoiceData.setErrorData(e);
        });
    };

    return (
        <Wrapper>
            <ButtonGroup style={{display: "flex", justifyContent: "center", margin: "50px 0"}}>
                <Button color="primary" variant={"contained"} className="button">
                    Pending Invoices
                </Button>

                {/*<Button*/}
                {/*    color="primary"*/}
                {/*    variant={"contained"}*/}
                {/*    className="button"*/}
                {/*>*/}
                {/*    Accepted Invoices*/}
                {/*</Button>*/}
            </ButtonGroup>

            <Box sx={{flexGrow: 1, bgcolor: "background.paper", display: "flex", justifyContent: "center"}}
                 className="invoices-box">

                <Tabs orientation="vertical" variant="scrollable" value={index} onChange={handleChange}
                      sx={{borderRight: 1, borderColor: "divider"}} TabIndicatorProps={{style: {display: "none"}}}
                      className="invoice-tabs">
                    {invoiceData.invoicesDataArray.map((el, i) => (
                        <Tab label={"Invoice - " + el.id} {...a11yProps(i)} key={i}/>
                    ))}
                </Tabs>

                {(invoiceData.invoicesDataArray).map((el, i) => (
                    <TabPanel value={index} index={i} className="viewPanel" key={i}>
                        <div>
                            <div className="viewPanel-content"><p className="invoice-field">Date: {el.date}</p><p
                                className="invoice-field">Invoice number: {el.id}</p><p
                                className="invoice-field">Customer: {el.customer}</p></div>
                            <div className="price-info">
                                <div>
                                    <li className="price-fields"><span> Gross Amount</span>:<span
                                        className="price-point">{el.grossAmount}</span></li>
                                    <li className="price-fields"><span>Discount</span>:<span
                                        className="price-point">{el.discount}</span></li>
                                    <li className="price-fields" style={{borderTop: "1px solid"}}><span>Net Amount</span>:<span
                                        className="price-point">{el.netAmount}</span>
                                    </li>
                                </div>
                            </div>
                            <span className="status invoice-field"> Status: <span className="status" style={{
                                marginLeft: "10px",
                                color: "#FFA500"
                            }}>{el.status}</span></span>

                            <div className="approve-div">
                                <Button variant="contained" color="primary" onClick={approveInvoice}>Approve</Button>
                            </div>
                        </div>
                    </TabPanel>
                ))}
            </Box>
        </Wrapper>
    );
}
