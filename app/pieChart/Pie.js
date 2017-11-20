"use strict";

import React from "react";
import Slice from "./Slice";

const Pie = React.createClass({
    propTypes: function() {
        colors: React.PropTypes.object;
        colorsLength: React.PropTypes.object;
        labels: React.PropTypes.object;
        hole: React.PropTypes.object;
        radius: React.PropTypes.object;
        data: React.PropTypes.array;
        strokeWidth: React.PropTypes.object;
        stroke: React.PropTypes.object;
    },

    defaultProps: function() {
        stroke: "#fff";
        strokeWidth: 3;
    },

    render: function() {
        const colors = this.props.colors;
        const colorsLength = colors.length;
        const labels = this.props.labels;
        const hole = this.props.hole;
        const radius = this.props.radius;
        const diameter = radius * 2;
        const sum = this.props.data.reduce(function(carry, current) { return carry + current; }, 0);
        const stroke = this.props.stroke === null ? "#fff" : this.props.stroke;
        const strokeWidth = this.props.strokeWidth === null ? 3 : this.props.strokeWidth;
        let startAngle = 0;
        return(
            <div>
                <svg width={diameter} height={diameter} viewBox={"0 0 " + diameter + " " + diameter} xmlns="http://www.w3.org/2000/svg" version="1.1">
                    {this.props.data.map(function(slice, sliceIndex) {
                        const nextAngle = startAngle;
                        const angle = (slice / sum) * 360;
                        const percent = (slice / sum) * 100;
                        startAngle += angle;
                        return (<div>
                            <Slice key={sliceIndex} value={slice} percent={percent} percentValue={percent.toFixed(1)}
                                startAngle={nextAngle} angle={angle} radius={radius} hole={radius - hole}
                                trueHole={hole} showLabel={labels} fill={colors[sliceIndex % colorsLength]}
                                stroke={stroke} strokeWidth={strokeWidth} />
                        </div>);
                    })}
                </svg>
            </div>
        );
    }
});

export default Pie;
