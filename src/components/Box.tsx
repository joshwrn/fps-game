import type { FC } from 'react'
import { useEffect, useState } from 'react'

import { useBox } from '@react-three/cannon'
import type { MeshProps } from '@react-three/fiber'
import { useThree, useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import * as THREE from 'three'

import { useWeaponStore } from '@/state/weapon'

export const Box: FC<MeshProps> = (props) => {
  const { isFiringBullet } = useWeaponStore((s) => ({
    isFiringBullet: s.isFiringBullet,
  }))
  const three = useThree()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [health, setHealth] = useState(100)
  const [ref, api] = useBox<Mesh>(() => ({
    mass: 1,
    args: [1, 1, 1],
    position: [0, 5, -10],
  }))
  useFrame(() => {
    if (hovered) {
      if (isFiringBullet) {
        const {
          raycaster: { ray },
        } = three
        const v = new THREE.Vector3(
          ray.direction.x * 10,
          ray.direction.y * 10,
          ray.direction.z * 10,
        )
        api.velocity.set(v.x, v.y, v.z)
        setHealth((s) => s - 8)
      }
    }
  })

  useEffect(() => {
    if (health <= 0) {
      api.position.set(0, 5, -10)
      setHealth(100)
    }
  }, [health])

  return (
    <mesh
      {...props}
      ref={ref}
      castShadow
      scale={[1, 1, 1]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={`rgb(255, ${health * 2}, ${health})`}
        metalness={0.3}
        roughness={0.7}
        attach="material"
        envMapIntensity={1}
      />
    </mesh>
  )
}
