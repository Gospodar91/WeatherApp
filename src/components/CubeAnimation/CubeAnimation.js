import './CubeAnimation.css';
import gsap from 'gsap';
document.addEventListener('DOMContentLoaded', function (e) {
    let scene = document.querySelector(".gw-parts-scene");
    if (!!!scene) {
        return;
    }
    for (let i = 0; i < 3; i++) {
        GWcreatePart(scene);
    }
    function GWcreatePart(scene) {
        let part = document.createElement('div');
        part.className = "gw-part";
        part.innerHTML = "WHY NOT?";
        let partItem = document.createElement('div');
        partItem.className = "gw-part__item";
        partItem.innerHTML = "TIME TO TRAVEL";
       scene.appendChild(partItem);
        scene.appendChild(part);
      
    }
    const sX =  100-Math.random()*200;
    const sY =  100-Math.random()*200;
    const sx_item = 250-Math.random()*400;
    const sy_item = 250-Math.random()*400;
    gsap.to('.gw-part', {duration:30, x:sX, y:sY, borderRadius:'15px', rotate:360, backgroundColor:'transparent', border: "3px solid #d5d7d8"});
    gsap.to('.gw-part__item', {duration:30, borderRadius:'15px', x:sx_item, y:sy_item, rotate:360, backgroundColor:'transparent', border: "3px solid #d5d7d8", skale: 2});
});
