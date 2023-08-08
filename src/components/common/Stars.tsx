import { useRef, MutableRefObject } from "react";

import { Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Stars = (props: any) => {
    const ref = useRef() as MutableRefObject<any>;
    let sphere = new Float32Array(5000 * 3);

    for (let i = 0; i < sphere.length; i += 3) {
        const r = 1.2 * Math.cbrt(Math.random()); 
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        sphere[i] = x;
        sphere[i + 1] = y;
        sphere[i + 2] = z;
    }

    useFrame((_state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
                <PointMaterial
                    transparent
                    color='#ffffff'
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

export default Stars;
