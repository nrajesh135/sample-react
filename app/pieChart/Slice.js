"use strict";
import React from "react";

const Slice = React.createClass({
    propTypes: function() {
        fill: React.PropTypes.object;
        showLabel: React.PropTypes.object;
        percentValue: React.PropTypes.object;
        percent: React.PropTypes.object;
        value: React.PropTypes.array;
        strokeWidth: React.PropTypes.object;
        stroke: React.PropTypes.object;
    },
    getInitialState: function() {
        return {
            path: "",
            x: 0,
            y: 0
        };
    },

    componentDidMount: function() {
        this.animate();
    },

    componentWillReceiveProps: function() {
        this.setState({ path: "" });
        this.animate();
    },

    animate: function() {
        this.draw(0);
    },

    getAnglePoint: function(startAngle, endAngle, radius, x, y) {
        const x1 = x + radius * Math.cos(Math.PI * startAngle / 180);
        const y1 = y + radius * Math.sin(Math.PI * startAngle / 180);
        const x2 = x + radius * Math.cos(Math.PI * endAngle / 180);
        const y2 = y + radius * Math.sin(Math.PI * endAngle / 180);
        return { x1, y1, x2, y2 };
    },

    draw: function(data) {
        let s = data;
        if(!this.isMounted()) {
            return;
        }

        const p = this.props;
        const path = [];
        const step = p.angle / (37.5 / 2);
        if((s + step) > p.angle) {
            s = p.angle;
        }

        // Get angle points
        const a = this.getAnglePoint(p.startAngle, p.startAngle + s, p.radius, p.radius, p.radius);
        const b = this.getAnglePoint(p.startAngle, p.startAngle + s, p.radius - p.hole, p.radius, p.radius);

        path.push("M" + a.x1 + "," + a.y1);
        path.push("A" + p.radius + "," + p.radius + " 0 " + (s > 180 ? 1 : 0) + ",1 " + a.x2 + "," + a.y2);
        path.push("L" + b.x2 + "," + b.y2);
        path.push("A" + (p.radius - p.hole) + "," + (p.radius - p.hole) + " 0 " + (s > 180 ? 1 : 0) + ",0 " + b.x1 + "," + b.y1);
        // Close
        path.push("Z");

        this.setState({ path: path.join(" ") });
        if(s < p.angle) {
            // setTimeout(function() { self.draw(s + step); }, 16);
        } else if(p.showLabel) {
            const c = this.getAnglePoint(p.startAngle, p.startAngle + (p.angle / 2), (p.radius / 2 + p.trueHole / 2), p.radius, p.radius);
            this.setState({
                x: c.x2,
                y: c.y2
            });
        }
    },

    render: function() {
        return (
            <div>
                <g overflow="hidden">
                    <path
                        d={this.state.path}
                        fill={this.props.fill}
                        stroke={this.props.stroke}
                        strokeWidth={this.props.strokeWidth ? this.props.strokeWidth : 3}
                    />
                    {this.props.showLabel && this.props.percentValue > 5 ?
                        <text x={this.state.x} y={this.state.y} fill="#fff" textAnchor="middle">
                            {this.props.percent ? this.props.percentValue + "%" : this.props.value}
                        </text>
                        : null}
                </g>
            </div>
        );
    }
});

export default Slice;
