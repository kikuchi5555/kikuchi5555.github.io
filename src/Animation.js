import * as THREE from 'three/src/Three'
import React, { useRef, useMemo } from 'react'

import { Canvas, useFrame } from 'react-three-fiber'

function Stars() {
  let group = useRef()
  let theta = 0
  useFrame(() => {
    // Some things maybe shouldn't be declarative, we're in the render-loop here with full access to the instance
    const r = 3 * Math.sin(THREE.Math.degToRad((theta += 0.01)))
    const s = Math.sin(THREE.Math.degToRad(theta * 10))
    group.current.rotation.set(r, r, r)
    group.current.scale.set(s, s, s)
  })
  const [geo, mat, coords] = useMemo(() => {
    const geo = new THREE.SphereBufferGeometry(1, 20, 20)
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#e0e0e0') })
    const coords = new Array(2000).fill().map(i => [Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400])
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
    <Canvas resize={{
      scroll: false
    }}>
      <Stars />
    </Canvas>
  )
}
