const GraphSearchPrim = ({ route, navigation }) => {
    const { graph, typeOfGraph } = route.params;

    const [selectedEdges, setSelectedEdges] = useState([]);
    const [myGraph, setMyGraph] = useState(graph);
    const [minimumSpanningTreeWeight, setMinimumSpanningTreeWeight] = useState(0);

    useEffect(() => {
        const applyPrimAlgorithm = () => {
            const primAlgorithm = new Prim(myGraph);
            const selectedEdges = primAlgorithm.execute();
            setSelectedEdges(selectedEdges);
            const primWeightAlgorithm = new Prim_weight(myGraph);
            const weight = primWeightAlgorithm.execute();
            setMinimumSpanningTreeWeight(weight);
            console.log(selectedEdges);
            console.log(weight);
        }
        applyPrimAlgorithm();
    }, [myGraph]);