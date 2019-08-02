import React from 'react'
import '../style/pagination.scss'
export default class Pagination extends React.Component {
    state = {
        current: 1,
        show: true
    }

    componentWillMount() {
        this.setState({
            current: this.props.current || 1
        })
    }

    clickButton(operation) {
        this.setState({
            current: operation == 'next' ? ++this.state.current : --this.state.current,
            show: false
        }, () => {
            this.props.onCurrentChange(this.state.current);
        })
        setTimeout(() => {
            this.setState({
                show: true
            })
        })
    }

    windowToTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    render() {
        const current = this.state.current
        const prevBtn = (current === 1 || !this.state.show) ? '' : <div className="pagination-btn  pagination-btn--left" onClick={this.clickButton.bind(this, 'prev')}></div>;
        const nextBtn = (current === this.props.total || !this.state.show) ? '' : <div className="pagination-btn" onClick={this.clickButton.bind(this, 'next')}></div>;
        return (
            <div className="pagination">
                {prevBtn}
                {nextBtn}
            </div>
        )
    }
}