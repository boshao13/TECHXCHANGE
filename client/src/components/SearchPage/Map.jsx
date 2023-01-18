import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Canvas, useLoader} from '@react-three/fiber'
import {Stars, OrbitControls,} from '@react-three/drei'

import * as THREE from 'three'

const Container1 = styled('div')({
background: 'black',
width: '100vw',
height: '100vh',
})

function Sphere() {

  return (
    <mesh visible userData={{ test: "hello" }} position={[0, 0, 0]} castShadow>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}
function Map() {
  return (
    <>
     <div> map</div>
    <Canvas style={{
     width: '100vw',
     height: '100vh',
     background: 'black',
    }}>
      <Stars/>

      <OrbitControls target={[0,0,0]}/>
      <Sphere />

    </Canvas>




    </>
  )
}

export default Map;