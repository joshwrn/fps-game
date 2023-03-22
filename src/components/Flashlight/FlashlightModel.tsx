import React, { useRef } from 'react'

import { useGLTF } from '@react-three/drei'
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

export default function FlashlightModel(props: JSX.IntrinsicElements[`mesh`]) {
  const group = useRef<THREE.Group>(null)

  const { nodes, materials } = useGLTF(
    `/models/flashlight-model/scene.gltf`,
  ) as GLTFResult

  return (
    // @ts-ignore
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.defaultMaterial.geometry}
            material={materials.DefaultMaterial}
          />
          <mesh
            geometry={nodes.defaultMaterial_1.geometry}
            material={materials.DefaultMaterial}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(`/models/flashlight-model/scene.gltf`)
