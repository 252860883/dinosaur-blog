import React from 'react'
import ProjectItem from '../components/project-item'
import "../style/project.scss"
export default class Project extends React.Component {
    state = {
    }
    componentDidMount() {
        // console.log('ok');
    }

    // delete(name) {
    //     console.log(`确定要删除${name}嘛？`)
    // }
    

    render() {
        return (
            <div className="project">
                <ProjectItem></ProjectItem>
                <ProjectItem></ProjectItem>
            </div>
        )
    }
}
