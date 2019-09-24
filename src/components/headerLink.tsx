import React from 'react'
import "../style/components/headerLink.scss"
export default class Main extends React.Component<any, any>{
    componentDidMount() { }

    clickPosBtn(idName: string) {
        const dom: any = document.getElementById(idName);
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
                            this.props.headerLink.map((item: any, index: number) => {
                                return <span className={'a' + item.level} key={index} onClick={this.clickPosBtn.bind(this, item.title)}>{item.title}</span>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}