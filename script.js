// Set up Three.js scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.lookAt(0, 0, 0);
camera.position.set(0,2.8,3.4);
camera.rotation.set(-0.5,0,0)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const container = document.querySelector(".canvas-container");
container.appendChild(renderer.domElement);

// Add lighting (optional)
const light = new THREE.PointLight(0xffffff);
light.position.set(5, 5, 5);
scene.add(light);

//Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Color can be adjusted (hex format)
scene.add(ambientLight);

//Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 3); // Color and intensity
directionalLight.position.set(1, 1, 1); // Set the light's direction
scene.add(directionalLight);


let model;
let frontwheel;
let backwheel;


// GLTF Loader
const gltfLoader = new THREE.GLTFLoader();
gltfLoader.load("/assets/bajajAnimation.glb", (gltf) => {
  model = gltf.scene;
  frontwheel = model.children[20];
  backwheel = model.children[21];
  engine = model.children[17];
  backwheel.scale.set(1,1,1)
  model.position.y = -1.5;
  model.rotation.y = 0;
  model.scale.set(4, 4, 4);
  scene.add(model);
});


function onWindowResize() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  }


  // Render the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

animate();




//GSAP
let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-one",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      markers: true,
    },
  });

  tl.to(".left-grass",{x:3,y:5},"grass")
