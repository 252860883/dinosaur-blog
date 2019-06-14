import React from 'react'
import '../style/pagination.scss'
export default class Pagination extends React.Component {
    state = {
        current:1
    }

    componentWillMount() {
        this.setState({
            current:this.props.current || 1
        })
    }

    clickButton(operation){
        this.setState({
            current: operation == 'next' ? ++this.state.current : --this.state.current
        })
        this.props.onCurrentChange(this.state.current);
    }

    render() {
        const current = this.state.current
        const prevBtn = current === 1 ? '' : <div className="pagination-btn" onClick={this.clickButton.bind(this,'prev')}>⬅</div>;
        const nextBtn = current === this.props.total ? '' : <div className="pagination-btn" onClick={this.clickButton.bind(this,'next')}>➡</div>;
        return (
            <div className="pagination">
                {prevBtn}
                {nextBtn}
            </div>  
        )
    }
}