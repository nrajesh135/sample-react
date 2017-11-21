import React from "react";
import fundHoldingJson from "../menuData/fundHolding.json";
import FundMenu from "./FundMenu.js";
import FundChart from "./FundChart";

const FundHolding = React.createClass({
    getInitialState: function() {
        return {
            fundHoldingData: fundHoldingJson,
            CSS_COLOR_NAMES: this.getHTMLColorNames,
            expandedSector: null,
            headerName: null
        };
    },

    componentDidMount: function() {
    },

    setHeaderName: function(name) {
        console.log("Clicked column name: ", name);
        this.setState({
            headerName: name
        });
    },

    getHTMLColorNames: function() {
        const CSS_COLOR_NAMES = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown",
        "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray",
        "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue",
        "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen",
        "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender",
        "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon",
        "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine",
        "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream",
        "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed",
        "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell",
        "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat",
        "White", "WhiteSmoke", "Yellow", "YellowGreen"];
        return CSS_COLOR_NAMES;
    },

    render: function() {
        return (
            <div>
                <div>
                    <FundMenu fundHoldingData={this.state.fundHoldingData} setHeaderName={this.setHeaderName} />
                </div>
                <div>
                    <FundChart fundHoldingData={this.state.fundHoldingData} CSS_COLOR_NAMES={this.getHTMLColorNames()} headerName={this.state.headerName} />
                </div>
            </div>
        );
    }
});

export default FundHolding;
