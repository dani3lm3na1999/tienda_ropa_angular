import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ProductosService } from 'src/app/Service/productos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogsService } from 'src/app/Service/logs.service';
import { CategoriasService } from 'src/app/Service/categorias.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
})
export class TiendaComponent implements OnInit {
  formGuardarProductos: FormGroup;
  urlpecho: String = '';
  lstMostrarCategorias: any;
  selectCategoria: any;
  constructor(
    private fb: FormBuilder,
    private productosServices: ProductosService,
    private logoServices: LogsService,
    private categoriasServices: CategoriasService
  ) {
    this.formGuardarProductos = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: [],
      talla: [],
      tela: [],
      existencias: ['', Validators.required],
      precio: [],
      torzoUrl: [],
      hombroUrl: [],
      pechoUrl: [],
      categoria: [],
    });
  }

  shirtMesh: THREE.Mesh | undefined;
  shirtScene: THREE.Scene | undefined;

  lstLogosEspalda: any;
  lstLogoBrazo: any;
  lstLogoPecho: any;
  urllogosTorzoId: any;
  urllogosBrazoId: any;
  urllogosEspaldaId: any;

  scenePrincipal = new THREE.Scene();
  sceneTorzo = new THREE.Scene();
  sceneHombro = new THREE.Scene();
  sceneEspalda = new THREE.Scene();

  color: string = "rgb(250, 243, 243)";

  switchColor(_color: string) {
    this.color = _color;

    // Verifica si la camisa ya se ha cargado y asignado a la variable shirtMesh
    if (this.shirtMesh) {
      // Verifica que el material sea de tipo MeshStandardMaterial
      if (this.shirtMesh.material instanceof THREE.MeshStandardMaterial) {
        if (this.shirtScene) {
          if (this.color == 'rgb(250, 243, 243)') {
            this.shirtScene.background = new THREE.Color('rgb(229, 229, 229 )');

          } else if (this.color == 'rgb(239, 189, 78)') {
            this.shirtScene.background = new THREE.Color('rgb(239, 189, 78)');

          } else if (this.color == 'rgb(128, 198, 112)') {
            this.shirtScene.background = new THREE.Color('rgb(128, 198, 112)');

          } else if (this.color == 'rgb(114, 109, 232)') {
            this.shirtScene.background = new THREE.Color('rgb(114, 109, 232)');

          } else if (this.color == 'rgb(239, 103, 78)') {
            this.shirtScene.background = new THREE.Color('rgb(239, 103, 78)');

          } else if (this.color == 'rgb(53, 57, 52)'){
            this.shirtScene.background = new THREE.Color('rgb(163, 163, 163)');
          }
        }

        this.shirtMesh.material.color.set(new THREE.Color(this.color));
      } else {
        console.error(
          'El material de la camisa no es del tipo esperado (MeshStandardMaterial).'
        );
      }
    }
  }

  guardarProducto() {
    let color: any;
    if (this.color === 'rgb(204, 204, 204)') {
      color = 'Blanco';
    } else if (this.color === 'rgb(239, 189, 78)') {
      color = 'Amarillo';
    } else if (this.color === 'rgb(128, 198, 112)') {
      color = 'Verde';
    } else if (this.color === 'rgb(114, 109, 232)') {
      color = 'Azul';
    } else if (this.color === 'rgb(239, 103, 78)') {
      color = 'rojo';
    } else if (this.color === 'rgb(53, 57, 52)') {
      color = 'negro';
    }

    const productos = {
      nombre: this.formGuardarProductos.get('nombre')?.value,
      color: color,
      descripcion: this.formGuardarProductos.get('descripcion')?.value,
      imagen: this.formGuardarProductos.get('imagen')?.value,
      talla: this.formGuardarProductos.get('talla')?.value,
      tela: this.formGuardarProductos.get('tela')?.value,
      existencias: this.formGuardarProductos.get('existencias')?.value,
      precio: this.formGuardarProductos.get('precio')?.value,
      torzoUrl: this.formGuardarProductos.get('torzoUrl')?.value,
      hombroUrl: this.formGuardarProductos.get('hombroUrl')?.value,
      pechoUrl: this.urlpecho,
      categoria: this.formGuardarProductos.get('categoria')?.value,
    };
    console.log(productos);
    this.productosServices.guardarProducto(productos).subscribe({
      next: (r) => {
        console.log(r);
      },
      error: (e) => {},
      complete: () => {},
    });
  }

  obtenerCategorias() {
    this.categoriasServices.obtenerProducto().subscribe({
      next: (r) => {
        this.lstMostrarCategorias = r;
      },
      error: (e) => {},
      complete: () => {},
    });
  }
  obtenerLogoEspalda() {
    this.logoServices.obtenerLogo('Espalda').subscribe((e) => {
      this.lstLogosEspalda = e;
    });
  }

  obtenerLogoHombro() {
    this.logoServices.obtenerLogo('Hombro').subscribe((e) => {
      this.lstLogoBrazo = e;
    });
  }

  obtenerLogoTorzo() {
    this.logoServices.obtenerLogo('Torzo').subscribe((e) => {
      this.lstLogoPecho = e;
    });
  }

  obtenerUrlLogoTorzoId(id: string){
    this.logoServices.obtenerLogoId(id).subscribe((e) => {
      this.urllogosTorzoId = e.url;
      this.cargarImagenTorzo(this.urllogosTorzoId);
    });
  }

  obtenerUrlLogoEspaldId(id: string){
    this.logoServices.obtenerLogoId(id).subscribe((e) => {
      this.urllogosEspaldaId = e.url;
      this.cargarImagenEspalda(this.urllogosEspaldaId);
    });
  }

  obtenerUrlLogoHombroId(id: string){
    this.logoServices.obtenerLogoId(id).subscribe((e) => {
      this.urllogosBrazoId = e.url;
      this.cargarImagenHombro(this.urllogosBrazoId);
    });
  }

  cargarImagenTorzo(imagen: any) {
    this.sceneTorzo.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
        this.sceneTorzo.remove(child);
      }
    });
  
    let src = imagen;
    const loader1 = new THREE.TextureLoader();
    let texture = loader1.load(src);
    const logoPechos = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });
    const logoGeometry = new THREE.PlaneGeometry(11, 8); // Tamaño del plano (ancho, alto)
    const logoMesh = new THREE.Mesh(logoGeometry, logoPechos);
    logoMesh.position.set(0, 7.4, 7.372);
    this.sceneTorzo.add(logoMesh);
    this.scenePrincipal.children.push(this.sceneTorzo);
  }

  cargarImagenHombro(imagen: any) {
    // Eliminar todas las mallas existentes
    this.sceneHombro.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
        this.sceneHombro.remove(child);
      }
    });
  
    const logoTextureHombro = new THREE.TextureLoader().load(
      imagen
    );
    const logoMaterialHombro = new THREE.MeshBasicMaterial({
      map: logoTextureHombro,
      transparent: true,
    });

    const logoGeometryHombro = new THREE.PlaneGeometry(5, 4); // Tamaño del plano (ancho, alto)
    const logoMeshHombro = new THREE.Mesh(
      logoGeometryHombro,
      logoMaterialHombro
    );

    logoMeshHombro.position.set(-17, 12.8, -3.5); // Ajusta la posición según tus necesidades (arriva o abajo, fondo(+sube o -baja), izquierda o derecha)
    logoMeshHombro.rotation.set(Math.PI / 2, 10, 7.9);// Rotación según necesidades (en este caso, gira 90 grados alrededor del eje x)

    this.sceneHombro.add(logoMeshHombro);
    this.scenePrincipal.children.push(this.sceneHombro);

  }

  cargarImagenEspalda(imagen: any) {
    // Eliminar todas las mallas existentes
    this.sceneEspalda.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
        this.sceneEspalda.remove(child);
      }
    });
    // Cargar la nueva imagen
    const logoTextureEspalda = new THREE.TextureLoader().load(
      imagen
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
    logoMeshEspalda.position.set(0, 10, -8.5); // Ajusta la posición según tus necesidades (izquierda o derecha, arriba o abajo, fondo)
    this.sceneEspalda.add(logoMeshEspalda);
    this.scenePrincipal.children.push(this.sceneEspalda);
  }

  ngOnInit() {
    this.obtenerLogoEspalda();
    this.obtenerLogoHombro();
    this.obtenerLogoTorzo();
    this.obtenerCategorias();

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    document.getElementById('camisa')?.appendChild(renderer.domElement);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const orbit = new OrbitControls(camera, renderer.domElement);

    camera.position.set(0, 10, 28);
    orbit.update();

    const directionalLight = new THREE.DirectionalLight(new THREE.Color('rgb(255, 255, 255)'), 0.5);
    directionalLight.position.set(0, 1, 0); // Posición de la luz
    this.scenePrincipal.add(directionalLight);
    const ambientLight = new THREE.AmbientLight(new THREE.Color('rgb(255, 255, 255)'), 1.5); // Color blanco, intensidad 0.5
    this.scenePrincipal.add(ambientLight);

    const loader = new GLTFLoader();
    loader.load(
      '/assets/img/camiseta.glb',
      (gltf) => {
        gltf.scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.position.y = -35;
            child.material.metalness = 0;
            child.material.roughness = 0.5;
            child.material.color.set(new THREE.Color('rgb(250, 243, 243)'));
            this.shirtMesh = child;
          }
        });
        gltf.scene.scale.set(0.5, 0.5, 0.5);
        this.scenePrincipal.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo:', error);
      }
    );
    

    


    this.scenePrincipal.background = new THREE.Color('rgb(229, 229, 229)');

    const animate = () => {
      requestAnimationFrame(animate);

      // Renderiza la escena principal
      renderer.render(this.scenePrincipal, camera);
    }
    
    this.shirtScene = this.scenePrincipal;
    animate();
  }
}
