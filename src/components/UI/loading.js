import React from 'react'
import '../../style/components/loading.scss'
const THREE = require('three')

const loading = <div className="loading">
    <canvas id="loading-canvas" width="960" height="480"></canvas>
</div>

export default class Loading extends React.Component {
    draw() {
        let canvas = document.getElementById('loading-canvas'),
            renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                context: canvas.getContext('webgl2'),
                antialias: true,
                alpha: true
            }),
            canvasHeight = canvas.getBoundingClientRect().height,
            canvasWidth = canvas.getBoundingClientRect().width;
        // canvas.width = canvasWidth
        // canvas.height = canvasHeight
        renderer.setSize(canvasWidth * 10, canvasHeight * 10);
        renderer.setPixelRatio(window.devicePixelRatio || 1);

        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 0.1, 1000);
        camera.position.z = 500;

        let shape = new THREE.TorusGeometry(120, 25, 60, 160);
        let material = new THREE.MeshPhongMaterial({
            color: 0xE4ECFA,
            shininess: 20,
            opacity: .96,
            transparent: true
        });
        let donut = new THREE.Mesh(shape, material);
        scene.add(donut);

        let lightTop = new THREE.DirectionalLight(0x222, .14);
        lightTop.position.set(0, 200, 0);
        lightTop.castShadow = true;
        scene.add(lightTop);

        let frontTop = new THREE.DirectionalLight(0x222222, 1);
        frontTop.position.set(0, 0, 300);
        frontTop.castShadow = true;
        scene.add(frontTop);

        scene.add(new THREE.AmbientLight(0x222222, .5));

        function twist(geometry, amount, forwards) {
            const quaternion = new THREE.Quaternion();
            for (let i = 0; i < geometry.vertices.length; i++) {
                quaternion.setFromAxisAngle(
                    new THREE.Vector3(forwards, 0, 0),
                    (Math.PI / 180) * (geometry.vertices[i].x / amount)
                );
                geometry.vertices[i].applyQuaternion(quaternion);
            }
            geometry.verticesNeedUpdate = true;
        }

        let mat = Math.PI,
            speed = Math.PI / 90,
            forwards = 1;

        var render = function () {
            requestAnimationFrame(render);
            donut.rotation.x -= speed;
            mat = mat - speed;
            if (mat <= 0) {
                mat = Math.PI;
                forwards = forwards * -1;
            }
            twist(shape, (mat >= Math.PI / 2 ? -120 : 120), forwards);
            renderer.render(scene, camera);
        };
        render();
    }
    componentDidMount() {
        this.draw()
    }
    render() {
        return loading
    }
}