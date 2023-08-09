import { FC } from "react"
import { useMDXComponent } from "next-contentlayer/hooks"

interface MdxWrapper {
    code: string
}


const MdxWrapper: FC<MdxWrapper> = ({ code }) => {
    const Component = useMDXComponent(code)

    return (
        <div>
            <Component />
        </div>
    )
}

export default MdxWrapper
