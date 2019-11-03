import React from 'react';
// import { IsPC } from "../utils/screen";
import '../style/components/footer.scss';
interface IState {
    content: string
}

export default class Footer extends React.Component<any, IState> {

    state = {
        content: 'Copyright © 2019 冀ICP备17032286号-1'
    }

    render() {
        return (
            <footer className='footer'>
                <img src={require('../assets/bottom-bg.png')} alt=""/>
            </footer>
        )
    }
}

