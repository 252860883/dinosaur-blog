import React from 'react';
import { IsPC } from "../utils/screen";
import '../style/components/footer.scss';

interface ISProps {

}

interface IState {
    content: string
}

export default class Footer extends React.Component<ISProps, IState> {
    // constructor(props) {
    //     super(props);
    //     this.footer = null
    // }
    state = {
        content: 'Copyright © 2019 冀ICP备17032286号-1'
    }
    // footer = null
    componentDidMount() {
        // console.log(IsPC())
    }

    render() {
        return (
            <footer id= "foot" className = 'foot' >
                <span> { this.state.content } </span>
            </footer>
        )
    }
}

