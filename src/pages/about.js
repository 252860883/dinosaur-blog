import React from 'react'
import { Button, Table } from 'antd'

export default class Page1 extends React.Component {
    state = {
        dataSource: [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
        }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
        }],
        columns: [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },{
            title:'操作',
            key:'operation',
            render:(text,record)=>(
                <div>删除{record.name}</div>
            )
        }]
    }

    delete(name){
        console.log(`确定要删除${name}嘛？`)
    }

    render() {
        return (
            <div className="page1">
                <Table dataSource={this.state.dataSource} columns={this.state.columns}></Table>
                <Button type='ghost'>确定</Button>
            </div>
        )
    }
}
