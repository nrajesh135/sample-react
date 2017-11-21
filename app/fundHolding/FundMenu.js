"use strict";

import React from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid/dist/ag-grid.js";
import "ag-grid/dist/styles/ag-grid.css";
import "ag-grid/dist/styles/theme-fresh.css";
import "../styles/fund-holding.scss";

const FundMenu = React.createClass({
    propTypes: function() {
        fundHoldingData: React.PropTypes.array;
        setHeaderName: React.PropTypes.func;
    },

    getInitialState: function() {
        return {
            fundHoldingData: this.props.fundHoldingData,
            gridOptions: {}
        };
    },

    componentDidMount: function() {
        this.createGridOptions(this.props.fundHoldingData);
    },

    componentWillReceiveProps: function(nextProps) {
        if(nextProps.fundHoldingData) {
            this.setState({
                fundHoldingData: nextProps.fundHoldingData,
                gridOptions: this.createGridOptions(nextProps.fundHoldingData)
            });
        }
    },

    createGridOptions: function(fundHoldingData) {
        const gridOptions = {
            api: {},
            columnApi: {},
            columnDefs: this.getColumnDefinations(fundHoldingData),
            rowData: fundHoldingData,
            sortingOrder: ["asc", "desc", null],
            sortCallback: (name, type) => {
                console.log("Sort name: ", name);
                console.log("sort type: ", type);
            },
            onGridReady: this.onGridReady.bind(this)
        };
        console.log("Creating grid: ", gridOptions);
        return gridOptions;
    },

    onGridReady: function(params) {
        this.state.gridOptions.api = params.api;
        this.state.gridOptions.columnApi = params.columnApi;
        this.state.gridOptions.api.selectAll();
        this.setState(this.state);
    },

    onCellClicked: function(params) {
        const colDefs = params.colDef;
        const headerName = colDefs.headerName;
        console.log("Header Name: ", JSON.stringify(headerName));
        if (this.props.setHeaderName) {
            this.props.setHeaderName(headerName);
        }
    },

    getColumnDefinations: function(fundHolding) {
        const columnArray = [];
        let count = 0;
        if (fundHolding) {
            fundHolding.forEach(element => {
                Object.keys(element).forEach(function eachKey(key) {
                    if (count === 0) {
                        columnArray.push(key);
                    } else {
                        if (columnArray.indexOf(key) === -1) {
                            columnArray.push(key);
                        }
                    }
                    count++;
                });
            });
            console.log("Column Names: ", JSON.stringify(columnArray));
            const columnDefs = [];
            count = 0;
            columnArray.forEach(data => {
                if (count === 0) {
                    columnDefs.push({headerName: data, field: data, sortingOrder: ["asc", "desc"]});
                } else {
                    columnDefs.push({headerName: data, field: data});
                }
                count++;
            });
            console.log("Header fields: ", JSON.stringify(columnDefs));
            return columnDefs;
        }
        return columnArray;
    },

    render: function() {
        console.log("Fund menu...........");
        console.log("Grid Options: ", this.state.gridOptions);
        return (
            <div className="class-make">
                <div style={{height: 525, width: 1020}} className="ag-fresh" id="myGrid">
                    <AgGridReact columnDefs={this.getColumnDefinations(this.props.fundHoldingData)}
                    rowData={this.props.fundHoldingData} gridOptions={this.state.gridOptions}
                    enableSorting={true} animateRows={true} sortingOrder={this.state.sortingOrder} enableColResize={true}
                    onGridReady={this.onGridReady.bind(this)} onCellClicked={this.onCellClicked.bind(this)} />
                </div>
            </div>
        );
    }
});

export default FundMenu;
