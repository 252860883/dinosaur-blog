import React from 'react'
import '../style/components/pagination.scss'

interface IState {
    current: number,
    show: boolean
}
export default class Pagination extends React.Component<any, IState> {
    state = {
        current: 1,
        show: true
    }

    componentWillMount() {
        this.setState({
            current: this.props.current || 1
        })
    }

    clickButton(operation: string | void) {
        const current = operation === 'next' ? this.state.current + 1 : this.state.current - 1
        this.setState({
            current,
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