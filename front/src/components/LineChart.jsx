import React,  { Component } from 'react';
import d3 from 'd3';

import { Paths, SVGContainer, Animate, XAxis, YAxis } from 'react-d3js';

export default class LineChart extends Component {

    static defaultProps = {
        animate: false,
        width: 600,
        height: 300,
        style: {
            stroke: 'steelblue',
            strokeWidth: 2,
            fill: 'none',
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            animate: true,
            attributes: this._buildAttributes(props),
            animation: this._buildAnimations(props),
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            attributes: this._buildAttributes(nextProps),
            animation: this._buildAnimations(nextProps),
        });
    }

    _buildAttributes(props) {
        const {width, height, data, data2} = props;
        const attributes = {};
        this.xScale = d3.scale.ordinal().domain(Object.keys(data)).rangePoints([
            50, width - 20,
        ]);
        this.yScale = d3.scale.linear().domain([d3.max(Object.values(data).concat(Object.values(data2))), 0]).range([
            20, height - 50,
        ]);

        const pathFormula = Paths.utils.getFormula((value) => this.xScale(value[0]), (value) => this.yScale(value[1]));
        const totalLength = Paths.utils.getLength(data, (value) => this.xScale(value[0]), (value) => this.yScale(value[1]));
        const totalLength2 = Paths.utils.getLength(data2, (value) => this.xScale(value[0]), (value) => this.yScale(value[1]));

        attributes.line = [{
            d: pathFormula(Object.entries(data)),
            strokeDasharray: totalLength + ' ' + totalLength,
            style: {
                stroke: 'green',
                strokeWidth: 2,
                fill: 'none',
            },
        }];

        attributes.line2 = [{
            d: pathFormula(Object.entries(data2)),
            strokeDasharray: totalLength2 + ' ' + totalLength2,
            style: {
                stroke: 'red',
                strokeWidth: 2,
                fill: 'none',
            },
        }];

        return attributes;
    }

    _buildAnimations(props) {
        const animations = {};
        animations.line = {
            duration: 2000,
            childrenPropsToAnimate: 'attrs',
            delay: 0,
            style: [
                {
                    name: 'strokeDashoffset',
                    from: Paths.utils.getLength(props.data, (value) => this.xScale(value[0]), (value) => this.yScale(value[1])),
                    to: () => {
                        return 0;
                    },
                    ease: 'linear',
                },
            ],
        };

        animations.line2 = {
            duration: 2000,
            childrenPropsToAnimate: 'attrs',
            delay: 0,
            style: [
                {
                    name: 'strokeDashoffset',
                    from: Paths.utils.getLength(props.data2, (value) => this.xScale(value[0]), (value) => this.yScale(value[1])),
                    to: () => {
                        return 0;
                    },
                    ease: 'linear',
                },
            ],
        };

        return animations;
    }

    render() {
        const {width, height, style, animate} = this.props;
        return (
            <SVGContainer width={width} height={height}>
                <text x="30" y={height / 2 - 6}
                      fontFamily="Verdana"
                      fontSize="1em"
                      textAnchor="middle"
                      transform={`rotate(270, 15, ${height/2})`}>
                  Winned grades comparisons
                </text>
                <text x={width / 2} y={height - 5}
                      fontFamily="Verdana"
                      fontSize="1em"
                      textAnchor="middle">
                  Champion level
                </text>
                <XAxis style={{stroke: 'steelblue', strokeWidth: 1}} verticalPosition={height - 50} scale={this.xScale} />
                <YAxis style={{stroke: 'steelblue', strokeWidth: 1}} horizontalPosition={50} scale={this.yScale} />
                <Animate {...this.state.animation.line} animate={animate ? true : false}>
                    <Paths attrs={this.state.attributes.line} />
                </Animate>
                <Animate {...this.state.animation.line2} animate={animate ? true : false}>
                    <Paths attrs={this.state.attributes.line2} />
                </Animate>
            </SVGContainer>
        );
    }
}
