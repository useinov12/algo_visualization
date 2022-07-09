import React, { useRef, useEffect } from 'react'
import { select } from 'd3-selection'


const useD3 = (renderChartFn:(svg:any)=>void, dependencies:any) =>  {
    
    const ref = useRef<SVGSVGElement | null> (null)

    useEffect(() => {
        renderChartFn( select(ref.current) )
        return () => {}
    }, [dependencies])

    return ref
}

export default useD3;