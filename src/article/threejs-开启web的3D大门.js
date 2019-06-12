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
<hr/>

<hr/>

<h3>基础框架</h3>

<p><code></code>`
// 创建一个场景
scene = new THREE.Scene();</p>

<p>// 透视相机
camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
camera.position.z = 1;</p>

<p>// 向场景里放物体
geometry = new THREE.BoxGeometry(1, 0.05, 0.05);
material = new THREE.MeshNormalMaterial();
mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);</p>

<p>// 渲染器
renderer = new THREE.WebGLRenderer({'{'} antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
<code></code>`</p>

<p>上面的代码示例是一个构建3D视图的流程，那么我们了解一下这几个概念</p>

<h4>sence（场景）</h4>

<p>我们在绘制任何东西的前提都需要构建一个场景，很简单，直接 <code>var scene = new THREE.Scene();</code>即可创建一个场景。场景创建完成可以向场景中添加物体。</p>

<h4>camera（相机）</h4>

<p>相机决定了我们从哪个视角看到物体，视角不同看到的物体场景自然也不相同。通过设置不同的相机参数就可以让相机产生不一样的效果。同时Threejs中也配有多种相机，上面的代码用到的是透视相机（THREE.PerspectiveCamera）。</p>

<h4>renderer（渲染器）</h4>

<p>最后就将我们的绘制进行渲染器渲染，所有的渲染都是画在domElement上的，所以这里的appendChild表示将这个domElement挂接在body下面，这样渲染的结果就能够在页面中显示了。</p>

<h4>三者关系</h4>

<p>通俗来讲，我们可以理解为<code>sence</code>创建了一个场景，我们向场景里添加物体，然后通过<code>camera</code>拍摄，将拍摄的场景交给<code>renderer</code>进行渲染。</p>

<h3>让物体动起来</h3>

<p>让物体动起来有两种方法，一种是改变相机<code>camera</code>的位置，一种是改变物体<code>mesh</code>的位置：</p>

<p><code></code>`
function animate() {'{'}
    // renderer.clear();
    var a = 0.01
    // 改变相机的位置
    // camera.position.y -= a
    // camera.position.z -= a
    // camera.position.x -= a</p>

<pre><code>// 改变物体的位置
// mesh.position.z -= 1;//位移
mesh.rotation.x -= 0.01;//旋转
mesh.rotation.z -= 0.01;//旋转

renderer.render(scene, camera);
requestAnimationFrame(animate)</code></pre>

<p>}
<code></code>`</p>

<h4>stats 性能监听</h4>

<p>既然涉及到循环了，那肯定是一个耗性能的工作了，在这里我们引入 <code>stats.js</code> 来进行性能监测。
首先引入 <code>stats.js</code> ,github地址：https://github.com/mrdoob/stats.js
<code>
 &lt;script src=&quot;./stats.js&quot;&gt;&lt;/script&gt;
</code>
将 stats 相关代码加入我们之前的代码中：
<code></code>`
// 渲染器
var renderer;
// 监听器
var stats;
function initThree() {'{'}
    console.log(window.innerHeight)
    width = window.innerWidth
    height = window.innerHeight
    renderer = new THREE.WebGLRenderer({'{'}
        antialias: true
    });
    renderer.setSize(width, height);
    document.getElementsByTagName(&#39;body&#39;)[0].appendChild(renderer.domElement);
    renderer.setClearColor(0xFFFFFF, 1.0);
    // 新建一个 stats 实例
    stats = new Stats();
    stats.domElement.style.position = &#39;absolute&#39;;
    stats.domElement.style.left = &#39;0px&#39;;
    stats.domElement.style.top = &#39;0px&#39;;
    document.getElementsByTagName(&#39;body&#39;)[0].appendChild(stats.domElement);
}</p>

<p>...</p>

<p>// 动起来
function animate() {'{'}
    // 改变物体的位置
    mesh.rotation.x -= 0.01;//旋转
    mesh.rotation.z -= 0.01;//旋转
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    // 来统计时间和帧数
    stats.update();
}
<code></code>`</p>

<p>虽然这个办法可以让物体动起来，但是对于复杂的动画效果还是不适用，这里推荐一个动画引擎 <code>Tween.js</code>来实现不规则的动画。</p>
</div>
        )
    }
}