export const list : algorithms = {
    sort: [ 
        { type:'bubble',  title:'Bubble Sort', isReady:true },
        { type:'quick', title:'Quick Sort', isReady:true},
        { type:'merge',  title:'Merge Sort', isReady:true },
        { type:'selection',  title:'Selection Sort', isReady:true   },
    ],
    search: [
        { type:'linear', title:'Linear Search', isReady:true  },
        { type:'binary',  title:'Binary Search', isReady:true    },
        { type:'jump', title:'Jump Search', isReady:true, },
        { type:'interpolation', title:'Interpolation Search', isReady:false},
    ]
};


/* INTERFACE */
interface algorithms{
    [key: string]:AlgoSection[]
}

interface AlgoSection{ 
    type:string;
    title: string;
    isReady: boolean;
}
export type { AlgoSection }
export type { algorithms }





/* export const list : algorithms = {
    sort: [ 
        { type:'bubble',  title:'Bubble Sort', isReady:true, wikiLink:'https://en.wikipedia.org/wiki/Bubble_sort', bigO:{time:'n^2'}},
        { type:'quick', title:'Quick Sort', isReady:true, wikiLink:'https://en.wikipedia.org/wiki/Quicksort',bigO:{time:'nlog n' }},
        { type:'merge',  title:'Merge Sort', isReady:true, wikiLink:'https://en.wikipedia.org/wiki/Merge_sort',bigO:{time:'n log n'  }},
        { type:'selection',  title:'Selection Sort', isReady:false, wikiLink:'https://en.wikipedia.org/wiki/Selection_sort', bigO:{time:'n^2'}  },
    ],
    search: [
        { type:'linear', title:'Linear Search', isReady:false, wikiLink:'https://en.wikipedia.org/wiki/Linear_search',  bigO:{time:'log n', }  },
        { type:'binary',  title:'Binary Search', isReady:false, wikiLink:'https://en.wikipedia.org/wiki/Binary_search_algorithm',  bigO:{time:'log n', }  },
        { type:'jump', title:'Jump Search', isReady:false, wikiLink:'https://en.wikipedia.org/wiki/Jump_search',  bigO:{time:'n^1/2'}  },
        { type:'interpolation', title:'Interpolation Search', isReady:false, wikiLink:'https://en.wikipedia.org/wiki/Interpolation_search',  bigO:{time:'	log(log(n))'}  },
    ]
}; */