import React from 'react'
import '../style/components/wordlink.scss'
export default class WordLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    domReady() {
        const $ = e => document.querySelectorAll(e);
        const setProperty = (e, p, v) => e.style.setProperty(p, v);

        // elements
        const elements = [...$("#" + this.props.id)];
        console.log(elements);
        for (let i = 0; i < elements.length; i++) {
            shatterEffect(elements[i]);
        }

        // function: shatterEffect
        function shatterEffect(element) {

            const shadow = element.querySelector(".shadow").innerText;
            const clone = element.querySelector(".clone");

            // splitting
            const letters = shadow.split("");

            // setting up spans
            const spans = letters.map((i, index) => {

                const span = document.createElement("span");

                const id = index + 1;
                const randomArray = ["top", "bottom", "left", "right"];
                const randomNumber = Math.floor(Math.random() * 4);

                let direction;

                if (randomArray[randomNumber] === "top") {
                    direction = -100;
                }

                else if (randomArray[randomNumber] === "right") {
                    direction = 70;
                }

                else if (randomArray[randomNumber] === "bottom") {
                    direction = 100;
                }

                else if (randomArray[randomNumber] === "left") {
                    direction = -70;
                }

                const spanRotation = `${id * 3}deg`;
                const spanMoveHorizontal = `${direction + id * 3}px`;
                const spanMoveVertical = `${direction + id * 3}px`;

                if (i === " ") {
                    span.innerHTML = "&nbsp;"
                }
                else {
                    span.innerText = i;
                }

                span.classList.add("letter");
                setProperty(span, "--r", spanRotation);
                setProperty(span, "--m-h", spanMoveHorizontal);
                setProperty(span, "--m-v", spanMoveVertical);

                return span;

            });

            // if javascript is on then add this effect
            element.classList.add("js-on");

            // appending to clone
            for (let i = 0; i < spans.length; i++) {
                clone.appendChild(spans[i]);
            }

        }
    }

    componentDidMount() {
        this.domReady()
    }

    render() {
        return (
            <div className="wordlink">
                <a className="link" id={this.props.id} href="#">
                    <span className="shadow">{this.props.id}</span>
                    <span className="clone" hidden></span>
                </a>
            </div>
        )
    }
}