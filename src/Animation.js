import * as THREE from 'three/src/Three'
import React, { useState, useRef, useMemo } from 'react'

import { Canvas, useFrame } from 'react-three-fiber'

function Stars() {
  let group = useRef()
  const [theta, setTheta] = useState(0);
  useFrame(() => {
    setTheta(theta + 0.1)
    // Some things maybe shouldn't be declarative, we're in the render-loop here with full access to the instance
    const r = 1 * Math.sin(THREE.Math.degToRad((theta * 0.5)))
    const s = theta * 1 > 90 ? 1 : Math.sin(THREE.Math.degToRad(theta * 1))
    group.current.rotation.set(r, r, r)
    group.current.scale.set(s, s, s)
  })
  const [geo, mat, coords] = useMemo(() => {
    const geo = new THREE.SphereBufferGeometry(1, 20, 20)
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#eaeaea') })
    const coords = new Array(2000).fill().map(i => [Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 200 - 200])
    return [geo, mat, coords]
  }, [])
  return (
    <group ref={group}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
      ))}
    </group>
  )
}


export default function Animation() {
  return (
    <Canvas
      resize={{
        scroll: false
      }}
      camera={{
        position: [0, 10, 8],
        fov: 50,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 2000
      }}
    >
      <Stars />
    </Canvas>
  )
}
