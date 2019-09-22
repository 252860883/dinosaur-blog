import React from 'react';
// import { IsPC } from "../utils/screen";
import '../style/components/footer.scss';

interface ISProps { }
interface IState {
    content: string
}

export default class Footer extends React.Component<ISProps, IState> {

    state = {
        content: 'Copyright © 2019 冀ICP备17032286号-1'
    }

    render() {
        return (
            <footer className='footer'>
                <span>{this.state.content}</span>
            </footer>
        )
    }
}

