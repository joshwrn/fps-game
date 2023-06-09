/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 -t public/models/gun-model/scene.gltf
*/

import React from 'react'

import { useGLTF } from '@react-three/drei'
import type * as THREE from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Mesh004: THREE.Mesh
    Mesh004_1: THREE.Mesh
    Mesh004_2: THREE.Mesh
    Mesh004_3: THREE.Mesh
    Mesh004_4: THREE.Mesh
  }
  materials: {
    Rifle: THREE.MeshStandardMaterial
    Silencer: THREE.MeshStandardMaterial
    Scope: THREE.MeshStandardMaterial
    Foregrip: THREE.MeshStandardMaterial
    Pmag: THREE.MeshStandardMaterial
  }
}

const Material = () => (
  <meshStandardMaterial
    attach="material"
    color="#000000"
    emissive="#000000"
    roughness={0.3}
    metalness={0.5}
    envMapIntensity={0.1}
  />
)

export function WeaponModel(props: JSX.IntrinsicElements[`group`]): JSX.Element {
  const { nodes } = useGLTF(`/models/weapon-model/scene.gltf`) as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group position={[-0.41, 0.07, 0]} rotation={[0, 0, 0.02]} scale={0.02}>
        <mesh geometry={nodes.Mesh004.geometry}>
          <Material />
        </mesh>
        <mesh geometry={nodes.Mesh004_1.geometry}>
          <Material />
        </mesh>
        <mesh geometry={nodes.Mesh004_2.geometry}>
          <Material />
        </mesh>
        <mesh geometry={nodes.Mesh004_3.geometry}>
          <Material />
        </mesh>
        <mesh geometry={nodes.Mesh004_4.geometry}>
          <Material />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload(`/models/weapon-model/scene.gltf`)
