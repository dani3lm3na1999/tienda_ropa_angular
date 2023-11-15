import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { HttpClient } from '@angular/common/http';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-prueva',
  templateUrl: './prueva.component.html',
  styleUrls: ['./prueva.component.css']
})
export class PruevaComponent  implements OnInit{
  scene: THREE.Scene = new THREE.Scene();
  camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
  renderer: THREE.WebGLRenderer = new THREE.WebGL1Renderer();
  model: THREE.Object3D = new THREE.Object3D();


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.initScene();
    this.loadModel();
    this.loadImages();
    this.render();
  }

  initScene(): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  loadModel(): void {
    const loader = new GLTFLoader();
    loader.load('/assets/img/camiseta.glb', (gltf) => {
      this.model = gltf.scene;
      this.scene.add(this.model);
    });
  }

  loadImages(): void {
    const urls = [
      'http://localhost:9000/uploads/AxKPHAqdp__1700023435778.png'
    ];

    urls.forEach((url, index) => {
      this.http.get(url, { responseType: 'blob' }).subscribe((blob) => {
        const texture = new THREE.TextureLoader().load(URL.createObjectURL(blob));
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const plane = new THREE.PlaneGeometry(1, 1);
        const mesh = new THREE.Mesh(plane, material);
        mesh.position.set(-2 + index, 0, 0);
        this.scene.add(mesh);
      });
    });
  }

  render(): void {
    requestAnimationFrame(() => this.render());
    this.renderer.render(this.scene, this.camera);
  }

}
