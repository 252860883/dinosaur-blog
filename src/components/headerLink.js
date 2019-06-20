import React from 'react'
import "../style/headerLink.scss"
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

    clickPosBtn(idName) {
        const dom = document.getElementById(idName);
        console.log(dom.getBoundingClientRect().top);
        window.scrollTo({
            top: dom.offsetTop - 10,
            left: 0,
            behavior: 'smooth'
        });
    }

    render() {
        return (
            <div className="headerLink">
                <div className="content">
                    <div className="real-content">
                        <div className='tag'>Reading Assistance ·</div>
                        {
                            this.props.headerLink.map((item, index) => {
                                return <a className={'a' + item.level} key={index} onClick={this.clickPosBtn.bind(this, item.title)}>{item.title}</a>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}