import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import worldMapTextureUrl from '../assets/images/world_map.jpg';

const WorldMap: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 7; // Adjusted for map visibility

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Texture Loader and Map Mesh
    let mapMesh: THREE.Mesh | null = null;
    let mapGeometry: THREE.PlaneGeometry | null = null;
    let mapMaterial: THREE.MeshBasicMaterial | null = null;
    let currentTexture: THREE.Texture | null = null;
    const pointerMeshes: THREE.Mesh[] = [];
    let controls: OrbitControls | null = null;

    const mapPlaneWidth = 10;
    const mapPlaneHeight = mapPlaneWidth / 2;

    function convertLatLonToVec3(lat: number, lon: number, width: number, height: number): THREE.Vector3 {
      const x = (lon / 180) * (width / 2);
      const y = (lat / 90) * (height / 2);
      return new THREE.Vector3(x, y, 0.1); // z slightly above the map
    }

    const countries = [
      { name: 'Italy', lat: 41.9028, lon: 12.4964 },
      { name: 'India', lat: 20.5937, lon: 78.9629 },
      { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
      { name: 'UK', lat: 55.3781, lon: -3.4360 },
      { name: 'USA', lat: 39.8283, lon: -98.5795 },
    ];

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      worldMapTextureUrl,
      (texture) => {
        console.log('Texture loaded successfully');
        currentTexture = texture; // Store texture for cleanup

        mapGeometry = new THREE.PlaneGeometry(mapPlaneWidth, mapPlaneHeight);
        mapMaterial = new THREE.MeshBasicMaterial({ map: texture });
        mapMesh = new THREE.Mesh(mapGeometry, mapMaterial);
        scene.add(mapMesh);

        countries.forEach(country => {
          const position = convertLatLonToVec3(country.lat, country.lon, mapPlaneWidth, mapPlaneHeight);
          const pointerGeometry = new THREE.SphereGeometry(0.1, 16, 16); // Small sphere
          const pointerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color
          const pointer = new THREE.Mesh(pointerGeometry, pointerMaterial);
          pointer.position.copy(position);
          scene.add(pointer);
          pointerMeshes.push(pointer);
        });

        // camera.lookAt(mapMesh.position); // Optional: ensure camera looks at the map
      },
      undefined, // onProgress callback
      (error) => {
        console.error('Error loading texture:', error);
      }
    );

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    // controls.target.set(0, 0, 0); // Default target is fine for a centered map

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls?.update(); // Update controls if they exist and damping is enabled
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentNode === currentMount) { // Use currentMount
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      controls?.dispose();

      if (mapMesh) {
        scene.remove(mapMesh);
      }
      if (mapGeometry) {
        mapGeometry.dispose();
      }
      if (mapMaterial) {
        mapMaterial.dispose();
      }
      if (currentTexture) {
        currentTexture.dispose();
      }

      pointerMeshes.forEach(pointer => {
        scene.remove(pointer);
        pointer.geometry.dispose();
        if (pointer.material instanceof THREE.Material) { // Type guard
          pointer.material.dispose();
        }
      });

      scene.remove(ambientLight);
      scene.remove(directionalLight);
      // Consider disposing lights if necessary, though for basic lights it might not be required.
      // ambientLight.dispose();
      // directionalLight.dispose();
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '500px',
        border: '1px solid #eee', // A light border
        borderRadius: '8px', // Optional: rounded corners
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)' // Optional: a subtle shadow
      }}
    />
  );
};

export default WorldMap;
