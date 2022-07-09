import React, { useContext, useState, useEffect } from 'react'
import useD3 from 'hooks/useD3'
import useRect from 'hooks/useRect'

import { ModeContext } from 'providers/ModeProvider';
import { animationReducer } from'./functions/chartReducer';
import { renderChart } from './functions/chartFunctions';
import { HashTable } from 'components/algorithm/functions/interfaces'

import './chart.css'

interface ChartProps{
    speed:number,
    data:number[],
    type:string,
    animationsHash:HashTable, 
    animIdxCount:number
}
function Chart( { speed, data, type, animationsHash, animIdxCount }:ChartProps ) {

    let animationDuration  = speed/2.5;

    /* CONTEXT */
    const compareMode  = useContext(ModeContext);
    const { indexes, actionHash, pivotHash } = animationsHash;

    /* STATE */
    const [ animateArray, setAnimateArray ] = useState(data);
    const [ pivots, setPivots ] = useState();


    //get container dimensions
    // const [rect, ref] = useRect()
    // const {width, height} = rect;


    //get current animation from Hash Table
    function calculateAnimation(){
        // where  to apply change   || or where and what to overwrite in case of MergeSort    
        const currentIndexes = indexes[animIdxCount];   
        // what kind of action to apply 
        const currentAciton = actionHash[animIdxCount]; 
        // what to paint on changes
        const currentPivots = pivotHash[animIdxCount]; 

        const updatedArray = animationReducer(type, currentAciton, currentIndexes, data);
        setAnimateArray(updatedArray);
        setPivots(currentPivots);
    }



    /* USE EFFECTS */
    useEffect(()=>{
        calculateAnimation();
    }, []);
    useEffect(()=>{
        calculateAnimation();
    }, [animationsHash]);

    useEffect(() => {
        calculateAnimation();
    }, [ animIdxCount ]);

    let refD3 = useD3(
        ( svg ) => renderChart( animateArray, svg, pivots, compareMode, animationDuration, type),
        [ animIdxCount ]
    );

    
    /* RENDER */
    return (
        < div 
            style={{ width: "100%", height:"100%"}}
            // ref={ref} 
            className='chart' id='chartContainer'
        >  

            {compareMode && type !== 'none' && <h5 className={'algo-title'}>{type}</h5> }
            { data && 
                <svg ref={refD3} 
                    style={{
                      width: "120%" , 
                      height:"90%",
                      marginRight: "0px",
                      marginLeft: "0px",
                    }}>
                        <g className="plot-area"/> 
                </svg>
            }
        </div>
    )
}

export default Chart;



