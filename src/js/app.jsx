import React,{Component} from 'react';
import ReactDom from 'react-dom';
import '../css/main.scss';
import '../img/video-camera.svg';


export default class Test extends Component{
    render(){
        return(
            <div className="icon-video-camera">测试webpack</div>
        )
    }
}

ReactDom.render(
    <Test/>,
    document.getElementById("root")
)
