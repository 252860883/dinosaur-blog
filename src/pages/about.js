import React from 'react'
import { Button, Table } from 'antd'
export default class Article extends React.Component {
    state = {
    }
    componentDidMount() {
        console.log('ok');
    }

    // delete(name) {
    //     console.log(`确定要删除${name}嘛？`)
    // }
    

    render() {
        return (
            <div className="article">
                {/* <Table dataSource={this.state.dataSource} columns={this.state.columns}></Table> */}
                {/* <Button type='ghost'>确定</Button> */}
            </div>
        )
    }
}
