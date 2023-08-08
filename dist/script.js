import * as THREE from 'three';

const canva = document.querySelector('.WebGl');
const renderer = new THREE.WebGLRenderer({canvas:canva, antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio));
renderer.setClearColor('#21282a',1)

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(0,0,3);

const loader = new THREE.TextureLoader()

//STARS
const starsCount = 5000;
const starsArray = new Float32Array(starsCount * 3);

for(let i = 0; i<starsCount*3;i++){
    starsArray[i] = (Math.random()-0.5) * (Math.random()+5.25)
}

const starsGeo = new THREE.BufferGeometry();
const starsMat = new THREE.PointsMaterial({
    size:0.015,
    map:loader.load('./cross.png'),
    color:'yellow',
    transparent:true
})
const Stars = new THREE.Points(starsGeo,starsMat);
scene.add(Stars);

starsGeo.setAttribute('position', new THREE.BufferAttribute(starsArray,3))

//TORUS
const torusGeo = new THREE.TorusGeometry(0.7,0.3,36,40);
const torusMat = new THREE.PointsMaterial({
    size:0.005,
    color:0xffffffff
})
const Torus = new THREE.Points(torusGeo,torusMat);
scene.add(Torus);

//MOUSE
let mouseX,mouseY
document.addEventListener('mousemove',animStars);

function animStars(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
}

//ANIMAÇÕES
function Frames(){
    Torus.rotateY(0.005);
    Stars.rotateY(0.0008);

    if(mouseX > 0){
        Stars.rotation.y = mouseX * 0.0005
        Stars.rotation.x = mouseY * 0.0005
    }
    renderer.render(scene,camera)
}

renderer.setAnimationLoop(Frames)

//RESPONSIVO
window.addEventListener('resize',()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio));
})