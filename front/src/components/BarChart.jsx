import React, { Component } from 'react';
import d3 from 'd3';

import { Rectangles, SVGContainer, Animate, XAxis, YAxis } from 'react-d3js';

export default class BarChart extends Component {

    static defaultProps = {
        animate: false,
        width: 300,
        height: 300,
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
        const {width, height, data} = props;
        const attributes = {};
        this.xScale = d3.scale.ordinal().domain(Object.keys(data)).rangePoints([
            60, width - 100,
        ]);
        this.yScale = d3.scale.linear().domain([d3.sum(Object.values(data)), 0]).range([
            10, height - 50,
        ]);

        attributes.rect = Object.entries(data).map((field, index) => {
            return {
                key: index,
                x: this.xScale(field[0]),
                y: this.yScale(field[1]) - 10,
                width: 40,
                height: height - this.yScale(field[1]) - 50,
                style: {
                    stroke: index === 0 ? 'green' : 'red',
                    strokeWidth: 2,
                    fill: index === 0 ? 'green' : 'red',
                },
                value: field[1],
            };
        });

        return attributes;
    }

    _buildAnimations(props) {
        const animations = {};
        animations.rect = {
            duration: 1000,
            childrenPropsToAnimate: 'attrs',
            delay: 0,
            attributes: [
                {
                    name: 'y',
                    from: this.yScale(0) - 10,
                    to: (elementAttributes) => {
                        return this.yScale(elementAttributes.value);
                    },
                },
                {
                    name: 'height',
                    from: this.props.height - 50,
                    to: (elementAttributes) => {
                        return props.height - this.yScale(elementAttributes.value) - 50;
                    },
                },
            ],
        };

        return animations;
    }

    render() {
        const {width, height, style, animate, label} = this.props;
        return (
            <SVGContainer width={width} height={height}>
                <text x="30" y={height / 2 - 6}
                      fontFamily="Verdana"
                      fontSize="1em"
                      textAnchor="middle"
                      transform={`rotate(270, 15, ${height/2})`}>
                      {`Winned ${label} comparisons`}
                </text>
                <XAxis style={{stroke: 'steelblue', strokeWidth: 1}} verticalPosition={height - 50} scale={this.xScale} />
                <YAxis style={{stroke: 'steelblue', strokeWidth: 1}} horizontalPosition={50} scale={this.yScale} />
                <Animate {...this.state.animation.rect} animate={animate ? true : false}>
                    <Rectangles attrs={this.state.attributes.rect} />
                </Animate>
            </SVGContainer>
        );
    }
}
