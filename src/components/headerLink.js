import React from 'react'
import { IsPC } from "../utils/screen";
export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // headerLink :[]
        }
    }
    componentDidMount() {
        if (!IsPC()) {
        }
    }
    render() {
        return (
            <div className="headerLink">{JSON.stringify(this.props.headerLink)}</div>
        )
    }
}