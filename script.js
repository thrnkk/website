import * as THREE from 'three';

import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

let camera, controls, scene, renderer, effect;

let sphere, plane;

const start = Date.now();

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.y = 500;
    camera.position.z = 700;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0, 0, 0 );

    const light = new THREE.DirectionalLight( 0xffffff, 1);
    light.position.set( 500, 500, 200 );
    light.castShadow = true; // default false
    light.shadowBias = 3;
    scene.add( light );

    const sphereGeometry = new THREE.SphereGeometry( 200, 30, 10 );
    const sphereMaterial = new THREE.MeshPhongMaterial( {flatShading: true} );
    sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    sphere.castShadow = true;
    sphere.receiveShadow = false;
    scene.add( sphere );


    const planeGeometry = new THREE.PlaneGeometry( 1000, 1000 );
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xe0e0e0 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.y = - 200;
    plane.rotation.x = - Math.PI / 2;
    plane.receiveShadow = true;
    scene.add( plane );

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize( window.innerWidth, window.innerHeight );

    effect = new AsciiEffect( renderer, ' .:-+*=%@#', { invert: true } );
    effect.setSize( window.innerWidth, window.innerHeight );
    effect.domElement.style.color = '#3dfc03';
    effect.domElement.style.backgroundColor = 'black';

    const holder = document.getElementsByClassName('holder--threejs');
    holder[0].appendChild( effect.domElement );

    controls = new TrackballControls( camera, effect.domElement );

    window.addEventListener( 'resize', onWindowResize );
    window.addEventListener( 'mousemove', onMouseMove );
}

function onMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    const targetX = mouseX * 200;
    const targetY = mouseY * 400;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.1);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.1);
    camera.lookAt(scene.position);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    effect.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    const timer = Date.now() - start;

    sphere.position.y = Math.abs( Math.sin( timer * 0.002 ) ) * 150;
    sphere.rotation.x = timer * 0.0003;
    sphere.rotation.z = timer * 0.0002;

    controls.update();

    effect.render( scene, camera );
}