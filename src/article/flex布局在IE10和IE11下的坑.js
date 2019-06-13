import React from 'react'
import '../style/main.scss'
import MainPic3D from '../components/pic3D'

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="article">
<div className="title">爬一下flex布局在IE10和IE11下的坑</div>
<p>
接收项目的时候兼容性暂且到 IE11+ ，但是随着项目的迭代和用户数量的增长，需要兼容到 IE10+。所以在IE10下出现了一些错乱的样式。经过查找发现大部分都是 flex布局导致的。

细思一下，flex在 IE10+是部分支持的，并不是完全不兼容。那问题出在哪了呢？

查找之后发现，之前写样式的同事可能是对于 flex 布局的不理解，出现了大量的 flex:1语法，甚至还有 flex:2的“骚操作”。

那究其根本，新的规范更改了flex的默认值，而IE10，11依旧沿用旧的默认语法。如下表：
</p>

<p>| Declaration | What it should mean | What it means in IE 10 |<br></br>| ------   | -----   | ---- |<br></br>| (no flex declaration) | flex: 0 1 auto    | flex: 0 0 auto |<br></br>| flex: 1   | flex: 1 1 0%  | flex: 1 0 0px |<br></br>| flex: auto    | flex: 1 1 auto    | flex: 1 0 auto |<br></br>| flex: initial | flex: 0 1 auto    | flex: 0 0 auto |</p>

<p>
<b>所以，为了兼容IE10,我们尽量不要为了图省事而用简写的格式，而是统一的用 flex: 0 1 auto; 的格式。</b>

这里呢，同时总结一下其他的一些 flex的坑：
<ol>
<li>flex 容器如果设置竖排，并且垂直居中，flex子项目的文字会溢出容器。解决办法是给子项目设置一个 max-width:100%。Edge修复了这个bug。</li>
<li>简写的flex属性，第三个参数 flex-basis 的值如果不写单位，在IE10,11下会该 flex 被忽略。比如 flex: 0 1 0%; 这个百分号不能省略</li>
<li>竖排弹性容器下，如果子项宽度大于容器宽度，子项并不会随着容器保持宽高比例。解决办法是给这个子项再包裹一个容器，这样子项就不再是一个伸缩项目，尺寸上就可以正常缩放。</li>
<li>flex-basis如果有一个明确的值，既除了auto以外的值，那么该项目就相当于有一个明确的宽度/高度，占据固定空间。在IE10/11下，盒子内容的宽度是 flex-basis 设置的具体的宽度，它会无视我们设置的 box-sizing:border-box;</li>
<li>IE10、11: 内联元素不能作为弹性伸缩项目，包括:before 和 ::after 这些伪类元素。IE11修复了这个bug，但是 :before 和 ::after 仍然不能作为伸缩弹性项目。
解决办法是给内联元素加个 display: block; 即可。</li>
<li>给flex简写加  !important，在IE10，只对前两个参数有效，第三个参数无效。这个bug在IE11修复。而在IE10，再单独写上flex-bsis即可：</li>
</ol>
</p>
</div>
        )
    }
}