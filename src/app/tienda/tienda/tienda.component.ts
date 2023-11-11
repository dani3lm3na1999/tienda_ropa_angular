import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
})

export class TiendaComponent implements OnInit {  
  
  color: string = '#DCDCDC';
  shirtMesh: THREE.Mesh | undefined;

  switchColor(_color: string) {
    this.color = _color;
  
    // Verifica si la camisa ya se ha cargado y asignado a la variable shirtMesh
    if (this.shirtMesh) {
      // Verifica que el material sea de tipo MeshStandardMaterial
      if (this.shirtMesh.material instanceof THREE.MeshStandardMaterial) {
        // Cambia el color de la camisa
        this.shirtMesh.material.color.set(new THREE.Color(this.color));
      } else {
        console.error('El material de la camisa no es del tipo esperado (MeshStandardMaterial).');
      }
    }
  }
  
  ngOnInit() { 

    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth/2, window.innerHeight/2);
    document.getElementById('camisa')?.appendChild(renderer.domElement);
    // document.body.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const orbit = new OrbitControls(camera, renderer.domElement);
    // const ax = new THREE.AxesHelper(5);
    // scene.add(ax); // muestra las lineas
    camera.position.set(0, 10, 28);
    orbit.update();

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 0); // Posición de la luz
    scene.add(directionalLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Color blanco, intensidad 0.5
    scene.add(ambientLight);

    // const gui = new dat.GUI({ autoPlace: false });
    const config = {
      color: 0x0,
    };
    // gui.domElement.style.position = 'absolute';
    // gui.domElement.style.top = '750px';
    // gui.domElement.style.left = '830px';
    // gui.domElement.style.width = '300px';
    // document.body.appendChild(gui.domElement);

    const loader = new GLTFLoader();
    loader.load(
      '/assets/img/camiseta.glb',
      (gltf) => {
        gltf.scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.position.y = -30;
            child.material.metalness = 0;
            child.material.roughness = 0.5;
            child.material.color.set(new THREE.Color('#F2F3EE'));
            // Guarda la referencia al mesh de la camisa
            this.shirtMesh = child;
          }
        });
        gltf.scene.scale.set(0.4, 0.4, 0.4);
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo:', error);
      }
    );

    const logopecho = new THREE.TextureLoader().load('/assets/4k-monitor-image2-1.jpg');
    const logoPecho = new THREE.MeshBasicMaterial({
      map: logopecho,
      transparent: true,
    });
    const logoGeometry = new THREE.PlaneGeometry(8, 5); // Tamaño del plano (ancho, alto)
    const logoMesh = new THREE.Mesh(logoGeometry, logoPecho);
    logoMesh.position.set(0, 7.2, 5.9); // Ajusta la posición según tus necesidades (izquierda o derecha, arriva abajo, fondo)
    scene.add(logoMesh);

    const logoTextureEspalda = new THREE.TextureLoader().load(
      '/assets/logoespalda.webp'
    );
    const logoMaterialEspalda = new THREE.MeshBasicMaterial({
      map: logoTextureEspalda,
      transparent: true,
    });
    const logoGeometryEspalda = new THREE.PlaneGeometry(10, 10); // Tamaño del plano (ancho, alto)
    const logoMeshEspalda = new THREE.Mesh(
      logoGeometryEspalda,
      logoMaterialEspalda
    );
    logoMeshEspalda.rotation.set(Math.PI, 0, 9.4);
    logoMeshEspalda.position.set(0, 9, -7.1); // Ajusta la posición según tus necesidades (izquierda o derecha, arriba o abajo, fondo)
    scene.add(logoMeshEspalda);

    const logoTextureHombro = new THREE.TextureLoader().load(
      '/assets/logobrazoizquierdo.jpg'
    );
    const logoMaterialHombro = new THREE.MeshBasicMaterial({
      map: logoTextureHombro,
      transparent: true,
    });

    const logoGeometryHombro = new THREE.PlaneGeometry(4, 3); // Tamaño del plano (ancho, alto)
    const logoMeshHombro = new THREE.Mesh(
      logoGeometryHombro,
      logoMaterialHombro
    );

    logoMeshHombro.position.set(-13.3, 12.5, -2.9); // Ajusta la posición según tus necesidades (izquierda o derecha, arriba o abajo, fondo)
    logoMeshHombro.rotation.set(Math.PI / 2, 10, 7.9); // Rotación según necesidades (en este caso, gira 90 grados alrededor del eje x)

    scene.add(logoMeshHombro);

    const spaceTexture = new THREE.TextureLoader().load(
      '/assets/resumen-superficie-texturas-muro-piedra-hormigon-blanco_74190-8189.avif'
    ); //imagen de fondo

    scene.background = spaceTexture;

    function animate() {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    }

    animate();
  }
}
