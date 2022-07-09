import * as d3 from 'd3';


//change window size to component size
  export function renderChart(data, svg, pivots, compareMode, duration, type){
    
    //Accesors
    const xAccesor = (d, i) => i //accessing index
    const yAccesor = (d) => d //accessing value

    //Compute values for scales
    const X = d3.map(data, xAccesor)
    const Y = d3.map(data, yAccesor)

    // to make graph responsive calcuate we set width 100%
    // here we calculate width in pixels
    let svg_width = svg.node().getBoundingClientRect().width;
    let svg_height = svg.node().getBoundingClientRect().height;

    //Initial plot area
    svg
        .attr('height', svg_height)
        .attr('width', svg_width)

    //Scales
    const xScale = d3.scaleBand()
        .domain(X)
        .rangeRound([0, svg_width-svg_width*.2])
        .padding(0.25) //scaleBand only
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(Y)])
        .range([svg_height, 0])

    //Data points
    const plotArea = svg.select('.plot-area');

    plotArea
        .selectAll('rect')
        .data(data)
        .join(
            (enter)=> enter.append('rect')
                .attr('width', xScale.bandwidth())
                .attr('height', 0)
                .attr('y', svg_height)
                .attr('x', xScale.bandwidth()),
            (update) => update,
            (exit) => exit.remove()
        )
        .transition().duration(duration)
        .attr('width', xScale.bandwidth())
        .attr('height',d => yScale(0)- yScale(d)) 
        .attr('x', (d,i) => xScale(xAccesor(d,i)))
        .attr('y', d => yScale(yAccesor(d)))
        
    if(type === 'none'){
        plotArea.selectAll('rect')                
        .attr('fill', 'gray')
    }
    //Paint pivot points on each render
    if(pivots)paintPivots(plotArea, type, pivots);
    
}

export const paintPivots = ( plotArea, type, pivots ) => {
    const allBars = plotArea.selectAll('rect')                
        .attr('fill', 'var(--text-color')

    const leftBar = plotArea.selectAll('rect')
    const rightBar = plotArea.selectAll('rect'); 
    // const sortedBars = plotArea.selectAll('rect'); 
    const pivot = plotArea.selectAll('rect');
    const lastSorted = plotArea.selectAll('rect'); 

    const checkBar = plotArea.selectAll('rect');
    const found =  plotArea.selectAll('rect');
    const target = plotArea.selectAll('rect');
    // const 

    switch(type){
        /* SORT */
        case 'selection' :
            allBars.attr('fill', 'var(--text-color') 

            lastSorted
               .filter((d,i)=> i===pivots.lastSorted)
                .attr('fill', 'orange') 

            leftBar 
                .filter((d,i)=> i===pivots.leftIdx)
                .attr('fill', 'firebrick')
                
            rightBar 
                .filter((d,i)=> i===pivots.rightIdx)
                .attr('fill', 'firebrick')
            return;

        case 'bubble' :
            allBars.attr('fill', 'var(--text-color') 
            
            leftBar 
                .filter((d,i)=> i===pivots.leftIdx)
                .attr('fill', 'firebrick')
                
            rightBar 
                .filter((d,i)=> i===pivots.rightIdx)
                .attr('fill', 'firebrick')
            return;

        case 'quick' :
            allBars.attr('fill', 'var(--text-color')   
            leftBar 
                .filter((d,i)=> i===pivots.leftIdx)
                .attr('fill', 'firebrick')
            
            rightBar 
                .filter((d,i)=> i===pivots.rightIdx)
                .attr('fill', 'firebrick')
            pivot
                .filter((d,i)=> i===pivots.pivotIdx)
                .attr('fill', 'orange')
            return;


        case 'merge' :
            allBars.attr('fill', 'var(--text-color')   
            leftBar 
                .filter((d,i)=> i===pivots.leftIdx)
                .attr('fill', 'orange')
            
            rightBar 
                .filter((d,i)=> i===pivots.rightIdx)
                .attr('fill', 'firebrick')
            leftBar 
                .filter((d,i)=> i===pivots.leftIdx && i===pivots.rightIdx)
                .attr('fill', 'orange')
            
            rightBar 
                .filter((d,i)=> i===pivots.leftIdx && i===pivots.rightIdx)
                .attr('fill', 'orange')
            pivot
                .filter((d,i)=> i===pivots.pivotIdx)
                .attr('fill', 'orange')
            return;

            /* SEARCH */
        case 'linear' : 
            allBars.attr('fill', 'var(--text-color')

            checkBar
                .filter((d,i)=> i===pivots.check)
                .attr('fill', 'orange') 

            target
                .filter((d,i)=> i===pivots.target)
                .attr('fill', 'firebrick') 

            found                
                .filter((d,i)=> i===pivots.foundAt)
                .attr('fill', 'green') 

            
            return;


        case 'binary' : 
            allBars.attr('fill', 'var(--text-color')

            checkBar
                .filter((d,i)=> i===pivots.check)
                .attr('fill', 'orange') 

            target
                .filter((d,i)=> i===pivots.target)
                .attr('fill', 'firebrick') 

            found                
                .filter((d,i)=> i===pivots.foundAt)
                .attr('fill', 'green') 
            return;


        case 'jump' : 
            allBars.attr('fill', 'var(--text-color')

            checkBar
                .filter((d,i)=> i===pivots.check)
                .attr('fill', 'orange') 

            target
                .filter((d,i)=> i===pivots.target)
                .attr('fill', 'firebrick') 

            found                
                .filter((d,i)=> i===pivots.foundAt)
                .attr('fill', 'green') 
            return;

        case 'interpolation' : 
            allBars.attr('fill', 'var(--text-color')

            checkBar
                .filter((d,i)=> i===pivots.check)
                .attr('fill', 'orange') 

            target
                .filter((d,i)=> i===pivots.target)
                .attr('fill', 'firebrick') 

            found                
                .filter((d,i)=> i===pivots.foundAt)
                .attr('fill', 'green') 
            return;


        case 'default' :
            allBars .attr('fill', 'var(--text-color')   
    }
}