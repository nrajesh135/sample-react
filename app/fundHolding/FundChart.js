"use strict";

import React from "react";
import PieChart from "../pieChart/PieChart";
import "../styles/fund-holding.scss";

const FundChart = React.createClass({
    propTypes: function() {
        fundHoldingData: React.PropTypes.array;
        CSS_COLOR_NAMES: React.PropTypes.array;
    },

    getInitialState: function() {
        return {
            fundHoldingData: this.props.fundHoldingData,
            gridOptions: {},
            expandedSector: null
        };
    },

    componentWillReceiveProps: function(nextProps) {
        if(nextProps.fundHoldingData) {
            this.setState({
                fundHoldingData: nextProps.fundHoldingData,
                gridOptions: this.createGridOptions(nextProps.fundHoldingData)
            });
        }
    },

    handleMouseEnterOnSector: function(sector) {
        this.setState({expandedSector: sector});
    },

    render: function() {
        const data = [
            {label: "Facebook", value: 100, color: "#3b5998"},
            {label: "Twitter", value: 60, color: "#00aced"},
            {label: "Google Plus", value: 30, color: "#dd4b39"},
            {label: "Pinterest", value: 20, color: "#cb2027"},
            {label: "Linked In", value: 10, color: "#007bb6"},
        ];
        const {expandedSector} = this.state;
        this.handleMouseEnterOnSector = this.handleMouseEnterOnSector.bind(this);
        return (
            <div>
                <PieChart
                    data={ data }
                    expandedSector={expandedSector}
                    onSectorHover={this.handleMouseEnterOnSector}
                    sectorStrokeWidth={2}
                    expandOnHover
                    shrinkOnTouchEnd
                    expandPx = {5}
                />
        </div>
        );
    }
});

export default FundChart;
