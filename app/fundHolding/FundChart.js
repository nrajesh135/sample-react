"use strict";

import React from "react";
import PieChart from "../pieChart/PieChart";
import "../styles/fund-holding.scss";

const FundChart = React.createClass({
    propTypes: function() {
        fundHoldingData: React.PropTypes.array;
        CSS_COLOR_NAMES: React.PropTypes.array;
        headerName: React.PropTypes.string;
    },

    getInitialState: function() {
        return {
            fundHoldingData: this.props.fundHoldingData,
            gridOptions: {},
            expandedSector: null,
            chartData: this.createChartData(this.props.fundHoldingData),
            columnValues: {},
            headerName: this.props.headerName,
            columnCount: 0
        };
    },

    componentDidMount: function() {
        this.handleMouseEnterOnSector = this.handleMouseEnterOnSector.bind(this);
    },

    componentWillReceiveProps: function(nextProps) {
        const fundHoldingData = nextProps.fundHoldingData;
        if(fundHoldingData) {
            this.setState({
                fundHoldingData: fundHoldingData,
                chartData: this.createChartData(fundHoldingData, nextProps.headerName, nextProps.CSS_COLOR_NAMES)
            });
        }
    },

    handleMouseEnterOnSector: function(sector) {
        console.log("Sector: ", sector);
        this.setState({expandedSector: sector});
    },

    getColumnDefinations: function(fundHolding) {
        const columnValues = [];
        let count = 0;
        if (fundHolding) {
            const columnArray = [];
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
            console.log("Column Names Chart: ", JSON.stringify(columnArray));
            columnArray.forEach(function(name) {
                const columns = [];
                fundHolding.forEach(function(data) {
                    columns.push(data[name]);
                });
                columnValues.push({[name]: columns});
            });
        }
        console.log("Column values: ", columnValues);
        return columnValues;
    },

    getRandomInt: function(max, min) {
        console.log("I am here: ", max);
        const colorCodeIndex = Math.floor(Math.random() * (max - min + 1) + min);
        console.log("Color code index: ", colorCodeIndex);
        return colorCodeIndex;
    },

    createChartData: function(fundHoldingData, headerName, colors) {
        const headerValArray = this.getColumnDefinations(fundHoldingData);
        console.log("Header column values: ", JSON.stringify(headerValArray));
        console.log("HeaderName ", headerName);
        console.log("Colors: ", colors);
        const chartDataArray = [];
        if(headerValArray && headerName) {
            let columnData = {};
            headerValArray.forEach(function(data) {
                if (data[headerName]) {
                    columnData = data[headerName];
                    const columnCount = {};
                    const colorCount = colors.length;
                    const min = 0;
                    columnData.forEach(function(element) {
                        columnCount[element] = (columnCount[element] || 0) + 1;
                    });
                    console.log("Counts data: ", columnCount);
                    Object.keys(columnCount).forEach(function(key) {
                        const chartDataObj = {};
                        chartDataObj.label = key;
                        chartDataObj.value = columnCount[key];
                        chartDataObj.color = colors[Math.floor(Math.random() * (colorCount -  + 1) + min)];
                        chartDataArray.push(chartDataObj);
                    });
                    console.log("Chart data object: ", chartDataArray);
                }
            });
            this.setState({
                columnCount: columnData.length
            });
        }
        return chartDataArray;
    },

    displayPercentage: function(count) {
        const radix = 10;
        const totalCount = this.state.columnCount;
        const a = parseInt(count, radix);
        const b = parseInt(totalCount, radix);
        return parseInt(((a / b) * 100), radix);
    },

    render: function() {
        const data = this.state.chartData ? this.state.chartData : [];
        const columnCount = data.length;
        console.log("Chart data: ", data);
        return (
            <div>
                <div>
                    <div>
                        <PieChart className="Pie Chart" data={data} onSectorHover={this.handleMouseEnterOnSector}
                            sectorStrokeWidth={0} expandOnHover shrinkOnTouchEnd />
                    </div>
                    <div>
                    {
                        data.map((element, i) => (
                            <div key={i}>
                                <span style={{background: element.color}}></span>
                                <span style={{fontWeight: this.state.expandedSector === i ? "bold" : null,
                                    color: this.state.expandedSector === i ? element.color : null}}>
                                    {element.label} : {this.displayPercentage(element.value, columnCount)}%
                                </span>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        );
    }
});

export default FundChart;
