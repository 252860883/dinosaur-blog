import React from 'react'
import '../style/loading.scss'

const loading = <div className="loading">
    <div className="wrapper">
        <span className="circle circle-1"></span>
        <span className="circle circle-2"></span>
        <span className="circle circle-3"></span>
        <span className="circle circle-4"></span>
        <span className="circle circle-5"></span>
        <span className="circle circle-6"></span>
        <span className="circle circle-7"></span>
        <span className="circle circle-8"></span>
    </div>
</div>

// export default ({ isLoading, error }) => {
//     if (isLoading) {
//         return loading;
//     }
//     else if (error) {
//         console.log(error)
//         return <div>Sorry, there was a problem loading the page.</div>;
//     }
//     else {
//         return null;
//     }
// };

export default class Loading extends React.Component {
    render() {
        return loading
    }
}