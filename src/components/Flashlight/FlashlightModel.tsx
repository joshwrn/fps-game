import React, { useRef } from 'react'

import { useGLTF } from '@react-three/drei'
import type { Group, Mesh } from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    defaultMaterial: THREE.Mesh
    defaultMaterial_1: THREE.Mesh
  }
  materials: {
    DefaultMaterial: THREE.MeshStandardMaterial
  }
}

const FlashlightMaterial = () => {
  return (
    <meshStandardMaterial
      attach="material"
      color="#000000"
      roughness={0}
      metalness={0.1}
      envMapIntensity={1}
    />
  )
}

export default function FlashlightModel(
  props: JSX.IntrinsicElements[`group`],
): JSX.Element {
  const group = useRef<Group>(null)

  const { nodes } = useGLTF(`/models/flashlight-model/scene.gltf`) as GLTFResult

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.defaultMaterial.geometry}>
            <FlashlightMaterial />
          </mesh>
          <mesh geometry={nodes.defaultMaterial_1.geometry}>
            <FlashlightMaterial />
          </mesh>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(`/models/flashlight-model/scene.gltf`)
