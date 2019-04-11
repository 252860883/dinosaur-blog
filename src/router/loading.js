import React from 'react'
export default ({ isLoading, error }) => {
    if (isLoading) {
        return <div className="switch-bg"></div>;
    }
    else if (error) {
        console.log(error)
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};