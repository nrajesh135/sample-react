"use strict";

import React from "react";
import Pie from "./Pie";

const NewPieChart = React.createClass({
    getInitialState: function() {
        return {
            data: [5, 12, 8, 3, 10]
        };
    },
    componentDidMount: function() {
        setInterval(function() {
            let dataSize = this.getRandomInt(2, 6);
            const data = [];
            for(; dataSize--;) {
                data.push(this.getRandomInt(1, 20));
            }
            this.setState({ data: data });
        }.bind(this), 2000);
    },

    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },

    render: function() {
        const colors = ["#43A19E", "#7B43A1", "#F2317A", "#FF9824", "#58CF6C"];
        return (
            <div>
                <Pie
                    data={this.state.data}
                    radius={150}
                    hole={50}
                    colors={colors}
                    labels={true}
                    percent={true}
                    strokeWidth={3}
                    stroke={"#fff"}
                />

                <Pie
                    data={this.state.data}
                    radius={80}
                    hole={5}
                    colors={colors}
                    strokeWidth={3}
                    labels={true}
                />

                <Pie
                    data={this.state.data}
                    radius={80}
                    hole={65}
                    colors={colors}
                    strokeWidth={1}
                />

                <Pie
                    data={this.state.data}
                    radius={150}
                    hole={0}
                    colors={colors}
                    strokeWidth={1}
                    stroke={"rgba(0, 0, 0, .5)"}
                />
            </div>
        );
    }
});

export default NewPieChart;
