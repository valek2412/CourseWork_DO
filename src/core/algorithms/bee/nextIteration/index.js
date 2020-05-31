import optimizeLocally from "../../optimizeLocally";


const nextIteration = (states) => {

    const beforeOptimizingSuccessors = new Date();
    const optimizedSuccessors = optimizeLocally(states);
    const afterOptimizingSuccessors = new Date();

    const metaData = {
        optimizingSuccessorsDiff:
            afterOptimizingSuccessors - beforeOptimizingSuccessors,
        generalDiff: afterOptimizingSuccessors - beforeOptimizingSuccessors,
    };

    // returning new population and meta data
    return [optimizedSuccessors, metaData];
};

export default nextIteration;