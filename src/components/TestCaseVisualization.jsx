import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const TestCaseVisualization = ({ testCases = [] }) => {
  const containerRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    camera.position.z = 30;

    // Create spheres for test cases
    const spheres = testCases.map((test, index) => {
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: test.status === 'passed' ? 0x10B981 : test.status === 'failed' ? 0xEF4444 : 0xF59E0B
      });
      const sphere = new THREE.Mesh(geometry, material);
      
      // Position spheres in a spiral
      const angle = index * 0.5;
      const radius = 10 + (index * 0.2);
      sphere.position.x = Math.cos(angle) * radius;
      sphere.position.y = Math.sin(angle) * radius;
      sphere.position.z = index * 0.2;
      
      sphere.userData = test;
      return sphere;
    });

    spheres.forEach(sphere => scene.add(sphere));

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Raycaster for intersection detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event) => {
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / containerRef.current.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / containerRef.current.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(spheres);

      if (intersects.length > 0) {
        const test = intersects[0].object.userData;
        tooltipRef.current.style.display = 'block';
        tooltipRef.current.style.left = `${event.clientX + 10}px`;
        tooltipRef.current.style.top = `${event.clientY + 10}px`;
        tooltipRef.current.innerHTML = `
          <div class="font-semibold">${test.name}</div>
          <div>Status: ${test.status}</div>
          <div>Duration: ${test.duration}ms</div>
        `;
      } else {
        tooltipRef.current.style.display = 'none';
      }
    };

    containerRef.current.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      containerRef.current?.removeEventListener('mousemove', onMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [testCases]);

  return (
    <div className="relative">
      <div ref={containerRef} className="h-[400px] w-full" />
      <div
        ref={tooltipRef}
        className="absolute hidden bg-white/90 dark:bg-gray-800/90 p-2 rounded-lg shadow-lg text-sm z-10"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
};

export default TestCaseVisualization;
